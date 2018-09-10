import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

import './styles.scss';

axios.interceptors.response.use(
    function(response) { return response;}, 
    function(error) {
        // handle error
        console.error('>>>>>>>>>>> AXIOS ERR: ', error)
//        if (error.response) {
//            alert(error.response.data.message);
//        }
    }
);
window.axios = axios;

ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
