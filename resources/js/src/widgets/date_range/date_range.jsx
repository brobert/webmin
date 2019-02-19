import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { extendObservable, reaction, transaction, toJS } from 'mobx';
import { observer } from 'mobx-react';
import { TabContent, TabPane, Modal, ModalHeader, ModalBody, ModalFooter, Tooltip, Card, CardBody, CardTitle, PopoverHeader, PopoverBody, Button, Popover, Row, Col } from 'reactstrap';

import MainButton from './main_button.jsx';
import PeriodsList from './periods_list.jsx';

class DateRange extends Component {

    constructor(props) {
        super(props);
        
        this._key = new Date().getMilliseconds();

        this.onClickHandler = this.onClickHandler.bind(this);
        this.togglePoppover = this.togglePoppover.bind(this);
        this.toggleModal = this.toggleModal.bind(this);

        extendObservable(this, {
            btnLabel: '-----',
            isOpened: false,
            modalOpened: false,
            sysPeriods: [],
            userPeriods: [],
        });
    }

    togglePoppover() {
        this.isOpened = !this.isOpened;
    }

    toggleModal() {
        this.modalOpened = !this.modalOpened;
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
                    onClickHandler={this.toggleModal}
                    label={this.btnLabel}
                />
                <Modal isOpen={this.modalOpened} toggle={this.toggleModal} className={this.props.className}>
                    <ModalHeader toggle={this.toggleModal}>Modal title
                    </ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col>
                                <PeriodsList />
                            </Col>
                            <Col>
                                Custom callendars
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