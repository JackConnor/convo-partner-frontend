// types of action
export const Types = {
  CREATE_ITEM: "CREATE_ITEM",
  DELETE_ITEM: "DELETE_ITEM",
  GET_AI_RESPONSE: "GET_AI_RESPONSE",
  POST_AI_RESPONSE: "POST_AI_RESPONSE",
  POST_AI_EXPLAINER_QUESTION: "POST_AI_EXPLAINER_QUESTION",
  POST_AI_EXPLAINER_RESPONSE: "POST_AI_EXPLAINER_RESPONSE",
  POST_AI_EXPLAINER_QUESTION_RESPONSE: "POST_AI_EXPLAINER_QUESTION_RESPONSE",
  POST_AI_EXPLAINER_RESPONSE_RESPONSE: "POST_AI_EXPLAINER_RESPONSE_RESPONSE",
  POST_USER_RESPONSE: "POST_USER_RESPONSE",
  POST_SUBMIT_LICENSE: 'POST_SUBMIT_LICENSE',
  POST_SUBMIT_LICENSE_SUCCESS: 'POST_SUBMIT_LICENSE_SUCCESS',
  POST_SUBMIT_LICENSE_FAILURE: 'POST_SUBMIT_LICENSE_FAILURE',
};

// actions
export const createItem = (task) => ({
  type: Types.CREATE_ITEM,
  payload: task,
});

export const deleteItem = (id) => ({
  type: Types.DELETE_ITEM,
  payload: id,
});

// export const postAIResponse = (data) => ({
//   type: Types.POST_AI_RESPONSE,
//   payload: data,
// });

export const getAIResponse = () => {
  return ({
    type: Types.GET_AI_RESPONSE
  })
};

export const postAIResponse = (data) => {
  return ({
    type: Types.POST_AI_RESPONSE,
    payload: data,
  })
};

export const postUserResponse = (data) => {
  return ({
    type: Types.POST_USER_RESPONSE,
    payload: data,
  })
};

export const postSubmitLicense = (data) => {
  return ({
    type: Types.POST_SUBMIT_LICENSE,
    payload: data,
  })
};

export const postSubmitLicenseSuccess = () => {
  return ({
    type: Types.POST_SUBMIT_LICENSE_SUCCESS
  })
};

export const postSubmitLicenseFailure = () => {
  return ({
    type: Types.POST_SUBMIT_LICENSE_FAILURE
  })
};

export const postAIExplainerResponse = (data) => {
  return ({
    type: Types.POST_AI_EXPLAINER_RESPONSE,
    payload: data,
  })
};

export const postAIExplainerQuestion = (data) => {
  return ({
    type: Types.POST_AI_EXPLAINER_QUESTION,
    payload: data,
  })
};

export const postAIExplainerResponseResponse = (data) => {
  return ({
    type: Types.POST_AI_EXPLAINER_RESPONSE_RESPONSE,
    payload: data,
  })
};

export const postAIExplainerQuestionResponse = (data) => {
  return ({
    type: Types.POST_AI_EXPLAINER_QUESTION_RESPONSE,
    payload: data,
  })
};

