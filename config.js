export const config = {
   paths: {
      src: '/src',
      build: '/public',
      tmp: '/tmp'
   },
   folders: {
      html: {
         src: '/html',
         build: '/',
         data: '_data',
         devFolders: [
            '_data', '_components', '_layouts',
            '_macros', '_partials',
         ],
      },
      js: {
         src: '/js',
         build: '/js',
      },
      styles: {
         src: '/styles',
         build: '/css',
      },
      images: {
         src: '/images',
         build: '/images'
      },
      static: {
         src: '/static',
         build: '/',
      }
   },
   settings: {
      server: {
         port: 3000,
      }
   },
   opts: {
      siteMap: true,
      webp: false,
   }
};

const formatSrc = (src, removeFirstSlash = false) => {
   let s = src;

   if (removeFirstSlash) {
      s = s.split('').filter((char, i) => {
         return (i === 0 && char === '/') ? 0 : 1;
      }).join('');
   }

   return s.replace(/\/\//g, '/');
};

export const configHelper = {
   srcPath: (removeFirstSlash = false) => formatSrc(config.paths.src, removeFirstSlash),
   buildPath: (removeFirstSlash = false) => formatSrc(config.paths.build, removeFirstSlash),
   tmpPath: (removeFirstSlash = false) => formatSrc(config.paths.tmp, removeFirstSlash),

   srcHtmlPath: (removeFirstSlash = false) => {
      const src = `${ config.paths.src }${ config.folders.html.src }`;
      return formatSrc(src, removeFirstSlash);
   },
   htmlDevFolders: (removeFirstSlash = false) => {
      const folders = config.folders.html.devFolders.map(folder => {
         let s = `${ config.paths.build }/${ folder }`;
         return formatSrc(s, removeFirstSlash);
      });

      return folders;
   },

   srcJsPath: (removeFirstSlash = false) => {
      const src = `${ config.paths.src }${ config.folders.js.src }`;
      return formatSrc(src, removeFirstSlash);
   },
   buildJsPath: (removeFirstSlash = false) => {
      const src = `${ config.paths.build }${ config.folders.js.build }`;
      return formatSrc(src, removeFirstSlash);
   },

   srcStylesPath: (removeFirstSlash = false) => {
      const src = `${ config.paths.src }${ config.folders.styles.src }`;
      return formatSrc(src, removeFirstSlash);
   },
   buildStylesPath: (removeFirstSlash = false) => {
      const src = `${ config.paths.build }${ config.folders.styles.build }`;
      return formatSrc(src, removeFirstSlash);
   },

   srcImagesPath: (removeFirstSlash = false) => {
      const src = `${ config.paths.src }${ config.folders.images.src }`;
      return formatSrc(src, removeFirstSlash);
   },
   buildImagesPath: (removeFirstSlash = false) => {
      const src = `${ config.paths.build }${ config.folders.images.build }`;
      return formatSrc(src, removeFirstSlash);
   },

   srcStaticPath: (removeFirstSlash = false) => {
      const src = `${ config.paths.src }${ config.folders.static.src }`;
      return formatSrc(src, removeFirstSlash);
   },
};

export default config;
