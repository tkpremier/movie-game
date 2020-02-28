const React = require('react');
const renderToString = require('react-dom/server').ReactDOMServer;
import Grid from './Grid';

export default function ssr({ data = [] }) {
  return renderToString(
    <div>
      <a href="/">Drive</a>
      <a href="/list">List</a>
      <button></button>
      <Grid data={data} />
    </div>
  );
};