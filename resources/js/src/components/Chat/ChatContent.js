import React, { Component } from 'react';
import { TabPane } from 'reactstrap';
import Loader from 'react-loader';

class ChatContent extends React.Component {

    /**
     * Component constructor
     */
    constructor(props) {
        super(props);
        this.state = {
            errMessage: false,
            loaded: false,
            chatMessages: [],
        };
    }

    /**
     * componentWillMount
     * Load chat messages when tab will be mounted to DOM
     */
    componentWillMount() {
        this.loadMessages();
    }

    /**
     * loadMessages
     * Load chat messages from DB
     */
    loadMessages() {

        this.setState({
            loaded: false,
        });

        axios.get(`/res/chat/${this.props.chat.id}/messages?__chatid=${this.props.chat.id}`)
        .then(
            (res) => {
                this.setState({
                    loaded: true,
                    chatMessages: res.data.data.data,
                });
            }
        );
    }

    /**
     * render
     * Render Chat messages
     */
    render() {

        const chat = this.props.chat;
        const authUser = this.props.authUser;
        let chatMessages = (
            <span className="d-block mt-20px mb-20 text-center text-gray">
                <h1><i class="fa fa-hourglass-3"></i></h1>
            </span>
        );

        if (this.state.loaded) {
            if (this.state.chatMessages.length) {
                let lastTime = '';
                let lastDate = '';
                chatMessages = [];
                this.state.chatMessages.forEach(
                    (message, idx) => {
                        
                        const messageTime = message.created_at.slice(11,16);
                        const messageDate = message.created_at.slice(0,10);
                        const showDate = lastDate !== messageDate;
                        
                        if (lastTime !== messageTime || showDate) {
                            const extraClass = showDate ? 'date' : '';
                            chatMessages.push(<span key={`${messageDate}_${messageTime}`} className={`time ${extraClass} d-block mt-20px mb-20 text-center text-gray`}>{showDate ? messageDate : ''} {messageTime} </span>)
                            lastTime = messageTime;
                            lastDate = messageDate;
                        }
                        
                        if (message.user_id === authUser.id) {
                            chatMessages.push(
                                <div key={`${idx}`} className="chat-wrapper chat-me clearfix">
                                    <div className="chat-body p-3">
                                        <p>{message.message}</p>
                                    </div>
                                </div>
                            );
                        } else {
                            chatMessages.push(
                                <div key={`${idx}`} className="chat-wrapper clearfix">
                                    <div className="chat-avatar">
                                        <img className="img-fluid avatar-small" src="assets/images/team/01.jpg" alt={message.user.name} />
                                    </div>
                                    <div className="chat-body p-3">
                                        <p>{message.message}</p>
                                    </div>
                                </div>
                            );
                        }
                    }
                )
            }
        }

        const chatViewStyle = {
            minHeight: '10vh',
        };

        return (
            <TabPane key={chat.id} tabId={`${chat.id}`}>
                <div className="chats chatView" style={chatViewStyle}>
                <Loader loaded={this.state.loaded}>
                    {chatMessages}
                    </Loader>
                </div>
            </TabPane>
        );
    }
}

export default ChatContent;