import fs from 'fs';
import { config, configHelper } from '../../config.js';
import colors from 'colors/safe';

const productionMode = process.env.NODE_ENV === 'production';

const dataPath = `.${ configHelper.srcHtmlPath() }/${ config.folders.html.data}/`;

export function getSiteData() {
   let jsonData = {};
   const now = new Date();

   fs.readdirSync(dataPath).forEach(file => {
      try {
         const fileData = JSON.parse(fs.readFileSync(`${ dataPath }${ file }`));
         jsonData = Object.assign({}, jsonData, fileData);
      }
      catch (err) {
         console.log(colors.red(err.toString()));

         if (productionMode) {
            throw(err);
         }
      }
   });

   jsonData.copyYear = now.getFullYear();
   jsonData.production = productionMode;
   jsonData.dev = productionMode === false;

   return jsonData;
}

export default getSiteData;
