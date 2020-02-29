
import React from 'react';
import { hydrate } from 'react-dom';
import Grid from './Grid';

(function (props = null) {
  const ws = new WebSocket(`ws://${location.hostname}:3001`);
  console.log('props: ', props);
  ws.onopen = () => {
    hydrate(
      <Grid data={[]} ws={ws} tmdbConfigs={props}/>,
      document.querySelector('#app')
    );
  }
}(window.___client));
