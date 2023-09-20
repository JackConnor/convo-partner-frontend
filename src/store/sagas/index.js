import { all, delay } from "@redux-saga/core/effects";
import { call, put, select, takeLatest } from 'redux-saga/effects'
import * as actions from '../actions/items'
import axios from 'axios'

function* getAiResponseSaga() {
  // const response = yield axios.post('http://localhost:3000/prompt', {
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

function* postAiExplainerQuestionSaga(action) {
  console.log(action.payload)
  console.log('HERE')
  console.log('HERE')
  console.log('HERE')
  console.log('HERE')
  console.log('HERE')
  const response = yield axios.post('http://localhost:3000/prompt-dict-explanation', {
    context: action.payload.context,
    language: action.payload.language
    // prompt: 'Quote Borges, maximum 50 lines'
  }, {
    headers: {
      // 'Access-Control-Allow-Origin': '*'
    }
  })
  yield put(actions.postAIExplainerQuestionResponse(response.data.res))
}

function* postAiExplainerResponseSaga() {
  const response = yield axios.post('http://localhost:3000/prompt', {
    prompt: 'Start a conversation with me in a language of your choosing like i was a nine year old'
    // prompt: 'Quote Borges, maximum 50 lines'
  }, {
    headers: {
      // 'Access-Control-Allow-Origin': '*'
    }
  })
  yield put(actions.postAIExplainerResponseResponse(response))
}

function* postSubmitLicense(action) {
  try {
    console.log(action.payload)
    const response = yield axios.get(`https://datablast.com/api/chatgpt?text=hola&name=&difficulty=beginner&format=json&key=${action.payload}`, {
      headers: {
        // 'Access-Control-Allow-Origin': '*'
      }
    })
    if (response.data[0].text) {
        yield put(actions.postSubmitLicenseSuccess())
    } else {
      yield put(actions.postSubmitLicenseFailure())
    }
  } catch(err) {
    yield put(actions.postSubmitLicenseFailure())
  }
}

function* postUserResponseSaga(data) {
  console.log(data)
  console.log(data.payload)
  const response = yield axios.post(`http://localhost:3000/prompt-dict`, {
    word: data.payload.word,
    context: data.payload.context
  }, {
    headers: {
      // 'Access-Control-Allow-Origin': '*'
    }
  })
  console.log(response)
  yield put(actions.postAIResponse(response.data.res))  

}

export default function* rootSaga() {
  yield all([
    takeLatest("GET_AI_RESPONSE", getAiResponseSaga),
    takeLatest("POST_AI_EXPLAINER_QUESTION", postAiExplainerQuestionSaga),
    takeLatest("POST_AI_EXPLAINER_RESPONSE", postAiExplainerResponseSaga),
    takeLatest("POST_USER_RESPONSE", postUserResponseSaga),
    takeLatest("POST_SUBMIT_LICENSE", postSubmitLicense),
  ]);
}
