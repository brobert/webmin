/**
 * 
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardTitle } from 'reactstrap';

class InfoPanel extends React.Component {

    /**
     * Class constructor
     */
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Card className="card-statistics h-100">
                <CardBody>
                    <div className="clearfix">
                        <div className="float-left">
                            <span className={`text-${this.props.theme}`}>
                                <i className={`fa fa-${this.props.icon} highlight-icon`} aria-hidden="true"></i>
                            </span>
                        </div>
                        <div className="float-right text-right">
                            <p className="card-text text-dark">{this.props.label}</p>
                            {
                                this.props.value === null
                                ? <i className="fa fa-spin fa-spinner" styles={{ width: 'auto', height: 'auto', lineHeight: '1px', marginRight: '10px' }}></i>
                                : <h4>{this.props.value}</h4>
                            }
                        </div>
                    </div>
                    <p className="text-muted pt-3 mb-0 mt-2 border-top">
                        <i className={`fa fa-${this.props.exclamationIcon} mr-1`} aria-hidden="true"></i>
                        {
                            this.props.exclamationText === null
                            ? <i className="fa fa-spin fa-spinner" styles={{ width: 'auto', height: 'auto', lineHeight: '1px', marginRight: '10px' }}></i>
                            : `${this.props.exclamationText}`
                        }
                    </p>
                </CardBody>
            </Card>
        );
    }
}

InfoPanel.propTypes = {
    theme: PropTypes.string,
    icon: PropTypes.string,
    exclamationIcon: PropTypes.string,
    label: PropTypes.string,
    exclamationText: PropTypes.string,
};

InfoPanel.defaultProps = {
        theme: 'primary',
        exclamationText: '',
      };

export default InfoPanel;