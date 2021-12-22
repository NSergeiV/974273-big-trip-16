//import TripInfoVeiw from './view/trip-main-info-view.js';
//import TripMainControlsView from './view/trip-main-trip-controls-view.js';
//import FormTripControlsView from './view/form-trip-sort-trip-events-view.js';
//import FormEditPointView from './view/edit-point-view.js';
//import TripEventsListVeiw from './view/trip-events-list-view.js';
//import TripEventsListComponentVeiw from './view/trip-events-list-component-view.js';
//import RoutePointView from './view/route-point-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import {RenderPosition, render, replace} from '../utils/render.js';

export default class TripPresenter {
  #boardContainer = null;

  #ListEmptyView = new ListEmptyView();

  #boardPoints = [];

  constructor(boardContainer) {
    this.#boardContainer = boardContainer;
  }

  init = (boardPoints) => {
    this.#boardPoints = [...boardPoints];
    if (this.#boardPoints.length === 0) {
      return this.#renderNoTasks();
    }

    this.#renderTripInfo(this.#boardPoints);

    const headerMenu = document.querySelector('.trip-main');
    const buttonNewEvent = headerMenu.querySelector('.trip-main__event-add-btn');
    const tripEvents = document.querySelector('.trip-events');
    const titleTripEvents = tripEvents.querySelector('h2');

    render(headerMenu, new TripInfoVeiw(tripPoints), RenderPosition.AFTERBEGIN);
    render(titleTripEvents, new FormTripControlsView(), RenderPosition.AFTEREND);
  }

  #renderTripMainTableStatic = () => {}

  #renderTripInfo = (dataPoints) => {}

  #renderNoTasks = () => {
    // Метод для рендеринга заглушки
    const tripEvents = this.#boardContainer.querySelector('.trip-events');
    render(tripEvents, this.#ListEmptyView, RenderPosition.AFTERBEGIN);
  }
}
