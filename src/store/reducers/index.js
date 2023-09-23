import { Types } from "../actions/items";

const defaultState = {
  appLogin: false
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {

    case Types.POST_AI_RESPONSE: {
      return { ...state, ...{ definition: { aiResponse: action.payload }} };
    }

    case Types.POST_AI_EXPLAINER_MORE_INFO: {
      console.log('Here')
      // return { ...state, ...{ definition: { aiExplanation: {paragaph1: '', paragraph2: ''} }} };
    }

    case Types.POST_AI_EXPLAINER_MORE_INFO_RESPONSE: {
      console.log('Here')
      return { ...state, ...{ definition: { aiExplanationMoreInfo: action.payload }} };
    }

    case Types.POST_AI_EXPLAINER_QUESTION_RESPONSE: {
      return { ...state, ...{ definition: { aiExplanation: action.payload }} };
    }

    case Types.POST_AI_EXPLAINER_MORE_INFO_RESPONSE: {
      return { ...state, ...{ definition: { aiExplanationMoreInfo: action.payload }} };
    }

    case Types.POST_AI_EXPLAINER_RESPONSE_RESPONSE: {
      return { ...state, ...{ definition: { aiResponse: action.payload }} };
    }

    case Types.POST_SUBMIT_LICENSE_SUCCESS: {
      return { ...state, ...{ appLogin: true } };

    }

    case Types.POST_SUBMIT_LICENSE_FAILURE: {
      return { ...state, ...{ appLogin: false } };
    }


    default:
      return state;
  }
};

export default reducer;
