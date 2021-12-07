import dayjs from 'dayjs';
import isSameOrAfter from '../../node_modules/dayjs/plugin/isSameOrAfter.js';
import {getRandomInteger} from './common.js';
dayjs.extend(isSameOrAfter);

const generateDate = (date) => {
  const maxDaysGap = 21520;
  const maxDriveGap = 2880;
  const isDate = (!date) ? dayjs().add(getRandomInteger(-maxDaysGap, maxDaysGap), 'm') : dayjs(date).add(getRandomInteger(1, maxDriveGap), 'm');

  return isDate;
};

const calculate = (d, h, m) => {
  if (d !== 0) {
    const day = dayjs().date(d).format('DD');
    const hour = dayjs().hour(h).format('HH');
    const minute = dayjs().minute(m).format('mm');

    return `${day}D ${hour}H ${minute}M`;
  } else if (h !== 0) {
    const hour = dayjs().hour(h).format('HH');
    const minute = dayjs().minute(m).format('mm');
    return `${hour}H ${minute}M`;
  } else {
    const minute = dayjs().minute(m).format('mm');
    return `${minute}M`;
  }
};

export const isPontFuture = (dueDate) => dueDate === null ? false : dayjs(dueDate).isSameOrAfter(dayjs());

export const isPointFinished = (dueDate) => dueDate === null ? false : dayjs(dueDate).isBefore(dayjs());

export const takeDate = () => {
  const dateStart = generateDate();
  const eventDate = dayjs(dateStart).format('DD/MM/YY HH:mm');
  const eventDateStart = dayjs(dateStart).format('MMM DD');
  const eventTimeStart = dayjs(dateStart).format('HH:mm');
  const dateEnd = generateDate(dateStart);
  const eventDateEnd = dayjs(dateEnd).format('DD/MM/YY HH:mm');
  const eventTimeEnd = dayjs(dateEnd).format('HH:mm');
  const travelTimeMinute = dateEnd.diff(dateStart, 'm');
  const travelTimeHour = dateEnd.diff(dateStart, 'h');
  const travelTimeDay = dateEnd.diff(dateStart, 'd');

  const travelTime = calculate(travelTimeDay, travelTimeHour, travelTimeMinute);

  return {
    dateStart,
    dateEnd,
    eventDate,
    eventDateStart,
    eventTimeStart,
    travelTime,
    eventDateEnd,
    eventTimeEnd,
    travelTimeMinute,
  };
};

export const compare = (a, b) => {
  const rezalt = (dayjs(a.dateStart).isAfter(dayjs(b.dateStart))) ? 1 : -1;
  return rezalt;
};

export const sortPointTime = (pointA, pointB) => {
  const rezalt = (pointB.travelTimeMinute > pointA.travelTimeMinute) ? 1 : -1;
  return rezalt;
};

export const sortPointPrice = (pointA, pointB) => {
  const rezalt = (pointB.eventPrice > pointA.eventPrice) ? 1 : -1;
  return rezalt;
};

export const isDatesEqual = (dateA, dateB) => (dateA === null && dateB === null) ? true : dayjs(dateA).isSame(dateB, 'D');
