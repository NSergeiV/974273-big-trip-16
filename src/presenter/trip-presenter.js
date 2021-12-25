import TripInfoVeiw from '../view/trip-main-info-view.js';
import TripMainTableStaticView from '../view/trip-main-trip-controls-view.js';
import FormTripSortPointsView from '../view/form-trip-sort-trip-events-view.js';
import TripEventsListVeiw from '../view/trip-events-list-view.js';
import TripEventsListComponentVeiw from '../view/trip-events-list-component-view.js';
import RoutePointView from '../view/route-point-view.js';
import FormEditPointView from '../view/edit-point-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import {RenderPosition, render, replace} from '../utils/render.js';

export default class TripPresenter {
  #boardContainer = null;
  #boardPoints = [];
  #headerMenu = null;
  #buttonNewEvent = null;
  #tripEvents = null;

  #ListEmptyView = new ListEmptyView();

  constructor(boardContainer) {
    this.#boardContainer = boardContainer;
    this.#headerMenu = boardContainer.querySelector('.trip-main');
    this.#buttonNewEvent = boardContainer.querySelector('.trip-main__event-add-btn');
    this.#tripEvents = boardContainer.querySelector('.trip-events');
  }

  init = (boardPoints) => {
    this.#boardPoints = [...boardPoints];
    if (this.#boardPoints.length === 0) {
      return this.#renderNoPoints();
    }

    this.#renderTripInfo(this.#boardPoints);
    this.#renderTripMainTableStatic();
    this.#renderFormTripSortPoints();
    this.#renderTripPointsList();
  }

  #renderTripMainTableStatic = () => {
    render(this.#buttonNewEvent, new TripMainTableStaticView(), RenderPosition.BEFOREBEGIN);
  }

  #renderFormTripSortPoints = () => {
    // const tripEvents = this.#boardContainer.querySelector('.trip-events');
    const titleTripEvents = this.#tripEvents.querySelector('h2');

    render(titleTripEvents, new FormTripSortPointsView(), RenderPosition.AFTEREND);
  }

  #renderTripInfo = (dataPoints) => {
    render(this.#headerMenu, new TripInfoVeiw(dataPoints), RenderPosition.AFTERBEGIN);
  }

  #renderTripPointsList = () => {
    const formTripSort = this.#tripEvents.querySelector('.trip-events__trip-sort');
    const pointList = new TripEventsListVeiw();

    render(formTripSort, pointList, RenderPosition.AFTEREND);
    this.#boardPoints.forEach((point) => this.#renderPoint(pointList.element, point));
  }

  #renderPoint = (pointListElement, point) => {
    const pointListComponent = new TripEventsListComponentVeiw();
    const pointComponent = new RoutePointView(point);
    const pointEditComponent = new FormEditPointView(point);

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

    pointComponent.setEditClickHandler(() => {
      replaceCardToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setFormClickHandler(() => {
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setFormSubmitHandler(() => {
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    });


    render(pointListComponent.element, pointComponent, RenderPosition.BEFOREEND);
    render(pointListElement, pointListComponent, RenderPosition.BEFOREEND);
  }

  #renderNoPoints = () => {
    render(this.#tripEvents, this.#ListEmptyView, RenderPosition.AFTERBEGIN);
  }
}
