import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import { extendObservable, reaction, transaction, toJS } from 'mobx';
import { observer } from 'mobx-react';
import { Nav, NavItem, NavLink, TabContent, TabPane, Tooltip, Card, CardBody, CardTitle, PopoverHeader, PopoverBody, Button, Popover, Row, Col } from 'reactstrap';
import classnames from 'classnames';

import { SysPeriods } from './config.js';

class PeriodsList extends Component {
    
    constructor(props) {
        super(props);

        this.tabbordericon = this.tabbordericon.bind(this);
        this.periodChange = this.periodChange.bind(this);

        extendObservable(this, {
            userPeriods: false,
            sysPeriods: SysPeriods,
            tabActive: 'sys'
        });

        this.getUserPeriods();
    }

    getUserPeriods() {
        axios.get(
            `/res/config/user/date_periods`, 
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        .then(
            (res) => {
                console.info('>>>>>>>>>>> /res/config/user/date_periods', res.data);
                this.userPeriods = res.data;
            }
        );
    }

    tabbordericon(tab) {
        if (this.tabActive !== tab) {
            this.tabActive = tab;
        }
    }
    
    periodChange(period, scope) {
        console.info(`>>> periodChange: ${scope}:${period}`);
    }

    render() {

        const sysPeriods = [];
        const userPeriods = [];

        const periodChange = this.periodChange;

        _.keys(SysPeriods).forEach(function(period) {
            sysPeriods.push (
                <li
                    key={period}
                >
                    <NavLink onClick={() => { periodChange(period, 'system'); }}>
                        {SysPeriods[period].label}
                    </NavLink>
                </li>
            );
        });

        if (toJS(this.userPeriods) && _.keys(toJS(this.userPeriods)).length) {
            const periods = toJS(this.userPeriods);
            _.keys(periods).forEach(function(period) {
                console.info('------- _.keys(periods)', period);
                userPeriods.push (
                    <li key={period}>
                        <NavLink
                            onClick={() => { periodChange(period, 'user'); }}
                        >
                            {periods[period].label}
                        </NavLink>
                    </li>
                );
            });
        }

        return (
            <div className="tab date-periods">
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
                <TabContent activeTab={this.tabActive} >
                    <TabPane tabId="sys">
                        <ul>
                        {sysPeriods}
                        </ul>
                    </TabPane>

                    <TabPane tabId="user">
                        <ul>
                            {userPeriods}
                        </ul>
                    </TabPane>

                </TabContent>
            </div>
        );
    }
}

export default observer(PeriodsList);