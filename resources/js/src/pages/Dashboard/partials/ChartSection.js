import React, { Component } from 'react';
import { Doughnut, Line, Bar } from 'react-chartjs-2';
import { Card, CardBody, CardTitle, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import InfoPanel from './InfoPanel';

var rFactor = function (multi) {
    
    multi = multi === undefined ? 300 : multi;
    return Math.round(Math.random() * multi);
};

const barData = function() {
    return {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: 'Apple',
                backgroundColor: '#36a2eb',
                borderColor: '#36a2eb',
                data: [rFactor(), rFactor(), rFactor(), rFactor(), rFactor(), rFactor(), rFactor(), rFactor(), rFactor(), rFactor(), rFactor(), rFactor()]
            },
            {
                label: 'Google',
                backgroundColor: '#FF6384',
                borderColor: '#FF6384',
                data: [rFactor(), rFactor(), rFactor(), rFactor(), rFactor(), rFactor(), rFactor(), rFactor(), rFactor(), rFactor(), rFactor(), rFactor()]
            },
            {
                label: 'Twitter',
                backgroundColor: '#FF63FF',
                borderColor: '#FFFF84',
                data: [rFactor(), rFactor(), rFactor(), rFactor(), rFactor(), rFactor(), rFactor(), rFactor(), rFactor(), rFactor(), rFactor(), rFactor()]
            }
        ],
    };
}

const lineData = function() {
    return {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'Income',
            backgroundColor: 'rgb(56, 182, 202)',
            borderColor: 'rgb(56, 182, 202)',
            pointBorderColor: '#fff',
            data: [rFactor(), rFactor(), rFactor(), rFactor(), rFactor(), rFactor(), rFactor()]
        }, {
            label: 'Outcome',
            backgroundColor: 'rgb(249, 249, 249)',
            borderColor: 'rgb(249, 249, 249)',
            pointBorderColor: '#fff',
            data: [rFactor(), rFactor(), rFactor(), rFactor(), rFactor(), rFactor(), rFactor()]
        }]
    };
}


const LinechartState = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {

            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};

const BarchartState = {
    labels: ['January!!', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'January',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [665, 59, 80, 81, 56, 55, 40]
        }
    ]
};

class ChartSection extends Component {
    
    constructor(props) {
        super(props);
        this.dropdownbarOpen = this.dropdownbarOpen.bind(this);
        this.dropdownlineOpen = this.dropdownlineOpen.bind(this);

        this.state = {
            dropdownbarOpen: false,
            dropdownlineOpen: false,
            widths:150,
            barData: barData(),
            lineData: lineData(),
        };

        this.onBarRefresh = this.onBarRefresh.bind(this);
        this.onLineChartRefresh = this.onLineChartRefresh.bind(this);
    }
    
    componentWillMount() {
        this.setState(LinechartState);
        this.setState(BarchartState);
        
    };
    
    dropdownbarOpen() {
        this.setState(prevState => ({
            dropdownbarOpen: !prevState.dropdownbarOpen

        }));
    }
    dropdownlineOpen() {
        this.setState(prevState => ({

            dropdownlineOpen: !prevState.dropdownlineOpen
        }));
    }
    
    onBarRefresh() {
        this.setState({
            barData: barData(),
        })
    };
    
    onLineChartRefresh() {
        this.setState({
            lineData: lineData(),
        })
    };
    
    render() {
        return (
            <Row>
                <Col xl={4} className="mb-30">
                    <Card className="card-statistics h-100">
                        {/* action group */}
                        <div className="btn-group info-drop">
                            <Dropdown isOpen={this.state.dropdownbarOpen} toggle={this.dropdownbarOpen}>
                                <DropdownToggle className="dropdown-toggle-split text-muted" id="dropdown-no-caret">
                                    <i className="ti-more" />
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={this.onBarRefresh}><i className="text-primary ti-reload" />Refresh</DropdownItem>
                                    <DropdownItem><i className="text-secondary ti-eye" />View all</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        <CardBody>
                            <div className="d-block">
                                    <CardTitle>Market summary</CardTitle>
                                </div>
                                <div className="row h-100 justify-content-center align-items-center">
                                    <div className="col-4 text-center">
                                        <h6>Apple</h6>
                                        <b className="text-info">+ 82.24 % </b>
                                    </div>
                                    
                                    <div className="col-4 text-center">
                                        <h6>Google</h6>
                                        <b className="text-warning">+ 24.86 % </b>
                                    </div>
                                    
                                    <div className="col-4 text-center">
                                        <h6>Twitter</h6>
                                        <b className="text-warning">+ 78.86 % </b>
                                    </div>
                                </div>
                        
                        <div className="chart-wrapper" style={{height: 350}}>
                            <Bar
                                data={this.state.barData}
                                width={this.state.widths}
                                options={
                                    {
                                        maintainAspectRatio: false,
                                        legend: {
                                            display: true,
                                            labels: {
                                                fontFamily: "Poppins"
                                            }
                                        },
                                        scales: {
                                            yAxes: [{gridLines: {display: false}, ticks:{fontFamily: "Poppins"}}],
                                            xAxes: [{gridLines: {display: false},ticks:{fontFamily: "Poppins"}}]
                                        }
                                    }
                                }
                                className="scrollbar-x text-center" 
                            />
                        </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xl={8} className="mb-30">
                    <Card className="h-100">

                        <div className="btn-group info-drop">
                            <Dropdown isOpen={this.state.dropdownlineOpen} toggle={this.dropdownlineOpen}>
                                <DropdownToggle className="dropdown-toggle-split text-muted" id="dropdown-no-caret">
                                    <i className="ti-more" />
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={this.onLineChartRefresh}><i className="text-primary ti-reload" />Refresh</DropdownItem>
                                    <DropdownItem><i className="text-secondary ti-eye" />View all</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>

                        </div>
                        <CardBody>
                            <div className="d-block d-md-flexx justify-content-between">
                                <div className="d-block">
                                    <CardTitle>Site Visits Growth </CardTitle>
                                </div>
                                <div className="d-flex ">
                                    <div className="clearfix mr-30">
                                        <h6 className="text-success">Income</h6>
                                        <p>+584</p>
                                    </div>
                                    <div className="clearfix  mr-50">
                                        <h6 className="text-danger"> Outcome</h6>
                                        <p>-255</p>
                                    </div>
                                </div>
                            </div>
                            <div className="chart-wrapper" style={{height: 350}}>
                                <Line 
                                    data={this.state.lineData}
                                    className="scrollbar-x text-center"
                                    options={
                                        {
                                            maintainAspectRatio: false,
                                            legend: {display: true, labels: {fontFamily: "Poppins"}},
                                            scales: {
                                                yAxes: [{gridLines: {display: false}, ticks:{fontFamily: "Poppins"}}],
                                                xAxes: [{gridLines: {display: false},ticks:{fontFamily: "Poppins"}}]
                                            }
                                        }
                                    } 
                                />
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default ChartSection;