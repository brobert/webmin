import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom'
import App from './App';
import registerServiceWorker from './registerServiceWorker';


import './styles.scss';


ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
