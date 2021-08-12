// rollup.config.js
import path from 'path';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import babel from '@rollup/plugin-babel';
import postCss from 'rollup-plugin-postcss';
import depsExternal from 'rollup-plugin-peer-deps-external';
import ttypescript from 'ttypescript';
import typescript from 'rollup-plugin-typescript2';
import glob from 'glob';
import { terser } from 'rollup-plugin-terser';

// import terser from ''

// import scss from 'rollup-plugin-scss'
// import dartSass from 'dart-sass'

// Get browserslist config and remove ie from es build targets
// const esbrowserslist = fs.readFileSync('./.browserslistrc')
//   .toString()
//   .split('\n')
//   .filter((entry) => entry && entry.substring(0, 2) !== 'ie');

// Extract babel preset-env config, to combine with esbrowserslist
// const babelPresetEnvConfig = require('../babel.config')
//   .presets.filter((entry) => entry[0] === '@babel/preset-env')[0][1];

// const argv = minimist(process.argv.slice(2));

const projectRoot = path.resolve(__dirname, '..');
const resolvePath = file => path.resolve(projectRoot, file);
const projectPaths = glob.sync(resolvePath('src/**'))
  .filter(file => (`${projectRoot}/src` !== file) && !file.match(/\./));

const directories = projectPaths.map(file => {
  const items = file.split('/');
  return items[items.length - 1];
})

const baseConfig = {
  plugins: {
    replace: {
      'process.env.NODE_ENV': JSON.stringify('production'),
      preventAssignment: true,
    },
    preEntry: [
      depsExternal(),
      postCss({
        plugins: [],
        minimize: true
      }),
      // resolve({
      //   extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
      // }),
      // commonjs(),
      // terser()
    ],
    babel: {
      exclude: 'node_modules/**',
      presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-typescript',
      ],
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
      babelHelpers: 'bundled',
    },
  },
};

// ESM/UMD/IIFE shared settings: externals
// Refer to https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency
const external = [
  // list external dependencies, exactly the way it is written in the import statement.
  // eg. 'jquery'
  'react',
  'rxjs',
  '@material-lite/angular',
  '@material-lite/angular-cdk'
];

const input = {}
directories.forEach(name => input[name] = `src/${name}/index.ts`);


// Customize configs for individual targets
const settings = (format) => ({
  ...baseConfig,
  external,
  input,
  output: {
    dir: `dist/${format}/`,
    format,
    name: 'named',
    sourcemap: true
  },
  plugins: [
    replace(baseConfig.plugins.replace),
    ...baseConfig.plugins.preEntry,
    // Only use typescript for declarations - babel will
    // do actual js transformations
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
    }),
    // terser(),

    typescript({
      typescript: ttypescript,
      useTsconfigDeclarationDir: true,
      emitDeclarationOnly: true,
    }),

    commonjs(),

    babel(baseConfig.plugins.babel),

  ]
})

// const buildFormats = [];
// const esConfig = {
//   ...baseConfig,
//   input: 'src/entry.esm.ts',
//   external,
//   output: {
//     file: 'dist/material-lite-vue3.esm.js',
//     format: 'esm',
//     exports: 'named',
//   },
//   plugins: [
//     replace(baseConfig.plugins.replace),
//     ...baseConfig.plugins.preVue,
//     vue(baseConfig.plugins.vue),
//     ...baseConfig.plugins.postVue,
//     // Only use typescript for declarations - babel will
//     // do actual js transformations
//     typescript({
//       typescript: ttypescript,
//       useTsconfigDeclarationDir: true,
//       emitDeclarationOnly: true,
//     }),
//     babel({
//       ...baseConfig.plugins.babel,
//       presets: [
//         [
//           '@babel/preset-env',
//           {
//             ...babelPresetEnvConfig,
//             targets: esbrowserslist,
//           },
//         ],
//       ],
//     }),
//   ],
// };
// buildFormats.push(esConfig);

// if (!argv.format || argv.format === 'cjs') {
//   const umdConfig = {
//     ...baseConfig,
//     external,
//     output: {
//       compact: true,
//       file: 'dist/material-lite-vue3.ssr.js',
//       format: 'cjs',
//       name: 'MaterialLiteVue3',
//       exports: 'auto',
//       globals,
//     },
//     plugins: [
//       replace(baseConfig.plugins.replace),
//       ...baseConfig.plugins.preVue,
//       vue(baseConfig.plugins.vue),
//       ...baseConfig.plugins.postVue,
//       babel(baseConfig.plugins.babel),
//     ],
//   };
//   buildFormats.push(umdConfig);
// }

// if (!argv.format || argv.format === 'iife') {
//   const unpkgConfig = {
//     ...baseConfig,
//     external,
//     output: {
//       compact: true,
//       file: 'dist/material-lite-vue3.min.js',
//       format: 'iife',
//       name: 'MaterialLiteVue3',
//       exports: 'auto',
//       globals,
//     },
//     plugins: [
//       replace(baseConfig.plugins.replace),
//       ...baseConfig.plugins.preVue,
//       vue(baseConfig.plugins.vue),
//       ...baseConfig.plugins.postVue,
//       babel(baseConfig.plugins.babel),
//       terser({
//         output: {
//           ecma: 5,
//         },
//       }),
//     ],
//   };
//   buildFormats.push(unpkgConfig);
// }

// Export config
// export default buildFormats;
export default [
  {
    ...baseConfig,
    external,
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js'
    },
    plugins: [
      replace(baseConfig.plugins.replace),
      ...baseConfig.plugins.preEntry,
      // Only use typescript for declarations - babel will
      // do actual js transformations
      typescript({
        typescript: ttypescript,
        emitDeclarationOnly: true,
      }),
      babel(baseConfig.plugins.babel),
    ]
  },
  ...['cjs', 'esm'].map(format => settings(format)),
];
