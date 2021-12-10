import TripInfoVeiw from './view/trip-main-info-view.js';
import TripMainControlsView from './view/trip-main-trip-controls-view.js';
import FormTripControlsView from './view/form-trip-sort-trip-events-view.js';
import FormEditPointView from './view/edit-point-view.js';
import TripEventsListVeiw from './view/trip-events-list-view.js';
import RoutePointView from './view/route-point-view.js';
import {RenderPosition, render} from './utils/render.js';
import {generateTask} from './mock/task.js';
import {compare} from './utils/common.js';

const TASK_COUNT = 20;

const tasks = Array.from({length: TASK_COUNT}, generateTask).sort(compare);

const headerMenu = document.querySelector('.trip-main');
const buttonNewEvent = headerMenu.querySelector('.trip-main__event-add-btn');
const tripEvents = document.querySelector('.trip-events');
const titleTripEvents = tripEvents.querySelector('h2');

render(headerMenu, new TripInfoVeiw(tasks).element, RenderPosition.AFTERBEGIN );
render(buttonNewEvent, new TripMainControlsView().element, RenderPosition.BEFOREBEGIN);
render(titleTripEvents, new FormTripControlsView().element, RenderPosition.AFTEREND);

const formTripSort = tripEvents.querySelector('.trip-events__trip-sort');

render(formTripSort, new TripEventsListVeiw().element, RenderPosition.AFTEREND);

const pointList = tripEvents.querySelector('.trip-events__list');

for (let i = 1; i < TASK_COUNT; i++) {
  render(pointList, new RoutePointView(tasks[i]).element, RenderPosition.BEFOREEND);
}

render(pointList, new FormEditPointView(tasks[0]).element, RenderPosition.AFTERBEGIN);
