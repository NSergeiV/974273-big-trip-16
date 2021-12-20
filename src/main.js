import TripInfoVeiw from './view/trip-main-info-view.js';
import TripMainControlsView from './view/trip-main-trip-controls-view.js';
import FormTripControlsView from './view/form-trip-sort-trip-events-view.js';
import FormEditPointView from './view/edit-point-view.js';
import TripEventsListVeiw from './view/trip-events-list-view.js';
import TripEventsListComponentVeiw from './view/trip-events-list-component-view.js';
import RoutePointView from './view/route-point-view.js';
import ListEmptyView from './view/list-empty-view.js';
import {RenderPosition, render, replace} from './utils/render.js';
import {generateTask} from './mock/task.js';
import {compare} from './utils/common.js';

const TASK_COUNT = 20;

const tasks = Array.from({length: TASK_COUNT}, generateTask).sort(compare);

const headerMenu = document.querySelector('.trip-main');
const buttonNewEvent = headerMenu.querySelector('.trip-main__event-add-btn');
const tripEvents = document.querySelector('.trip-events');


const titleTripEvents = tripEvents.querySelector('h2');

if (TASK_COUNT === 0) {
  render(tripEvents, new ListEmptyView(), RenderPosition.AFTERBEGIN);
}

if (TASK_COUNT !== 0) {
  render(headerMenu, new TripInfoVeiw(tasks), RenderPosition.AFTERBEGIN);
  render(titleTripEvents, new FormTripControlsView(), RenderPosition.AFTEREND);
}
render(buttonNewEvent, new TripMainControlsView(), RenderPosition.BEFOREBEGIN);

const formTripSort = tripEvents.querySelector('.trip-events__trip-sort');
const pointList = new TripEventsListVeiw();

render(formTripSort, pointList, RenderPosition.AFTEREND);

const renderPoint = (pointListElement, point) => {
  const pointListComponent = new TripEventsListComponentVeiw();
  const pointComponent = new RoutePointView(point);
  const pointEditComponent = new FormEditPointView(point);

  const replaceCardToForm = () => {
    // pointListComponent.element.replaceChild(pointEditComponent.element, pointComponent.element);
    replace(pointEditComponent, pointComponent);
  };

  const replaceFormToCard = () => {
    // pointListComponent.element.replaceChild(pointComponent.element, pointEditComponent.element);
    replace(pointComponent, pointEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  pointComponent.setEditClickHandler(() => {
    replaceCardToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  pointEditComponent.setFormClickHandler(() => {
    replaceFormToCard();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  pointEditComponent.setFormSubmitHandler(() => {
    replaceFormToCard();
    document.removeEventListener('keydown', onEscKeyDown);
  });


  render(pointListComponent.element, pointComponent, RenderPosition.BEFOREEND);
  render(pointListElement, pointListComponent, RenderPosition.BEFOREEND);
};

tasks.forEach((point) => renderPoint(pointList.element, point));
