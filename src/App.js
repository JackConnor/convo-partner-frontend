import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
// import type { RootState } from '@/rootReducer';
import './assets/styles.css'

import * as actions from './store/actions/items'

const App = () => {

  const [
    aiData,
  ] = useSelector((state) => [
    state
  ])

  // let conversationArray = [];

  const [conversationArray, setConversationArray] = useState([])

  useEffect(() => {
    if (aiData.conversation?.aiResponse) {
      const newArr = [
        ...conversationArray,
        ...[{
          speaker: 'AI',
          text: aiData.conversation.aiResponse.data
        }]
      ]
      setConversationArray(newArr)
      setFetchingAiResponse(false)
      // const el = document.getElementsByClassName('user-section-input')[0]
      // el.value = '';
    }
  }, [aiData])

  useEffect(() => {
    console.log('latest convo in full:')
    console.log(conversationArray)
  }, [conversationArray])

  const dispatch = useDispatch()

  const submitUserResponseDispatch = (data) => dispatch(actions.postUserResponse(data))
  const getInitialAIResponse = () => dispatch(actions.getAIResponse())

  const submitUserResponse = () => {
    const data = {text: document.getElementsByClassName('user-section-input')[0].value}
    data.conversationArray = conversationArray
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
    console.log(recognition)
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
      <div
        className="ai-section"
      >
        <div
          className={`ai-section-text ${aiData.conversation?.aiResponse?.data && aiData.conversation?.aiResponse.data.split(' ').length > 50 ? 'small-font' : ''}`}
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
                aiData.conversation?.aiResponse.data ?
                  aiData.conversation?.aiResponse.data
                  :
                  'Bienvenidos! Digame algo para empezar.'
              }
            </div>
            <div className="ai-section-text-inner-translation">
              {
                aiData.conversation?.aiResponse.translation ?
                  aiData.conversation?.aiResponse.translation
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
            console.log(evt)
            console.log(evt.keyCode)
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
                      aiData.conversation?.aiResponse?.correction ?
                        aiData.conversation?.aiResponse.correction
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
    </div>
  );
};

export default App;
