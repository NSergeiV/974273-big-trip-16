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
      if (type === point.eventType) {
        return point.travelTimeMinute;
      }
    }).map((item) => item.travelTimeMinute).reduce(reducer));
  });
  return expenses;
};
