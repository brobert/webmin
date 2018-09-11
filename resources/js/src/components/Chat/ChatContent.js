import React, { Component } from 'react';
import { TabPane } from 'reactstrap';

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

        axios.get(`/res/chat_message?chatid=${this.props.chat.id}`)
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
                    (message) => {
                        const messageTime = message.created_at.slice(11,16);
                        const messageDate = message.created_at.slice(0,10);
                        const showDate = lastDate !== messageDate;
                        if (lastTime !== messageTime || showDate) {
                            chatMessages.push(<span className="time d-block mt-20px mb-20 text-center text-gray">{showDate ? messageDate : ''} {messageTime} </span>)
                            lastTime = messageTime;
                            lastDate = messageDate;
                        }
                        if (message.user_id === authUser.id) {
                            chatMessages.push(
                                <div className="chat-wrapper chat-me clearfix">
                                    <div className="chat-body p-3">
                                        <p>{message.message}</p>
                                    </div>
                                </div>
                            );
                        } else {
                            chatMessages.push(
                                <div className="chat-wrapper clearfix">
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

        return (
            <TabPane tabId={`${chat.id}`}>
                <div className="chats chatView">
                    {chatMessages}
                </div>
            </TabPane>
        );
    }
}

export default ChatContent;