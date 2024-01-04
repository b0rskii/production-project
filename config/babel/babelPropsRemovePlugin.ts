import { PluginItem } from '@babel/core';

export default (): PluginItem => ({
  visitor: {
    Program(path, state) {
      const propsToRemove = state.opts.propsToRemove ?? [];

      path.traverse({
        JSXIdentifier(current) {
          const nodeName = current.node.name;

          if (propsToRemove.includes(nodeName)) {
            current.parentPath.remove();
          }
        },
      });
    },
  },
});
