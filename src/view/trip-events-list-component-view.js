import {createElement} from '../utils/render.js';

const createTripEventsListComponentTemplate = () => (
  `<li class="trip-events__item">
  </li>`
);

export default class TripEventsListComponentVeiw {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createTripEventsListComponentTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
