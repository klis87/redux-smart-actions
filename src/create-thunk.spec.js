import configureStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';

import { createThunk } from '.';

describe('createThunk', () => {
  it('adds toString method returning type to thunkCreator', () => {
    const thunkCreator = createThunk('NAME', () => () => ({}));
    expect(thunkCreator.toString()).toBe('NAME');
  });

  it('returns thunk creator which returns action with proper type', () => {
    const mockStore = configureStore([thunkMiddleware]);
    const store = mockStore({});
    const thunkCreator = createThunk('NAME', () => () => ({}));
    store.dispatch(thunkCreator());
    expect(store.getActions()).toEqual([{ type: 'NAME' }]);
  });

  it('returns thunk creator which returns action with merged attrs', () => {
    const mockStore = configureStore([thunkMiddleware]);
    const store = mockStore({ y: 2 });
    const thunkCreator = createThunk('NAME', x => (dispatch, getState) => ({
      x,
      y: getState().y,
    }));
    store.dispatch(thunkCreator(1));
    expect(store.getActions()).toEqual([{ type: 'NAME', x: 1, y: 2 }]);
  });

  it('returns thunk creator which can dispatch extra actions', () => {
    const mockStore = configureStore([thunkMiddleware]);
    const store = mockStore({});
    const thunkCreator = createThunk('NAME', () => dispatch => {
      dispatch({ type: 'EXTRA' });
      return {};
    });
    store.dispatch(thunkCreator());
    expect(store.getActions()).toEqual([{ type: 'EXTRA' }, { type: 'NAME' }]);
  });

  it('returns thunk creator which doesnt dispatch action when returning null', () => {
    const mockStore = configureStore([thunkMiddleware]);
    const store = mockStore({});
    const thunkCreator = createThunk('NAME', () => () => null);
    store.dispatch(thunkCreator());
    expect(store.getActions()).toEqual([]);
  });
});
