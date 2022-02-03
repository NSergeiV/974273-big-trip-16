import AbstractView from './abstract-view.js';

const createButtonNewPointTemplate = () => (
  `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">
      New event
  </button>`
);

export default class ButtonNewPointView extends AbstractView {

  get template() {
    return createButtonNewPointTemplate();
  }
}

// <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>
