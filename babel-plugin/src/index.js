const { declare } = require('@babel/helper-plugin-utils');
const { types: t } = require('@babel/core');

module.exports = declare(api => {
  api.assertVersion(7);

  return {
    visitor: {
      ImportSpecifier(path) {
        if (path.node.imported.name === 'createSmartAction') {
          path.node.imported.name = 'createAction';
          path.node.local.name = 'createAction';
        } else if (path.node.imported.name === 'createSmartThunk') {
          path.node.imported.name = 'createThunk';
          path.node.local.name = 'createThunk';
        }
      },
      VariableDeclarator(path) {
        if (
          path.node.init &&
          path.node.init.callee &&
          path.node.init.callee.name === 'createSmartAction'
        ) {
          path.node.init.callee.name = 'createAction';
          path.node.init.arguments = [
            t.stringLiteral(path.node.id.name),
            ...path.node.init.arguments,
          ];
        } else if (
          path.node.init &&
          path.node.init.callee &&
          path.node.init.callee.name === 'createSmartThunk'
        ) {
          path.node.init.callee.name = 'createThunk';
          path.node.init.arguments = [
            t.stringLiteral(path.node.id.name),
            ...path.node.init.arguments,
          ];
        }
      },
    },
  };
});
