import fs from 'fs';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import debug from 'gulp-debug';
import cssnano from 'gulp-cssnano';
import sass from 'gulp-sass';
import colors from 'colors/safe';
import sourcemaps from 'gulp-sourcemaps';
import beautifyCode from 'gulp-beautify-code';
import gcmq from 'gulp-group-css-media-queries';
import { config, configHelper } from '../config.js';

const devMode = process.env.NODE_ENV !== 'production';

const distFolder = `${ configHelper.buildStylesPath(true) }`;

const srcFolders = [
   `${ configHelper.srcStylesPath(true) }/**/*.scss`,
];

const packageData = JSON.parse(fs.readFileSync('package.json'));
const browserslist = packageData.hasOwnProperty('browserslist') ? packageData.browserslist : [];

export function gulpSass() {
   return gulp.src(srcFolders)
   .pipe(sourcemaps.init())
	.pipe(sass({
		outputStyle: 'nested',
		includePaths: [
			'./node_modules'
		]
	}))
	.on('error', function(err){
		console.warn(colors.red(err));
		this.emit('end');
	})
   .pipe(gcmq())
	.pipe(cssnano({
		autoprefixer: {
			browsers: browserslist,
			add: true
		}
	}))
   .on('error', function(err) {
      console.log(colors.red(err.toString()));
      this.emit('end');
   })
   .pipe(gulpIf(devMode, sourcemaps.write('.')))
   .pipe(gulpIf(devMode, beautifyCode({
      indent_size: 4,
      indent_char: ' '
    })))
	.pipe(gulp.dest(distFolder));
}
