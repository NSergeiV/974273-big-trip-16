import AbstractView from './abstract-view.js';
import dayjs from 'dayjs';

const countPrice = (list) => {
  let summ = 0;
  list.forEach((item) => {summ += item.eventPrice;});
  return summ;
};

const createTripInfoTemplate = (data) => {

  const priceSumm = countPrice(data);

  const citys = data.map((item) => item.eventCity);

  const numberPoints = data.length - 1;

  return `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${data.length <= 3 ? citys.join(' &mdash; ') : `${citys[0]}&nbsp;&hellip;&nbsp;${citys[citys.length - 1]}`}</h1>

        <p class="trip-info__dates">${dayjs(data[0].dateStart).format('MMM DD')}&nbsp;&mdash;&nbsp;${dayjs(data[0].dateStart).format('MMM') === dayjs(data[numberPoints].dateStart).format('MMM') ? dayjs(data[numberPoints].dateStart).format('DD') : dayjs(data[numberPoints].dateStart).format('MMM DD')}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${priceSumm}</span>
      </p>
    </section>`;
};

export default class TripInfoVeiw extends AbstractView {

  #routePoints = null;

  constructor(routePoints) {
    super();
    this.#routePoints = routePoints;
  }

  get template() {
    return createTripInfoTemplate(this.#routePoints);
  }
}
