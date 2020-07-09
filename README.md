# redux-smart-actions

[![npm version](https://badge.fury.io/js/redux-smart-actions.svg)](https://badge.fury.io/js/redux-smart-actions)
[![gzip size](http://img.badgesize.io/https://unpkg.com/redux-smart-actions/dist/redux-smart-actions.min.js?compression=gzip)](https://unpkg.com/redux-smart-actions)
[![Build Status](https://travis-ci.org/klis87/redux-smart-actions.svg?branch=master)](https://travis-ci.org/klis87/redux-smart-actions)
[![Coverage Status](https://coveralls.io/repos/github/klis87/redux-smart-actions/badge.svg?branch=master)](https://coveralls.io/github/klis87/redux-smart-actions?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/klis87/redux-smart-actions/badge.svg)](https://snyk.io/test/github/klis87/redux-smart-actions)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Redux addon to create actions and thunks with minimum boilerplate

## Motivation

Why yet another Redux action creation library? Because:
- writing Redux actions without any addon requires writing constants which is very verbose and error-prone
- other addons often force conventions about action structure
- other addons still require to pass strings as first argument to define action type - here you won't have to with optional Babel plugin
- some addons solve problem with unique types aucomatically, but then they are not determenistic (TODO)
- this library also provides thunks creators - you can create thunk like normal action and also forget about types

## Installation

To install the package, just run:
```bash
$ npm install redux-smart-actions
```
or you can just use CDN: `https://unpkg.com/redux-smart-actions`.

## Usage

### `createAction`

Let's say you have an action written without any addon:
```js
const doSth = () => ({ type: 'DO_STH' });
```

With `createAction`, you could convert it like that:
```js
import { createAction } from 'redux-smart-actions';

const doSth = createAction('DO_STH');
```

This looks similar, but there is one big benefit - `doSth.toString() === 'DO_STH'`,
so `doSth` can be used as action creator like normally, but also in reducers or any other places
where you need action types.

What about actions with arguments like that?
```js
const doSth = x => ({ type: 'DO_STH', x });
```

Easy, just use 2nd argument:
```js
const doSth = createAction('DO_STH', x => ({ x }));
```

Basically 2nd argument is an action creator, you write it like usually, just you don't
need to worry about `type`.

### `createThunk`

If you happen to use `redux-thunk`, you might like using `createThunk` from this library.
Often you need to use thunks which looks very similar to normal actions, but they need to
dispatch an extra action or need an access to Redux state directly (which is often more convenient
than passing as param to action).

But what about constants? This is the main benefit of `create-thunk`. Imagine a thunk like that:
```js
const doSth = () => (dispatch, getState) => {
  const state = getState();
  dispatch({ type: 'EXTRA_ACTION' });
  return dispatch({ type: 'DO_STH', x: state.x });
}
```

As you can see, again, what about constants? It would be nice if we could forget
about them:
```js
import { createAction, createThunk } from 'redux-smart-actions';

const extraAction = createAction('EXTRA_ACTION');

const doSth = createThunk('DO_STH', () => (dispatch, getState) => {
  const state = getState();
  dispatch(extraAction());
  return { x: state.x };
})
```

So what changed? `doSth.toString() === 'DO_STH'`, so you can use `doSth` in reducers directly,
like constants didn't even exist. Also notice that we do not dispatch `{ x: state.x }` action,
we return it, `createThunk` will add `type` for us and dispatch it automatically.

## Babel plugin

This plugin it totally optional, but very recommended. With just no work you will be able
to omit first arguments (action types) for both `createAction` and `createThunk` -
they will be taken from action name automatically!

To install it, just run:
```bash
npm install --save-dev babel-plugin-redux-smart-action
```

and add it to babel plugins, for example in `.babelrc`:
```json
{
  "plugins": [
    "redux-smart-actions"
  ]
}
```

Then, you could use new functions from this library.

### `createSmartAction`

```js
import { createSmartAction } from 'redux-smart-actions';

const doSth = createSmartAction();

const doSthElse = createSmartAction(x => ({ x }));
```

which would be the same as:
```js
import { createAction } from 'redux-smart-actions';

const doSth = createAction('doSth');

const doSthElse = createAction('doSthElse', x => ({ x }));
```

which saves you any need to pass action type strings manually.

### `createSmartThunk`

The cousin of `createSmartAction`, the usage is the same, just use `createSmartThunk`
instead of `createThunk` and omit the first string argument - it will be again
interpolated from variable name you attach thunk to.

## Licence

MIT
