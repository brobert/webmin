 import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import { extendObservable, reaction, transaction, toJS } from 'mobx';
import { observer } from 'mobx-react';
import { Nav, NavItem, NavLink, TabContent, TabPane, Tooltip, Card, CardBody, CardTitle, PopoverHeader, PopoverBody,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Popover, Row, Col } from 'reactstrap';
import classnames from 'classnames';

import { SysPeriods } from './config.js';

class PeriodsList extends Component {
    
    constructor(props) {
        super(props);

        this.tabbordericon = this.tabbordericon.bind(this);
        this.periodChange = this.periodChange.bind(this);
        this.nocaretdemo = this.nocaretdemo.bind(this);

        extendObservable(this, {
            userPeriods: props.userPeriods,
            sysPeriods: props.sysPeriods,
            tabActive: 'sys',
        });
        
        this.state = {
          nocaretdemo: false,
          caretdemo:false,
          dropdownlg:false,
          dropdownsm:false,
          dropdownmd:false,
          dropdownleft:false,
          dropdownright:false,
          dropdownup:false,
          dropdowndone:false
        };
    }

    nocaretdemo() {
        this.setState(prevState => ({
            nocaretdemo: !prevState.nocaretdemo
        }));
    }

    tabbordericon(tab) {
        if (this.tabActive !== tab) {
            this.tabActive = tab;
        }
    }

    periodChange(period, scope) {
        this.props.onChange(`${scope}:${period}`)
        console.info(`>>> periodChange: ${scope}:${period}`);
    }

    render() {

        const sysContent = [];
        const userContent = [];

        const periodChange = this.periodChange;

        console.info('sysPeriods/userPeriods: ', toJS(this.sysPeriods), toJS(this.userPeriods));

        const sysPeriods = toJS(this.sysPeriods);
        const userPeriods = toJS(this.userPeriods);

        if (sysPeriods && sysPeriods.length) {
            sysPeriods.forEach(function(period) {
                sysContent.push (
                    <li key={period.name} className="list-group-item my-0 py-0">
                        <NavLink onClick={() => { periodChange(period.name, 'system'); }}>
                            {period.name}
                        </NavLink>
                    </li>
                );
            });
        }

        if (userPeriods && userPeriods.length) {
            userPeriods.forEach(function(period) {
                userContent.push (
                    <li key={period.name} className="list-group-item my-0 py-0">
                        <NavLink onClick={() => { periodChange(period.name, 'user'); }}>
                            {period.name}
                        </NavLink>
                    </li>
                );
            });
        }

        return (
            <div className="tab date-periods">
                <Row>
                    <Col xs="8">
                        <Nav tabs>
                            <NavItem >
                                <NavLink className={classnames({ active: this.tabActive === 'sys' })} onClick={() => { this.tabbordericon('sys'); }}>
                                    <i className="fa fa-home"></i> System
                                </NavLink>
                            </NavItem>

                            <NavItem >
                                <NavLink className={classnames({ active: this.tabActive === 'user' })} onClick={() => { this.tabbordericon('user'); }}>
                                    <i className="fa fa-user"></i> User
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Col>
                    <Col xs="4">
                        <Dropdown isOpen={this.state.nocaretdemo} toggle={this.nocaretdemo}>
                            <DropdownToggle  color="success">
                                Dropdown
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>Action</DropdownItem>
                                <DropdownItem>Another Action</DropdownItem>
                                <DropdownItem >Something else here</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>Separated link</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </Col>
                </Row>
                <TabContent activeTab={this.tabActive} >
                    <TabPane tabId="sys">
                        <ul className="list-group">
                        {sysContent}
                        </ul>
                    </TabPane>

                    <TabPane tabId="user">
                        <ul className="list-group">
                            {userContent}
                        </ul>
                    </TabPane>

                </TabContent>
            </div>
        );
    }
}

export default observer(PeriodsList);