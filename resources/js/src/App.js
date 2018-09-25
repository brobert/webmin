import React, { Component } from 'react';
import {BrowserRouter as Router, HashRouter} from 'react-router-dom';

import Routers from './Routers.js';

import '../node_modules/jquery/dist/jquery.min.js';
import './Vendor.js';
import axios from 'axios';

class App extends React.Component {
    
    constructor(props) {
        super(props);
        this.prepareAxios();
        
        this.user = {
    		name: 'Auth User',
        }
    }

    prepareAxios() {
        window.axios = axios;
    }

    /**
     * Render
     */
    render() {
        return (
            <Router>
                <Routers authUser={this.user}/>
            </Router>
        );
    }
}

export default App;
