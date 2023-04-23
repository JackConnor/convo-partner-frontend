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
          text: aiData.conversation.aiResponse
        }]
      ]
      setConversationArray(newArr)
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
    console.log('data')
    console.log(data)
    console.log('data')
    submitUserResponseDispatch(data)
    const newArr = [
      ...conversationArray,
      ...[{
        speaker: 'User',
        text: data.text
      }]
    ]
    setConversationArray(newArr)
  }

  useEffect(() => {
    // getInitialAIResponse()
  }, [])

  return (
    <div className="AppContainer">
      <div
        className="ai-section"
      >
        <div className={`ai-section-text ${aiData.conversation?.aiResponse && aiData.conversation?.aiResponse.split(' ').length > 50 ? 'small-font' : ''}`}>
          <div
            className="ai-section-text-inner"
          >
            {
              aiData.conversation?.aiResponse ?
                aiData.conversation?.aiResponse
                :
                'Welcome'
            }
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
          <div
            className="user-section-speak-button"
            onClick={(evt) => {
              submitUserResponse()
            }}
          >
            Dictate
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
