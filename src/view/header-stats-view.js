import AbstractView from './abstract-view.js';
import {MenuItem} from '../const.js';

const createHeaderStatsTemplate = () => (
  `<div class="trip-main__trip-controls  trip-controls">
    <div class="trip-controls__navigation">
      <h2 class="visually-hidden">Switch trip view</h2>
      <nav class="trip-controls__trip-tabs  trip-tabs">
        <a class="trip-tabs__btn  trip-tabs__btn--active" data-click="${MenuItem.POINTS}" href="#">Table</a>
        <a class="trip-tabs__btn" data-click="${MenuItem.STATISTICS}" href="#">Stats</a>
      </nav>
    </div>`
);

export default class HeaderStatsView extends AbstractView {

  get template() {
    return createHeaderStatsTemplate();
  }

  setStatsMenuClickHandler = (callback) => {
    this._callback.menuClick = callback;
    this.element.addEventListener('click', this.#menuClickHandler);
  }

  setMenuItem = (menuItem) => {
    const reverse = (menuItem === MenuItem.STATISTICS) ? MenuItem.POINTS : MenuItem.STATISTICS;
    const item = this.element.querySelector(`[data-click=${menuItem}]`);
    const itemAnother = this.element.querySelector(`[data-click=${reverse}]`);

    if (item !== null) {
      item.classList.add('trip-tabs__btn--active');
    }

    if (itemAnother !== null) {
      itemAnother.classList.remove('trip-tabs__btn--active');
    }
  }

  #menuClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.menuClick(evt.target.dataset.click);
  }
}
