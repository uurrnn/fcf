import fs from 'fs';
import { config, configHelper } from '../config.js';

function collapseWhitespaceAll(str) {
  return str && str.replace(/[ \n\r\t\f\xA0]+/g, function(spaces) {
    return spaces === '\t' ? '\t' : spaces.replace(/(^|\xA0+)[^\xA0]+/g, '$1 ');
  });
}

function getHtml(images = []) {
   const nav = images.map(img => (
      `
         <li>
            <a href="/development/mockups/${ img }" target="_blank">
               ${ img }
            </a>
         </li>
      `
   )).join('');

   const mainImg = (() => {
      if (!images.length) {
         return '<h1>No Images Found.</strong></h1>';
      }

      return  `<img src="/development/mockups/${ images[0] }" alt="Mockup" />`;
   })();

   const html = `<!doctype html>
      <html>
      <head>
      <meta charset="utf-8">
      	<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
      	<meta http-equiv="X-UA-Compatible" content="IE=edge">
      	<title>Mockup Viewer</title>

      	<style>
      		body {
      			margin: 0;
      			padding: 0;
               font-size: 18px;
      		}

      		.container {
      			display: flex;
      			flex-direction: row;
      			flex-wrap: wrap;
      			justify-content: flex-start;
      			align-items: stretch;
      			align-content: flex-start;
      		}

      		nav {
      			padding: 15px;
      			width: 100%;
      		}

      		main {
      			width: 100%;
      		}

      		img {
      			max-width: 100%;
      			display: inline-block;
      			width: auto;
      			height: auto;
      		}

      		ul {
      			margin: 0 0 1.5rem;
      			padding: 0 0 0 15px;
               line-height: 1.5;
      		}

      		li {
      			text-overflow: ellipsis;
      			white-space: nowrap;
      			overflow: hidden;
      		}

      		@media screen and (min-width: 600px) {
      			nav {
      				width: 20%;
      				max-width: 200px;
      			}

      			main {
      				width: auto;
      				flex: 1 0 0;
      			}
      		}
      	</style>
      </head>
      <body>
      	<div class="container">
      		<nav>
      			<ul>
      				${ nav }
      			</ul>
      		</nav>

      		<main>
               ${ mainImg }
      		</main>
      	</div>

      	<script>
      		var img = document.querySelector('img');
      		var ul = document.querySelector('ul');

      		ul.addEventListener('click', function(ev) {
      			ev.preventDefault();

      			var href = ev.target.getAttribute('href');

      			if (href) {
      				img.src = href;
      			}
      		});
      	</script>
      </body>
   </html>`;

   return collapseWhitespaceAll(html);
}

export function mockupViewer() {
   const devFolder = `.${ configHelper.srcStaticPath() }/development`;
   const mockupImgFolder = `.${ configHelper.srcStaticPath() }/development/mockups`;
   const distFolder = `.${ configHelper.buildPath() }/development`;

   return new Promise(resolve => {
      const allFoldersExist = [
         `.${ configHelper.srcPath() }`,
         `.${ configHelper.srcStaticPath() }`,
         devFolder,
         mockupImgFolder,
      ].every(dir => fs.existsSync(dir));

      const allowedExtensions = [
         'jpg',
         'jpeg',
         'png',
         'webp',
      ];

      if (allFoldersExist) {
         const imgFiles = fs.readdirSync(mockupImgFolder).map(file => file)
                            .filter(img => {
            return allowedExtensions.indexOf(img.split('.').pop().toLowerCase()) >= 0;
         });

         fs.writeFileSync(`${ distFolder }/index.html`, getHtml(imgFiles));
      }

      resolve();
   });
}

export default mockupViewer;
