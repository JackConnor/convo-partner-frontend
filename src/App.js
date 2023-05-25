import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
// import type { RootState } from '@/rootReducer';
import './assets/styles.css'

import * as actions from './store/actions/items'

const App = () => {

  const [
    appData,
  ] = useSelector((state) => [
    state,
  ])

  console.log(appData)




  // let conversationArray = [];

  const [conversationArray, setConversationArray] = useState([])

  useEffect(() => {
    if (appData.conversation?.aiResponse) {
      const newArr = [
        ...conversationArray,
        ...[{
          speaker: 'AI',
          text: appData.conversation.aiResponse.text
        }]
      ]
      setConversationArray(newArr)
      setFetchingAiResponse(false)
    }
  }, [appData])
  

  useEffect(() => {
    if (appData.appLogin) {
      // window.localStorage.setItem('lastLoginData', new Date().getTime())
      // window.localStorage.setItem('lastLoginKey', loginKey)
    }
  }, [JSON.stringify(appData)])


  const [showApp, setShowApp] = useState(false)

  useEffect(() => {
    // let loginDate = window.localStorage.getItem('lastLoginData')
    // let loginKey = window.localStorage.getItem('lastLoginKey')
    // if (loginDate && (new Date().getTime() - loginDate < 3600000) && loginKey) {
    //   setShowApp(true)
    //   setLoginKey(loginKey)
    // }
  }, [])

  const dispatch = useDispatch()

  const submitUserResponseDispatch = (data) => dispatch(actions.postUserResponse(data))
  const getInitialAIResponse = () => dispatch(actions.getAIResponse())
  const postSubmitLicenseCall = (data) => dispatch(actions.postSubmitLicense(data))

  const submitUserResponse = () => {
    const data = {text: document.getElementsByClassName('user-section-input')[0].value, key: loginKey}
    data.conversationArray = conversationArray
    console.log(data)
    submitUserResponseDispatch(data)
    const newArr = [
      ...conversationArray,
      ...[{
        speaker: 'User',
        text: data.text
      }]
    ]
    setConversationArray(newArr)
    setFetchingAiResponse(true)
  }

  const [dictationMode, setDictationMode] = useState(false)
  const [recognition, setRecognition] = useState({})
  const [fetchingAiResponse, setFetchingAiResponse] = useState(false)
  const [loginKey, setLoginKey] = useState('')
  

  const startDictation = () => {
    const speech = window.SpeechRecognition ||
      window.webkitSpeechRecognition;
    if (!speech) {
      return
    }
    let recognition = new speech()
    recognition.continuous = true
    recognition.lang = 'es-ES'
    recognition.onresult = (evt) => {
      const text = evt.results[evt.results.length - 1][0].transcript;
      const el = document.getElementsByClassName('user-section-input')[0]
      const currVal = el.value
      const newVal = currVal + ' ' + text
      el.value = newVal;
    }
    recognition.start()
    setRecognition(recognition)
    setDictationMode(true)
  }

  const stopDictation = () => {
    recognition.stop()
    setDictationMode(false)
  }

  useEffect(() => {
    // getInitialAIResponse()
  }, [])

  const toggleTranslation = () => {
    const el = document.getElementsByClassName('ai-section-text')[0]
    if (el.classList.contains('translation-mode')) {
      el.classList.add('fade-out')
      setTimeout(() => {
        el.classList.remove('translation-mode')
        el.classList.remove('fade-out')
      }, 300)
    } else {
      el.classList.add('fade-out')
      setTimeout(() => {
        el.classList.add('translation-mode')
        el.classList.remove('fade-out')
      }, 300)
    }
  }

  const [showCorrections, setShowCorrections] = useState(false)

  return (
    <div className="AppContainer">
      <img className={`header-image ${(appData.appLogin || showApp) ? 'header-image-active' : ''}`} src="src/assets/miguel-banner-logo.png" width="80%" alt="Miguel Logo" />
      {
        !appData.appLogin && !showApp && (
          <>
            <div className="col-md-8 offset-md-2">
              <div id="intro" className="mt-5 mb-3">
                <h5>Hi 👋 I'm Miguel, your personal language learning companion designed to revolutionize the way you learn Spanish 🇪🇸. Simply purchase a <a href="https://kodekamp.gumroad.com/l/miguel">License Key</a>, enter it below, and start talking to me!</h5>
              </div>
            </div>
            <input
              type="text"
              className="form-control-lg tet-center license-input"
              id="licenseKey"
              placeholder="Enter license key"
              onKeyUp={(evt) => {
                if (evt.keyCode === 13) {
                  const val = evt.currentTarget.value;
                  setLoginKey(val)
                  postSubmitLicenseCall(val)
                  if (val === 'Sebastian') {
                    // setShowApp(true)

                  }
                }
              }}
            />
          </>
        )
      }
      {
        appData.appLogin && (
          <>
            <div
              className="ai-section"
            >
              <div
                className={`ai-section-text ${appData.conversation?.aiResponse?.text && appData.conversation?.aiResponse.text.split(' ').length > 50 ? 'small-font' : ''}`}
                onClick={toggleTranslation}
              >
                <div className="ai-section-text-click-cover">
                  Click to see translation
                </div>
                {
                  fetchingAiResponse && (
                    <div className="text-loader">
                      <div className="loading-ball loading-ball-1"></div>
                      <div className="loading-ball loading-ball-2"></div>
                      <div className="loading-ball loading-ball-3"></div>
                    </div>
                  )
                }
                <div
                  className="ai-section-text-inner"
                >
                  <div className="ai-section-text-inner-convo">
                    {
                      appData.conversation?.aiResponse.text ?
                        appData.conversation?.aiResponse.text
                        :
                        'Bienvenidos! Digame algo para empezar.'
                    }
                  </div>
                  <div className="ai-section-text-inner-translation">
                    {
                      appData.conversation?.aiResponse.translation ?
                        appData.conversation?.aiResponse.translation
                        :
                        'Hello! Say anything to begin.'
                    }
                  </div>
                </div>
              </div>
            </div>
            <div
              className="user-section"
            >
              <textarea
                className="user-section-input"
                rows="7"
                cols="50"
                onKeyUp={(evt) => {
                  if (evt.keyCode === 13) {
                    submitUserResponse()
                  }
                }}
              />
              <div
                className="user-section-buttons-holder"
              >
                <div
                  className="user-section-speak-button"
                  onClick={(evt) => {
                    submitUserResponse()
                  }}
                >
                  Speak
                </div>
                {/* <div
                  className={`user-section-speak-button user-section-dictation-button ${dictationMode ? 'dictation-mode' : ''}`}
                  onClick={(evt) => {
                    if (!dictationMode) {
                      startDictation()
                    } else {
                      stopDictation()
                    }
                  }}
                >
                  Dictate {dictationMode}
                </div> */}
                <div className="user-section-corrections-section">
                  <div
                    className="user-section-corrections-toggle"
                    onClick={() => {
                      if (showCorrections) {
                        setShowCorrections(false)
                      } else {
                        setShowCorrections(true)
                      }
                    }}
                  >
                    {
                      showCorrections ?
                        'hide corrections'
                        :
                        'show corrections'
                    }
                  </div>
                  <div>
                    {
                      showCorrections && (
                        <>
                          {
                            appData.conversation?.aiResponse?.hints ?
                              appData.conversation?.aiResponse.hints
                              :
                              'No correction available yet.'
                          }
                        </>
                      )
                    }
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      }
    </div>
  );
};

export default App;
