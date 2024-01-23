import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';

export default {
  input: 'docs/src/js/app.js',
  output: {
    file: 'docs/dist/js/app.js',
    format: 'iife',
    name: 'Spider'
  },
  plugins: [
    resolve(),
    babel({ babelHelpers: 'bundled' }),
    terser()
  ]
};
