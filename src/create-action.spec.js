import { createAction } from '.';

describe('createAction', () => {
  it('adds toString method returning type to actionCreator', () => {
    const actionCreator = createAction('NAME');
    expect(actionCreator.toString()).toBe('NAME');
  });

  it('returns action with proper type', () => {
    const actionCreator = createAction('NAME');
    expect(actionCreator()).toEqual({ type: 'NAME' });
  });

  it('returns action with proper type and merge attrs', () => {
    const actionCreator = createAction('NAME', x => ({ x }));
    expect(actionCreator(1)).toEqual({ type: 'NAME', x: 1 });
  });
});
