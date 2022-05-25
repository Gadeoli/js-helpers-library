import { 
    diffInMinutesProps,
    diffInSecondsProps,
    addInMinutesProps
} from './time.types';

export const diffInMinutes = (props: diffInMinutesProps) => {
    const { dt1, dt2 } = props;
    let diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
}

export const diffInSeconds = (props: diffInSecondsProps) => {
    const { dt1, dt2 } = props;
    const diff = (dt2.getTime() - dt1.getTime()) / 1000;
    return Math.abs(Math.round(diff));
}

export const addInMinutes = (props: addInMinutesProps) => {
    const { date, minutes } = props;
    if(date){
        return new Date(date.getTime() + (minutes*60*1000));
    }
}