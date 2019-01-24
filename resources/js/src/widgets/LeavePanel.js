/**
 * 
 */
import React, { Component } from 'react';
import InfoPanel from './InfoPanel';

class LeavePanel extends React.Component {

    /**
     * Class constructor
     */
    constructor(props) {
        super(props);
        
        this.state = {
            value: null,
            rest: null,
        }
    }
    
    componentDidMount() {
        setInterval(
            () => {
                this.setState({
                    value: 15,
                    rest: 11,
                })
            }, 2000
        );
    }

    render() {
        return (
            <InfoPanel
                label="Urlop"
                value={this.state.value}
                theme="info"
                icon="calendar"
                exclamationText={this.state.rest !== null ? `pozostało ${this.state.rest} dni` : null}
                exclamationIcon="info-circle"
            />
        );
    }
}

export default LeavePanel;