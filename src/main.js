import TripInfoVeiw from './view/trip-main-info-view.js';
import TripMainControlsView from './view/trip-main-trip-controls-view.js';
import FormTripControlsView from './view/form-trip-sort-trip-events-view.js';
import FormEditPointView from './view/edit-point-view.js';
import TripEventsListVeiw from './view/trip-events-list-view.js';
import TripEventsListComponentVeiw from './view/trip-events-list-component-view.js';
import RoutePointView from './view/route-point-view.js';
import ListEmptyView from './view/list-empty-view.js';
import {RenderPosition, render} from './utils/render.js';
import {generateTask} from './mock/task.js';
import {compare} from './utils/common.js';

const TASK_COUNT = 20;

const tasks = Array.from({length: TASK_COUNT}, generateTask).sort(compare);

const headerMenu = document.querySelector('.trip-main');
const buttonNewEvent = headerMenu.querySelector('.trip-main__event-add-btn');
const tripEvents = document.querySelector('.trip-events');


const titleTripEvents = tripEvents.querySelector('h2');

if (TASK_COUNT === 0) {
  render(tripEvents, new ListEmptyView().element, RenderPosition.AFTERBEGIN);
}

if (TASK_COUNT !== 0) {
  render(headerMenu, new TripInfoVeiw(tasks).element, RenderPosition.AFTERBEGIN);
  render(titleTripEvents, new FormTripControlsView().element, RenderPosition.AFTEREND);
}
render(buttonNewEvent, new TripMainControlsView().element, RenderPosition.BEFOREBEGIN);

const formTripSort = tripEvents.querySelector('.trip-events__trip-sort');
const pointList = new TripEventsListVeiw();

render(formTripSort, pointList.element, RenderPosition.AFTEREND);

const renderPoint = (pointListElement, point) => {
  const pointListComponent = new TripEventsListComponentVeiw();
  const pointComponent = new RoutePointView(point);
  const pointEditComponent = new FormEditPointView(point);

  const replaceCardToForm = () => {
    pointListComponent.element.replaceChild(pointEditComponent.element, pointComponent.element);

  };

  const replaceFormToCard = () => {
    pointListComponent.element.replaceChild(pointComponent.element, pointEditComponent.element);

  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceCardToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  pointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceFormToCard();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  pointEditComponent.element.addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToCard();
    document.removeEventListener('keydown', onEscKeyDown);
  });


  render(pointListComponent.element, pointComponent.element, RenderPosition.BEFOREEND);
  render(pointListElement, pointListComponent.element, RenderPosition.BEFOREEND);
};

tasks.forEach((point) => renderPoint(pointList.element, point));
