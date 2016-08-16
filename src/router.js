import React from 'react'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'
import {Router, RouterContext, match, createMemoryHistory} from 'react-router'
import routes from './routes'
import App from './templates/App.js'


module.exports = function(locals, callback){
    const history = createMemoryHistory();
    const location = history.createLocation(locals.path);

    return match({
        routes: routes,
        location: location
    }, function(error, redirectLocation, renderProps) {
        var html = ReactDOMServer.renderToStaticMarkup(
            <RouterContext {...renderProps} />
        );
        return callback(null, '<!DOCTYPE html>' + html);
    })
}
