
//should be called datetime :/
import { 
    diffInMinutesProps,
    diffInSecondsProps,
    addInMinutesProps,
    applyLocalTimezoneProps
} from './time.types';

export const diffInMinutes : diffInMinutesProps = (dt1, dt2) => {
    let diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
}

export const diffInSeconds : diffInSecondsProps = (dt1, dt2) => {
    const diff = (dt2.getTime() - dt1.getTime()) / 1000;
    return Math.abs(Math.round(diff));
}

export const addInMinutes : addInMinutesProps = (dt, minutes) => new Date(dt.getTime() + (minutes*60*1000));

/**
 * Use this function to apply local timezone to date str that uses the follow format: Y-m-d H:i:s (yyyy-mm-dd hh:ii:ss) 
 * This avoid es2017 features. update it if use es2017 in future versions
 * @param {string} dateStr 
 * @returns string
 */
export const localTimezoneToDateStr : applyLocalTimezoneProps = (dateStr) => {
    const pad = (n: number) => (n < 10 ? "0" : "") + n;

    // 1. Parse "Y-m-d H:i:s"
    const parts = dateStr.split(" ");
    const dateParts = parts[0].split("-").map(Number);
    const timeParts = parts[1].split(":").map(Number);

    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];
    const hour = timeParts[0];
    const minute = timeParts[1];
    const second = timeParts[2];

    // 2. Construct Date in UTC
    const utcDate = new Date(Date.UTC(year, month - 1, day, hour, minute, second));

    // 3. Convert to local time (browser TZ)
    const localYear   = utcDate.getFullYear();
    const localMonth  = pad(utcDate.getMonth() + 1);
    const localDay    = pad(utcDate.getDate());
    const localHour   = pad(utcDate.getHours());
    const localMinute = pad(utcDate.getMinutes());
    const localSecond = pad(utcDate.getSeconds());

    // 4. Return string yyyy-MM-dd HH:mm:ss
    return `${localYear}-${localMonth}-${localDay} ${localHour}:${localMinute}:${localSecond}`;
};