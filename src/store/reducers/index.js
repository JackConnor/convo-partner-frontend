import { Types } from "../actions/items";

const defaultState = {
  appLogin: false
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {

    case Types.POST_AI_RESPONSE: {
      return { ...state, ...{ conversation: { aiResponse: action.payload[0] }} };
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
