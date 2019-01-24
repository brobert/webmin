/* eslint-disable */
import { getNextOccur, getLastOccur, getFormattedTime, getFormattedSchedule } from 'utils/cron';
/**
 * Cronable collects methods for models with cron setups, eg alert.schedule, rc_schedule...
 * Check utils/cron for more.
 *
 *  OWAModel.extends({
 *      cronable: true // makes model cronable
 *  });
 */

const cronKeys = [ 'minute', 'hour', 'day_of_month', 'month', 'day_of_week' ];

export default {
    cronToString()      { return getFormattedSchedule(this.toCronObj(), ...arguments) },
    cronFormattedTime() { return getFormattedTime(this.toCronObj(), ...arguments) },
    cronNextOccur()     { return getNextOccur(this.toCronObj(), ...arguments) },
    cronLastOccur()     { return getLastOccur(this.toCronObj(), ...arguments) },

    toCronObj() { return this.pick(cronKeys) }
}
