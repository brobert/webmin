import  React, { Component } from 'react';
import moment from 'moment';
import classnames from 'classnames';
import { Card, CardBody, CardTitle, TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';

class BestSellersCard extends Component {
    
    constructor(props) {
        super(props);

        this.tabsclick = this.tabsclick.bind(this);
        this.state = {
            activeTab: '1',
            widths:150,
        };
    }


    tabsclick(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {

        return (
            <Col xl={8} className="mb-30">
                <Card className="card-statistics h-100">
                    <CardBody>
                        <div className="tab nav-border" style={{ position: 'relative' }}>
                            <div className="d-block d-md-flex justify-content-between">
                                <div className="d-block w-100">
                                    <CardTitle>Best Sellers</CardTitle>
                                </div>
                                <div className="d-block d-md-flex" style={{ position: 'absolute', right: 0, top: 0 }}>
                                    <Nav tabs>
                                        <NavItem>
                                            <NavLink className={classnames({ active: this.state.activeTab === '1' })}
                                                onClick={() => { this.tabsclick('1'); }}
                                            >
                                                Months
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({ active: this.state.activeTab === '2' })}
                                                onClick={() => { this.tabsclick('2'); }}
                                            >
                                                Year
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                </div>
                            </div>
                            <TabContent activeTab={this.state.activeTab}>
                                <TabPane tabId="1" title="Month">
                                    <Row className="mb-30">
                                        <Col md={2} sm={6}>
                                            <img src="assets/images/blog/05.jpg" className="panelPhoto" />
                                        </Col>
                                        <Col md={6} sm={6}>
                                            <h6 className="mb-0 sm-mt-5">Supercharge your motivation</h6>
                                            <p className="sm-mb-5 d-block">I truly believe Augustine’s words are true. </p>
                                            <span className="mb-0">by - <b className="text-info">PotenzaUser</b></span>
                                        </Col>
                                        <Col md={2} sm={6} className="sm-mt-20">
                                            <h5 className="text-primary mb-0"><b>45,436</b></h5>
                                            <span>Sales</span>
                                        </Col>
                                        <Col md={2} sm={6} className="sm-mt-20">
                                            <h5 className="text-secondary mb-0"><b>$05,236</b></h5>
                                            <span>Revenue</span>
                                        </Col>
                                    </Row>
                                    <Row className="mb-30">
                                        <Col md={2} sm={6}>
                    
                                            <img src="assets/images/blog/02.jpg" className="panelPhoto" />
                                        </Col>
                                        <Col md={6} sm={6}>
                                            <h6 className="mb-0 sm-mt-5">Helen keller a teller seller</h6>
                                            <p className="sm-mb-5 d-block">We also know those epic stories, those modern.</p>
                                            <span className="mb-0">by - <b className="text-warning">WebminUser</b> </span>
                                        </Col>
                                        <Col md={2} sm={6} className="sm-mt-20">
                                            <h5 className="text-success mb-0"><b>23,462</b></h5>
                                            <span>Sales</span>
                                        </Col>
                                        <Col md={2} sm={6} className="sm-mt-20">
                                            <h5 className="text-danger mb-0"><b>$166</b></h5>
                                            <span>Revenue</span>
                                        </Col>
                                    </Row>
                                    <Row className="mb-30">
                                        <Col md={2} sm={6}>
                                            <img src="assets/images/blog/03.jpg" className="panelPhoto" />
                                        </Col>
                                        <Col md={6} sm={6}>
                                            <h6 className="mb-0 sm-mt-5">The other virtues practice</h6>
                                            <p className="sm-mb-5 d-block">One of the most difficult aspects of achieving. </p>
                                            <span className="mb-0">by - <b className="text-danger">TheCorps</b> </span>
                                        </Col>
                                        <Col md={2} sm={6} className="sm-mt-20">
                                            <h5 className="text-warning mb-0"><b>5,566</b></h5>
                                            <span>Sales</span>
                                        </Col>
                                        <Col md={2} sm={6} className="sm-mt-20">
                                            <h5 className="text-info mb-0"><b>$4,126</b></h5>
                                            <span>Revenue</span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={2} sm={6}>
                                            <img src="assets/images/blog/03.jpg" className="panelPhoto" />
                                        </Col>
                                        <Col md={6} sm={6}>
                                            <h6 className="mb-0 sm-mt-5">You will begin to realise</h6>
                                            <p className="sm-mb-5 d-block">Remind yourself you have nowhere to go . </p>
                                            <span className="mb-0">by - <b className="text-danger"> PGSinfotech</b> </span>
                                        </Col>
                                        <Col md={2} sm={6} className="sm-mt-20">
                                            <h5 className="text-warning mb-0"><b>5,566</b></h5>
                                            <span>Sales</span>
                                        </Col>
                                        <Col md={2} sm={6} className="sm-mt-20">
                                            <h5 className="text-info mb-0"><b>$4,126</b></h5>
                                            <span>Revenue</span>
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tabId="2" title="year">
                                    <Row className="mb-30">
                                        <Col md={2} sm={6}>
                                            <img src="assets/images/blog/09.jpg" className="panelPhoto" />
                                        </Col>
                                        <Col md={6} sm={6}>
                                            <h6 className="mb-0 sm-mt-5">Walk out 10 years into</h6>
                                            <p className="sm-mb-5 d-block">Understanding the price and having the willingness. </p>
                                            <span className="mb-0">by - <b className="text-danger">TheZayka</b> </span>
                                        </Col>
                                        <Col md={2} sm={6} className="sm-mt-20">
                                            <h5 className="text-dark mb-0"><b>12,549</b></h5>
                                            <span>Sales</span>
                                        </Col>
                                        <Col md={2} sm={6} className="sm-mt-20">
                                            <h5 className="theme-color mb-0"><b>$1,656</b></h5>
                                            <span>Revenue</span>
                                        </Col>
                                    </Row>
                                    <Row className="mb-30">
                                        <Col md={2} sm={6}>
                                            <img src="assets/images/blog/06.jpg" className="panelPhoto" />
                                        </Col>
                                        <Col md={6} sm={6}>
                                            <h6 className="mb-0 sm-mt-5">Step out on to the path</h6>
                                            <p className="sm-mb-5 d-block">Success to you and then pull it out when you are.</p>
                                            <span className="mb-0">by - <b className="text-info">CarDealer</b> </span>
                                        </Col>
                                        <Col md={2} sm={6} className="sm-mt-20">
                                            <h5 className="text-primary mb-0"><b>1,366</b></h5>
                                            <span>Sales</span>
                                        </Col>
                                        <Col md={2} sm={6} className="sm-mt-20">
                                            <h5 className="text-secondary mb-0"><b>$4,536</b></h5>
                                            <span>Revenue</span>
                                        </Col>
                                    </Row>
                                    <Row className="mb-30">
                                        <Col md={2} sm={6}>
                                            <img src="assets/images/blog/07.jpg" className="panelPhoto" />
                                        </Col>
                                        <Col md={6} sm={6}>
                                            <h6 className="mb-0 sm-mt-5">Briefly imagine that you</h6>
                                            <p className="sm-mb-5 d-block">Motivators for your personality and your personal goals. </p>
                                            <span className="mb-0">by - <b className="text-success">SamMartin</b> </span>
                                        </Col>
                                        <Col md={2} sm={6} className="sm-mt-20">
                                            <h5 className="text-success mb-0"><b>465</b></h5>
                                            <span>Sales</span>
                                        </Col>
                                        <Col md={2} sm={6} className="sm-mt-20">
                                            <h5 className="text-danger mb-0"><b>$499</b></h5>
                                            <span>Revenue</span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={2} sm={6}>
                                            <img src="assets/images/blog/08.jpg" className="panelPhoto" />
                                        </Col>
                                        <Col md={6} sm={6}>
                                            <h6 className="mb-0 sm-mt-5">You continue doing what</h6>
                                            <p className="sm-mb-5 d-block">The first thing to remember about success is that. </p>
                                            <span className="mb-0">by - <b className="text-success">Cosntro</b> </span>
                                        </Col>
                                        <Col md={2} sm={6} className="sm-mt-20">
                                            <h5 className="text-success mb-0"><b>4,456</b></h5>
                                            <span>Sales</span>
                                        </Col>
                                        <Col md={2} sm={6} className="sm-mt-20">
                                            <h5 className="text-danger mb-0"><b>$6,485</b></h5>
                                            <span>Revenue</span>
                                        </Col>
                                    </Row>
                                </TabPane>
                            </TabContent>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}

export default BestSellersCard; 