import { all, delay } from "@redux-saga/core/effects";
import { call, put, select, takeLatest } from 'redux-saga/effects'
import * as actions from '../actions/items'
import axios from 'axios'

function* getAiResponseSaga() {
  const response = yield axios.post('http://localhost:3000/prompt', {
    prompt: 'Start a conversation with me in a language of your choosing like i was a nine year old'
    // prompt: 'Quote Borges, maximum 50 lines'
  }, {
    headers: {
      // 'Access-Control-Allow-Origin': '*'
    }
  })
  yield put(actions.postAIResponse(response))

}

function* postUserResponseSaga(data) {
  // console.log(data)
  // console.log('data')
  // console.log('data')
  // console.log('data')
  // console.log('data')
  // const modifiedPayload =
  //   // `Please read the rules for conversation here "https://docs.google.com/document/d/1njAH6xMBTpDJ91u3c-P83Oopu3PjdTzmFN88dfGKTr0/edit?usp=sharing" and use them to respond to this in 75 words or less as : ${data.payload}`
  // ` Please respond to the following in 75 words or less in spanish, appropriate for someone at a 5th grade level.
  //   If the user asks you a question you must answer it.
  //   Never ask the user more than one question at once, ever ever ever.
  //   If the user is now speaking in another language than they were previously, you MUST start speaking in that language.
  //   Pleae always continue the conversation topic unless the user has changed it already.
  //   Do not include translations.
  //   Do not ask me the same question twice.
  //   You should always be trying to teach me things.
  //   If the user wants to change the subject or asks you a question about something, you always indulge them.
  //   Do not repeat any questions from your conversation which you can read here: ${
  //   data.payload.conversationArray.slice(data.payload.conversationArray.length - 10, data.payload.conversationArray.length).map((item) => {
  //       console.log(item)
  //       console.log('item')
  //       return item.speaker + ': ' + item.text
  //     })
  //   },
  //   Use the context of the conversation so far to talk about topics the user wants to talk about.
  //   Please end with a short question on a specific fact or aspect of the topic of conversation that has not been asked yet.
  //   User response: ` + data.payload.text

  //   console.log(modifiedPayload)
  // const response = yield axios.post('http://localhost:3000/prompt', {
  //   prompt: modifiedPayload,
  //   originalText: data.payload.text
  // }, {
  //   headers: {
  //     'Access-Control-Allow-Origin': '*'
  //   }
  // })
  const response = yield axios.post(`https://datablast.com/api/chatgpt?text=${data.payload.text}&name=&difficulty=beginner&key=07E79976-CDF74C33-BFE3B6A0-5E532739`, {
    prompt: data.payload.text,
    originalText: data.payload.text
  }, {
    headers: {
      // 'Access-Control-Allow-Origin': '*'
    }
  })
  console.log(response)
  yield put(actions.postAIResponse(response))  

}

export default function* rootSaga() {
  // yield all([exampleSaga()]);
  yield all([
    takeLatest("GET_AI_RESPONSE", getAiResponseSaga),
    takeLatest("POST_USER_RESPONSE", postUserResponseSaga),
  ]);
}
