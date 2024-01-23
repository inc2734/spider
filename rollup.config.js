import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';

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
    terser()
  ]
};
