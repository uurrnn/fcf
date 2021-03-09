import del from 'del';
import path from 'path';
import fs from 'fs';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import nunjucksRender from 'gulp-nunjucks-render';
import htmlmin from 'gulp-htmlmin';
import data from 'gulp-data';
import debug from 'gulp-debug';
import colors from 'colors/safe';
import beautifyCode from 'gulp-beautify-code';
import inlinesource from 'gulp-inline-source';
import posthtml from 'gulp-posthtml';
import phObfuscate from './posthtmlObfuscate';

import { getSiteData } from './util/siteData';
import { config, configHelper } from '../config.js';

const distFolder = `.${ configHelper.buildPath() }`;

const htmlSrc = configHelper.srcHtmlPath(true);

const srcFiles = [
   `${ htmlSrc }/**/*`,
   `!${ htmlSrc }/_*/`,
   `!${ htmlSrc }_*/**/`,
];

const devMode = process.env.NODE_ENV !== 'production';

const siteData = getSiteData();

export function nunjucks() {
   return gulp.src(srcFiles)
   //.pipe(debug())
   .pipe(data(function(file) {
      let obj = Object.assign({}, siteData);

      const filePath = file.relative.replace(/\\/g, "/")
                       .replace(htmlSrc, '')
                       .replace('index.njk', '')
                       .replace('.njk', '.html');

      obj.canonical = `${ obj.domain }/${ filePath }`;

      return obj;
   }))
   .on('error', function(err) {
      console.log(colors.red(err.toString()));

      if (!devMode) {
         this.emit('end');
      }
   })
   .pipe(nunjucksRender({
      path: [
         `${ htmlSrc }/`,
      ]
   }))
   .on('error', function(err) {
      console.log(colors.red(err.toString()));

      if (!devMode) {
         this.emit('end');
      }
   })
   .pipe(inlinesource({
      compress: false,
      rootpath: path.resolve(configHelper.srcPath(true)),
   }))
   .on('error', function(err) {
      console.log(colors.red(err.toString()));
      this.emit('end');
   })
   .pipe(posthtml([
      phObfuscate({
         includeMailto: true
      })
   ]))
   .pipe(gulpIf(devMode === false, htmlmin({
      collapseWhitespace: true,
   })))
   .pipe(gulpIf(devMode, beautifyCode({
      indent_size: 4,
      indent_char: ' ',
      unformatted: ['code', 'pre']
    })))
   .on('error', function(err) {
      console.log(colors.red(err.toString()));

      if (!devMode) {
         this.emit('end');
      }
   })
   /* Output html files */
  .pipe(gulp.dest(distFolder))
   /* Delete empty nunjucks-related folders in public folder */
   .on('end', function() {
      configHelper.htmlDevFolders().forEach(folder => {
         const f = `.${ folder }`;
         if (fs.existsSync(f)) {
            del(f, {
               force: true
            });
         }
      });
   });
}
