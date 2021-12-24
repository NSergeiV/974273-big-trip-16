import TripInfoVeiw from '../view/trip-main-info-view.js';
import TripMainTableStaticView from '../view/trip-main-trip-controls-view.js';
import FormTripSortPointsView from '../view/form-trip-sort-trip-events-view.js';
//import FormEditPointView from './view/edit-point-view.js';
//import TripEventsListVeiw from './view/trip-events-list-view.js';
//import TripEventsListComponentVeiw from './view/trip-events-list-component-view.js';
//import RoutePointView from './view/route-point-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import {RenderPosition, render, replace} from '../utils/render.js';

export default class TripPresenter {
  #boardContainer = null;
  #boardPoints = [];
  #headerMenu = null;
  #buttonNewEvent = null;

  #ListEmptyView = new ListEmptyView();

  constructor(boardContainer) {
    this.#boardContainer = boardContainer;
    this.#headerMenu = boardContainer.querySelector('.trip-main');
    this.#buttonNewEvent = boardContainer.querySelector('.trip-main__event-add-btn');
  }

  init = (boardPoints) => {
    this.#boardPoints = [...boardPoints];
    if (this.#boardPoints.length === 0) {
      return this.#renderNoTasks();
    }

    this.#renderTripInfo(this.#boardPoints);
    this.#renderTripMainTableStatic();
    this.#renderFormTripSortPoints();
  }

  #renderTripMainTableStatic = () => {
    render(this.#buttonNewEvent, new TripMainTableStaticView(), RenderPosition.BEFOREBEGIN);
  }

  #renderFormTripSortPoints = () => {
    const tripEvents = this.#boardContainer.querySelector('.trip-events');
    const titleTripEvents = tripEvents.querySelector('h2');

    render(titleTripEvents, new FormTripSortPointsView(), RenderPosition.AFTEREND);
  }

  #renderTripInfo = (dataPoints) => {
    render(this.#headerMenu, new TripInfoVeiw(dataPoints), RenderPosition.AFTERBEGIN);
  }

  #renderNoTasks = () => {
    // Метод для рендеринга заглушки
    const tripEvents = this.#boardContainer.querySelector('.trip-events');
    render(tripEvents, this.#ListEmptyView, RenderPosition.AFTERBEGIN);
  }
}
