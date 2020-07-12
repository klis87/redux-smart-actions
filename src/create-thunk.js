export const createThunk = (name, thunk) => {
  const thunkCreator = (...params) => (dispatch, getState) => {
    const actionToDispatch = thunk(...params)(dispatch, getState);

    if (!actionToDispatch) {
      return null;
    }

    return dispatch({ type: name, ...actionToDispatch });
  };

  thunkCreator.toString = () => name;
  return thunkCreator;
};
