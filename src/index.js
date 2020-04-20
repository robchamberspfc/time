import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

mapboxgl.accessToken = 'pk.eyJ1Ijoicm9iMTFwZmMiLCJhIjoiY2s2N3NsdndwMGIxeDNqcGJqdno1aXlqOCJ9.JmqgMDa_Q__r1DZV99ggsg';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
