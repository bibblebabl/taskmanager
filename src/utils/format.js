import moment from 'moment';

export const getDateMonthFormated = (timestamp) => moment(timestamp).format(`DD MMMM YYYY`);

export const getDateTimeString = (timestamp) => moment(timestamp).format(`DD/MM/YYYY`);
