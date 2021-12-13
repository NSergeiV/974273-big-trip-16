import {createElement} from '../utils/render.js';

const createTripEventsListTemplate = () => (
  `<ul class="trip-events__list">
  </ul>`
);

export default class TripEventsListVeiw {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createTripEventsListTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
