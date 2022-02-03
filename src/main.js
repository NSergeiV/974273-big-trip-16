import TripPresenter from './presenter/trip-presenter.js';
import {generateTask} from './mock/task.js';
import {compare} from './utils/common.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
// import TripMainTableStaticView from './view/trip-main-trip-controls-view.js';
import HeaderStatsView from './view/header-stats-view.js';
// import HeaderFilterVeiw from './view/header-filter-view.js';
import {render, RenderPosition} from './utils/render.js';

const TASK_COUNT = 20;

const tripPoints = Array.from({length: TASK_COUNT}, generateTask).sort(compare);

// ---------------------
const pointsModel = new PointsModel();
pointsModel.points = tripPoints;
// ---------------------

const filterModel = new FilterModel();

const boardContainer = document.querySelector('.page-body');

const tripPresenter = new TripPresenter(boardContainer, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(boardContainer, filterModel, pointsModel);
// render(boardContainer.querySelector('.trip-controls__filters'), new HeaderFilterVeiw(), RenderPosition.AFTEREND);
filterPresenter.init();

render(boardContainer.querySelector('.trip-controls__filters'), new HeaderStatsView(), RenderPosition.AFTEREND);

tripPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createTask();
});
