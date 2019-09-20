import moment from 'moment';
import {WEEK_MS} from '../data/constants';

export const getDateMonthFormated = (timestamp) => moment(timestamp).format(`DD MMMM YYYY`);

export const getDateTimeString = (timestamp) => moment(timestamp).format(`DD/MM/YYYY`);

export const getRangeDateTimeSting = (timestamp) => moment(timestamp).format(`YYYY-MM-DD`);

export const getDefaultStatisticDateRange = () => {
  const currentDate = Date.now();

  return {
    today: currentDate,
    weekAgo: currentDate - WEEK_MS
  };
};
