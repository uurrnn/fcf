import fs from 'fs';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import debug from 'gulp-debug';
import cssnano from 'cssnano';
import colors from 'colors/safe';
import postcss from 'gulp-postcss';
import postcssImport from 'postcss-import';
import tailwindCss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import postcssPresetEnv from 'postcss-preset-env';
import sourcemaps from 'gulp-sourcemaps';
import beautifyCode from 'gulp-beautify-code';
import gcmq from 'gulp-group-css-media-queries';
import { config, configHelper } from '../config.js';

/* Get browserlist array in package.json file */
const packageData = JSON.parse(fs.readFileSync('package.json'));
const browserslist = packageData.hasOwnProperty('browserslist') ? packageData.browserslist : [];

const devMode = process.env.NODE_ENV !== 'production';

const distFolder = `${ configHelper.buildStylesPath(true) }`;

const srcFolders = [
   `${ configHelper.srcStylesPath(true) }/**/*.css`,
   `!*${ configHelper.srcStylesPath(true) }/**/_*.css`,
];

/*
   post css plugins:

   postcss-import: allows you to import local and node_module css files into your
   main bundle to modularize your css into smaller chunks

   postcss-preset-env: options on how to transpile css.
      stage: 0 is the most experimental, but naturally you do not have to use any stage 0 features...

      features: You can eanble or disable features here.
      nesting-rules allow you to nest properties such as is common in Sass.
      custom-media-queries allow you write some simpler media query experssions.
      Check out the documentation for full list.

      preserve: Boolean to instruct all plugins to omit pre-polyfilled CSS

   https://github.com/csstools/postcss-preset-env
   https://preset-env.cssdb.org/

   cssnano: Minifies, autoprefixes, combines media queries, etc.
   https://cssnano.co/
*/
const postCssPlugins = [
   postcssImport(),
   tailwindCss(),
   autoprefixer(),
   postcssPresetEnv({
      stage: 0,
      features: {
         'custom-media-queries': true,
         'custom-properties': true,
         'custom-selectors': true,
         'media-query-ranges': true,
         'nesting-rules': true,
      },
      browsers: browserslist,
      preserve: false
   }),
   cssnano({
      autoprefixer: {
         browsers: browserslist,
         add: true,
      },
      discardComments: {
         removeAll: true
      },
   })
];

export function gulpCss() {
   return gulp.src(srcFolders)
   .pipe(sourcemaps.init())
   .pipe(gcmq())
   .pipe(postcss(postCssPlugins))
   .on('error', function(err) {
      console.log(colors.red(err.toString()));
      this.emit('end');
   })
   .pipe(gulpIf(devMode, sourcemaps.write('.')))
   .on('error', function(err) {
      console.log(colors.red(err.toString()));
      this.emit('end');
   })
   .pipe(gulpIf(devMode, beautifyCode({
      indent_size: 4,
      indent_char: ' '
    })))
	.pipe(gulp.dest(distFolder));
}
