import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, CardText, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import BasicTab from './BasicTab';
import './Profile.scss';


class Tabss extends React.Component {
    constructor(props) {
        super(props);

        this.tabvertical = this.tabvertical.bind(this);
        this.tabhorizontal = this.tabhorizontal.bind(this);
        this.tabround = this.tabround.bind(this);
        this.tabbordericon = this.tabbordericon.bind(this);
        this.state = {
            tabvertical: '1',
            tabhorizontal: '1',
            tabround: '1',
            tabbordericon: '1',
            ready: false,
            authUser: window.authUser,
        };
        
        console.info('Tabss::constructor', this.state);
    }
    
    componentDidMount() {
        console.info('Tabss::componentDidMount', this.state);
        if (this.state.authUser) {
            setTimeout(() => {
                this.setState({ready: true});
                console.info('Tabss::setState.ready => true');
            }, 3 * 1000)
        }
    }

    tabvertical(tab) {
        if (this.state.tabvertical !== tab) {
            this.setState({
                tabvertical: tab
            });
        }
    }
    tabhorizontal(tab) {
        if (this.state.tabhorizontal !== tab) {
            this.setState({
                tabhorizontal: tab
            });
        }
    }
    tabround(tab) {
        if (this.state.tabround !== tab) {
            this.setState({
                tabround: tab
            });
        }
    }
    tabbordericon(tab) {
        if (this.state.tabbordericon !== tab) {
            this.setState({
                tabbordericon: tab
            });
        }
    }


    render() {
        console.info('Tabss::render', this.state);
        return (
            <div>
                <div className="page-title">
                    <Row>
                        <Col sm={6}>
                            <h4 className="mb-0"> Profile</h4>
                        </Col>
                        <Col sm={6}>
                            <Breadcrumb className="pt-0 pr-0 float-left float-sm-right">
                                <BreadcrumbItem><Link to="/">Home </Link></BreadcrumbItem>
                                <BreadcrumbItem active>Tabs </BreadcrumbItem>
                            </Breadcrumb>
                        </Col>
                    </Row>
                </div>
                <Row>
                    <Col md={12} className="mb-30">
                        <Card className="card-statistics h-100">
                            <CardBody>
                                <CardTitle> Tab vertical </CardTitle>
                                <div className="tab tab-vertical">
                                    <Nav tabs>
                                        <NavItem ><NavLink className={classnames({ active: this.state.tabvertical === '1' })} onClick={() => { this.tabvertical('1'); }}>Home</NavLink></NavItem>
                                        <NavItem ><NavLink className={classnames({ active: this.state.tabvertical === '2' })} onClick={() => { this.tabvertical('2'); }}>Profile</NavLink></NavItem>
                                        <NavItem ><NavLink className={classnames({ active: this.state.tabvertical === '3' })} onClick={() => { this.tabvertical('3'); }}>Portfolio</NavLink></NavItem>
                                        <NavItem><NavLink className={classnames({ active: this.state.tabvertical === '4' })} onClick={() => { this.tabvertical('4'); }}>Contact</NavLink></NavItem>
                                    </Nav>
                                    <TabContent activeTab={this.state.tabvertical} >
                                        <TabPane tabId="1">
                                            <BasicTab user={this.state.ready ? this.state.authUser : this.state.authUser} />
                                        </TabPane>
                                        <TabPane tabId="2">
                                            <p>We all carry a lot of baggage, thanks to our upbringing. The majority of people carry with them, an entire series of self-limiting beliefs that will absolutely stop, and hold them back from, success. Things like “I’m not good enough”, “I’m not smart enough”, “I’m not lucky enough”, and the worst, “I’m not worthy” are but a few of the self-limiting beliefs I have encountered. We carry them with us like rocks in a knapsack, and then use them to sabotage our success. So, how twisted is that? </p>

                                        </TabPane>
                                        <TabPane tabId="3">
                                            <p>Benjamin Franklin, inventor, statesman, writer, publisher and economist relates in his autobiography that early in his life he decided to focus on arriving at moral perfection. He made a list of 13 virtues, assigning a page to each. Under each virtue he wrote a summary that gave it fuller meaning. Then he practiced each one for a certain length of time. To make these virtues a habit, Franklin can up with a method to grade himself on his daily actions.</p>

                                        </TabPane>
                                        <TabPane tabId="4">
                                            <p>The other virtues practice in succession by Franklin were silence, order, resolution, frugality, industry, sincerity, Justice, moderation, cleanliness, tranquility, chastity and humility. For the summary order he followed a little scheme of employing his time each day. From five to seven each morning he spent in bodily personal attention, saying a short prayer, thinking over the day’s business and resolutions.</p>

                                        </TabPane>
                                    </TabContent>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

            </div>
        );
    }
}
export default Tabss;
