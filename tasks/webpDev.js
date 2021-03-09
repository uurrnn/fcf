import gulp from 'gulp';
import webp from 'gulp-webp';
import colors from 'colors/safe';
import { config, configHelper } from '../config.js';

const tmpImgFolder = `${ configHelper.tmpPath(true)}${ config.folders.images.src }`;

export function gulpWebpDev(src = []) {
   return gulp.src(src)
   .pipe(webp({
      quality: 80
   }))
   .on('error', err => {
      console.log(colors.red(err.toString()));
   })
	.pipe(gulp.dest(tmpImgFolder))
   .on('error', err => {
      console.log(colors.red(err.toString()));
   });
}
