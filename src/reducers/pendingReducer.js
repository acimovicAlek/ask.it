const pendingReducer = (state = {}, action) => {
  const { type } = action;
  const actionName = type
    .split("_")
    .slice(0, -1)
    .join("_");

  if (!actionName) {
    return {
      ...state
    };
  }

  if (type.endsWith("_PEDNING")) {
    return {
      ...state,
      [actionName]: {
        pending: true
      }
    };
  }

  if (type.endsWith("_FULFILLED") || type.endsWith("_REJECTED")) {
    return {
      ...state,
      [actionName]: {
        pending: false,
        success: type.endsWith("_FULFILLED")
      }
    };
  }

  return {
    ...state
  };
};

export default pendingReducer;