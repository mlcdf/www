import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './templates/App.js';

module.exports = function render(locals, callback) {
  var html = ReactDOMServer.renderToStaticMarkup(React.createElement(App, locals))
  callback(null, '<!DOCTYPE html>' + html)
}
