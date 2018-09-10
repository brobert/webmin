import React, { Component } from 'react';
import { TabPane } from 'reactstrap';

class ChatContent extends React.Component {

    render() {

        const chat = this.props.chat;
        const authUser = this.props.authUser;

        return (
            <TabPane tabId={`${chat.id}`}>
                <div className="chats chatView">
                    {
                        chat.messages.map(
                            (message) => {
                                if (message.user_id === authUser.id) {
                                    return (
                                        <div className="chat-wrapper chat-me clearfix">
                                            <div className="chat-body p-3">
                                                <p>{message.message}</p>
                                            </div>
                                        </div>
                                    );
                                }
                                return (
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
                        )
                    }
                    <span className="time d-block mt-20px mb-20 text-center text-gray">3:15PM </span>
                </div>
            </TabPane>
        );
    }
}

export default ChatContent;