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
  const [explanationArray, setExplanationArray] = useState([])
  const [initialBlurb, setInitialBlurb] = useState('')
  const [moreInfoBool, setMoreInfoBool] = useState(false)

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
    if (appData.definition?.aiExplanation) {
      if (!moreInfoBool) {
        setInitialBlurb(appData.definition?.aiExplanation.paragraph1)
      } else if (appData.definition?.aiExplanation.paragraph2) {
        console.log('Deleting')
        setInitialBlurb('')
      }
      // const defJson = JSON.parse(appData.definition?.aiExplanation)
      setExplanationArray(appData.definition?.aiExplanation)
      setFetchingAiResponse(false)
    }
  }, [appData])
  



  const [showApp, setShowApp] = useState(false)


  const dispatch = useDispatch()

  const submitUserResponseDispatch = (data) => dispatch(actions.postUserResponse(data))

  const submitUserExplainerQuestionDispatch = (data) => dispatch(actions.postAIExplainerQuestion(data))
  const submitUserExplainerMoreInfoDispatch = (data) => dispatch(actions.postAIExplainerMoreInfo(data))

  const getMoreInformation = () => {
    setMoreInfoBool(true)
    const language = document.getElementById('language-select').value
    submitUserExplainerMoreInfoDispatch({ context: initialBlurb, language })
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

  const submitUserExplainerQuestion = () => {
    setInitialBlurb('')
    setMoreInfoBool(false)
    const data = document.getElementById('context-input').value
    console.log(data)
    const language = document.getElementById('language-select').value

    submitUserExplainerQuestionDispatch({ context: data, language })
  }

  // const DoubleInputExplainer = () => {
  //   return (
  //     <div className="AppContainer">
  //       <div className="word-input-container">
  //         <input id="word-input" />
  //       </div>
  //       <div className="context-input-container">
  //         <textarea id="context-input" />
  //       </div>
  //       <div
  //         className="submit-button"
  //         onClick={submitUserResponse}
  //       >
  //         Submit
  //       </div>
  //       <div className="response-container">
  //         {/* {definitionArray && definitionArray.length > 0 && (
  //         <>
  //           { definitionArray.map((data) => {
  //             return (
  //               <>
  //                 <div className="definition-point">
  //                   { data.key }: { data.value }
  //                 </div>
  //               </>
  //             )
  //           })}
  //         </>
  //       )} */}
  //         {appData?.definition?.aiResponse && (
  //           <>
  //             {
  //               <>
  //                 <div className="description-holder">{JSON.parse(appData.definition.aiResponse).description}</div>
  //                 <div className="etymology-holder"> {JSON.parse(appData.definition.aiResponse).etymology} </div>
  //               </>
  //             }
  //           </>
  //         )}
  //       </div>
  //     </div>
  //   )
  // }


  const SingleInputExplainer = () => {
    return (
      <div className="app-container">
        <div className="context-input-container">
          <textarea placeholder={`What do you want explained?`} id="context-input" />
        </div>
        <div
          className="submit-button"
          // onClick={submitUserResponse}
          onClick={submitUserExplainerQuestion}
        >
          Submit
        </div>
        <select className="language-select" id="language-select">
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="Italian">Italian</option>
          <option value="Polish">Polish</option>
          <option value="German">German</option>
          <option value="French">French</option>
          <option value="Greek">Greek</option>
          <option value="Korean">Korean</option>
          <option value="Mandarin">Mandarin</option>
          <option value="Japanese">Japanese</option>
          <option value="Irish">Irish</option>
        </select>
        <div className="response-container">
          { explanationArray && (
            <>
              {
                <>
                  <div className="description-holder">{initialBlurb || explanationArray.paragraph1}</div>
                  <div className="etymology-holder"> {explanationArray.paragraph2} </div>
                </>
              }
            </>
          )}
        </div>
      </div>
    )
  }


  const [showCorrections, setShowCorrections] = useState(false)
  // return (
  //   // <DoubleInputExplainer />
  //   <SingleInputExplainer />
  // );
  return (
    <div className="app-container">
      <div className="context-input-container">
        <textarea placeholder={`What do you want explained?`} id="context-input" />
      </div>
      <div
        className="submit-button"
        // onClick={submitUserResponse}
        onClick={submitUserExplainerQuestion}
      >
        Submit
      </div>
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
      <div className="response-container">
        {explanationArray && (
          <>
            {
              <>
                <div className="description-holder">{initialBlurb || explanationArray.paragraph1}</div>
                <div className="description-holder">{explanationArray.paragraph2}</div>
                {
                  explanationArray.paragraph1 && !explanationArray.paragraph2 && (
                    <>
                      <div
                        className="learn-more-button"
                        onClick={getMoreInformation}
                      >Learn More</div>
                    </>
                  )
                }
                {/* {
                  !explanationArray.paragraph2 && (
                    <>
                      <div className="description-holder">{initialBlurb || explanationArray.paragraph1}</div>                    
                    </>
                  )
                }
                {
                  explanationArray.paragraph2 && (
                    <div className="description-holder">{explanationArray.paragraph1}</div>
                  )
                }
                <div className="description-holder">{explanationArray.paragraph1}</div>
                {
                  !explanationArray.paragraph2 && (
                    <>
                      <div
                        className="learn-more-button"
                        onClick={getMoreInformation}
                      >Learn More</div>
                    </>
                  )
                } */}
              </>
            }
          </>
        )}
      </div>
    </div>
  )
};

export default App;
