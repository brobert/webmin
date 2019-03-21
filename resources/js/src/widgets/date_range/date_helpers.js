import Moment from 'moment';


/**
 * @method getPresentDay
 * @description return current date
 */
export function getPresentDay() {
    return new Date(new Date().setHours(0, 0, 0, 0));
};


export function parseStringedDate(date, options = { toString: true}) {

    if (!date) {
        return null;
    }
    const dateFormat='YYYY-MM-DD';

    let pDate = new Date(date);

    if (pDate instanceof Date && !isNaN(pDate)) {
        return Moment(pDate);
    }

    // temporary date
    let tDate = null;
    switch (date) {
        case 'today':
            tDate = getPresentDay();
            break;
        case 'yesterday':
            tDate = getPresentDay();
            tDate.setDate(tDate.getDate() -1);
            tDate = Moment(tDate);
            break;
        case 'week_begin':
            tDate = calc_last_x_date_part(getPresentDay(), 0, 'week', 'begin');
            break;
        case 'month_begin':
            tDate = calc_last_x_date_part(getPresentDay(), 0, 'month', 'begin');
            break;
        case 'year_begin':
            tDate = calc_last_x_date_part(getPresentDay(), 0, 'year', 'begin');
            break;
        case 'quarter_begin':
            tDate = calc_last_x_date_part(getPresentDay(), 0, 'quarter', 'begin');
            break;
        case 'quarter_end':
            tDate = calc_last_x_date_part(getPresentDay(), 0, 'quarter', 'end');
            break;
    }

    // based on http://git.pl.hurra.com/cgit/OWA-DW/tree/lib/OWA/DW/Date.pm
    // #TODO write some tests
    // some tests for this functionality https://jsfiddle.net/BRobert/vz28tguk/91/
    if (!tDate) {
        tDate = getPresentDay();
        let regRes = date.match(/(\d+)_(day|week|month|year)_ago/);
        if (regRes) {
            tDate = Moment(tDate).subtract(regRes[1], `${regRes[2]}s`);
        }

        regRes = date.match(/last_(\d+)_(week|month|year|quarter)_(begin|end)/);
        if (regRes) {
            tDate = calc_last_x_date_part(tDate, regRes[1], regRes[2], regRes[3]);
        }
    }

    return options.toString ? Moment(tDate).format(dateFormat) : tDate;
}

export function calc_last_x_date_part(dt, count, period, type) {

    dt = Moment(dt).subtract(count, period);

    if (type === 'begin') {
        switch (period) {
            case 'week':
                dt.subtract(dt.day()-1, 'day');
                break
            case 'month':
                dt.date(1);
                break;
            case 'quarter':
                dt.date(1).month(3 * (Math.floor( dt.month() /3 ) ));
                break;
            case 'year':
                dt.month(0).date(1);
                break;
        }
    } else if (type === 'end') {
        switch (period) {
            case 'week':
                dt.add(7 - dt.day(), 'day')
                break
            case 'month':
                dt.date(1).add(1,'month').subtract(1, 'day');
                break;
            case 'quarter':
                dt.date(1).month(3 * (Math.floor(dt.month() / 3))).add(3, 'month').subtract(1, 'day');
                break;
            case 'year':
                dt.date(31).month(11); // january: 0, february: 1, december: 11
                break;
        }
    }

    return dt;
}


export default {
    parseStringedDate
}