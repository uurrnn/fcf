function obfuscate(data) {
	const s = data.toString().trim().split('').map((v) => {
		return `&#${v.charCodeAt(0)};`;
	}).join('');

   return s;
}

function mapContent(nodeContent) {
   let content = nodeContent;

   try {
      if (content && Array.isArray(content)) {
         content = content.map((item, i) => {
            if (item && typeof item === 'string') {
               return obfuscate(item);
            }
            else if (item && typeof item === 'object' && item.hasOwnProperty('tag') && item.tag && item.content) {
               item = Object.assign({}, item, {
                  content: mapContent(item.content),
               });
            }

            return item;
         });
      }
   }
   catch(err) {
      console.log(err);
      console.log(nodeContent);
   }

   return content;
}

module.exports = (config) => {
	config = (function (cnf, def) {
		if (cnf != void 0) {
			for (const prop in cnf) {
				if (cnf.hasOwnProperty(prop) && def[prop] != void 0) {
					def[prop] = cnf[prop];
				}
			}
		}

		return def;
	})(config, {
		includeMailto: false
	});

	return (tree) => {
		tree.match({tag: 'a'}, node => {
         if (node.hasOwnProperty('attrs') && node.attrs.hasOwnProperty('href')) {
            if (/^mailto:/.test(node.attrs.href)) {
               const href = node.attrs.href.replace(/^mailto:/, '');

               if (config.includeMailto) {
                  node.attrs.href = obfuscate(`mailto:${ href }`);
               }
               else {
                  node.attrs.href = `mailto:${ obfuscate(href) }`;
               }

               node.content = mapContent(node.content);
   			}
         }

			return node;
		});
	};
};
