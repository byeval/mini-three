import { defineConfig } from 'vite';
import replace from '@rollup/plugin-replace';
import { readFileSync } from 'fs';
import { createRequire } from 'module';

function resolveThreeModule() {
  const require = createRequire(import.meta.url);
  const threePath = require.resolve('three');
  const code = readFileSync(threePath).toString();
  return code;
}

export default defineConfig(async ({}) => {
  const THREE_SOURCE = resolveThreeModule();
  return {
    build: {
      lib: {
        entry: 'src/index.js',
        name: 'MyLib',
        formats: ['es', 'cjs', 'umd'],
        fileName: (format) => `mini3.${format}.js`,
      },
    },
    output: {
      dir: 'dist',
    },
    plugins: [
      replace({
        preventAssignment: true,
        values: {
          __INJECT_THREE__: THREE_SOURCE,
        },
      }),
    ],
  };
});
