import fs from "fs-extra";
import del from "del";
import gulp from "gulp";
import { watch as gulpWatch } from "gulp";
import { EventEmitter } from 'events';
import { scripts } from "./webpack";
import { server, serverReload } from "./server";
import { gulpSass } from "./sass";
import { nunjucks as nunjucksRender } from "./nunjucks";
import { gulpCss } from "./css";
import { gulpImages } from "./images";
import { siteMap } from "./siteMap";
import { mockupViewer } from './mockupViewer';
import { redirects } from './redirects';
import { gulpWebpDev } from './webpDev';
import { gulpWebpProd } from './webpProd';

import { config, configHelper } from '../config.js';

const distFolder = `.${ configHelper.buildPath() }`;

const createTmpFolders = () => {
   const tmpFolder = `.${ configHelper.tmpPath() }`;

   del.sync(tmpFolder, {
      force: true
   });

   if (!fs.existsSync(tmpFolder)) {
      fs.mkdirSync(tmpFolder);
   }

   [
      `${ config.folders.images.src }`
   ].forEach(path => fs.mkdirSync(tmpFolder + path));
};


/*
   Local dev watch function
*/
function watch() {
   const eventListener = new EventEmitter();

   del.sync(distFolder, {
      force: true
   });

   if (!fs.existsSync(distFolder)) {
      fs.mkdirSync(distFolder);
   }

   if (config.opts.webp) {
       createTmpFolders();

       const webpSrcFiles = [
          `${ configHelper.srcImagesPath(true) }/**/*.jpg`,
          `${ configHelper.srcImagesPath(true) }/**/*.jpeg`,
          `${ configHelper.srcImagesPath(true) }/**/*.png`,
       ];

       gulpWebpDev(webpSrcFiles);

       const imgWatcher = gulpWatch(webpSrcFiles);

       imgWatcher.on('add', (path, stats) => {
          gulpWebpDev([path]);
       });

       imgWatcher.on('change', (path, stats) => {
           gulpWebpDev([path]);
       });
   }

   scripts();
   gulpSass();
   gulpCss();
   nunjucksRender();
   server();

   gulp.watch(`${ configHelper.srcJsPath(true) }/**/*`).on('change', () => {
      scripts().then(() => serverReload());
   });

   gulp.watch(`${ configHelper.srcStylesPath(true) }/**/*.scss`).on("change", () => {
      Promise.resolve(gulpSass()).then(() => serverReload());
   });

   gulp.watch(`${ configHelper.srcStylesPath(true) }/**/*.css`).on("change", () => {
      Promise.resolve(gulpCss()).then(() => serverReload());
   });

   gulp.watch(`${ configHelper.srcHtmlPath(true) }/**/*`).on("change", () => {
      Promise.resolve(nunjucksRender()).then(() => serverReload());
   });
}

export const dev = gulp.series(watch);

/*
   Production build function
*/
export function build() {
   return new Promise(resolve => {
      const eventListener = new EventEmitter();

      scripts();
      gulpSass();
      gulpCss();

      nunjucksRender()
      .on('end', function(err) {
         eventListener.emit('nunjucks complete');
      });

      eventListener.on('nunjucks complete', () => {
         gulpImages()
         .on('end', function(err) {

            if (config.opts.webp) {
               console.log('starting webp');
               gulpWebpProd()
               .on('end', function(err) {
                  console.log('webp done');
                  eventListener.emit('images complete');
               });
            }
            else {
               eventListener.emit('images complete');
            }
         });
      });

      eventListener.on('images complete', () => {
         fs.copySync(`.${ configHelper.srcStaticPath() }`, distFolder);

         eventListener.emit('static complete');

         if (config.opts.siteMap) {
            setTimeout(() => {
               siteMap()
               .on('end', function(err) {
                  eventListener.emit('sitemap complete');
                  redirects();
               });
            }, 1000);
         }
         else {
            redirects();
         }

         mockupViewer();
      });

      resolve();
   });
}

export default dev;
