import gulp from 'gulp';
import webp from 'gulp-webp';

import { config, configHelper } from '../config.js';

const publicImageFolder = configHelper.buildImagesPath(true);

const srcFiles = [
   `${ publicImageFolder }/**/*.jpg`,
   `${ publicImageFolder }/**/*.jpeg`,
   `${ publicImageFolder }/**/*.png`,
];

export function gulpWebpProd() {
   return gulp.src(srcFiles)
   .pipe(webp({
      quality: 80
   }))
	.pipe(gulp.dest(publicImageFolder));
}
