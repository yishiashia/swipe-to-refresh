import eslint from '@rollup/plugin-eslint'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { babel } from '@rollup/plugin-babel'
import replace from '@rollup/plugin-replace'
import typescript from '@rollup/plugin-typescript'
import scss from 'rollup-plugin-scss'
import postcss from 'postcss'
import { terser } from "rollup-plugin-terser"

import autoprefixer from 'autoprefixer'
import postcssNested from 'postcss-nested'
import postcssImportUrl from 'postcss-import-url'

const plugins = [
  typescript(),
  eslint({
    fix: false,
    throwOnError: true,
    throwOnWarning: true,
    include: ['src/**'],
    exclude: ['node_modules/**', './src/scss/**', './src/css/**', './src/*.scss']
  }),
  scss({
    processor: () => postcss([
      postcssImportUrl({resolveUrls: true}),
      autoprefixer(),
      postcssNested()
    ]),
    output: false,
    outputStyle: "compressed"
  }),
  replace({
    preventAssignment: true,
    delimiters: ['{{', '}}'],
    DEVELOPMENT: process.env.NODE_ENV
  }),
  nodeResolve({
    preferBuiltins: false,
    extensions: ['.ts', '.js']
  }),
  commonjs(),
  babel({
    babelHelpers: 'runtime',
    extensions: ['.ts', '.js'],
    exclude: [
      /\/core-js\//
    ]
  }),
  // terser(),
]

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/swipe-refresh.js',
      format: 'umd',
      name: 'swipeToRefresh',
      inlineDynamicImports: true
    },
    plugins: plugins
  }
]