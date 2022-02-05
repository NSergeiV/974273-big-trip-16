import AbstractView from './abstract-view.js';
import {MenuItem} from '../const.js';

const createButtonNewPointTemplate = () => (
  `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" data-click="${MenuItem.NEW_EVENT}" type="button">
      New event
  </button>`
);

export default class ButtonNewPointView extends AbstractView {

  get template() {
    return createButtonNewPointTemplate();
  }

  setButtonNewClickHandler = (callback) => {
    this._callback.newButtonClick = callback;
    this.element.addEventListener('click', this.#newButtonClickHandler);
  }

  #newButtonClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.newButtonClick(evt.target.dataset.click);
  }
}
