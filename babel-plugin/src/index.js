const { declare } = require('@babel/helper-plugin-utils');
const { types: t } = require('@babel/core');
const { snakeCase } = require('lodash');

const maybeChangeImportName = (path, from, to) => {
  if (path.node.imported.name === from) {
    path.node.imported.name = to;
    path.node.local.name = to;
  }
};

const removeExtension = filePath => {
  const list = filePath.split('.');
  return list.slice(0, list.length - 1).join('.');
};

const transformFilePath = (state, basePath) => {
  if (!basePath) {
    return `${removeExtension(state.file.opts.filename)}/`;
  }

  return `${removeExtension(state.file.opts.filename.split(basePath)[1])}/`;
};

const maybeTransformType = (type, transformTypes) => {
  if (!transformTypes) {
    return type;
  }

  return type
    .split('/')
    .map(v => snakeCase(v).toUpperCase())
    .join('/');
};

const maybeTransformSmartAction = (
  path,
  state,
  basePath,
  transformTypes,
  prefixTypes,
  from,
  to,
) => {
  if (
    path.node.init &&
    path.node.init.callee &&
    path.node.init.callee.name === from
  ) {
    path.node.init.callee.name = to;
    path.node.init.arguments = [
      t.stringLiteral(
        maybeTransformType(
          `${prefixTypes ? transformFilePath(state, basePath) : ''}${
            path.node.id.name
          }`,
          transformTypes,
        ),
      ),
      ...path.node.init.arguments,
    ];
  }
};

module.exports = declare(
  (api, { basePath = null, transformTypes = true, prefixTypes = false }) => {
    api.assertVersion(7);

    return {
      visitor: {
        ImportSpecifier(path) {
          maybeChangeImportName(path, 'createSmartAction', 'createAction');
          maybeChangeImportName(path, 'createSmartThunk', 'createThunk');
        },
        VariableDeclarator(path, state) {
          maybeTransformSmartAction(
            path,
            state,
            basePath,
            transformTypes,
            prefixTypes,
            'createSmartAction',
            'createAction',
          );
          maybeTransformSmartAction(
            path,
            state,
            basePath,
            transformTypes,
            prefixTypes,
            'createSmartThunk',
            'createThunk',
          );
        },
      },
    };
  },
);
