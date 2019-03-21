import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { extendObservable, reaction, transaction, toJS } from 'mobx';
import { observer } from 'mobx-react';
import { TabContent, TabPane, Modal, ModalHeader, ModalBody, ModalFooter, Tooltip, Card, CardBody, CardTitle, PopoverHeader, PopoverBody, Button, Popover, Row, Col } from 'reactstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import _ from 'underscore';

import MainButton from './main_button.jsx';
import PeriodsList from './periods_list.jsx';
import { parseStringedDate } from './date_helpers';

class DateRange extends Component {

    constructor(props) {
        super(props);

        console.info('DateRange::constructor(props) ', props);
        this._key = new Date().getMilliseconds();

        this.onChangePeriod = this.onChangePeriod.bind(this);
        this.toggleSelectorModal = this.toggleSelectorModal.bind(this);
        this.applySelection = this.applySelection.bind(this);

        this.daterangeChange = this.daterangeChange.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.handleChangeStart = this.handleChangeStart.bind(this);

        extendObservable(this, {
            btnLabel: '-----',
            modalOpened: false,
            sysPeriods: [],
            userPeriods: [],
            startDate: props.begin ? parseStringedDate(props.begin, {toString:false}) : moment(),
            endDate: props.end ? parseStringedDate(props.end, {toString:false}) : moment(),
            period: false,

            mapPeriods: {},

            tmpStartDate: false,
            tmpEndDate: false,
        });

        this.getPeriods();
    }

    getPeriods() {
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
                this.sysPeriods = res.data.system;
                this.userPeriods = res.data.user;

                this.preparePeriods();
                this.getCurrentPeriodFromDates();
            }
        );
    }

    preparePeriods() {

    	const process = (periods) => {

    		if(_.isArray(periods)) {
    			periods.forEach((period) => {

    				if (this.mapPeriods[period.name]) {
    					return;
    				}

    				period.dateBegin = parseStringedDate(period.begin, {toString:true});
    				period.dateEnd = parseStringedDate(period.end, {toString:true});
    				this.mapPeriods[period.name] = period;
    			});

    		}
    	}

    	process(this.sysPeriods);
    	process(this.userPeriods);
    }

    getCurrentPeriodFromDates() {
        this.period = this.sysPeriods[0].name;

        let period = _.findKey(this.mapPeriods, (a) => {
        	console.info(`----> FindKey: [${a.name}] ${a.dateBegin}, ${this.startDate.format('YYYY-MM-DD')}, ${a.dateEnd}, ${this.endDate.format('YYYY-MM-DD')}`);
        	return a.dateBegin === this.startDate.format('YYYY-MM-DD') && a.dateEnd === this.endDate.format('YYYY-MM-DD');
        });
        console.info('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>this.sysPeriods[0] ', this.period, period);
    }

    // Open or close selector modal window
    toggleSelectorModal() {
        this.modalOpened = !this.modalOpened;
    }

    applySelection() {
        this.btnLabel = `++ selected dates [${this.period}]+++`;
        this.toggleSelectorModal();
    }

    onChangePeriod(value = '') {
        const ms = new Date().getMilliseconds();
//        this.btnLabel = `++ selected dates [${value}]+++`;
        this.period = value;
    }

    daterangeChange({ startDate, endDate }) {

        startDate = startDate || this.startDate
        endDate = endDate || this.endDate

        if (startDate.isAfter(endDate)) {
            endDate = startDate
        }

        this.startDate = startDate;
        this.endDate = endDate;
    }

    handleChangeStart(startDate) {
        this.daterangeChange({ startDate })
    }

    handleChangeEnd(endDate) {
        this.daterangeChange({ endDate })
    }

    render() {

        return (
            <div className="date-range-selector">
                <MainButton
                    id={`drs_${this._key}`}
                    onClickHandler={this.toggleSelectorModal}
                    label={this.btnLabel}
                />
                <Modal isOpen={this.modalOpened} toggle={this.toggleSelectorModal} className={`${this.props.className} modal-lg`}>
                    <ModalHeader toggle={this.toggleSelectorModal}>Modal title
                    </ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col>
                                <PeriodsList
                                    sysPeriods={this.sysPeriods}
                                    userPeriods={this.userPeriods}
                                    onChange={this.onChangePeriod}
                                    period = {this.period}
                                    compare = {this.props.compare}
                                />
                            </Col>
                            <Col>
                                <div className="input-group" style={{flexWrap: 'nowrap'}} data-date="23/11/2018" data-date-format="mm/dd/yyyy">
                                    <DatePicker
                                        selected={this.startDate}
                                        selectsStart
                                        className="form-control"
                                        startDate={this.startDate}
                                        endDate={this.endDate}
                                        onChange={this.handleChangeStart}
                                        dateFormat="YYYY-MM-DD"
                                    />
                                    <span style={{lineHeight: '3.4rem'}} >&nbsp;&nbsp;To &nbsp;&nbsp;</span>
                                    <DatePicker
                                        selected={this.endDate}
                                        selectsEnd
                                        className="form-control"
                                        startDate={this.startDate}
                                        endDate={this.endDate}
                                        onChange={this.handleChangeEnd}
                                        dateFormat="YYYY-MM-DD"
                                    />
                                </div>
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.applySelection}>Apply</Button>{' '}
                        <Button color="secondary" onClick={this.toggleSelectorModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default observer(DateRange);