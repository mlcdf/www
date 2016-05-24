'use strict';

import Metalsmith from 'metalsmith';
import markdown from 'metalsmith-markdown';
import layouts from 'metalsmith-layouts';
import collections from 'metalsmith-collections';
import permalinks from 'metalsmith-permalinks';
import inPlace from 'metalsmith-in-place';
import dateFormatter from 'metalsmith-date-formatter';
import htmlMinifier from 'metalsmith-html-minifier';
import metallic from 'metalsmith-metallic';
import nunjucks from 'nunjucks';

export default function build(){

	nunjucks.configure('app/templates', {watch: false, noCache: true});

	Metalsmith(__dirname)

	  .source('app/contents')
	  .destination('./dist')

	  .use(collections({
	    posts: {
				pattern: 'writing/**/*.md',
	      sortBy: 'date',
	      reverse: true
	    }
	  }))
		.use(metallic())
	  .use(markdown())

	  .use(permalinks({
	    pattern: ':link',
	    relative: false
	  }))

		.use(dateFormatter({
			dates: [
			{
					key: 'date',
					format: 'MMMM DD, YYYY'
			}]
		}))

	  .use(layouts({
			engine: 'nunjucks',
			default: 'layout.html',
	    pattern: '**/*.html',
	    directory: 'app/templates'
	  }))

	  .use(inPlace({
	    engine: "nunjucks",
			pattern: '**/*.html'
	  }))

		.use(htmlMinifier())

	  .build(function(err) {
	    if (err) {
	      throw err;
	    }
	  });
}
