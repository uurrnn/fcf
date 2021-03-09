import fs from 'fs';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import debug from 'gulp-debug';
import colors from 'colors/safe';
import imagemin from 'gulp-imagemin';

import { config, configHelper } from '../config.js';

const srcFolders = [
   `${ configHelper.srcImagesPath(true) }/**/*`,
];

const distFolder = `${ configHelper.buildImagesPath(true) }`;

export function gulpImages() {
   return gulp.src(srcFolders)
   .pipe(imagemin([
      imagemin.mozjpeg({
         quality: 80,
         progressive: true
      }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
       plugins: [
			{ removeViewBox: true },
			{ cleanupIDs: false }
	    ]
	  })
   ]))
   .on('error', function(err) {
      console.log(colors.red(err.toString()));
      this.emit('end');
   })
	.pipe(gulp.dest(distFolder));
}
