import {createTripInfoTemplate} from './view/trip-main-info-view.js';
import {createTripMainControlsTemplate} from './view/trip-main-trip-controls-view.js';
import {createFormTripControlsTemplate} from './view/form-trip-sort-trip-events-view.js';
import {createFormEditPointTemplate} from './view/edit-point-view.js';
import {createTripEventsListTemplate} from './view/trip-events-list-view.js';
import {createRoutePointTemplate} from './view/route-point-view.js';
import {renderTemplate, RenderPosition} from './utils/render.js';
import {generateTask} from './mock/task.js';
import {compare} from './utils/common.js';

const TASK_COUNT = 20;

const tasks = Array.from({length: TASK_COUNT}, generateTask).sort(compare);

const headerMenu = document.querySelector('.trip-main');
const buttonNewEvent = headerMenu.querySelector('.trip-main__event-add-btn');
const tripEvents = document.querySelector('.trip-events');
const titleTripEvents = tripEvents.querySelector('h2');

renderTemplate(headerMenu, createTripInfoTemplate(tasks), RenderPosition.AFTERBEGIN );
renderTemplate(buttonNewEvent, createTripMainControlsTemplate(), RenderPosition.BEFOREBEGIN);
renderTemplate(titleTripEvents, createFormTripControlsTemplate(), RenderPosition.AFTEREND);

const formTripSort = tripEvents.querySelector('.trip-events__trip-sort');

renderTemplate(formTripSort, createTripEventsListTemplate(), RenderPosition.AFTEREND);

const pointList = tripEvents.querySelector('.trip-events__list');

for (let i = 1; i < TASK_COUNT; i++) {
  renderTemplate(pointList, createRoutePointTemplate(tasks[i]), RenderPosition.BEFOREEND);
}

renderTemplate(pointList, createFormEditPointTemplate(tasks[0]), RenderPosition.AFTERBEGIN);
