export function createAction<Output = {}, Input extends any[] = any>(
  name: string,
  action?: (...params: Input) => Output,
): (...params: Input) => Output & { type: string };

export function createThunk<Output = {}, Input extends any[] = any>(
  name: string,
  thunk?: (
    ...params: Input
  ) => (dispatch: (action: any) => any, getState: () => any) => Output,
): (
  ...params: Input
) => (
  dispatch: (action: any) => any,
  getState: () => any,
) => Output & { type: string };
