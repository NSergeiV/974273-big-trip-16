import {createTripInfoTemplate} from './view/trip-main-info-view.js';
import {renderTemplate, RenderPosition} from './utils/render.js';

const headerMenu = document.querySelector('.trip-main');

renderTemplate(headerMenu, createTripInfoTemplate(), RenderPosition.AFTERBEGIN );
