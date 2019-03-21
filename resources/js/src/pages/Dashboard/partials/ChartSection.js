import React, { Component } from 'react';
import { Doughnut, Line, Bar } from 'react-chartjs-2';
import { Card, CardBody, CardTitle, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import InfoPanel from './InfoPanel';

var rFactor = function (multi) {
    
    multi = multi === undefined ? 500 : multi;
    return Math.round(Math.random() * multi);
};

const loadBarData = function() {
    axios.get(
        `/res/dashboard/bar-data`,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    .then(
        (res) => {
            console.info('>>>>>>>>>>> /res/dashboard/bar-data', res.data);
        }
    );
}

const barData = function(id = '__') {
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
        labels: ['January2', 'February2', 'March2', 'April2', 'May2', 'June2', 'July2'],
        datasets: [{
            label: 'Income',
            backgroundColor: 'rgb(56, 182, 202)',
            borderColor: 'rgb(56, 182, 202)',
            pointBorderColor: '#fff',
            data: [rFactor(), rFactor(), rFactor(), rFactor(), rFactor(), rFactor(), rFactor()]
        }, {
            label: 'Outcome',
            backgroundColor: 'rgb(149, 149, 249)',
            borderColor: 'rgb(149, 149, 249)',
            pointBorderColor: '#fff',
            data: [rFactor(), rFactor(), rFactor(), rFactor(), rFactor(), rFactor(), rFactor()]
        }]
    };
}


const LinechartState = {
    labels: ['January1', 'February1', 'March1', 'April1', 'May1', 'June1', 'July1'],
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
            data: [rFactor(), rFactor(), rFactor(), rFactor(), rFactor(), rFactor(), rFactor()]
        }
    ]
};

const BarchartState = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
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
        this.dropdownbar1Open = this.dropdownbar1Open.bind(this);
        this.dropdownbar2Open = this.dropdownbar2Open.bind(this);
        this.dropdownlineOpen = this.dropdownlineOpen.bind(this);

        this.state = {
            dropdownbarOpen: false,
            dropdownlineOpen: false,
            widths:150,
            barData_1: {}, //barData(),
            barData_2: {}, //barData(),
            lineData: {}, //lineData(),
        };

        this.onBarRefresh = this.onBarRefresh.bind(this);
        this.onLineChartRefresh = this.onLineChartRefresh.bind(this);
        this.onItemClick = this.onItemClick.bind(this);
    }

    componentWillMount() {
        this.setState(LinechartState);
        this.setState(BarchartState);
        const timeOut = 10 * rFactor(500)

        setTimeout(() => {
            this.setState({
                lineData: lineData(),
            })
        }, 10 * rFactor(500));
        
        this.onBarRefresh(1);
        this.onBarRefresh(2);

    };

    dropdownbar1Open() {
        this.setState(prevState => ({
            dropdownbar1Open: !prevState.dropdownbar1Open
        }));
    };

    dropdownbar2Open() {
        this.setState(prevState => ({
            dropdownbar2Open: !prevState.dropdownbar2Open
        }));
    };

    dropdownlineOpen() {
        this.setState(prevState => ({

            dropdownlineOpen: !prevState.dropdownlineOpen
        }));
    }

//    onBarRefresh(key=1) {
//
//        this.setState({
//            [`barData_${key}`]: barData(`(ref:${key})`),
//        })
//    };

    onLineChartRefresh() {
        this.setState({
            lineData: lineData(),
        })
    };

    onItemClick() {
        console.info('#############################################');
    }
    
    onBarRefresh(key=1) {
        axios.get(
            `/res/dashboard/bar-data`,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        .then(
            (res) => {
                this.setState({
                    [`barData_${key}`]: res.data,
                })
            }
        );
    }

    render() {
        return (
            <Row>
                <Col xl={4} className="mb-30">
                    <Card className="card-statistics h-100">
                        {/* action group */}
                        <div className="btn-group info-drop">
                            <Dropdown isOpen={this.state.dropdownbar1Open} toggle={this.dropdownbar1Open}>
                                <DropdownToggle className="dropdown-toggle-split text-muted" id="dropdown-no-caret">
                                    <i className="ti-more" />
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={() => { this.onBarRefresh(1); }}>
                                        <i className="text-primary ti-reload" />Refresh
                                	</DropdownItem>
                                    <DropdownItem><i className="text-secondary ti-eye" />View all</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        <CardBody>
                            <div className="d-block">
                                <CardTitle>Market summary 1</CardTitle>
                            </div>
                            <div className="row h-100 justify-content-center align-items-center">
                                <div className="col-4 text-center">
                                    <h6>Bruen-Kunze</h6>
                                    <b className="text-info">+ 82.24 % </b>
                                </div>

                                <div className="col-4 text-center">
                                    <h6>Kirlin-Kunze</h6>
                                    <b className="text-warning">+ 24.86 % </b>
                                </div>

                                <div className="col-4 text-center">
                                    <h6>Balistreri, Larson and Wintheiser</h6>
                                    <b className="text-warning">+ 78.86 % </b>
                                </div>
                            </div>

                            <div className="chart-wrapper" style={{height: 350}}>
                                <Bar
                                    data={this.state.barData_1}
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
                                                xAxes: [{gridLines: {display: false}, ticks:{fontFamily: "Poppins"}}]
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
                <Card className="card-statistics h-100">
                    {/* action group */}
                    <div className="btn-group info-drop">
                        <Dropdown isOpen={this.state.dropdownbar2Open} toggle={this.dropdownbar2Open}>
                            <DropdownToggle className="dropdown-toggle-split text-muted" id="dropdown-no-caret">
                                <i className="ti-more" />
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => { this.onBarRefresh(2); }}><i className="text-primary ti-reload" />Refresh</DropdownItem>
                                <DropdownItem><i className="text-secondary ti-eye" />View all</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <CardBody>
                        <div className="d-block">
                            <CardTitle>Market summary 2</CardTitle>
                        </div>
                        <div className="row h-100 justify-content-center align-items-center">
                            <div className="col-4 text-center">
                                <h6>Bruen-Kunze</h6>
                                <b className="text-info">+ 82.24 % </b>
                            </div>
    
                            <div className="col-4 text-center">
                                <h6>Kirlin-Kunze</h6>
                                <b className="text-warning">+ 24.86 % </b>
                            </div>
    
                            <div className="col-4 text-center">
                                <h6>Balistreri, Larson and Wintheiser</h6>
                                <b className="text-warning">+ 78.86 % </b>
                            </div>
                        </div>

                        <div className="chart-wrapper" style={{height: 350}}>
                            <Bar
                                data={this.state.barData_2}
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
                                            yAxes: [{gridLines: {display: true}, ticks:{fontFamily: "Poppins"}}],
                                            xAxes: [{gridLines: {display: false}, ticks:{fontFamily: "Poppins"}}]
                                        }
                                    }
                                }
                                className="scrollbar-x text-center" 
                            />
                        </div>
                    </CardBody>
                </Card>
            </Col>
                <Col xl={12} className="mb-30">
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
                                                xAxes: [{gridLines: {display: false}, ticks:{fontFamily: "Poppins"}}]
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