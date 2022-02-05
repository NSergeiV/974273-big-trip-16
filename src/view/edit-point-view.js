import SmartView from './smart-view.js';
import dayjs from 'dayjs';
import {nanoid} from 'nanoid';
import flatpickr from 'flatpickr';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';
const BLANK_POINT = {
  id: nanoid(),
  dateStart: dayjs().format('DD/MM/YY HH:mm'),
  dateEnd: dayjs().format('DD/MM/YY HH:mm'),
  eventDate: dayjs().format('DD/MM/YY HH:mm'),
  eventDateStart: dayjs().format('MMM DD'),
  eventTimeStart: dayjs().format('HH:mm'),
  eventDateEnd: dayjs().format('DD/MM/YY HH:mm'),
  eventTimeEnd: dayjs().format('HH:mm'),
  travelTimeMinute: function() { return this.dateEnd.diff(this.dateStart, 'm'); },
  travelTimeHour: function() { return this.dateEnd.diff(this.dateStart, 'h'); },
  travelTimeDay: function() { return this.dateEnd.diff(this.dateStart, 'd'); },
  travelTime: null,
  eventType: 'Taxi',
  eventCity: 'Amsterdam',
  eventIcon: 'img/icons/taxi.png',
  eventPrice: 190,
  eventOffer: [
    {
      id: 1,
      title: 'Add luggage',
      price: 30,
      isActive: true
    },
    {
      id: 2,
      title: 'Switch to comfort',
      price: 100,
      isActive: true
    },
    {
      id: 3,
      title: 'Add meal',
      price: 15,
      isActive: true
    },
    {
      id: 4,
      title: 'Choose seats',
      price: 5,
      isActive: true
    },
    {
      id: 5,
      title: 'Travel by train',
      price: 40,
      isActive: true
    }
  ],
  description: '',
  eventPhoto: null,
  isFavorite: false,
};

const findLastWord = (str) => {
  const arrayString = str.split(' ');
  return arrayString[arrayString.length -1];
};

const createEventOffer = (offers, isOfferLength) => (
  `${isOfferLength ? `<section class="event__section  event__section--offers">
     <h3 class="event__section-title  event__section-title--offers">Offers</h3>
     <div class="event__available-offers">
     ${offers.map((offer) => `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${findLastWord(offer.title)}-1" type="checkbox" name="event-offer-${findLastWord(offer.title)}" ${offer.isActive ? 'checked' : ''} data-id = "${offer.id}">
        <label class="event__offer-label" for="event-offer-${findLastWord(offer.title)}-1">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
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

  const {eventDate, eventDateEnd, eventIcon, eventType, eventOffer, description, eventPhoto, eventCity, eventPrice, isOfferLength, isOfferClick, isDescriptionLength, isEventPhoto, isEventType, isEventPrice, isEventCity, isEventDataEndChange, isEventDataChange} = data;

  const repeatingOffer = createEventOffer(eventOffer, isOfferLength);
  const destination = createEventDestination(description, eventPhoto, isDescriptionLength, isEventPhoto);

  const isSubmitDisabled = isEventDataEndChange && isEventDataChange && isEventType && isEventPrice && isOfferClick && isEventCity;

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
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${eventDate}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${eventDateEnd}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value=${eventPrice} autocomplete="off">
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

export default class FormEditPointView extends SmartView {
  #arrayId = [];
  #datepicker = null;

  constructor(routePoint = BLANK_POINT) {
    super();
    this._data = FormEditPointView.parsePointToData(routePoint);
    this._testData = routePoint;

    this._testTypePoint = [
      {
        eventType: 'Taxi',
        eventOffer: [
          {
            id: 1,
            title: 'Add luggage',
            price: 30,
            isActive: true
          },
          {
            id: 2,
            title: 'Switch to comfort',
            price: 100,
            isActive: true
          },
          {
            id: 3,
            title: 'Add meal',
            price: 15,
            isActive: true
          },
          {
            id: 4,
            title: 'Choose seats',
            price: 5,
            isActive: true
          },
          {
            id: 5,
            title: 'Travel by train',
            price: 40,
            isActive: true
          }
        ],
        eventIcon: 'img/icons/taxi.png',
      },
      {
        eventType: 'Bus',
        eventOffer: [],
        eventIcon: 'img/icons/bus.png',
      },
      {
        eventType: 'Train',
        eventOffer: [
          {
            id: 1,
            title: 'Add luggage',
            price: 30,
            isActive: true
          },
          {
            id: 2,
            title: 'Switch to comfort',
            price: 100,
            isActive: true
          }
        ],
        eventIcon: 'img/icons/train.png',
      },
      {
        eventType: 'Ship',
        eventOffer: [
          {
            id: 1,
            title: 'Add luggage',
            price: 30,
            isActive: true
          },
          {
            id: 2,
            title: 'Switch to comfort',
            price: 100,
            isActive: true
          },
          {
            id: 3,
            title: 'Add meal',
            price: 15,
            isActive: true
          },
          {
            id: 4,
            title: 'Choose seats',
            price: 5,
            isActive: true
          }
        ],
        eventIcon: 'img/icons/ship.png',
      },
      {
        eventType: 'Drive',
        eventOffer: [
          {
            id: 1,
            title: 'Add luggage',
            price: 30,
            isActive: true
          }
        ],
        eventIcon: 'img/icons/drive.png',
      },
      {
        eventType: 'Flight',
        eventOffer: [
          {
            id: 1,
            title: 'Add luggage',
            price: 30,
            isActive: true
          },
          {
            id: 2,
            title: 'Switch to comfort',
            price: 100,
            isActive: true
          },
          {
            id: 3,
            title: 'Add meal',
            price: 15,
            isActive: true
          },
          {
            id: 4,
            title: 'Choose seats',
            price: 5,
            isActive: true
          }
        ],
        eventIcon: 'img/icons/flight.png',
      },
      {
        eventType: 'Check-in',
        eventOffer: [
          {
            id: 1,
            title: 'Add luggage',
            price: 30,
            isActive: true
          },
          {
            id: 2,
            title: 'Switch to comfort',
            price: 100,
            isActive: true
          },
          {
            id: 3,
            title: 'Add meal',
            price: 15,
            isActive: true
          },
          {
            id: 4,
            title: 'Choose seats',
            price: 5,
            isActive: true
          },
          {
            id: 5,
            title: 'Travel by train',
            price: 40,
            isActive: true
          }
        ],
        eventIcon: 'img/icons/check-in.png',
      },
      {
        eventType: 'Sightseeing',
        eventOffer: [],
        eventIcon: 'img/icons/sightseeing.png',
      },
      {
        eventType: 'Restaurant',
        eventOffer: [
          {
            id: 1,
            title: 'Add luggage',
            price: 30,
            isActive: true
          },
          {
            id: 2,
            title: 'Switch to comfort',
            price: 100,
            isActive: true
          },
          {
            id: 3,
            title: 'Add meal',
            price: 15,
            isActive: true
          }
        ],
        eventIcon: 'img/icons/restaurant.png',
      },
      {
        eventType: 'Transport',
        eventOffer: [
          {
            id: 1,
            title: 'Add luggage',
            price: 30,
            isActive: true
          },
          {
            id: 2,
            title: 'Switch to comfort',
            price: 100,
            isActive: true
          },
          {
            id: 3,
            title: 'Add meal',
            price: 15,
            isActive: true
          }
        ],
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
    this.#setDatepicker();
  }

  get template() {
    return createFormEditPointTemplate(this._data);
  }

  removeElement = () => {
    super.removeElement();

    if (this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  }

  #setDatepicker = () => {
    if (this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }

    flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        altInput: true,
        altFormat: 'd/m/y H:i',
        dateFormat: 'd/m/y H:i',
        defaultDate: this._data.eventDate,
        onChange: this.#startDateHandler,
      },
    );

    flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        altInput: true,
        altFormat: 'd/m/y H:i',
        dateFormat: 'd/m/y H:i',
        defaultDate: this._data.eventDateEnd,
        onChange: this.#finishDateHandler,
      },
    );
  }

  #startDateHandler = ([userDate]) => {
    const compare = (this._testData.eventDate === dayjs(userDate).format('DD/MM/YY HH:mm'));
    this.updateData({
      isEventDataChange: compare,
      eventDate: dayjs(userDate).format('DD/MM/YY HH:mm'),
      dateStart: dayjs(userDate),
      eventTimeStart: dayjs(userDate).format('HH:mm'),
      eventDateStart: dayjs(userDate).format('MMM DD'),
    });
  }

  #finishDateHandler =([userDate]) => {
    const compare = (this._testData.eventDateEnd === dayjs(userDate).format('DD/MM/YY HH:mm'));
    this.updateData({
      isEventDataEndChange: compare,
      eventDateEnd: dayjs(userDate).format('DD/MM/YY HH:mm'),
      dateEnd: dayjs(userDate),
      eventTimeEnd: dayjs(userDate).format('HH:mm')
    });
  }

  setFormClickHandler = (callback) => {
    this._callback.formClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formHandler);
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.addEventListener('submit', this.#formSubmitHandler);
  }

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
  }

  #setInnerHandlers = () => {
    this.element.querySelector('fieldset').addEventListener('click', this.#formSelectTypePoint);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#formSelectDestination);

    if (this._data.eventOffer.length !== 0) {
      this.element.querySelector('.event__section--offers').addEventListener('click', this.#formSelectOffers);
    }

    const inputPrice = this.element.querySelector('.event__input--price');

    inputPrice.addEventListener('input', () => {
      let valuePrice = inputPrice.value;
      const priceReplacement = (this._testData.eventPrice).toString() === valuePrice;

      if (valuePrice.match(/[^\d]+/g)) {
        inputPrice.setCustomValidity('Нужно целое положительное число');
        this.element.querySelector('.event__save-btn').setAttribute('disabled', '');
      } else if (valuePrice === '') {
        inputPrice.setCustomValidity('Заполните пожалуйста');
        this.element.querySelector('.event__save-btn').setAttribute('disabled', '');
      } else {
        inputPrice.setCustomValidity('');

        if (priceReplacement) {
          if (this._data.isEventType && this._data.isOfferClick && this._data.isEventCity) {
            this.element.querySelector('.event__save-btn').setAttribute('disabled', '');
          }

          valuePrice = this._testData.eventPrice;
          this.updateData({
            isEventPrice: priceReplacement,
            eventPrice: valuePrice,
          }, true);
          return;
        }
        this.element.querySelector('.event__save-btn').removeAttribute('disabled');
        this.updateData({
          isEventPrice: priceReplacement,
          eventPrice: valuePrice,
        }, true);
      }

      inputPrice.reportValidity();
    });

    const inputDestination = this.element.querySelector('.event__input--destination');
    const cities = this._testDestination.map((item) => item.city);

    inputDestination.addEventListener('input', () => {
      let destinationValue = inputDestination.value;
      const destinationReplacement = this._testData.eventCity === destinationValue;

      if (destinationValue.length === 0) {
        this.element.querySelector('.event__save-btn').setAttribute('disabled', '');
        inputDestination.setCustomValidity('Введите название города.');
      } else if (cities.includes(destinationValue, 1) === false) {
        inputDestination.setCustomValidity('Такого города нет в списке.');
      } else {
        inputDestination.setCustomValidity('');
      }

      if (destinationReplacement) {
        if (this._data.isEventType && this._data.isOfferClick && this._data.isEventPrice) {
          this.element.querySelector('.event__save-btn').setAttribute('disabled', '');
        }

        destinationValue = this._testData.eventCity;
        this.updateData({
          isEventCity: destinationReplacement,
          eventCity: destinationValue,
        }, true);
        return;
      }

      this.updateData({
        isEventCity: destinationReplacement,
        eventCity: destinationValue,
      }, true);

      inputDestination.reportValidity();
    });
  }

  #formSelectTypePoint = (evt) => {
    evt.preventDefault();

    const nameIconType = evt.target.closest('div').querySelector('input').value;
    const nameTypeChoice = evt.target.textContent;

    const typeReplacement = this._testData.eventType === nameTypeChoice;

    this.element.querySelector('.event__type-output').textContent = nameTypeChoice;
    this.element.querySelector('.event__type-icon').src = `img/icons/${nameIconType}.png`;
    this.element.querySelector('.event__type-list').style.display = 'none';

    this._testTypePoint.forEach((data) => data.eventOffer.forEach((offer) => (offer.isActive = true)));

    const transportType = this._testTypePoint.filter((type) => type.eventType === nameTypeChoice);

    this.updateData({
      isEventType: typeReplacement,
      isOfferLength: transportType[0].eventOffer.length !== 0,
      eventIcon: transportType[0].eventIcon,
      eventType: transportType[0].eventType,
      eventOffer: transportType[0].eventOffer,
    });

    this.#arrayId.splice(0, this.#arrayId.length);
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

  #formSelectOffers = (evt) => {
    if (evt.target.matches('input[type="checkbox"]')) {
      const offerId = evt.target.dataset.id;
      const arrayOffers = this._data.eventOffer;
      if (this.#arrayId.length === 0) {
        this.#arrayId.push(offerId);
      } else {
        if (this.#arrayId.includes(offerId)) {
          this.#arrayId = this.#arrayId.filter((item) => item !== offerId);
        } else {
          this.#arrayId.push(offerId);
        }
      }

      const offerStatusChanged = this.#arrayId.length === 0;

      if (arrayOffers[offerId -1].isActive) {
        arrayOffers[offerId -1].isActive = false;
      } else {
        arrayOffers[offerId -1].isActive = true;
      }

      this.updateData({
        isOfferClick: offerStatusChanged,
        eventOffer: arrayOffers,
      });
    }
  }

  #formHandler = (evt) => {
    evt.preventDefault();
    this._callback.formClick();
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();

    this._callback.formSubmit(FormEditPointView.parsePointToData(this._data));
  }

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(FormEditPointView.parsePointToData(this._data));
  }

  reset = (point) => {
    this.updateData(
      FormEditPointView.parsePointToData(point),
    );
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormClickHandler(this._callback.formClick);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  static parsePointToData = (point) => ({
    ...point,
    isEventPrice: point.eventPrice !== null,
    isEventType: point.eventType !== null,
    isEventPhoto: point.eventPhoto !== null,
    isOfferLength: point.eventOffer.length !== 0,
    isOfferClick: point.eventOffer.length !== 0,
    isDescriptionLength: point.description.length !== 0,
    isEventCity: point.eventCity !== 0,
    isEventDataChange: point.eventDate !== 0,
    isEventDataEndChange: point.eventDateEnd !== 0,
  })

  static parseDataToPoint = (data) => {
    const point = {...data};

    if (!point.isEventCity) {
      point.eventCity = null;
    }

    if (!point.isEventPrice) {
      point.eventPrice = null;
    }

    if (!point.isEventType) {
      point.eventType = null;
    }

    if (!point.isEventPhoto) {
      point.eventPhoto = null;
    }

    if (!point.isOfferLength) {
      point.eventOffer = [];
    }

    if (!point.isOfferClick) {
      point.eventOffer = [];
    }

    if (!point.isDescriptionLength) {
      point.description = '';
    }

    delete point.isEventType;
    delete point.isEventDataChange;
    delete point.isEventDataEndChange;
    delete point.isEventCity;
    delete point.isEventPrice;
    delete point.isEventPhoto;
    delete point.isOfferLength;
    delete point.isOfferClick;
    delete point.isDescriptionLength;

    return point;
  }
}
