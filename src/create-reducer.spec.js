import { createReducer, joinTypes, createAction } from '.';

describe('createReducer', () => {
  const type2 = createAction('TYPE2', value => ({ value }));
  const type4 = createAction('TYPE4', value => ({ value }));

  const handlers = {
    TYPE1: (state, action) => state + action.value,
    [type2]: (state, action) => state + action.value,
    [joinTypes('TYPE3', type4)]: (state, action) => state - action.value,
  };

  it('returns unchanged state when no matching action type', () => {
    expect(createReducer(handlers, 0)(1, {})).toBe(1);
  });

  it('returns default state when state is undefined', () => {
    expect(createReducer(handlers, 0)()).toBe(0);
  });

  it('returns proper state when matching action type', () => {
    expect(createReducer(handlers, 0)(1, { type: 'TYPE1', value: 2 })).toBe(3);
  });

  it('can handle type passed as action creator', () => {
    expect(createReducer(handlers, 0)(1, type2(3))).toBe(4);
  });

  it('can handle multiple types for one handler', () => {
    expect(createReducer(handlers, 0)(1, { type: 'TYPE3', value: 2 })).toBe(-1);
    expect(createReducer(handlers, 0)(1, type4(3))).toBe(-2);
  });
});
