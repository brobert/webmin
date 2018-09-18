import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Row, Col, NavItem, Nav, Dropdown, Breadcrumb, BreadcrumbItem, DropdownItem, DropdownMenu, DropdownToggle, TabContent, TabPane } from 'reactstrap';
import PageTitle from './../Layout/PageTitle';
import ScrollArea from 'react-scrollbar';

//import axios from 'axios';
import ChatSwitcher from './ChatSwitcher';
import ChatContent from './ChatContent';
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
            authUser: false,
            msgText: "",
            unauthorized: false,
        };
    }

    componentWillMount() {
        axios.get(`/res/chat`)
        .then(
            (res) => {
                const chats = res.data.data.data;
                const activeTab = chats.length ? `${chats[0].id}` : "";
                const name = chats.length ? chats[0].name : "";
                const authUser = res.data.meta.user || {};
                this.setState({
                    chats,
                    activeTab,
                    name,
                    authUser
                });

                console.info('componentWillMount::state: ', this.state);
            }
        ).catch(
            (error) => {
                console.info('UUUUUUUUUUUUUUUU', error.response);
                this.setState({
                    unauthorized: true,
                });
            }
        );
    }

    dropdownbarOpen() {
        this.setState(
            prevState => ({
                dropdownbarOpen: !prevState.dropdownbarOpen
            })
        );
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

    setMessage(event) {
        this.setState({
            msgText: event.target.value,
        });
    }

    storeChatMessage() {

        axios.post(`/res/chat_message?chatid=${this.state.activeTab}`, {text: this.state.msgText})
        .then(
            (res) => {
                this.setState({
                    msgText: '',
                });
            }
        )
    }

    /**
     * Render method
     */
    render() {
        console.info('STATE CHANGE', this.state);
        
        if (this.state.unauthorized) {
            return (
                <Redirect to={{pathname: '/login'}}/>
    		);
        }

        let chatSwitchers = [];
        let chatContents = [];

        this.state.chats.map(
            (chat, idx) => {
                chatSwitchers.push (
                    <ChatSwitcher 
                        key={`${idx}`} 
                        onClick={this.toggle} 
                        chat={chat} 
                        authUser={this.state.authUser} 
                    />
                );

                chatContents.push(
                    <ChatContent 
                        key={`${idx}`} 
                        chat={chat} 
                        active={parseInt(chat.id,10) === parseInt(this.state.activeTab, 10)} 
                        authUser={this.state.authUser} 
                    />
                );
            }
        );

        return (
            <div>
                <PageTitle pageTitle="Chat" crumbs={[{to: 'chat', title: 'Chat'}]} />
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
                                                    {chatContents.length ? chatContents : <h1>EMPTY CHATS</h1>}
                                                </TabContent>
                                            </ScrollArea>
                                            <div className="chats mt-30">
                                                <div className="chat-wrapper mb-0 clearfix">
                                                    <div className="chat-input">
                                                        <div className="chat-input-icon">
                                                            <a className="text-muted" href="javascript:void(0);"><i className="fa fa-smile-o" /> </a>
                                                        </div>
                                                        <textarea 
                                                            className="form-control input-message scrollbar"
                                                            placeholder="Type here...*"
                                                            rows={2}
                                                            name="message"
                                                            defaultValue={this.state.msgText}
                                                            onChange={(ev) => this.setMessage(ev)}
                                                        />
                                                    </div>
                                                    <div className="chat-button">
                                                        <a href="javascript:void(0);" onClick={(ev) => this.storeChatMessage(ev)}> <i className="ti-clip" /></a>
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
