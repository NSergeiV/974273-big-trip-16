import TripInfoVeiw from '../view/trip-main-info-view.js';
import TripMainTableStaticView from '../view/trip-main-trip-controls-view.js';
import FormTripSortPointsView from '../view/form-trip-sort-trip-events-view.js';
import TripEventsListVeiw from '../view/trip-events-list-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import {RenderPosition, render} from '../utils/render.js';
import PointPresenter from './point-presenter.js';
import {updateItem} from '../utils/common.js';
import {SortType} from '../const.js';
import {sortPointTime, sortPointPrice} from '../utils/task.js';

export default class TripPresenter {
  #boardContainer = null;
  #boardPoints = [];
  #headerMenu = null;
  #buttonNewEvent = null;
  #tripEvents = null;
  #pointPresenterCollection = new Map();
  #currentSortType = SortType.DEFAULT;
  #sourcedBoardPoints = [];

  #ListEmptyView = new ListEmptyView();
  #pointList = new TripEventsListVeiw();
  #sortComponent = null;

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
    this.#sourcedBoardPoints = [...boardPoints];

    this.#renderTripInfo(this.#boardPoints);
    this.#renderTripMainTableStatic();
    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#pointPresenterCollection.forEach((presenter) => presenter.resetView());
  }

  #handlePointChange = (updatePoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatePoint);
    this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints, updatePoint);
    this.#pointPresenterCollection.get(updatePoint.id).renderPoint(updatePoint);
  }

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SortType.SORT_TIME:
        this.#boardPoints.sort(sortPointTime);
        break;
      case SortType.SORT_PRICE:
        this.#boardPoints.sort(sortPointPrice);
        break;
      default:
        this.#boardPoints = [...this.#sourcedBoardPoints];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointsList();
    this.#renderBoard();
  }

  #renderTripMainTableStatic = () => {
    render(this.#buttonNewEvent, new TripMainTableStaticView(), RenderPosition.BEFOREBEGIN);
  }

  #renderFormTripSortPoints = () => {
    const titleTripEvents = this.#tripEvents.querySelector('h2');
    this.#sortComponent = new FormTripSortPointsView(this.#currentSortType);

    render(titleTripEvents, this.#sortComponent, RenderPosition.AFTEREND);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
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

  #renderBoard = () => {
    this.#renderFormTripSortPoints();
    this.#renderTripPointsList();
  }
}
