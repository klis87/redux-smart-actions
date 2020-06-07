export const createAction = (name, action = () => ({})) => {
  const actionCreator = (...params) => ({ type: name, ...action(...params) });
  actionCreator.toString = () => name;
  return actionCreator;
};
