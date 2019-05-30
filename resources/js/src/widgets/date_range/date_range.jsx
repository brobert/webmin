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

import DatePeriodStore from './date_period_store.js';
import constants, { CUSTOM_RANGE } from './constants.js';

class DateRange extends Component {

    /**
     * Component Constructor
     * @param {any} props
     */
    constructor(props) {
        super(props);

        console.info('>>> DateRange::constructor(props) ', constants, CUSTOM_RANGE, props);
        this._key = new Date().getMilliseconds();

        this.onChangePeriod = this.onChangePeriod.bind(this);
        this.toggleSelectorModal = this.toggleSelectorModal.bind(this);
        this.applySelection = this.applySelection.bind(this);

        this.daterangeChange = this.daterangeChange.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.handleChangeStart = this.handleChangeStart.bind(this);

        extendObservable(this, {

            get dateBegin() {
                const curr = this.currentTmp || this.current;
//                console.info(`extendObservable::dateBegin: ${curr.getStrDateBegin()}`, curr.getDateBegin());
                return toJS(curr.getDateBegin());
            },
            get dateEnd() {
                const curr = this.currentTmp || this.current;
//                console.info(`extendObservable::dateEnd: ${curr.getStrDateEnd()}`, curr.getDateEnd());
                return toJS(curr.getDateEnd());
            },

            get currentPeriod() {
                return this.currentTmp ? this.currentTmp.name : this.current.name;
            },

            btnLabel: '-----',
            modalOpened: false,
            sysPeriods: [],
            userPeriods: [],
            period: false,
            current: false,
            currentTmp: false,
            mapPeriods: {},

        });

        this.current = new DatePeriodStore({begin: props.begin, end: props.end, name: props.period || CUSTOM_RANGE})

        this.getPeriods();
    }

    /**
     * Load periods from serwer
     * Calculate datePeriods
     * Try to match selected periods based on dateBegin and dateEnd
     */
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

//                console.info('this.current', this.current.getStrDateBegin(), this.current.getStrDateEnd());
//                console.info('this.currentTmp', this.currentTmp.getStrDateBegin(), this.currentTmp.getStrDateEnd());
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

                    const dps = new DatePeriodStore(toJS(period), {compare: this.props.compare});
                    this.mapPeriods[period.name] = dps;
                });

            }
        }

        process(this.sysPeriods);
        process(this.userPeriods);
    }

    getCurrentPeriodFromDates() {


        let periodName = _.findKey(this.mapPeriods, (dps) => {
            return (
                dps.getStrDateBegin() === this.current.getStrDateBegin() &&
                dps.getStrDateEnd() === this.current.getStrDateEnd()
            );
        });

        if (!this.mapPeriods[this.current.name]) {
            this.mapPeriods[this.current.name] = this.current;
        }

        if (!periodName) {
            periodName = CUSTOM_RANGE;
        }
        this.current = this.mapPeriods[periodName];
        this.currentTmp = this.mapPeriods[periodName];
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
        this.currentTmp = this.mapPeriods[value] ? this.mapPeriods[value] : this.currentTmp;
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
        console.info('====> handleChangeStart::keys(this.mapPeriods): ',_.keys(this.mapPeriods));
        this.daterangeChange({ startDate })
    }

    handleChangeEnd(endDate) {
        this.daterangeChange({ endDate })
    }

    render() {

    	console.info('this.dateBegin: ', this.dateBegin);
    	console.info('this.dateEnd: ', this.dateEnd);

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
                                    period = {this.currentPeriod}
                                    compare = {this.props.compare}
                                />
                            </Col>
                            <Col>
                                <div className="input-group" style={{flexWrap: 'nowrap'}} data-date="23/11/2018" data-date-format="mm/dd/yyyy">
                                    <DatePicker
                                        selected={this.dateBegin}
                                        selectsStart
                                        className="form-control"
                                        startDate={this.dateBegin}
                                        endDate={this.dateEnd}
                                        onChange={this.handleChangeStart}
                                        dateFormat="YYYY-MM-DD"
                                    />
                                    <span style={{lineHeight: '3.4rem'}} >&nbsp;&nbsp;To &nbsp;&nbsp;</span>
                                    <DatePicker
                                        selected={this.dateEnd}
                                        selectsEnd
                                        className="form-control"
                                        startDate={this.dateBegin}
                                        endDate={this.dateEnd}
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
