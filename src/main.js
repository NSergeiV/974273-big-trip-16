import TripPresenter from './presenter/trip-presenter.js';
import {generateTask} from './mock/task.js';
import {compare} from './utils/common.js';

const TASK_COUNT = 20;

const tripPoints = Array.from({length: TASK_COUNT}, generateTask).sort(compare);

// ---------------------

const boardContainer = document.querySelector('.page-body');

const tripPresenter = new TripPresenter(boardContainer);

tripPresenter.init(tripPoints);

// ---------------------
/*
const headerMenu = document.querySelector('.trip-main');
const buttonNewEvent = headerMenu.querySelector('.trip-main__event-add-btn');
const tripEvents = document.querySelector('.trip-events');


const titleTripEvents = tripEvents.querySelector('h2');

if (tripPoints.length === 0) {
  render(tripEvents, new ListEmptyView(), RenderPosition.AFTERBEGIN);
}

if (tripPoints.length !== 0) {
  render(headerMenu, new TripInfoVeiw(tripPoints), RenderPosition.AFTERBEGIN);
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
    replace(pointEditComponent, pointComponent);
  };

  const replaceFormToCard = () => {
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

tripPoints.forEach((point) => renderPoint(pointList.element, point));

*/
