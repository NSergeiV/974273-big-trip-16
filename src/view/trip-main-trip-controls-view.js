import AbstractView from './abstract-view.js';

const createTripMainControlsTemplate = () => (
  `

    `
);

export default class TripMainControlsView extends AbstractView {

  get template() {
    return createTripMainControlsTemplate();
  }
}
