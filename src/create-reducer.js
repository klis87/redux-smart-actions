const TYPES_DELIMITER = '@@';

export const joinTypes = (...types) =>
  types.map(type => type.toString()).join(TYPES_DELIMITER);

export const createReducer = (handlers, defaultState) => {
  handlers = Object.entries(handlers).reduce((prev, [type, handler]) => {
    if (type.includes(TYPES_DELIMITER)) {
      type.split(TYPES_DELIMITER).forEach(singleType => {
        prev[singleType] = handler;
      });
    } else {
      prev[type.toString()] = handler;
    }

    return prev;
  }, {});

  return (state, action) => {
    if (state === undefined) {
      return defaultState;
    }

    const handler = handlers[action.type];

    if (handler) {
      return handler(state, action);
    }

    return state;
  };
};
