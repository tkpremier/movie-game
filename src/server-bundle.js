"use strict";

var _Grid = _interopRequireDefault(require("./Grid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react');

var ReactDOMServer = require('react-dom/server');

module.exports = function ssr(props) {
  return ReactDOMServer.renderToString(React.createElement(_Grid.default, {
    data: props.data
  }));
};