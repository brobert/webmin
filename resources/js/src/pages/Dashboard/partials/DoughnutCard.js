import React, { Component } from 'react';
import moment from 'moment';
import { Doughnut } from 'react-chartjs-2';
import { Card, CardBody, CardTitle, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const data = {
    labels: [
        'Red',
        'Blue',
        'Yellow',
        'Green',
        'Orange'
    ],

    datasets: [{
        data: [400, 50, 100, 80, 150],
        backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#00cc99',
            '#ffa31a'
        ],
        hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#00cc99',
            '#ffa31a'
        ]
    }]
};

class DoughnutCard extends Component {


    constructor(props) {
        super(props);


        this.state = {
            events: [
                {
                    start: new Date(),
                    end: new Date(moment().add(1, "days")),
                    title: "BirthDay Party "
                },
                {
                    start: new Date('2018-07-10'),
                    end: new Date('2018-07-10'),
                    title: "Marriage Anniversary"
                },
                {
                    start: new Date('2018-07-25'),
                    end: new Date('2018-07-25'),
                    title: "Conference"
                }
            ],
            dropdownbarOpen: false,
            dropdownlineOpen: false,
            activeTab: '1',
            widths:150,
        };

    }

    render() {
        return (
            <Col xl={4} className="mb-30">

                <Card className="h-100">
                    <CardBody>
                        <CardTitle>Customer Feedback</CardTitle>
                        <Row className="mb-30">
                            <Col md={6}>
                                <div className="clearfix">
                                    <p className="mb-10 float-left">Positive</p>
                                    <i className="mb-10 text-success float-right fa fa-arrow-up"> </i>
                                </div>
                                <div className="progress progress-small">
                                    <div className="skill2-bar bg-success" role="progressbar" style={{ width: '70%' }} aria-valuenow={70} aria-valuemin={0} aria-valuemax={100} />
                                </div>
                                <h4 className="mt-10 text-success">8501</h4>
                            </Col>
                            <Col md={6}>
                                <div className="clearfix">
                                    <p className="mb-10 float-left">Negative</p>
                                    <i className="mb-10 text-danger float-right fa fa-arrow-down"> </i>
                                </div>
                                <div className="progress progress-small">
                                    <div className="skill2-bar bg-danger" role="progressbar" style={{ width: '30%' }} aria-valuenow={30} aria-valuemin={0} aria-valuemax={100} />
                                </div>
                                <h4 className="mt-10 text-danger">3251</h4>
                            </Col>
                        </Row>
                        <div className="chart-wrapper"  style={{height: 270}}>
                            <Doughnut data={data} options={{maintainAspectRatio: false, legend: {display: true, labels: {fontFamily: "Poppins"}}}}  width={this.state.widths} />
                        </div>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}

export default DoughnutCard;
