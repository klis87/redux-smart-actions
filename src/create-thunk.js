export const createThunk = (name, thunk) => {
  const thunkCreator = (...params) => (dispatch, getState) =>
    dispatch({ type: name, ...thunk(...params)(dispatch, getState) });

  thunkCreator.toString = () => name;
  return thunkCreator;
};
