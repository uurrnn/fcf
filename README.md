# Static Site Skeleton

*   Install node: https://nodejs.org/en/

*   You can also install the Node Version Manager which makes it
    easier to work with older projects:

    *   https://github.com/coreybutler/nvm-windows (Windows)
    *   https://github.com/nvm-sh/nvm (linux/mac)

*   In the root of this folder, open the command prompt and run: `npm
    install`

*   This will install the dependencies to run the development/build
    tasks as well as libraries needed for your website or
    appllication.

*   You can update dependencies to neweer versions by running `npm
    update` after the installation

*   https://docs.npmjs.com/cli-documentation/cli

## package.json file

*   This file stores the info on dependencies used for development and
    build steps, website/application dependencies, script commands,
    ideal brower support info, and additional properties can certainly
    be added as needed. https://docs.npmjs.com/files/package.json

*   The `browserslist` property is the ideal browsers you wish to
    attempt to support. This is sometimes used by the build and
    transpiler scripts to add in polyfills, browser prefixes for CSS,
    and such. For more info:
    https://www.npmjs.com/package/browserslist

*   The `scripts` property consists of an object of commands to do
    misc. tasks.

*   In the command prompt (root folder), scripts can be ran by typing:
    npm run command-name

    *   The default ones included in this skeleton include:
        *   `dev` (also can run as `watch` or `development`)
            *   This script is for working locally on a project. It
                will load up a localhost server instance and watch for
                changes in your application and attempt to
                auto-refresh the browser.
        *   `build` (also can run as `prod` or `production`)
            *   Builds the production-ready version of a website or
                application and moves the contents into a dist/public
                folder (defaults to `public`)
        *   `php` - This can be added to your bitbucket deploy
            pipeline to generate .php to html redirects for
            files. Useful when converting one of our older websites to
            static. It scans all the HTML files in the public/dist
            folder and creates a .php file
            *   Bitbucket pipeline Example: - npm run php
                region=us-east-1 key=$AWS_ACCESS_KEY_ID
                secret=$AWS_SECRET_ACCESS_KEY
                bucket=www.rfxtechnologies.com

    *   Additional commands can be added for things your project might
        need. Some ideas include unit tests, broken link scans, tools
        for working with images (thumbnail generator for example),
        svg/font icon tools (sprite generators), optimizations,
        validation tests, etc.

*   The `devDependencies` propery includes libraries pulled in from
    npm that are used for development and build processes.

    *   These include tools such as gulp, webpack, localhost server,
        transpilers, nunjucks, image optimization tools, unit testing
        libraries, file-system utilities, etc.

*   The `dependencies` property is used to libraries that the website
    or application relies on. Examples may include: ReactJS, AWS SDK,
    Core JS, Normalize.css, Bootstrap, Lodash, Moment.js, jQuery,
    polyfills, and anything you load into the browser.

*   You might run into libraries that you use on both the build/web
    side, such as lodash, moment.js, AWS SDK, nunjucks, etc. In this
    cases I would think it would be best to include them under
    `dependencies`.

*   Browse https://www.npmjs.com to find ideal packages when you need
    a solution

*   To install a devDependency: `npm install packagename --save-dev`

*   To install a dependency: `npm install packagename --save`

*   You can also specify specific versions if you do not want the
    latest

## Other Root Files

*   `.babelrc` - Babel transpiler options:
    https://babeljs.io/docs/en/6.26.3/babelrc

*   `.editorconfig` - Helps maintain consistent coding styles for
    multiple developers working on the same project across various
    editors and IDEs. https://editorconfig.org

*   `.gitignore` - Paths and files to exclude from a git repository

*   `.jshintrc` - If your editor / IDE is setup for this, can help
    catch JavaScript errors, help enforce consistent coding styles,
    and such. Currently, not post ES6 features don't work well such as
    async. Might look into updating this in the future to something
    such as EsLint.

## config.js

*   Specifies paths and folders to be used in the dev/build tasks
    making it simpler to make updates in a single spot rather than
    having to update multiple files.

*   Defaults should work for new projects, but you might need to make
    updates when converting old sites to keep the paths in sync.

*   Currently there is also an `opts` property where you can set if
    you would like to generate a site map and/or generate .webp images
    for the images stored in your dev images folder

## tasks folder: default files

*   Includes development and build scripts

*   You might need to make alterations and add functionality here
    depending on your needs.

*   The default scripts are a mixed bag. Most utilize gulp in some
    factions, some are pure JavaScript, webpack is configured to
    handle JavaScript files....

*   `/tasks/index.js`

    *   Primary handler setup to handle dev and build scripts
    *   The watch function is your local development function that
        will setup a localhost server, and watch for changes in the
        src folder to transpile javascript and sass files, convert
        nunjucks to html, etc.

*   `/tasks/util/siteData.js`

    *   Helper function to scan json files stored at
        `/src/html/_data`. A file there named data.json is included by
        default in the data folder that includes properties for domain
        name and such. This function also adds some extra properties
        such as `copyYear` (current year when running build) and
        production/dev boolean. By default, this data gets injected
        into your nunjucks templates so it can be accessed there.

*   `/tasks/css.js`

    *   Proccesses src .css files stored in your styles folder
    *   Has postcss processors enabled, so you can use that if you'd
        like in your css files. https://postcss.org
    *   Uses cssnano to minify files, auto prefix selectors,
        etc. https://cssnano.co
    *   I personally prefer Sass, but if you like using vanilla or
        post css, or have an older project built in css, this is here
        to help...

*   `/tasks/images.js`

    *   Uses imagemin to help reduce the file size for images storated
        in the src images folder.
    *   Only ran on production build
    *   This can be a slow process, so you may want to eventually move
        processed images in a static folder
    *   If you use apps such as Tinypng, you probably can also
        commonly add the images to a static folder instead.

*   `/tasks/mockupViewer.js`

    *   On build cmd, this will generate a basic Mockup Viewer page @
        /development
    *   For this to be useful, you will need to place the mockup
        images in `/static/development/mockups` folder

*   `/tasks/nunjucks.js`

    *   Converts nunjucks templates to HTML files
    *   By defalult, it adds any json data stored as `/src/html/_data`
        as variables that can be accessed within the nunjucks
        templates which can be helpful for things used on multiple
        pages such as social media links, phone numbers, collections,
        etc.
    *   Automatically adds canonical path variable for meta data
    *   Includes mailto: link obfuscation using post html
    *   Includes a plugin called inlinesource that allows you to
        reference svgs, images, etc. and will inline the code when
        processed. Example: <img inline src="/images/icons/play.svg"
        /> would be converted to <svg>...</svg>
    *   In dist/public folder, will delete folders used to store
        macros, layouts, partials, components, etc. See config.js:
        folders.html.devFolders for a reference.

*    `/tasks/php-redirects.js`

    *   Optional, standalone script to make .php files that redirect
        to your .html file and deploy them to your S3 bucket
    *   Helpful when converting old .php sites to s3
    *   Written to be executed in a bitbucket pipeline

*   `/tasks/posthtmlObfuscate.js`

    *   Posthtml email obfuscation script used in nunjucks.js to help
        protect emails. Only works with <a href="mailto:...">...</a>

*   `/tasks/redirects.js`

    *   To automate HTML rediirects, update the redirectPaths array to
        have them generate on production build.
    *   Ex: [`contact.html`, `/contact`] would create a file named
        `/contact.html` that redirects to `/contact/index.html`

*   `/tasks/sass.js`

    *   Processes Sass (.scss) files to CSS
    *   You can include node_module files like this: @import
        "node_modules/normalize.css/normalize";
    *   Uses cssnano to minify files, auto prefix selectors,
        etc. https://cssnano.co

*   `/tasks/server/js`

    *   Localhost development server using browsersync
    *   https://www.browsersync.io/docs/options
    *   You can change the port used in the config.js file, by default
        you would access the page @ http://localhost:3000 while the
        npm watch/dev command is up and running
    *   You can also add any addditional static folders, or map
        resources to another folder which is sometimes need to keep
        paths the same for older websites. One example would be to map
        your local src `/src/images` folder to `/assets/images` or
        `/img`

*   `/tasks/siteMap.js`

    *   Generates a basic sitemap.xml file on production build by
        scanning for html files after the nunjucks files have been
        converted
    *   You can turn this off in config.js under opts.siteMap
    *   To filter out specific paths, update the filterFiles array in
        the file.

*   `/tasks/webpack.js`

    *   Webpack configuration to build JavaScript files, bundle
        modules, in your src/js folder
    *   https://webpack.js.org
    *   In the entry properties, specify your entry JS
        file(s). Defaults to `main`, which will be converted to
        main.bundles.js
    *   There are lots of optimization options you can do with
        webpack, check out the website and some tutorials for ideas on
        things such as bundling npm vendor resources in their own
        file, or generating small chunks of js files...

*   `/tasks/webpDev.js`

    *   In the config file, if you have opts.webp set to true... this
        is the script that will help create webp copies jpg and png
        images stored in your src images folder
    *   This is the local, dev version of the script
    *   While working locally, it will create tmp folder in the root
        to store the images as you work
    *   Notice, when you first start the local web server, it might
        take some seconds for the webp images to show since they are
        being generated on load...

*   `/tasks/webpProd.js`

    *   Production/build version of webpDev.js

## src folder

*   `html` folder

    *   Nunjucks templates that will be converted to HTML (njk
        extension)
        *   https://mozilla.github.io/nunjucks/
    *   Packages exist to help with formatting as HTML for IDEs
    *   There are a couple folders included that being with an
        underscore to store things like page layouts, components,
        macros, etc.
        *   `_data` folder: Store JSON files here. The files you
            create will be available as variables in your templates if
            you include the default nunjucks build script. Sometimes
            helpful for things such as phone numbers, social media
            links, navigation menu, photo gallery collection, or any
            sort of data collection that can be looped through...
            *   Make sure you update the domain + site name in the
                default data.json file
        *   `_components` folder: Ideal to store your mastheader,
            footer, sidebars, navigation menu code...
        *   `_layouts` folder: Where to store your page
            templates. Often times you can get away with just one, but
            sometimes you might need a custom one for a home page or
            one-off page. The skeleton also includes a redirect layout
            that can be used to make simple redirects by extending its
            path and setting the redirectPath variable to something
            such as `/contact`
        *   `_macros` folder: Place to store macros. Its best to try
            to keep them simple, but some ideas include buttons, form
            inputs, icons, video iframe, hero sections, picture
            element ...
        *   `_partials` folder: Basically a generic include file. The
            skeleton has things such as the head meta data and
            placeholders css/js includes. Things you might wish to
            exclude out of your layouts to avoid repeating yourself if
            you need to include multiple layouts...
        *   To work with meta data, include the variables at the top
            of the page:
            *   `pageTitle`
            *   `metaDescription`
            *   `metaKeywords`
            *   `metaImage` (path to image such as `/img/cover.jpg`)
            *   `canonical` automatically gets added through the build
                script

*   `images` folder

    *   Images stored here will attempt to be optimized on build. If
        you decide to dynamically generate webp images, this is the
        folder it targets.
    *   If you take care of these things yourself, you can also store
        images in the static folder.
    *   I would not recommend adding images to the static folder
        unless you have optimized them with a tool such as Tinypng

*   `js` folder:

    *   Javascript files that get processed by webpack
    *   If you have static js files, perhaps something from an old
        website... you can store them in the static folder

*   `styles` folder

    *   Sass / CSS resources

*   `static` folder

    *   Favicons, `robots.txt`, documents, fonts... anything that
        should simply be copied over into the build system.
