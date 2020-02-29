
import React from 'react';
import { hydrate } from 'react-dom';
import Grid from './Grid';

(function () {
  const ws = new WebSocket(`ws://${location.hostname}:3001`);
  ws.onopen = () => {
    hydrate(
      <Grid data={[]} ws={ws} />,
      document.querySelector('#app')
    );
  }
}());
