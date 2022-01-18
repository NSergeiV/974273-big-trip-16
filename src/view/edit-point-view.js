import AbstractView from './abstract-view.js';

const BLANK_POINT = {
  id: null,
  dateStart: null,
  dateEnd: null,
  eventDate: null,
  eventDateStart: null,
  eventTimeStart: null,
  travelTime: null,
  eventDateEnd: null,
  eventTimeEnd: null,
  travelTimeMinute: null,
  eventType: null,
  eventCity: null,
  eventIcon: null,
  eventPrice: null,
  eventOffer: [],
  description: '',
  eventPhoto: null,
  isFavorite: false,
};

const createEventOffer = (offers, isOfferLength) => (
  `${isOfferLength ? `<section class="event__section  event__section--offers">
     <h3 class="event__section-title  event__section-title--offers">Offers</h3>
     <div class="event__available-offers">
     ${offers.map((offer) => `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${Object.keys(offer)}-1" type="checkbox" name="event-offer-${Object.keys(offer)}" checked>
        <label class="event__offer-label" for="event-offer-${Object.keys(offer)}-1">
          <span class="event__offer-title">${Object.keys(offer)}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${Object.values(offer)}</span>
        </label>
      </div>`).join('')}
    </div>
  </section>` : ''}`
);

const createEventPhoto = (eventPhotos) => (
  `<div class="event__photos-container">
      <div class="event__photos-tape">
        ${eventPhotos.map((photo) => `<img src="${photo}" class="event__photo" alt="Event photo">`).join('')}
      </div>
    </div>`
);

const createEventDescription = (description) => (
  `<p class="event__destination-description">${description}</p>`
);

const createEventDestination = (description, eventPhotos, isDescriptionLength, isEventPhoto) => (
  `${isDescriptionLength || isEventPhoto ? `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      ${isDescriptionLength ? createEventDescription(description) : ''}
      ${isEventPhoto ? createEventPhoto(eventPhotos) : ''}
    </section>` : ' '}`
);

const createFormEditPointTemplate = (data) => {

  const {eventIcon, eventType, eventOffer, description, eventPhoto, eventCity, eventPrice, isOfferLength, isDescriptionLength, isEventPhoto, isEventType} = data;

  const repeatingOffer = createEventOffer(eventOffer, isOfferLength);
  const destination = createEventDestination(description, eventPhoto, isDescriptionLength, isEventPhoto);

  const isSubmitDisabled = isEventType;

  return `<form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src=${eventIcon} alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>

              <div class="event__type-item">
                <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
                <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
              </div>
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${eventType}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=${eventCity} list="destination-list-1">
          <datalist id="destination-list-1">
            <option value="Amsterdam"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="18/03/19 12:25">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="18/03/19 13:35">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value=${eventPrice}>
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit" ${isSubmitDisabled ? 'disabled' : ''}>Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        ${repeatingOffer}
        ${destination}
      </section>
    </form>`;
};

// ${isSubmitDisabled ? 'disabled' : ''}

export default class FormEditPointView extends AbstractView {

  constructor(routePoint = BLANK_POINT) {
    super();
    this._data = FormEditPointView.parsePointToData(routePoint);
    this._testData = routePoint;

    this._testTypePoint = [
      {
        eventType: 'Taxi',
        eventOffer: [{'Add luggage': 30}, {'Switch to comfort class': 100}, {'Add meal': 15}, {'Choose seats': 5}, {'Travel by train': 40}],
        eventIcon: 'img/icons/taxi.png',
      },
      {
        eventType: 'Bus',
        eventOffer: [],
        eventIcon: 'img/icons/bus.png',
      },
      {
        eventType: 'Train',
        eventOffer: [{'Add luggage': 30}, {'Switch to comfort class': 100}],
        eventIcon: 'img/icons/train.png',
      },
      {
        eventType: 'Ship',
        eventOffer: [{'Add luggage': 30}, {'Switch to comfort class': 100}, {'Add meal': 15}, {'Choose seats': 5}],
        eventIcon: 'img/icons/ship.png',
      },
      {
        eventType: 'Drive',
        eventOffer: [{'Add luggage': 30}],
        eventIcon: 'img/icons/drive.png',
      },
      {
        eventType: 'Flight',
        eventOffer: [{'Add luggage': 30}, {'Switch to comfort class': 100}, {'Add meal': 15}, {'Choose seats': 5}],
        eventIcon: 'img/icons/flight.png',
      },
      {
        eventType: 'Check-in',
        eventOffer: [{'Add luggage': 30}, {'Switch to comfort class': 100}, {'Add meal': 15}, {'Choose seats': 5}, {'Travel by train': 40}],
        eventIcon: 'img/icons/check-in.png',
      },
      {
        eventType: 'Sightseeing',
        eventOffer: [],
        eventIcon: 'img/icons/sightseeing.png',
      },
      {
        eventType: 'Restaurant',
        eventOffer: [{'Add luggage': 30}, {'Switch to comfort class': 100}, {'Add meal': 15}],
        eventIcon: 'img/icons/restaurant.png',
      },
      {
        eventType: 'Transport',
        eventOffer: [{'Add luggage': 30}, {'Switch to comfort class': 100}, {'Add meal': 15}],
        eventIcon: 'img/icons/transport.png',
      },
    ];

    this._testDestination = [
      {
        city: 'Amsterdam',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        eventPhoto: ['http://picsum.photos/248/152?r=0.9915930555535986'],
      },
      { city: 'Geneva',
        description: 'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
        eventPhoto: null,
      },
      { city: 'Chamonix',
        description: '',
        eventPhoto: ['http://picsum.photos/248/152?r=0.22033087115957795'],
      },
    ];

    this.#setInnerHandlers();
  }

  get template() {
    return createFormEditPointTemplate(this._data);
  }

  setFormClickHandler = (callback) => {
    this._callback.formClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formHandler);
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.addEventListener('submit', this.#formSubmitHandler);
  }

  #setInnerHandlers = () => {
    console.log('ПРИХОДИТ');
    this.element.querySelector('fieldset').addEventListener('click', this.#formSelectTypePoint);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#formSelectDestination);
    const inputPrice = this.element.querySelector('.event__input--price');

    inputPrice.addEventListener('keyup', () => {
      const valuePrice = inputPrice.value;
      if (valuePrice.match(/[^\d]+/g)) {
        inputPrice.setCustomValidity('Нужны цифры');
      } else if (valuePrice === '') {
        inputPrice.setCustomValidity('Заполните пожалуйста');
      } else {
        inputPrice.setCustomValidity('');
      }
      inputPrice.reportValidity();
    });

    const inputDestination = this.element.querySelector('.event__input--destination');
    const cities = this._testDestination.map((item) => item.city);

    inputDestination.addEventListener('input', () => {
      const destinationValue = inputDestination.value;
      if (destinationValue.length !== 0) {
        cities.forEach((city) => {
          if (city.toLowerCase().includes(destinationValue.toLowerCase(), 1)) {
            inputDestination.setCustomValidity('Выберите из списка.');
          } else {
            inputDestination.setCustomValidity('Такого города нет в списке.');
          }
        });
      } else {
        inputDestination.setCustomValidity('Введите название города.');
      }
      inputDestination.reportValidity();
    });
  }

  #formSelectTypePoint = (evt) => {
    evt.preventDefault();

    const nameIconType = evt.target.closest('div').querySelector('input').value;
    const nameTypeChoice = evt.target.textContent;

    console.log(nameIconType);
    console.log(nameTypeChoice);

    console.log(this._testData.eventType);

    if (this._testData.eventType !== nameTypeChoice) {
      console.log(true);
    } else {
      console.log(false);
    }

    const typeReplacement = this._testData.eventType !== nameTypeChoice ? false : true;
    console.log(typeReplacement);

    this.element.querySelector('.event__type-output').textContent = nameTypeChoice;
    this.element.querySelector('.event__type-icon').src = `img/icons/${nameIconType}.png`;
    this.element.querySelector('.event__type-list').style.display = 'none';

    const transportType = this._testTypePoint.filter((type) => type.eventType === nameTypeChoice);

    this.updateData({
      isEventType: typeReplacement,
      isOfferLength: transportType[0].eventOffer.length !== 0,
      eventIcon: transportType[0].eventIcon,
      eventType: transportType[0].eventType,
      eventOffer: transportType[0].eventOffer,
    });
  }

  #formSelectDestination = (evt) => {
    const nameCite = evt.target.value;
    const descriptionCity = this._testDestination.filter((element) => element.city === nameCite);

    evt.preventDefault();
    this.updateData({
      isEventPhoto: descriptionCity[0].eventPhoto !== null,
      isDescriptionLength: descriptionCity[0].description.length !== 0,
      eventCity: evt.target.value,
      description: descriptionCity[0].description,
      eventPhoto: descriptionCity[0].eventPhoto,
    });
  }

  #formHandler = (evt) => {
    evt.preventDefault();
    this._callback.formClick();
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(FormEditPointView.parsePointToData(this._data));
  }

  updateData = (update) => {
    if (!update) {
      return;
    }

    this._data = {...this._data, ...update};

    this.updateElement();
  }

  updateElement = () => {
    const prevElement = this.element;

    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.element;

    parent.replaceChild(newElement, prevElement);

    this.restoreHandlers();
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormClickHandler(this._callback.formClick);
  }

  static parsePointToData = (point) => ({
    ...point,
    isEventType: point.eventType !== null,
    isEventPhoto: point.eventPhoto !== null,
    isOfferLength: point.eventOffer.length !== 0,
    isDescriptionLength: point.description.length !== 0,
  })

  static parseDataToPoint = (data) => {
    const point = {...data};

    if (!point.isEventType) {
      point.eventType = null;
    }

    if (!point.isEventPhoto) {
      point.eventPhoto = null;
    }

    if (!point.isOfferLength) {
      point.eventOffer = [];
    }

    if (!point.isDescriptionLength) {
      point.description = '';
    }

    delete point.isEventType;
    delete point.isEventPhoto;
    delete point.isOfferLength;
    delete point.isDescriptionLength;

    return point;
  }
}
