import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import { extendObservable, reaction, transaction, toJS } from 'mobx';
import { observer } from 'mobx-react';
import { Button } from 'reactstrap';

const propTypes = {
    label: PropTypes.string,
    onClickHandler: PropTypes.func.isRequired,
};

const defaultProps = {
    label: 'selected dates',

    onClickHandler: _.identity,
};

class MainButton extends Component {

    constructor(props) {
        super(props);
        extendObservable(this, {
            label: this.props.label,
        });
    }
    
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.label !== this.props.label) {
            this.label = this.props.label;
        }
    }
    
    render() {
        return (
            <Button 
                className="btn-info btn-block" 
                onClick={this.props.onClickHandler}
                id={this.props.id}
            >
                {this.label}
            </Button>
        );
    }
}


MainButton.propTypes = propTypes;
MainButton.defaultProps = defaultProps;

export default observer(MainButton);