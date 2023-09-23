import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
// import type { RootState } from '@/rootReducer';
import './assets/styles.css';

import * as actions from './store/actions/items';

// import * as Test from '/components/Explainer/Explainer.js';

const App = () => {

  const [
    appData,
  ] = useSelector((state) => [
    state,
  ])

  console.log(appData.definition?.aiExplanation)

  // let conversationArray = [];

  const [conversationArray, setConversationArray] = useState([])
  const [definitionArray, setDefinitionArray] = useState([])
  const [explanationArray, setExplanationArray] = useState({})
  const [initialBlurb, setInitialBlurb] = useState('')
  const [initialQuestion, setInitialQuestion] = useState('')
  const [moreInfoBool, setMoreInfoBool] = useState(false)
  // const [fetchingAiResponse, setFetchingAiResponse] = useState(false)
  const [showLoader, setShowLoader] = useState(false)

  useEffect(() => {
    if (appData.definition?.aiExplanation) {
      // const defJson = JSON.parse(appData.definition?.aiExplanation)
      setExplanationArray(appData.definition?.aiExplanation)
      setShowLoader(false)
    }
    if (appData.definition?.aiExplanationMoreInfo) {
      // const defJson = JSON.parse(appData.definition?.aiExplanation)
      setExplanationArray({...explanationArray, ...appData.definition?.aiExplanationMoreInfo})
      console.log({ ...explanationArray, ...appData.definition?.aiExplanationMoreInfo })
    }
  }, [appData])
  



  const [showApp, setShowApp] = useState(false)

  const dispatch = useDispatch()

  // const submitUserResponseDispatch = (data) => dispatch(actions.postUserResponse(data))

  const submitUserExplainerQuestionDispatch = (data) => dispatch(actions.postAIExplainerQuestion(data))
  // const submitUserExplainerMoreInfoDispatch = (data) => dispatch(actions.postAIExplainerMoreInfo(data))

  // const getMoreInformation = () => {
  //   setMoreInfoBool(true)
  //   const language = document.getElementById('language-select').value
  //   submitUserExplainerMoreInfoDispatch({ context: initialQuestion, language })
  // }

  // const [dictationMode, setDictationMode] = useState(false)
  // const [recognition, setRecognition] = useState({})
  // const [loginKey, setLoginKey] = useState('')
  

  // const startDictation = () => {
  //   const speech = window.SpeechRecognition ||
  //     window.webkitSpeechRecognition;
  //   if (!speech) {
  //     return
  //   }
  //   let recognition = new speech()
  //   recognition.continuous = true
  //   recognition.lang = 'es-ES'
  //   recognition.onresult = (evt) => {
  //     const text = evt.results[evt.results.length - 1][0].transcript;
  //     const el = document.getElementsByClassName('user-section-input')[0]
  //     const currVal = el.value
  //     const newVal = currVal + ' ' + text
  //     el.value = newVal;
  //   }
  //   recognition.start()
  //   setRecognition(recognition)
  //   setDictationMode(true)
  // }

  // const stopDictation = () => {
  //   recognition.stop()
  //   setDictationMode(false)
  // }

  const submitUserExplainerQuestion = () => {
    const data = document.getElementById('context-input').value
    console.log(data)
    setInitialQuestion(data)
    const language = document.getElementById('language-select').value
    setShowLoader(true)
    submitUserExplainerQuestionDispatch({ context: data, language })
  }


  
  return (
    <div className="app-container">
      <div className="context-input-container">
        <textarea
          placeholder={`What do you want explained?`} id="context-input"
          onKeyUp={(e) => {
            console.log(e.keyCode)
            if (e.keyCode === 13) {
              submitUserExplainerQuestion()
            }
          }}
        />
      </div>
      <div
        className="submit-button"
        onClick={submitUserExplainerQuestion}
      >
        Submit
      </div>
      <div className="language-select-holder">
        <span className="language-select-title">Select Response Language</span>
        <select className="language-select" id="language-select">
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="Italian">Italian</option>
          <option value="Polish">Polish</option>
          <option value="German">German</option>
          <option value="French">French</option>
          <option value="Portuguese">Portugues</option>
          <option value="Greek">Greek</option>
          <option value="Korean">Korean</option>
          <option value="Mandarin">Mandarin</option>
          <option value="Japanese">Japanese</option>
          <option value="Arabic">Arabic</option>
        </select>
      </div>
      <div className="response-container">
        {explanationArray && !showLoader && (
          <>
            {
              explanationArray.paragraph1 && explanationArray.wordCount == 1 && explanationArray.returnType === 'array' && (
                <>
                  {
                    JSON.parse(explanationArray.paragraph1)[0].definition === 'not a real word' ? (
                      <>
                        <div className="phrase-explanation">Sorry but "{initialQuestion}" is not a real word, as far as we can tell</div>
                      </>
                    )
                      :
                      (
                        <>
                          <div>"{initialQuestion}":</div>
                          {
                            JSON.parse(explanationArray.paragraph1).map((data, ind) => {
                              return (
                                <>

                                  <div>{ind + 1}: {data.definition} {data.example && `"${data.example}"`}</div>
                                </>
                              )
                            })
                          }
                          <div className="phrase-origin">Origin: {explanationArray.simpleEtymology}</div>
                        </>
                      )
                  }
                </>
              )
            }

            {
              explanationArray.paragraph1 && explanationArray.wordCount > 1 && explanationArray.returnType === 'string' && (
                <>
                  <div className="phrase-explanation">{explanationArray.paragraph1}</div>
                  <div className="phrase-origin">Origin: {explanationArray.simpleEtymology}</div>
                </>
              )
            }

          </>
        )}
        {
          showLoader && (
            <>
              <div className="loader">
                <div className="loading-bubble loading-bubble-1"></div>
                <div className="loading-bubble loading-bubble-2"></div>
                <div className="loading-bubble loading-bubble-3"></div>
                <div className="loading-bubble loading-bubble-4"></div>
                <div className="loading-bubble loading-bubble-5"></div>
              </div>
            </>
          )
        }
      </div>
    </div>
  )
};

export default App;
