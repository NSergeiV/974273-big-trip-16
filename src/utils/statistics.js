import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

export const removeRepetitions = (items) => [...new Set(items)];

export const addUpPrices = (types, points) => {

  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  const expenses = new Array;
  types.forEach((type) => {
    expenses.push(points.filter((point) => {
      if (type === point.eventType) {
        return point.eventPrice;
      }
    }).map((item) => item.eventPrice).reduce(reducer));
  });
  return expenses;
};

export const searchAllTrips = (types, points) => {
  const numberMovements = new Array;
  types.forEach((type) => {
    const allTypes = points.filter((point) => type === point);
    numberMovements.push(allTypes.length);
  });
  return numberMovements;
};

export const searchAllTime = (types, points) => {

  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  const expenses = new Array;
  types.forEach((type) => {
    expenses.push(points.filter((point) => {
      const date1 = dayjs(point.dateEnd);
      const date2 = dayjs(point.dateStart);
      const travelTimeMinute = date1.diff(date2, 'm');

      if (type === point.eventType) {
        return travelTimeMinute;
      }
    }).map((item) => {
      const date1 = dayjs(item.dateEnd);
      const date2 = dayjs(item.dateStart);
      const travelTimeMinute = date1.diff(date2, 'm');

      return travelTimeMinute;
    }).reduce(reducer));
  });
  return expenses;
};
