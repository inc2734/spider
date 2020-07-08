import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import { uglify } from "rollup-plugin-uglify";

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
    uglify()
  ]
};
