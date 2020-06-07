export function createAction<Output = {}, Input = {}>(
  name: string,
  action?: (...input: Input) => Output,
): (...input: Input) => Output & { type: string };

export function createThunk<Output = {}, Input = {}>(
  name: string,
  thunk?: (
    ...input: Input
  ) => (dispatch: (action: any) => any, getState: () => any) => Output,
): (
  ...input: Input
) => (
  dispatch: (action: any) => any,
  getState: () => any,
) => Output & { type: string };
