import Moment from 'moment';
import _ from 'underscore';

import { extendObservable, reaction, transaction, toJS } from 'mobx';

import { COMPARE_OFF } from './constants.js';
import { parseStringedDate } from './date_helpers';


class DatePeriodStore {

    constructor(period, options = {compare: false}) {

        this.name = period.name;
        this.begin = period.begin;
        this.end = period.end;

        extendObservable(
            this,
            {
                compareMode: options.compare,
                compare: false
            }
        );

        reaction(
            () => this.compareMode,
            () => {
                this.recalculateCompare();
            }
        );
    }

    /**
     * recalculateCompare
     */
    recalculateCompare() {
        const compareMode = toJS(this.compareMode);
        if (!compareMode || compareMode === COMPARE_OFF) {
            this.compare = false;
            return;
        }
    }

    getBegin() {
        return this.begin;
    }

    getEnd() {
        return this.end;
    }

    getDateBegin() {
        if (!this.dateBegin) {
            this.dateBegin = this.parseDate(this.getBegin());
        }
        return this.dateBegin;
    }

    getDateEnd() {
        if (!this.dateEnd) {
            this.dateEnd = this.parseDate(this.getEnd());
        }
        return this.dateEnd;
    }

    getStrDateBegin() {
        if (!this.strDateBegin) {
            this.strDateBegin = this.getDateBegin().format('YYYY-MM-DD');
        }
        return this.strDateBegin;
    }

    getStrDateEnd() {
        if (!this.strDateEnd) {
            this.strDateEnd = this.getDateEnd().format('YYYY-MM-DD');
        }
        return this.strDateEnd;
    }

    parseDate(date) {
        const parsedDate = parseStringedDate(date, {toString: false});
        return parsedDate;
    }
};

export default DatePeriodStore;
