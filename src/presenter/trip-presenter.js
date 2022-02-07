import TripInfoVeiw from '../view/trip-main-info-view.js';
import FormTripSortPointsView from '../view/form-trip-sort-trip-events-view.js';
import TripEventsListVeiw from '../view/trip-events-list-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import LoadingView from '../view/loading-view.js';
import {RenderPosition, render, remove} from '../utils/render.js';
import PointPresenter, {State as PointPresenterViewState} from './point-presenter.js';
import PointNewPresenter from './point-new-presenter.js';
import {filter} from '../utils/filter.js';
import {SortType, UpdateType, UserAction, FilterType} from '../const.js';
import {sortPointTime, sortPointPrice} from '../utils/task.js';
import {compare} from '../utils/common.js';

export default class TripPresenter {
  #boardContainer = null;
  #headerMenu = null;
  #buttonNewEvent = null;
  #tripEvents = null;
  #pointNewPresenter = null;
  #pointPresenterCollection = new Map();
  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.EVERYTHING;
  #noPointComponent = null;
  #buttonNewPointView = null;

  #ls = null;

  #pointsModel = null;
  #filterModel = null;
  #tripInfo = null;

  #pointList = new TripEventsListVeiw();
  #loadingComponent = new LoadingView();
  #isLoading = true;
  #sortComponent = null;

  constructor(boardContainer, pointsModel, filterModel) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#headerMenu = boardContainer.querySelector('.trip-main');
    this.#tripEvents = boardContainer.querySelector('.trip-events');

    this.#pointNewPresenter = new PointNewPresenter(this.#pointList, this.#handleViewAction);

  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.SORT_TIME:
        return filteredPoints.sort(sortPointTime);
      case SortType.SORT_PRICE:
        return filteredPoints.sort(sortPointPrice);
    }

    return filteredPoints.sort(compare);
  }

  init = (test = true) => {

    this.#ls = test;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#renderBoard();
  }

  destroy = (test) => {

    this.#ls = test;

    this.#clearBoard({resetSortType: true});

    remove(this.#pointList);
    remove(this.#sortComponent);

    this.#pointsModel.removeObserver(this.#handleModelEvent);
    this.#filterModel.removeObserver(this.#handleModelEvent);
  }

  createTask = (callback) => {
    this.#pointNewPresenter.init(callback);
  }

  #handleModeChange = () => {
    this.#pointPresenterCollection.forEach((presenter) => presenter.resetView());
  }

  #handleViewAction = async (actionType, updateType, update) => {

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenterCollection.get(update.id).setViewState(PointPresenterViewState.SAVING);
        // this.#pointsModel.updatePoint(updateType, update);\
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch(err) {
          this.#pointPresenterCollection.get(update.id).setViewState(PointPresenterViewState.ABORTING);
        }
        break;
      case UserAction.ADD_POINT:
        this.#pointNewPresenter.setSaving();
        //this.#pointsModel.addPoint(updateType, update);
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch(err) {
          this.#pointNewPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenterCollection.get(update.id).setViewState(PointPresenterViewState.DELETING);
        // this.#pointsModel.deletePoint(updateType, update);
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointPresenterCollection.get(update.id).setViewState(PointPresenterViewState.ABORTING);
        }
        break;
    }
  }

  #handleModelEvent = (updateType, data) => {

    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenterCollection.get(data.id).renderPoint(data);
        break;
      case UpdateType.MINOR:
        this.#ls = true;
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#ls = true;
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
    }
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  }

  #renderFormTripSortPoints = () => {
    const titleTripEvents = this.#tripEvents.querySelector('h2');
    this.#sortComponent = new FormTripSortPointsView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(titleTripEvents, this.#sortComponent, RenderPosition.AFTEREND);
  }

  #renderTripInfo = (dataPoints) => {
    this.#tripInfo = new TripInfoVeiw(dataPoints);
    render(this.#headerMenu, this.#tripInfo, RenderPosition.AFTERBEGIN);
  }


  #renderPoint = (pointData) => {
    const pointPresenter = new PointPresenter(this.#pointList, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.renderPoint(pointData);
    this.#pointPresenterCollection.set(pointData.id, pointPresenter);
  }

  #renderTripPointsList = () => {
    const formTripSort = this.#tripEvents.querySelector('.trip-events__trip-sort');

    render(formTripSort, this.#pointList, RenderPosition.AFTEREND);

    this.points.forEach((pointData) => this.#renderPoint(pointData));
  }

  #renderLoading = () => {
    render(this.#tripEvents, this.#loadingComponent, RenderPosition.AFTERBEGIN);
  }

  #renderNoPoints = () => {
    this.#noPointComponent = new ListEmptyView(this.#filterType);
    render(this.#tripEvents, this.#noPointComponent, RenderPosition.AFTERBEGIN);
  }

  #clearBoard = ({resetSortType = false} = {}) => {

    this.#pointNewPresenter.destroy();

    this.#pointPresenterCollection.forEach((presenter) => presenter.destroy());
    this.#pointPresenterCollection.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);

    if (this.#ls) {
      if (this.#tripInfo) {
        remove(this.#tripInfo);
      }
    }

    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  #renderBoard = () => {
    const points = this.points;
    const pointCount = points.length;

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (pointCount === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderFormTripSortPoints();
    this.#renderTripPointsList();

    if (this.#pointsModel.points.length !== 0) {
      if (this.#ls) {
        this.#renderTripInfo(this.points);
      }
    }
  }
}
