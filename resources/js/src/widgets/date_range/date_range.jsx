import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { extendObservable, reaction, transaction, toJS } from 'mobx';
import { observer } from 'mobx-react';
import { TabContent, TabPane, Modal, ModalHeader, ModalBody, ModalFooter, Tooltip, Card, CardBody, CardTitle, PopoverHeader, PopoverBody, Button, Popover, Row, Col } from 'reactstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import MainButton from './main_button.jsx';
import PeriodsList from './periods_list.jsx';

class DateRange extends Component {

    constructor(props) {
        super(props);

        this._key = new Date().getMilliseconds();

        this.onClickHandler = this.onClickHandler.bind(this);
        this.togglePoppover = this.togglePoppover.bind(this);
        this.toggleModal = this.toggleModal.bind(this);

        this.daterangeChange = this.daterangeChange.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.handleChangeStart = this.handleChangeStart.bind(this);

        extendObservable(this, {
            btnLabel: '-----',
            isOpened: false,
            modalOpened: false,
            sysPeriods: [],
            userPeriods: [],
            startDate: moment(),
            endDate: moment(),
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
            }
        );
    }

    togglePoppover() {
        this.isOpened = !this.isOpened;
    }

    toggleModal() {
        this.modalOpened = !this.modalOpened;
    }

    onClickHandler(value = '') {
        const ms = new Date().getMilliseconds();
        this.btnLabel = `++ selected dates [${value}]+++`;
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
                    onClickHandler={this.toggleModal}
                    label={this.btnLabel}
                />
                <Modal isOpen={this.modalOpened} toggle={this.toggleModal} className={`${this.props.className} modal-lg`}>
                    <ModalHeader toggle={this.toggleModal}>Modal title
                    </ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col>
                                <PeriodsList
                                    sysPeriods={this.sysPeriods}
                                    userPeriods={this.userPeriods}
                                    onChange={this.onClickHandler}
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
                        <Button color="primary" onClick={this.toggleModal}>Do Something</Button>{' '}
                        <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default observer(DateRange);