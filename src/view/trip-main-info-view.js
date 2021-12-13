import {createElement} from '../utils/render.js';

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
        <h1 class="trip-info__title">${citys.join(' &mdash; ')}</h1>

        <p class="trip-info__dates">${data[0].eventDateStart}&nbsp;&mdash;&nbsp;${data[numberPoints].eventDateStart}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${priceSumm}</span>
      </p>
    </section>`;
};

export default class TripInfoVeiw {
  #element = null;
  #routePoints = null;

  constructor(routePoints) {
    this.#routePoints = routePoints;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createTripInfoTemplate(this.#routePoints);
  }

  removeElement() {
    this.#element = null;
  }
}
