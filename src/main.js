import TripPresenter from './presenter/trip-presenter.js';
import {generateTask} from './mock/task.js';
import {compare} from './utils/common.js';

const TASK_COUNT = 20;

const tripPoints = Array.from({length: TASK_COUNT}, generateTask).sort(compare);

// ---------------------

const boardContainer = document.querySelector('.page-body');

const tripPresenter = new TripPresenter(boardContainer);

tripPresenter.init(tripPoints);
