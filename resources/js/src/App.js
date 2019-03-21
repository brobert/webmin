import React, { Component } from 'react';
import {BrowserRouter as Router, HashRouter, Redirect} from 'react-router-dom';

import Routers from './Routers.js';

import '../node_modules/jquery/dist/jquery.min.js';
import './Vendor.js';
import axios from 'axios';

class App extends React.Component {
    
    constructor(props) {
        super(props);
        this.prepareAxios();

        this.state = {
            ready: false,
            authUser: {},
        };

    }

    componentDidMount() {

        this.loadAuthUser()
    }

    prepareAxios() {
        window.axios = axios;
    }

    loadAuthUser() {

        axios.get(`/res/auth/user`)
        .then(
            (res) => {
                this.setState({
                    ready: true,
                    authUser: res.data,
                });
                window.authUser = res.data;
            }
        ).catch(
            (error) => {
                this.setState({
                    ready: true,
                });
            }
        );
    }

    /**
     * Render
     */
    render() {
        
        if (this.state.ready) {
            return (
                <Router>
                    <Routers authUser={this.state.authUser}/>
                </Router>
            );
        }
        return null;
    }
}

export default App;
