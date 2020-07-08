import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import { uglify } from "rollup-plugin-uglify";

export default {
  input: 'src/js/spider.js',
  output: {
    file: 'dist/js/spider.js',
    format: 'umd',
    name: 'Spider'
  },
  plugins: [
    resolve(),
    babel({ babelHelpers: 'bundled' }),
    uglify()
  ]
};
