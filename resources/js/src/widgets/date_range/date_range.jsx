import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { extendObservable, reaction, transaction, toJS } from 'mobx';
import { observer } from 'mobx-react';
import { TabContent, TabPane, Tooltip, Card, CardBody, CardTitle, PopoverHeader, PopoverBody, Button, Popover, Row, Col } from 'reactstrap';

import MainButton from './main_button.jsx';
import PeriodsList from './periods_list.jsx';

class DateRange extends Component {

    constructor(props) {
        super(props);
        
        this._key = new Date().getMilliseconds();

        this.onClickHandler = this.onClickHandler.bind(this);
        this.togglePoppover = this.togglePoppover.bind(this);

        extendObservable(this, {
            btnLabel: '-----',
            isOpened: false,
            sysPeriods: [],
            userPeriods: [],
        });
    }

    togglePoppover() {
        this.isOpened = !this.isOpened;
    }
    onClickHandler() {
        const ms = new Date().getMilliseconds();
        this.btnLabel = `++ selected dates [${ms}]+++`;
    }

    render() {

        return (
            <div className="date-range-selector">
                <MainButton 
                    id={`drs_${this._key}`}
                    onClickHandler={this.togglePoppover}
                    label={this.btnLabel}
                />
                <Popover placement="auto" isOpen={this.isOpened} target={`drs_${this._key}`} toggle={this.togglePoppover} hideArrow>
                  <PopoverBody>
                      <Row>
                          <Col>
                              <PeriodsList />
                          </Col>
                          <Col>
                              Custom callendars
                          </Col>
                      </Row>
                  </PopoverBody>
                </Popover>
            </div>
        );
    }
}

export default observer(DateRange);