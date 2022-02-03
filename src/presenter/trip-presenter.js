import TripInfoVeiw from '../view/trip-main-info-view.js';
// import TripMainTableStaticView from '../view/trip-main-trip-controls-view.js';
import FormTripSortPointsView from '../view/form-trip-sort-trip-events-view.js';
import TripEventsListVeiw from '../view/trip-events-list-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import {RenderPosition, render, remove} from '../utils/render.js';
import PointPresenter from './point-presenter.js';
import PointNewPresenter from './point-new-presenter.js';
import ButtonNewPointView from '../view/button-new-point-view.js';
// import {updateItem} from '../utils/common.js';
import {filter} from '../utils/filter.js';
import {SortType, UpdateType, UserAction, FilterType} from '../const.js';
import {sortPointTime, sortPointPrice} from '../utils/task.js';

export default class TripPresenter {
  #boardContainer = null;
  // #boardPoints = [];
  #headerMenu = null;
  #buttonNewEvent = null;
  #tripEvents = null;
  #pointNewPresenter = null;
  #pointPresenterCollection = new Map();
  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.EVERYTHING;
  #noPointComponent = null;

  // #sourcedBoardPoints = [];
  #pointsModel = null;
  // #loadMoreButtonComponent = null; ??????
  #filterModel = null;
  #tripInfo = null;

  //#ListEmptyView = new ListEmptyView();
  #pointList = new TripEventsListVeiw();
  #sortComponent = null;

  constructor(boardContainer, pointsModel, filterModel) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#headerMenu = boardContainer.querySelector('.trip-main');
    //this.#buttonNewEvent = boardContainer.querySelector('.trip-main__event-add-btn');
    this.#tripEvents = boardContainer.querySelector('.trip-events');

    this.#pointNewPresenter = new PointNewPresenter(this.#pointList, this.#handleViewAction);

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);


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

    return filteredPoints;
  }

  init = () => {
    /*
    this.#boardPoints = [...boardPoints];
    if (this.#boardPoints.length === 0) {
      return this.#renderNoPoints();
    }

    this.#sourcedBoardPoints = [...boardPoints];
    */

    /*
    if (this.#pointsModel.points.length !== 0) {
      this.#renderTripInfo(this.points);
    }
    */
    this.#renderButtonNewPOint();
    //this.#renderTripMainTableStatic();
    this.#renderBoard();
  }

  createTask = () => {
    this.#currentSortType = SortType.DEFAULT;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#pointNewPresenter.init();
  }

  #handleModeChange = () => {
    this.#pointPresenterCollection.forEach((presenter) => presenter.resetView());
  }
  /*
  #handlePointChange = (updatePoint) => {
    //this.#boardPoints = updateItem(this.#boardPoints, updatePoint);
    //this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints, updatePoint);
    this.#pointPresenterCollection.get(updatePoint.id).renderPoint(updatePoint);
  }
  */

  #handleViewAction = (actionType, updateType, update) => {

    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  #handleModelEvent = (updateType, data) => {

    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this.#pointPresenterCollection.get(data.id).renderPoint(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
    }
  }

  /*
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
*/
  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    // this.#sortPoints(sortType);
    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  }

  #renderButtonNewPOint = () => {
    render(this.#headerMenu, new ButtonNewPointView(), RenderPosition.BEFOREEND);
  }
  /*
  #renderTripMainTableStatic = () => {
    //render(this.#buttonNewEvent, new TripMainTableStaticView(), RenderPosition.BEFOREBEGIN);
    render(this.#boardContainer.querySelector('.trip-controls__filters'), new TripMainTableStaticView(), RenderPosition.AFTEREND);
  }
  */

  #renderFormTripSortPoints = () => {
    const titleTripEvents = this.#tripEvents.querySelector('h2');
    this.#sortComponent = new FormTripSortPointsView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(titleTripEvents, this.#sortComponent, RenderPosition.AFTEREND);
  }

  #renderTripInfo = (dataPoints) => {
    this.#tripInfo = new TripInfoVeiw(dataPoints);
    render(this.#headerMenu, this.#tripInfo, RenderPosition.AFTERBEGIN);
    // render(this.#headerMenu, new TripInfoVeiw(dataPoints), RenderPosition.AFTERBEGIN);
  }


  #renderPoint = (pointData) => {
    const pointPresenter = new PointPresenter(this.#pointList, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.renderPoint(pointData);
    this.#pointPresenterCollection.set(pointData.id, pointPresenter);
  }
  /*
  #clearPointsList = () => {
    this.#pointPresenterCollection.forEach((pointPresenter) => pointPresenter.destroy());
    this.#pointPresenterCollection.clear();
  }
  */

  #renderTripPointsList = () => {
    const formTripSort = this.#tripEvents.querySelector('.trip-events__trip-sort');

    render(formTripSort, this.#pointList, RenderPosition.AFTEREND);

    this.points.forEach((pointData) => this.#renderPoint(pointData));
  }


  #renderNoPoints = () => {
    this.#noPointComponent = new ListEmptyView(this.#filterType);
    render(this.#tripEvents, this.#noPointComponent, RenderPosition.AFTERBEGIN);
  }

  #clearBoard = ({resetSortType = false} = {}) => {
    // const pointCount = this.points.length;

    this.#pointNewPresenter.destroy();

    this.#pointPresenterCollection.forEach((presenter) => presenter.destroy());
    this.#pointPresenterCollection.clear();

    remove(this.#sortComponent);
    if (this.#tripInfo) {
      remove(this.#tripInfo);
    }

    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }

    // remove(this.#renderNoPoints);
    //remove(this.#loadMoreButtonComponent);
    /*
    if (resetRenderedTaskCount) {
      this.#renderedTaskCount = TASK_COUNT_PER_STEP;
    } else {
      // На случай, если перерисовка доски вызвана
      // уменьшением количества задач (например, удаление или перенос в архив)
      // нужно скорректировать число показанных задач
      this.#renderedTaskCount = Math.min(pointCount, this.#renderedTaskCount);
    }
    */
    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  #renderBoard = () => {
    const points = this.points;
    const pointCount = points.length;

    if (pointCount === 0) {
      this.#renderNoPoints();
      return;
    }

    if (this.#pointsModel.points.length !== 0) {
      this.#renderTripInfo(this.points);
    }

    this.#renderFormTripSortPoints();
    this.#renderTripPointsList();
  }
}
