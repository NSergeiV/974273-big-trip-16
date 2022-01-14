import TripInfoVeiw from '../view/trip-main-info-view.js';
import TripMainTableStaticView from '../view/trip-main-trip-controls-view.js';
import FormTripSortPointsView from '../view/form-trip-sort-trip-events-view.js';
import TripEventsListVeiw from '../view/trip-events-list-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import {RenderPosition, render} from '../utils/render.js';
import PointPresenter from './point-presenter.js';
import {updateItem} from '../utils/common.js';


export default class TripPresenter {
  #boardContainer = null;
  #boardPoints = [];
  #headerMenu = null;
  #buttonNewEvent = null;
  #tripEvents = null;
  #pointPresenterCollection = new Map();

  #ListEmptyView = new ListEmptyView();
  #pointList = new TripEventsListVeiw();

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

  #handleModeChange = () => {
    this.#pointPresenterCollection.forEach((presenter) => presenter.resetView());
  }

  #handlePointChange = (updatePoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatePoint);
    this.#pointPresenterCollection.get(updatePoint.id).renderPoint(updatePoint);
  }

  #renderTripMainTableStatic = () => {
    render(this.#buttonNewEvent, new TripMainTableStaticView(), RenderPosition.BEFOREBEGIN);
  }

  #renderFormTripSortPoints = () => {
    const titleTripEvents = this.#tripEvents.querySelector('h2');

    render(titleTripEvents, new FormTripSortPointsView(), RenderPosition.AFTEREND);
  }

  #renderTripInfo = (dataPoints) => {
    render(this.#headerMenu, new TripInfoVeiw(dataPoints), RenderPosition.AFTERBEGIN);
  }


  #renderPoint = (pointData) => {
    const pointPresenter = new PointPresenter(this.#pointList, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.renderPoint(pointData);
    this.#pointPresenterCollection.set(pointData.id, pointPresenter);
  }

  #clearPointsList = () => {
    this.#pointPresenterCollection.forEach((pointPresenter) => pointPresenter.destroy());
    this.#pointPresenterCollection.clear();
  }


  #renderTripPointsList = () => {
    const formTripSort = this.#tripEvents.querySelector('.trip-events__trip-sort');

    render(formTripSort, this.#pointList, RenderPosition.AFTEREND);

    this.#boardPoints.forEach((pointData) => this.#renderPoint(pointData));
  }

  #renderNoPoints = () => {
    render(this.#tripEvents, this.#ListEmptyView, RenderPosition.AFTERBEGIN);
  }
}
