import { createAction, createThunk } from '.';

const doSth = createAction('DO_STH');
const doSthAction = doSth();
doSthAction.type === 'DO_STH';

const doSthElse = createAction('DO_STH_ELSE', (x: number, y: string) => ({
  x,
  y,
}));
const doSthElseAction = doSthElse(1, 'a');
doSthElseAction.type === 'DO_STH_ELSE';
doSthElseAction.x === 1;
doSthElseAction.y === 'a';

const doSthWithExtraDispatch = createThunk(
  'DO_STH_WITH_EXTRA_DISPATCH',
  (x: number) => dispatch => {
    dispatch({ type: 'EXTRA' });
    return { x };
  },
);

const doSthWithExtraDispatchThunk = doSthWithExtraDispatch(1);
