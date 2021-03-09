import fs from 'fs';
import { getSiteData } from './util/siteData';
import { config } from '../config.js';

const siteData = getSiteData();

/*
   HTML Redirects

   Example:

   export const redirectPaths = [
      ['contact.html', '/contact'],
      ['about/about-us.html', '/about'],
      ['services/example.html' '/services/example'],
   ];
*/

export const redirectPaths = [
];

function collapseWhitespaceAll(str) {
  return str && str.replace(/[ \n\r\t\f\xA0]+/g, function(spaces) {
    return spaces === '\t' ? '\t' : spaces.replace(/(^|\xA0+)[^\xA0]+/g, '$1 ');
  });
}

function getHtml(redirectPath) {
   const url = `${ siteData.domain }${ redirectPath }`;

   const html = `
      <!doctype html>
      <html>
      <head>
         <meta charset="utf-8">
      	<meta name="viewport" content="width=device-width, initial-scale=1">
         <meta http-equiv="refresh" content="0;url=${ url }" />

         <script>
            window.location.replace('${ url }');
         </script>
      </head>
      <body>
         <p>
            <a href="${ url }">
               Redirecting to: ${ siteData.domain }${ redirectPath }
            </a>
         </p>
      </body>
      </html>`;

   return html;
}

export function redirects() {
   return new Promise(resolve => {
      const publicFolder = `.${ config.paths.build }`;

      redirectPaths.forEach(arr => {
         const source = arr[0];
         const redirectPath = arr[1];
         const sourceParts = source.split('/');
         const len = sourceParts.length;

         const html = collapseWhitespaceAll(getHtml(redirectPath));

         if (len === 1) {
            fs.writeFileSync(`${ publicFolder }/${ source }`, html);
         }
         else {
            let treeStr = publicFolder;

            for (let i = 0; i < len-1; i++) {
               treeStr += `/${ sourceParts[i] }`;

               if (!fs.existsSync(treeStr)) {
                  fs.mkdirSync(treeStr);
               }
            }

            fs.writeFileSync(`${ treeStr }/${ sourceParts[len-1] }`, html);
         }
      });

      resolve();
   });
}

export default redirects;
