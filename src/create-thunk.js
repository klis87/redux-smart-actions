export const createThunk = (name, thunk) => {
  const thunkCreator = (...params) => (dispatch, getState, extraArguments) => {
    const actionToDispatch = thunk(...params)(
      dispatch,
      getState,
      extraArguments,
    );

    if (!actionToDispatch) {
      return null;
    }

    return dispatch({ type: name, ...actionToDispatch });
  };

  thunkCreator.toString = () => name;
  return thunkCreator;
};
