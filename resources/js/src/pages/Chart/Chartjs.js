import React, { Component } from 'react';
import { Doughnut, Line, Bar, Radar, Pie, Polar, Bubble, Scatter } from 'react-chartjs-2';
import './Chartjs.css';
import { Row, Col, CardBody, Card, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';

//Doughnut Chart
const doughnutData = {
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


//Pie Chart
var pieData = {
    labels: [
        'Green',
        'Yellow',
        'Blue'
    ],
    datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
            '#00cc99',
            '#fad732',
            '#23b7e5'
        ],
        hoverBackgroundColor: [
            '#00cc99',
            '#fad732',
            '#23b7e5'
        ]
    }]
};

// random values for demo
var rFactor = function () {
    return Math.round(Math.random() * 100);
};

//Bar Chart
var barData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
        label: 'Apple',
        backgroundColor: '#36A2EB',
        borderColor: '#36A2EB',
        data: [rFactor(), rFactor(), rFactor(), rFactor(), rFactor(), rFactor(), rFactor()]
    },
    {
        label: 'Google',
        backgroundColor: '#ffa31a',
        borderColor: '#ffa31a',
        data: [rFactor(), rFactor(), rFactor(), rFactor(), rFactor(), rFactor(), rFactor()]
    }]
};

//Line chart
var lineData = {
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

// Rader Chart
var radarData = {
    labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
    datasets: [{
        label: 'Apple',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        data: [65, 59, 90, 81, 56, 55, 40]
    }, {
        label: 'Google',
        backgroundColor: 'rgba(0,204,153,0.2)',
        borderColor: 'rgba(0,204,153,1)',
        data: [28, 48, 40, 19, 96, 27, 100]
    }]
};

//Polar Chart
var polarData = {
    datasets: [{
        data: [
            11,
            16,
            7,
            3
        ],
        backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#00cc99'
        ],
        label: 'My dataset'
    }],
    labels: [
        'Label 1',
        'Label 2',
        'Label 3',
        'Label 4'
    ]
};

const bubbleData = {
        labels: ['January'],
        datasets: [
          {
            label: 'My First dataset',
            fill: false,
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
            data: [{x:10,y:20,r:5}, {x:11,y:35,r:10}]
          },
          {
              label: 'My Second dataset',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(75,12,192,0.4)',
              borderColor: 'rgba(75,12,192,1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(75,12,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,12,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [{x:20,y:20,r:15}]
            },
            {
                label: 'My third dataset',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,92,192,0.4)',
                borderColor: 'rgba(75,92,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,92,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,92,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [{x:30,y:40,r:7}]
              }
        ]
      };

const scatterData = {
        labels: ['Scatter'],
        datasets: [
          {
            label: 'My First dataset[scatter]',
            fill: true,
            backgroundColor: 'rgba(75,192,192,0.4)',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 2,
            pointHitRadius: 10,
            lineTension: 10,
            data: [
              { x: 65, y: 75 },
              { x: 59, y: 49 },
              { x: 80, y: 90 },
              { x: 81, y: 29 },
              { x: 56, y: 36 },
              { x: 55, y: 25 },
              { x: 40, y: 18 },
            ]
          }
        ]
      };



class Chartjs extends React.Component {



    constructor(props) {

        super(props);

    }

    render() {

        return (
            <div>
                <div className="page-title">
                    <Row>
                        <Col md={6}>
                            <h4 className="mb-0"> Chart...</h4>
                        </Col>
                        <Col md={6}>
                            <Breadcrumb className="float-left float-sm-right">
                                <BreadcrumbItem><a href="#">Home</a></BreadcrumbItem>
                                <BreadcrumbItem active>Chart Js</BreadcrumbItem>
                            </Breadcrumb>
                        </Col>
                    </Row>
                </div>
                <Row>
                    <Col md={6} className="mb-30">
                        <Card>
                            <CardBody>
                                <CardTitle>Pie Chart </CardTitle>
                                <div className="chart-wrapper" style={{ width: '100%', margin: '0 auto', height: 350 }}>
                                    <Pie data={pieData} options={{maintainAspectRatio: false, legend: {display: true, labels: {fontFamily: "Poppins"}}}} />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={6} className="mb-30">
                        <Card className="h-100">
                            <CardBody>
                                <CardTitle>Bar Chart</CardTitle>
                                <div className="chart-wrapper" style={{ width: '100%', margin: '0 auto', height: 350 }}>
                                    <Bar data={barData} options={{maintainAspectRatio: false, legend: {display: true, labels: {fontFamily: "Poppins"}}, scales: {yAxes: [{gridLines: {display: false}, ticks:{fontFamily: "Poppins"}}], xAxes: [{gridLines: {display: false},ticks:{fontFamily: "Poppins"}}]}}} />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={6} className="mb-30">
                        <Card className="h-100">
                            <CardBody>
                                <CardTitle>Doughnut</CardTitle>
                                <div className="chart-wrapper" style={{ width: '100%', margin: '0 auto', height: 350 }}>
                                    <Doughnut data={doughnutData} options={{maintainAspectRatio: false, legend: {display: true, labels: {fontFamily: "Poppins"}}}} />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={6} className="mb-30">
                        <Card className="h-100">
                            <CardBody>
                                <CardTitle>Line Chart </CardTitle>
                                <div className="chart-wrapper" style={{ width: '100%', margin: '0 auto', height: 350 }}>
                                    <Line data={lineData} options={{maintainAspectRatio: false, legend: {display: true, labels: {fontFamily: "Poppins"}}, scales: {yAxes: [{gridLines: {display: false}, ticks:{fontFamily: "Poppins"}}], xAxes: [{gridLines: {display: false},ticks:{fontFamily: "Poppins"}}]}}} />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={6} className="mb-30">
                        <Card className="h-100">
                            <CardBody>
                                <CardTitle>Polar Chart </CardTitle>
                                <div className="chart-wrapper" style={{ width: '100%', margin: '0 auto', height: 350 }}>
                                    <Polar data={polarData} options={{maintainAspectRatio: false, legend: {display: true, labels: {fontFamily: "Poppins"}}}} />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={6} className="mb-30">
                        <Card className="h-100">
                            <CardBody>
                                <CardTitle>Radar Chart </CardTitle>
                                <div className="chart-wrapper" style={{ width: '100%', margin: '0 auto', height: 350 }}>
                                    <Radar data={radarData} options={{maintainAspectRatio: false, legend: {display: true, labels: {fontFamily: "Poppins"}}}} />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={6} className="mb-30">
                    <Card className="h-100">
                        <CardBody>
                            <CardTitle>Bubble Chart </CardTitle>
                            <div className="chart-wrapper" style={{ width: '100%', margin: '0 auto', height: 350 }}>
                                <Bubble data={bubbleData} options={{maintainAspectRatio: false, legend: {display: true, labels: {fontFamily: "Poppins"}}}} />
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={6} className="mb-30">
                    <Card className="h-100">
                        <CardBody>
                            <CardTitle>Scatter Chart </CardTitle>
                            <div className="chart-wrapper" style={{ width: '100%', margin: '0 auto', height: 350 }}>
                                <Scatter data={scatterData}/>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                </Row>
            </div>
        );
    }
}
export default Chartjs;