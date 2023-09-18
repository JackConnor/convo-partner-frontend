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

  console.log(appData.definition?.aiResponse)


  // let conversationArray = [];

  const [conversationArray, setConversationArray] = useState([])
  const [definitionArray, setDefinitionArray] = useState([])

  useEffect(() => {
    if (appData.definition?.aiResponse) {

      // const defJson = JSON.parse(appData.definition?.aiResponse)
      // const keys = Object.keys(defJson)

      // let arr = []

      // for (let i = 0; i < keys.length; i++) {
      //   arr[i] = {key: keys[i], value: defJson[keys[i]]}
      // }
      
      // setDefinitionArray(arr)
      setFetchingAiResponse(false)
    }
  }, [appData])
  



  const [showApp, setShowApp] = useState(false)


  const dispatch = useDispatch()

  const submitUserResponseDispatch = (data) => dispatch(actions.postUserResponse(data))
  // const getInitialAIResponse = () => dispatch(actions.getAIResponse())
  // const postSubmitLicenseCall = (data) => dispatch(actions.postSubmitLicense(data))


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

  const submitUserResponse = () => {
    const word = document.getElementById('word-input').value
    console.log(word)
    const context = document.getElementById('context-input').value
    console.log(context)
    submitUserResponseDispatch({ word, context })

    setFetchingAiResponse(true)
  }


  const [showCorrections, setShowCorrections] = useState(false)

  return (
    <div className="AppContainer">
      <div className="word-input-container">
        <input id="word-input" />
      </div>
      <div className="context-input-container">
        <textarea id="context-input" />
      </div>
      <div
        className="submit-button"
        onClick={submitUserResponse}
      >
        Submit
      </div>
      <div className="response-container">
        {/* {definitionArray && definitionArray.length > 0 && (
          <>
            { definitionArray.map((data) => {
              return (
                <>
                  <div className="definition-point">
                    { data.key }: { data.value }
                  </div>
                </>
              )
            })}
          </>
        )} */}
        {appData?.definition?.aiResponse && (
          <>
            {
              <>
                <div className="description-holder">{ JSON.parse(appData.definition.aiResponse).description }</div>
                <div className="etymology-holder"> {JSON.parse(appData.definition.aiResponse).etymology } </div>
              </>
            }
          </>
        )}
      </div>
    </div>
  );
};

export default App;
