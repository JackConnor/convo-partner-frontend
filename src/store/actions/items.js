// types of action
export const Types = {
  CREATE_ITEM: "CREATE_ITEM",
  DELETE_ITEM: "DELETE_ITEM",
  GET_AI_RESPONSE: "GET_AI_RESPONSE",
  POST_AI_RESPONSE: "POST_AI_RESPONSE",
  POST_USER_RESPONSE: "POST_USER_RESPONSE",
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
