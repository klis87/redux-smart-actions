const { transformSync } = require('@babel/core');

const plugin = require('./index');

describe('babel-plugin-redux-smart-action', () => {
  it('transforms smart imports', () => {
    const code = `import { createSmartAction, createSmartThunk } from 'redux-smart-actions';`;

    const output = transformSync(code, {
      plugins: [plugin],
      filename: '/stores/actions.js',
    });

    expect(output.code).toMatchInlineSnapshot(
      `"import { createAction, createThunk } from 'redux-smart-actions';"`,
    );
  });

  it('transforms smart actions', () => {
    const code = `const doSth = createSmartAction();
    const doSthElse = createSmartAction(x => ({ x }));
    const doThunk = createSmartThunk((dispatch, getState) => x => ({ x }));`;

    const output = transformSync(code, {
      plugins: [plugin],
    });

    expect(output.code).toMatchInlineSnapshot(`
      "const doSth = createAction(\\"DO_STH\\");
      const doSthElse = createAction(\\"DO_STH_ELSE\\", x => ({
        x
      }));
      const doThunk = createThunk(\\"DO_THUNK\\", (dispatch, getState) => x => ({
        x
      }));"
    `);
  });

  it('can transform smart actions without transforming type', () => {
    const code = `const doSth = createSmartAction(x => ({ x }));
    const doThunk = createSmartThunk((dispatch, getState) => x => ({ x }));`;

    const output = transformSync(code, {
      plugins: [[plugin, { transformTypes: false }]],
    });

    expect(output.code).toMatchInlineSnapshot(`
      "const doSth = createAction(\\"doSth\\", x => ({
        x
      }));
      const doThunk = createThunk(\\"doThunk\\", (dispatch, getState) => x => ({
        x
      }));"
    `);
  });

  it('can transform smart actions with file prefixes', () => {
    const code = `const doSth = createSmartAction(x => ({ x }));
    const doThunk = createSmartThunk((dispatch, getState) => x => ({ x }));`;

    const output = transformSync(code, {
      plugins: [[plugin, { prefixTypes: true }]],
      filename: '/stores/actions.js',
    });

    expect(output.code).toMatchInlineSnapshot(`
      "const doSth = createAction(\\"/STORES/ACTIONS/DO_STH\\", x => ({
        x
      }));
      const doThunk = createThunk(\\"/STORES/ACTIONS/DO_THUNK\\", (dispatch, getState) => x => ({
        x
      }));"
    `);
  });

  it('can transform smart actions with file prefixes but without base path', () => {
    const code = `const doSth = createSmartAction(x => ({ x }));
    const doThunk = createSmartThunk((dispatch, getState) => x => ({ x }));`;

    const output = transformSync(code, {
      plugins: [[plugin, { prefixTypes: true, basePath: '/stores/' }]],
      filename: '/stores/actions.js',
    });

    expect(output.code).toMatchInlineSnapshot(`
      "const doSth = createAction(\\"ACTIONS/DO_STH\\", x => ({
        x
      }));
      const doThunk = createThunk(\\"ACTIONS/DO_THUNK\\", (dispatch, getState) => x => ({
        x
      }));"
    `);
  });

  it('can transform smart actions with file prefixes but without base path and without uppercase', () => {
    const code = `const doSth = createSmartAction(x => ({ x }));
    const doThunk = createSmartThunk((dispatch, getState) => x => ({ x }));`;

    const output = transformSync(code, {
      plugins: [
        [
          plugin,
          { transformTypes: false, prefixTypes: true, basePath: '/stores/' },
        ],
      ],
      filename: '/stores/actions.js',
    });

    expect(output.code).toMatchInlineSnapshot(`
      "const doSth = createAction(\\"actions/doSth\\", x => ({
        x
      }));
      const doThunk = createThunk(\\"actions/doThunk\\", (dispatch, getState) => x => ({
        x
      }));"
    `);
  });
});
