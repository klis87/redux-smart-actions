import { createThunk } from '.';

describe('createThunk', () => {
  it('works', () => {
    const thunk = createThunk('NAME', () => () => ({}));
    expect(thunk.toString()).toBe('NAME');
  });
});
