/**
 * 
 */
import React, { Component } from 'react';
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
                            <h4>{this.props.value}</h4>
                        </div>
                    </div>
                    <p className="text-muted pt-3 mb-0 mt-2 border-top">
                        <i className={`fa fa-${this.props.exclamationIcon} mr-1`} aria-hidden="true"></i>{`${this.props.exclamationText}`}
                </p>
                </CardBody>
            </Card>
        );
    }
}

export default InfoPanel;