import { 
    diffInMinutesProps,
    diffInSecondsProps,
    addInMinutesProps
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