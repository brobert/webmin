import React, { Component } from 'react';
import { NavItem } from 'reactstrap';

class ChatSwitcher extends React.Component {

    render() {

        const chat = this.props.chat;
        const authUser = this.props.authUser;
        const userNames = chat.users.filter(user => user.id !== authUser.id).map(user => user.name).join(', ');

        return (
            <NavItem onClick={() => { this.props.onClick(`${chat.id}`, chat.name); }} className="pt-15 pr-15 active">
                <div className="media px-2">
                    <div className="position-relative">
                        <img className="img-fluid mr-15 avatar-small" src="assets/images/team/01.jpg" alt="Ala 100" />
                        <i className="avatar-online bg-info"></i>
                    </div>
                    <div className="media-body">
                        <h6 className="mt-0 ">{userNames} <small className="float-right">{chat.created_at}</small> </h6>
                        <p className="text-muted"><i className="fa fa-check pr-1"></i> Hello </p>
                    </div>
                </div>
                <div className="divider mt-15" />
            </NavItem>
        );
    }
}

export default ChatSwitcher;