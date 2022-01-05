import TripEventsListComponentVeiw from '../view/trip-events-list-component-view.js';
import RoutePointView from '../view/route-point-view.js';
import FormEditPointView from '../view/edit-point-view.js';
import {RenderPosition, render, replace, remove} from '../utils/render.js';

export default class PointPresenter {
  #pointComponent = null;
  #pointEditComponent = null;
  #tripEventsListComponent = null;
  #pointListElement = null;
  #point = null;

  constructor(pointListElement) {
    this.#pointListElement = pointListElement;
  }

  renderPoint = (point) => {
    this.#point = point;
    // const pointListComponent = new TripEventsListComponentVeiw();
    this.#tripEventsListComponent = new TripEventsListComponentVeiw();
    this.#pointComponent = new RoutePointView(point);
    // this.#routePoint = new RoutePointView(point);
    this.#pointEditComponent = new FormEditPointView(point);

    const replaceCardToForm = () => {
      replace(pointEditComponent, pointComponent);
    };

    const replaceFormToCard = () => {
      replace(pointComponent, pointEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    this.#pointComponent.setEditClickHandler(this.#clickCardToForm);

    this.#pointEditComponent.setFormClickHandler(this.#clickFormToCard);

    this.#pointEditComponent.setFormSubmitHandler(this.#clickFormToCard);

    render(this.#tripEventsListComponent, this.#pointComponent, RenderPosition.BEFOREEND);
    render(this.#pointListElement, this.#tripEventsListComponent, RenderPosition.BEFOREEND);
    // render(this.#pointListElement, this.#pointComponent, RenderPosition.BEFOREEND);

    // remove(pointComponent);
    // remove(pointEditComponent);
  }

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToCard();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #replaceCardToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
  };

  #replaceFormToCard = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
  };

  #clickFormToCard = () => {
    this.#replaceFormToCard();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  }

  #clickCardToForm = () => {
    this.#replaceCardToForm();
    document.addEventListener('keydown', this.#onEscKeyDown);
  }
}
