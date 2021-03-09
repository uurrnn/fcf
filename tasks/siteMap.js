import fs from 'fs';
import gulp from 'gulp';
import sitemap from 'gulp-sitemap';
import debug from 'gulp-debug';
import colors from 'colors/safe';
import filter from 'gulp-filter';

import { redirectPaths } from './redirects';
import { getSiteData } from './util/siteData';
import { config, configHelper } from '../config.js';

const siteData = getSiteData();

const distFolder = configHelper.buildPath(true);

const filterFiles = [
   '**',
   `!*${ distFolder }/fonts/**/*.html`,
   `!*${ distFolder }/assets/**/*.html`,
   `!*${ distFolder }/development/**/*.html`,
   `!*${ distFolder }/error.html`,
   `!*${ distFolder }/page-0.html`,
];

const ignoreFiles = redirectPaths.map(arr => `!*${ distFolder }/${ arr[0] }`);

const fileFilter = filter(filterFiles.concat(ignoreFiles), {
   restore: false
});

let srcFiles = [
   `${ distFolder }/**/*.html`,
];

configHelper.htmlDevFolders().forEach(folder => {
   srcFiles.push(`!${ folder }/**/*.html`);
});

export function siteMap() {
   return gulp.src(srcFiles, {
      read: false,
   })
   .pipe(fileFilter)
	.pipe(sitemap({
		siteUrl: siteData.domain,
      changefreq: 'weekly',
      priority: 0.5
	}))
	.on('error', function(err){
		console.warn(colors.red(err));
		this.emit('end');
	})
	.pipe(gulp.dest(distFolder));
}
