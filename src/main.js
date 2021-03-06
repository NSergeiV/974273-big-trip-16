import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import HeaderStatsView from './view/header-stats-view.js';
import StatisticsView from './view/stats-view.js';
import ButtonNewPointView from './view/button-new-point-view.js';
import {render, RenderPosition, remove} from './utils/render.js';
import {MenuItem, UpdateType, FilterType} from './const.js';
import ApiService from './api-service.js';

const AUTHORIZATION = 'Basic sjliSenvDsaos8457';
const END_POINT = 'https://16.ecmascript.pages.academy/big-trip';

const pointsModel = new PointsModel(new ApiService(END_POINT, AUTHORIZATION));

const filterModel = new FilterModel();

const boardContainer = document.querySelector('.page-body');
const boardHeader = boardContainer.querySelector('.page-header');
const tripControlsFelter = boardContainer.querySelector('.trip-controls__filters');
const headerMenu = boardHeader.querySelector('.trip-main');
const statsMenuComponent = new HeaderStatsView();
const mainBoardContainer = boardContainer.querySelector('main');
const buttonNewEvent = new ButtonNewPointView();

const tripPresenter = new TripPresenter(boardContainer, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(boardContainer, filterModel, pointsModel);

const handlePointNewFormClose = () => {
  boardHeader.querySelector(`[data-click=${MenuItem.NEW_EVENT}]`).disabled = false;
  statsMenuComponent.setMenuItem(MenuItem.POINTS);
};

let statisticsComponent = null;

const handleStatsMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.NEW_EVENT:
      remove(statisticsComponent);
      tripPresenter.destroy();
      filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
      tripPresenter.init(false);
      tripPresenter.createTask(handlePointNewFormClose);
      boardHeader.querySelector(`[data-click=${MenuItem.NEW_EVENT}]`).disabled = true;
      boardHeader.querySelector(`[data-click=${MenuItem.POINTS}]`).setAttribute('style', 'pointer-events: none;');
      break;
    case MenuItem.POINTS:
      tripPresenter.init(false);
      boardHeader.querySelector(`[data-click=${MenuItem.NEW_EVENT}]`).disabled = false;
      boardHeader.querySelector(`[data-click=${MenuItem.POINTS}]`).setAttribute('style', 'pointer-events: none;');
      boardHeader.querySelector(`[data-click=${MenuItem.STATISTICS}]`).setAttribute('style', 'pointer-events: auto;');
      statsMenuComponent.setMenuItem(MenuItem.POINTS);
      remove(statisticsComponent);
      break;
    case MenuItem.STATISTICS:
      tripPresenter.destroy(false);
      boardHeader.querySelector(`[data-click=${MenuItem.NEW_EVENT}]`).disabled = true;
      boardHeader.querySelector(`[data-click=${MenuItem.POINTS}]`).setAttribute('style', 'pointer-events: auto;');
      boardHeader.querySelector(`[data-click=${MenuItem.STATISTICS}]`).setAttribute('style', 'pointer-events: none;');
      statsMenuComponent.setMenuItem(MenuItem.STATISTICS);
      statisticsComponent = new StatisticsView(pointsModel.points);
      render(mainBoardContainer, statisticsComponent, RenderPosition.BEFOREEND);
      break;
  }
};

tripPresenter.init();
pointsModel.init().finally(() => {

  render(tripControlsFelter, statsMenuComponent, RenderPosition.AFTEREND);
  render(headerMenu, buttonNewEvent, RenderPosition.BEFOREEND);

  statsMenuComponent.setStatsMenuClickHandler(handleStatsMenuClick);

  buttonNewEvent.setButtonNewClickHandler(handleStatsMenuClick);
  filterPresenter.init();
});

