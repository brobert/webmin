 import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import { extendObservable, reaction, transaction, toJS } from 'mobx';
import { observer } from 'mobx-react';
import { Nav, NavItem, NavLink, TabContent, TabPane, Tooltip, Card, CardBody, CardTitle, PopoverHeader, PopoverBody,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Popover, Row, Col } from 'reactstrap';
import classnames from 'classnames';

import { parseStringedDate } from './date_helpers';


class PeriodsList extends Component {

    constructor(props) {
        super(props);

        this.tabbordericon = this.tabbordericon.bind(this);
        this.periodChange = this.periodChange.bind(this);
        this.nocaretdemo = this.nocaretdemo.bind(this);
        this.getDatesStringForPeriod = this.getDatesStringForPeriod.bind(this);
        this.changeCompare = this.changeCompare.bind(this);

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
        this.props.onChange(period);
        console.info(`>>> periodChange: ${scope}:${period}`);
    }

    getDatesStringForPeriod(period) {
        const begin = parseStringedDate(period.begin);
        const end = parseStringedDate(period.end);

        return (begin === end) ? begin : `${begin} - ${end}`;
    }

    changeCompare(compareMode) {
        console.info(`>>> changeCompare: ${compareMode}`);
    }

    render() {

        const periodChange = this.periodChange;

        const sysPeriods = toJS(this.sysPeriods);
        const userPeriods = toJS(this.userPeriods);

        const self = this;

        const renderPeriodItems = (periods, scope) => {

            if (periods.length === 0) {
                return null;
            }

            return (
                <TabPane tabId={scope}>
                    <ul className="list-group">
                        {
                            periods.map(
                                (period) => {
                                    const activeClass = period.name === this.props.period ? 'active' : '';
                                    return (
                                        <li key={period.name} className={`list-group-item my-0 py-0 ${activeClass}`}>
                                            <NavLink onClick={() => { periodChange(period.name, scope); }}>
                                                {period.name}
                                                <span
                                                    style={{fontFamily: "'Roboto Mono', monospace"}}
                                                    className="float-right"
                                                >
                                                    {self.getDatesStringForPeriod(period)}
                                                </span>
                                            </NavLink>
                                        </li>
                                    );
                                }
                            )
                        }
                    </ul>
                </TabPane>
            );
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

                            {
                                userPeriods.length
                                ? (<NavItem >
                                        <NavLink className={classnames({ active: this.tabActive === 'user' })} onClick={() => { this.tabbordericon('user'); }}>
                                            <i className="fa fa-user"></i> User
                                        </NavLink>
                                    </NavItem>
                                )
                                : null
                            }
                        </Nav>
                    </Col>
                    <Col xs="4">
                        { this.props.compare 
                            ? (
                                <Dropdown isOpen={this.state.nocaretdemo} toggle={this.nocaretdemo}>
                                    <DropdownToggle  color="success">
                                        Compare
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem onClick={() => this.changeCompare('off')}>Off</DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem onClick={() => this.changeCompare('prevPeriod')}>Previous period</DropdownItem>
                                        <DropdownItem onClick={() => this.changeCompare('prevYear')}>Previous year</DropdownItem>
                                        <DropdownItem onClick={() => this.changeCompare('custom')}>Custom range</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            ) : null
                        }
                    </Col>
                </Row>
                <TabContent activeTab={this.tabActive} >
                    {renderPeriodItems(sysPeriods, 'sys', this.tabActive)}
                    {renderPeriodItems(userPeriods, 'user', this.tabActive)}
                </TabContent>
            </div>
        );
    }
}

export default observer(PeriodsList);