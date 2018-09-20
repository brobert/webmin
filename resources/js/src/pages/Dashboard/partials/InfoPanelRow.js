import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import InfoPanel from './InfoPanel';
class InfoPanelRow extends Component {
    
    render() {
        return (
            <Row>
                <Col xl={3} lg={6} md={6} className="mb-30" >
                    <InfoPanel 
                        label="Urlop"
                        value="17"
                        theme="info"
                        icon="calendar"
                        exclamationText=" pozostało 9 dni"
                        exclamationIcon="info-circle"
                    />
                </Col>
                <Col xl={3} lg={6} md={6} className="mb-30" >
                    <InfoPanel 
                        label="Orders"
                        value="656"
                        theme="warning"
                        icon="shopping-cart "
                        exclamationText=" Total sales"
                        exclamationIcon="bookmark-o"
                    />
                </Col>
                <Col xl={3} lg={6} md={6} className="mb-30" >
                    <InfoPanel 
                        label="Revenue"
                        value="$65656"
                        theme="success"
                        icon="dollar"
                        exclamationText=" Sales Per Week"
                        exclamationIcon="calendar"
                    />
                </Col>
                <Col xl={3} lg={6} md={6} className="mb-30" >
                    <InfoPanel 
                        label="Followers"
                        value="62,500+"
                        theme="primary"
                        icon="twitter"
                        exclamationText=" Just Updated"
                        exclamationIcon="repeat"
                    />
                </Col>
            </Row>
        );
    }
}

export default InfoPanelRow;