import Browser from 'browser-sync';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import { webpackConfig } from './webpack';
import { config, configHelper } from '../config.js';

const browser = Browser.create();
const bundler = webpack(webpackConfig);

/*
   For Localhost Server Options,
   visit: https://www.browsersync.io/docs/options
*/

let staticOpts = [
   `.${ configHelper.buildPath() }`,
   `.${ configHelper.srcStaticPath() }`,
   {
      dir: `.${ configHelper.srcImagesPath() }`,
      route: `${ config.folders.images.build }`,
   },
];

if (config.opts.webp) {
   staticOpts.push({
      dir: `.${ config.paths.tmp }${ config.folders.images.src }`,
      route: `${ config.folders.images.build }`,
   });
}

export function server() {
   const serverConfig = {
      ui: {
         port: config.settings.server.port
      },
      serveStatic: staticOpts,
      middleware: [
         //webpackDevMiddleware(bundler, { /* options */ }),
         //webpackHotMiddleware(bundler),
      ],
   };

   browser.init(serverConfig);
}

export function serverReload() {
   browser.reload();
}
