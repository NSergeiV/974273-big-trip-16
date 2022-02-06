import AbstractView from './abstract-view.js';
import dayjs from 'dayjs';
import {calculate} from '../utils/task.js';

const offerTemplate = (offer, price) => (
  `<li class="event__offer">
      <span class="event__offer-title">${offer}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </li>`
);

const connect = (arrayOffers) => {
  if (arrayOffers.length !== 0) {
    const offersTemplate = arrayOffers.map((offer) => {
      const key = Object.keys(offer);
      const property = Object.values(offer);
      return offerTemplate(key, property);
    }).join(' ');
    return offersTemplate;
  }
  return '';
};

const checkFavorite = (result) => {
  let favorite = null;
  if (result) {
    favorite = 'event__favorite-btn--active';
  }
  return favorite;
};

const createRoutePointTemplate = (data) => {

  const {dateStart, dateEnd, eventType, eventCity, eventPrice, eventOffer, isFavorite} = data;
  const date1 = dayjs(dateEnd);
  const date2 = dayjs(dateStart);
  const travelTimeDay = date1.diff(date2, 'd');
  const travelTimeHour = date1.diff(date2, 'h');
  const travelTimeMinute = date1.diff(date2, 'm');

  return `<div class="event">
      <time class="event__date" datetime="2019-03-18">${dayjs(dateStart).format('MMM DD')}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${eventType.toLowerCase()}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${eventType} ${eventCity}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-18T10:30">${dayjs(dateStart).format('HH:mm')}</time>
          &mdash;
          <time class="event__end-time" datetime="2019-03-18T11:00">${dayjs(dateEnd).format('HH:mm')}</time>
        </p>
        <p class="event__durationTime">${calculate(travelTimeDay, travelTimeHour, travelTimeMinute)}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${eventPrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
          ${connect(eventOffer)}
      </ul>
      <button class="event__favorite-btn ${checkFavorite(isFavorite)}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>`;
};

export default class RoutePointView extends AbstractView {

  #routePoints = null;

  constructor(routePoints) {
    super();
    this.#routePoints = routePoints;
  }

  get template() {
    return createRoutePointTemplate(this.#routePoints);
  }

  setEditClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClick);
  }

  setEditClickFavorite = (callback) => {
    this._callback.editClickFavorite = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#editClickFavorite);
  }

  #editClickFavorite = (evt) => {
    evt.preventDefault();
    this._callback.editClickFavorite();
  }

  #editClick = (evt) => {
    evt.preventDefault();
    this._callback.click();
  }
}
