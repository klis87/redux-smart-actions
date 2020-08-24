import { Reducer, AnyAction } from 'redux';

export function createAction<Output = {}, Input extends any[] = any>(
  name: string,
  action?: (...params: Input) => Output,
): (...params: Input) => Output & { type: string };

export function createThunk<Output = {}, Input extends any[] = any>(
  name: string,
  thunk: (
    ...params: Input
  ) => (
    dispatch: (action: any) => any,
    getState: () => any,
    extraArguments: any,
  ) => Output,
): (
  ...params: Input
) => (
  dispatch: (action: any) => any,
  getState: () => any,
  extraArguments: any,
) => Output & { type: string };

export function createSmartAction<Output = {}, Input extends any[] = any>(
  action?: (...params: Input) => Output,
): (...params: Input) => Output & { type: string };

export function createSmartThunk<Output = {}, Input extends any[] = any>(
  thunk: (
    ...params: Input
  ) => (
    dispatch: (action: any) => any,
    getState: () => any,
    extraArguments: any,
  ) => Output,
): (
  ...params: Input
) => (
  dispatch: (action: any) => any,
  getState: () => any,
  extraArguments: any,
) => Output & { type: string };

export function joinTypes(...types: string[]): string;

interface Handlers<S> {
  [type: string]: (state: S, action: AnyAction) => S;
}

export function createReducer<S = any>(
  handlers: Handlers<S>,
  defaultState: S,
): Reducer<S>;
