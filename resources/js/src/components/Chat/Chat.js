import React, { Component } from 'react';
import { Row, Col, NavItem, Nav, Dropdown, Breadcrumb, BreadcrumbItem, DropdownItem, DropdownMenu, DropdownToggle, TabContent, TabPane } from 'reactstrap';
import ScrollArea from 'react-scrollbar';

import axios from 'axios';
import './Chat.css';

class Chat extends React.Component {

  constructor(props) {
    super(props);
    this.dropdownbarOpen = this.dropdownbarOpen.bind(this);
    this.toggle = this.toggle.bind(this);
    this.chatdropdown = this.chatdropdown.bind(this);
    this.state = {
      activeTab: '',
      name: '',
      chatdropdown: false,
      dropdownbarOpen: false,
      chats: [],
    };
  }

  componentWillMount() {
    axios.get(`/res/chat`)
    .then(res => {
      const chats = res.data.data;
      const activeTab = "1";
      const name = 'Alicja'
      this.setState({
    	  chats,
    	  activeTab,
    	  name,
      });
    });
  }
  dropdownbarOpen() {
    this.setState(prevState => ({
        dropdownbarOpen: !prevState.dropdownbarOpen

    }));
  }
  
  dropdownItemClick(a, s, d) {
    console.info('---dropdownItemClick', a, s, d);
  }
  
  toggle(tab, name) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
        name: name
      });
    }
  }
  chatdropdown() {
    this.setState(prevState => ({
      chatdropdown: !this.state.chatdropdown
    }));
  }
  render() {
    console.info('STATE CHANGE', this.state);
    
    let chatSwitchers = [];
    let chatContents = [];
    
    chatSwitchers = this.state.chats.map(
      (chat) => {
        return (
                <NavItem onClick={() => { this.toggle(`${chat.id}`, chat.user.name); }} className="pt-15 pr-15">
                <div className="media px-2">
                  <div className="position-relative">
                    <img className="img-fluid mr-15 avatar-small" src="assets/images/team/01.jpg" alt="" />
                    <i className="avatar-online bg-info"></i>
                  </div>
                  <div className="media-body">
                    <h6 className="mt-0 ">{chat.user.name}  <small className="float-right">{chat.created_at}</small> </h6>
                    <div className="float-right text-muted">
                      <i className="fa fa-volume-up pr-1"></i>
                    </div>
                    <p className="text-muted"><i className="fa fa-check pr-1"></i> Hello </p>
                  </div>
                </div>
                <div className="divider mt-15" />
              </NavItem>
        );
      }
    );

    return (
      <div>
        <div className="page-title">
          <Row>
            <Col sm={6}>
              <h4 className="mb-0"> Chat</h4>
            </Col>
            <Col sm={6}>
              <Breadcrumb className="float-left float-sm-right">
                <BreadcrumbItem><a href="javascript:void(0);">Home</a></BreadcrumbItem>
                <BreadcrumbItem active>Chat</BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
        </div>
        {/* main body */}
        <Row>
          <Col lg={12} className="mb-30">
            <div className="card card-statistics h-100">
              <div className="card-body">
                <TabContent id="left-tabs-example" >
                  <Row>
                    <Col xl={4} lg={4}>
                      <div className="widget-search mb-30">
                        <i className="fa fa-search" />
                        <input type="search" className="form-control" placeholder="Search...." />
                      </div>
                      <ScrollArea speed={1} className="max-h-600">
                        <Nav className="list-unstyled d-block">
                          {chatSwitchers.length ? chatSwitchers : null}
                        </Nav>
                      </ScrollArea>
                    </Col>

                    <Col xl={8} lg={8}>
                      <div className="chats-topbar mb-30">
                        <div className="d-block d-md-flex justify-content-between">
                          <div className="d-block">
                            <h6 className="mb-0">{this.state.name}</h6>
                          </div>
                          <div className="d-block d-md-flex">
                            <a className="text-muted pr-40" href="javascript:void(0);"> <i className="fa fa-video-camera"></i></a>
                            <div className="btn-group info-drop">
                              <Dropdown isOpen={this.state.dropdownbarOpen} toggle={this.dropdownbarOpen}>
                                <DropdownToggle className="dropdown-toggle-split text-muted" id="dropdown-no-caret">
                                  <i className="ti-more" />
                                </DropdownToggle>
                                <DropdownMenu>
                                  <DropdownItem tag="rename" onClick={this.dropdownItemClick}><i className="text-primary ti-pencil"></i> Rename</DropdownItem>
                                  <DropdownItem tag="unread" onClick={this.dropdownItemClick}><i className="text-dark ti-announcement"></i> Mark as Unread</DropdownItem>
                                  <DropdownItem tag="close" onClick={this.dropdownItemClick}><i className="text-success ti-close"></i> Close</DropdownItem>
                                  <DropdownItem tag="delete" onClick={this.dropdownItemClick}><i className="text-secondary ti-trash"></i> Delete</DropdownItem>
                                </DropdownMenu>
                              </Dropdown>
                            </div>
                          </div>
                        </div>
                      </div>
                      <ScrollArea speed={0.8} className="max-h-600">
                        <TabContent activeTab={this.state.activeTab}>
                          <TabPane tabId="1">
                            <div className="chats">
                              <div className="chat-wrapper clearfix">
                                <div className="chat-avatar">
                                  <img className="img-fluid avatar-small" src="assets/images/team/01.jpg" alt="true" />
                                </div>
                                <div className="chat-body p-3">
                                  <p>How can we help? We are here for you!</p>
                                </div>
                              </div>
                              <div className="chat-wrapper chat-me clearfix">
                                <div className="chat-body p-3">
                                  <p>Hey John, I am looking for the best admin template.Could you please help me to find it out?It should be angular 5 bootstrap compatible. Hey John, I am looking for the best admin template.Could you please help me to find it out?It should be angular 5 bootstrap compatible. Hey John, I am looking for the best admin template.Could you please help me to find it out?It should be angular 5 bootstrap compatible. Hey John, I am looking for the best admin template.Could you please help me to find it out?It should be angular 5 bootstrap compatible. Hey John, I am looking for the best admin template.Could you please help me to find it out?It should be angular 5 bootstrap compatible.</p>
                                </div>
                              </div>
                              <span className="time d-block mt-20px mb-20 text-center text-gray">3:15PM </span>
                              <div className="chat-wrapper clearfix">
                                <div className="chat-avatar">
                                  <img className="img-fluid avatar-small" src="assets/images/team/01.jpg" alt="true" />
                                </div>
                                <div className="chat-body bg-light p-3">
                                  <p>How can we help? We are here for you!</p>
                                </div>
                              </div>
                              <div className="chat-wrapper chat-me clearfix">
                                <div className="chat-body p-3">
                                  <p>The sad thing is the majority of people have no clue.</p>
                                </div>
                              </div>
                              <div className="chat-wrapper chat-me clearfix">
                                <div className="chat-body p-3">
                                  <p>So how do we get clarity? Simply by asking.</p>
                                </div>
                              </div>
                              <span className="time d-block mt-20px mb-20 text-center text-gray">3:20PM </span>
                              <div className="chat-wrapper clearfix">
                                <div className="chat-avatar">
                                  <img className="img-fluid avatar-small" src="assets/images/team/01.jpg" alt="true" />
                                </div>
                                <div className="chat-body bg-light p-3">
                                  <p>They have no clarity. When asked the question, responses will be superficial at best, and at worst.</p>
                                </div>
                              </div>
                              <div className="chat-wrapper chat-me clearfix">
                                <div className="chat-body p-3">
                                  <p>Simply by asking.</p>
                                </div>
                              </div>
                              <span className="time d-block mt-20px mb-20 text-center text-gray">3:30PM </span>
                              <div className="chat-wrapper clearfix">
                                <div className="chat-avatar">
                                  <img className="img-fluid avatar-small" src="assets/images/team/01.jpg" alt="true" />
                                </div>
                                <div className="chat-body bg-light p-3">
                                  <p>They have no clarity.</p>
                                </div>
                              </div>
                            </div>
                          </TabPane>
                          <TabPane tabId="2">
                            <div className="chats">
                              <div className="chat-wrapper clearfix">
                                <div className="chat-avatar">
                                  <img className="img-fluid avatar-small" src="assets/images/team/02.jpg" alt="true" />
                                </div>
                                <div className="chat-body p-3">
                                  <p>Second So, make the decision to move forward. Commit your decision to paper just to bring.</p>
                                </div>
                              </div>
                              <div className="chat-wrapper chat-me clearfix">
                                <div className="chat-body p-3">
                                  <p>Having clarity of purpose and a clear picture of what you.</p>
                                </div>
                              </div>
                              <span className="time d-block mt-20px mb-20 text-center text-gray">3:15PM </span>
                              <div className="chat-wrapper clearfix">
                                <div className="chat-avatar">
                                  <img className="img-fluid avatar-small" src="assets/images/team/02.jpg" alt="true" />
                                </div>
                                <div className="chat-body bg-light p-3">
                                  <p>You will sail along until you collide with an immovable object, after which you will sink</p>
                                </div>
                              </div>
                              <div className="chat-wrapper chat-me clearfix">
                                <div className="chat-body p-3">
                                  <p>The sad thing is the majority of people have no clue.</p>
                                </div>
                              </div>
                              <div className="chat-wrapper chat-me clearfix">
                                <div className="chat-body p-3">
                                  <p>So how do we get clarity? Simply by asking.</p>
                                </div>
                              </div>
                              <span className="time d-block mt-20px mb-20 text-center text-gray">3:20PM </span>
                              <div className="chat-wrapper clearfix">
                                <div className="chat-avatar">
                                  <img className="img-fluid avatar-small" src="assets/images/team/02.jpg" alt="true" />
                                </div>
                                <div className="chat-body bg-light p-3">
                                  <p>They have no clarity. When asked the question, responses will be superficial at best, and at worst.</p>
                                </div>
                              </div>
                              <div className="chat-wrapper chat-me clearfix">
                                <div className="chat-body p-3">
                                  <p>Simply by asking.</p>
                                </div>
                              </div>
                              <span className="time d-block mt-20px mb-20 text-center text-gray">3:30PM </span>
                              <div className="chat-wrapper clearfix">
                                <div className="chat-avatar">
                                  <img className="img-fluid avatar-small" src="assets/images/team/02.jpg" alt="true" />
                                </div>
                                <div className="chat-body bg-light p-3">
                                  <p>They have no clarity.</p>
                                </div>
                              </div>
                            </div>
                          </TabPane>
                          <TabPane tabId="3">
                            <div className="chats">
                              <div className="chat-wrapper clearfix">
                                <div className="chat-avatar">
                                  <img className="img-fluid avatar-small" src="assets/images/team/03.jpg" alt="true" />
                                </div>
                                <div className="chat-body p-3">
                                  <p>How can we help? We are here for you!</p>
                                </div>
                              </div>
                              <div className="chat-wrapper chat-me clearfix">
                                <div className="chat-body p-3">
                                  <p>Hey John, I am looking for the best admin template.Could you please help me to find it out?It should be angular 5 bootstrap compatible.</p>
                                </div>
                              </div>
                              <span className="time d-block mt-20px mb-20 text-center text-gray">3:15PM </span>
                              <div className="chat-wrapper clearfix">
                                <div className="chat-avatar">
                                  <img className="img-fluid avatar-small" src="assets/images/team/03.jpg" alt="true" />
                                </div>
                                <div className="chat-body bg-light p-3">
                                  <p>How can we help? We are here for you!</p>
                                </div>
                              </div>
                              <div className="chat-wrapper chat-me clearfix">
                                <div className="chat-body p-3">
                                  <p>The sad thing is the majority of people have no clue.</p>
                                </div>
                              </div>
                              <div className="chat-wrapper chat-me clearfix">
                                <div className="chat-body p-3">
                                  <p>So how do we get clarity? Simply by asking.</p>
                                </div>
                              </div>
                              <span className="time d-block mt-20px mb-20 text-center text-gray">3:20PM </span>
                              <div className="chat-wrapper clearfix">
                                <div className="chat-avatar">
                                  <img className="img-fluid avatar-small" src="assets/images/team/03.jpg" alt="true" />
                                </div>
                                <div className="chat-body bg-light p-3">
                                  <p>They have no clarity. When asked the question, responses will be superficial at best, and at worst.</p>
                                </div>
                              </div>
                              <div className="chat-wrapper chat-me clearfix">
                                <div className="chat-body p-3">
                                  <p>Simply by asking.</p>
                                </div>
                              </div>
                              <span className="time d-block mt-20px mb-20 text-center text-gray">3:30PM </span>
                              <div className="chat-wrapper clearfix">
                                <div className="chat-avatar">
                                  <img className="img-fluid avatar-small" src="assets/images/team/03.jpg" alt="true" />
                                </div>
                                <div className="chat-body bg-light p-3">
                                  <p>They have no clarity.</p>
                                </div>
                              </div>
                            </div>
                          </TabPane>
                          <TabPane tabId="4">
                            <div className="chats">
                              <div className="chat-wrapper clearfix">
                                <div className="chat-avatar">
                                  <img className="img-fluid avatar-small" src="assets/images/team/04.jpg" alt="true" />
                                </div>
                                <div className="chat-body p-3">
                                  <p>Third So, make the decision to move forward. Commit your decision to paper just to bring.</p>
                                </div>
                              </div>
                              <div className="chat-wrapper chat-me clearfix">
                                <div className="chat-body p-3">
                                  <p>Having clarity of purpose and a clear picture of what you.</p>
                                </div>
                              </div>
                              <span className="time d-block mt-20px mb-20 text-center text-gray">3:15PM </span>
                              <div className="chat-wrapper clearfix">
                                <div className="chat-avatar">
                                  <img className="img-fluid avatar-small" src="assets/images/team/04.jpg" alt="true" />
                                </div>
                                <div className="chat-body bg-light p-3">
                                  <p>You will sail along until you collide with an immovable object, after which you will sink</p>
                                </div>
                              </div>
                              <div className="chat-wrapper chat-me clearfix">
                                <div className="chat-body p-3">
                                  <p>The sad thing is the majority of people have no clue.</p>
                                </div>
                              </div>
                              <div className="chat-wrapper chat-me clearfix">
                                <div className="chat-body p-3">
                                  <p>So how do we get clarity? Simply by asking.</p>
                                </div>
                              </div>
                              <span className="time d-block mt-20px mb-20 text-center text-gray">3:20PM </span>
                              <div className="chat-wrapper clearfix">
                                <div className="chat-avatar">
                                  <img className="img-fluid avatar-small" src="assets/images/team/04.jpg" alt="true" />
                                </div>
                                <div className="chat-body bg-light p-3">
                                  <p>They have no clarity. When asked the question, responses will be superficial at best, and at worst.</p>
                                </div>
                              </div>
                              <div className="chat-wrapper chat-me clearfix">
                                <div className="chat-body p-3">
                                  <p>Simply by asking.</p>
                                </div>
                              </div>
                              <span className="time d-block mt-20px mb-20 text-center text-gray">3:30PM </span>
                              <div className="chat-wrapper clearfix">
                                <div className="chat-avatar">
                                  <img className="img-fluid avatar-small" src="assets/images/team/04.jpg" alt="true" />
                                </div>
                                <div className="chat-body bg-light p-3">
                                  <p>They have no clarity.</p>
                                </div>
                              </div>
                            </div>
                          </TabPane>
                        </TabContent>
                      </ScrollArea>
                      <div className="chats mt-30">
                        <div className="chat-wrapper mb-0 clearfix">
                          <div className="chat-input">
                            <div className="chat-input-icon">
                              <a className="text-muted" href="javascript:void(0);"><i className="fa fa-smile-o" /> </a>
                            </div>
                            <textarea className="form-control input-message scrollbar" placeholder="Type here...*" rows={2} name="message" defaultValue={""} />
                          </div>
                          <div className="chat-button">
                            <a href="javascript:void(0);"> <i className="ti-clip" /></a>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </TabContent>
              </div>
            </div>
          </Col>
        </Row>
      </div>

    )
  }
}
export default Chat;