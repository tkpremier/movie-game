const React = require('react');
const ReactDOMServer = require('react-dom/server');
import Grid from './Grid';

export default function ssr(props) {
  return ReactDOMServer.renderToString(
    <div id="app">
      <Grid data={props.data} />
    </div>
  );
};
