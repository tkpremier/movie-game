
import React from 'react';
import { hydrate } from 'react-dom';
import Grid from './Grid';

(function () {
  
  hydrate(
    <Grid data={[]} />,
    document.querySelector('#app')
  );
}());
