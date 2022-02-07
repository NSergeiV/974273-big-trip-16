import TripEventsListComponentVeiw from '../view/trip-events-list-component-view.js';
import RoutePointView from '../view/route-point-view.js';
import FormEditPointView from '../view/edit-point-view.js';
import {RenderPosition, render, replace, remove} from '../utils/render.js';
import {UserAction, UpdateType} from '../const.js';
import {isDatesEqual} from '../utils/task.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export const State = {
  SAVING: 'SAVING',
  DELETING: 'DELETING',
  ABORTING: 'ABORTING',
};

export default class PointPresenter {
  #pointComponent = null;
  #pointEditComponent = null;
  #tripEventsListComponent = null;
  #pointListElement = null;
  #point = null;
  #changeData = null;
  #changeMode = null;

  #mode = Mode.DEFAULT;

  constructor(pointListElement, changeData, changeMode) {
    this.#pointListElement = pointListElement;
    this.#changeData = changeData;
    this.#changeMode = changeMode;

    this.#tripEventsListComponent = new TripEventsListComponentVeiw();
  }

  renderPoint = (point) => {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new RoutePointView(point);

    this.#pointEditComponent = new FormEditPointView(point);

    this.#pointComponent.setEditClickHandler(this.#clickCardToForm);
    this.#pointComponent.setEditClickFavorite(this.#handleFavoriteClick);
    this.#pointEditComponent.setFormClickHandler(this.#clickFormToCard);
    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setDeleteClickHandler(this.#handleDeleteClick);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#tripEventsListComponent, this.#pointComponent, RenderPosition.BEFOREEND);
      render(this.#pointListElement, this.#tripEventsListComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointComponent, prevPointEditComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  setViewState = (state) => {
    if (this.#mode === Mode.DEFAULT) {
      return;
    }

    const resetFormState = () => {
      this.#pointEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    switch (state) {
      case State.SAVING:
        this.#pointEditComponent.updateData({
          isDisabled: true,
          isSaving: true,
        });
        break;
      case State.DELETING:
        this.#pointEditComponent.updateData({
          isDisabled: true,
          isDeleting: true,
        });
        break;
      case State.ABORTING:
        this.#pointComponent.shake(resetFormState);
        this.#pointEditComponent.shake(resetFormState);
        break;
    }
  }

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToCard();
    }
  }

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToCard();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #handleFavoriteClick = () => {
    this.#changeData(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      {...this.#point, isFavorite: !this.#point.isFavorite},
    );
  }

  #handleFormSubmit = (update) => {

    const isMinorUpdate = !isDatesEqual(this.#point.dateStart, update.dateStart);

    this.#changeData(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MAJOR : UpdateType.PATCH,
      update,
    );

    //this.#replaceFormToCard();
  }

  #handleDeleteClick = (point) => {
    this.#changeData(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );

    this.#replaceFormToCard();
  }

  #replaceCardToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToCard = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#mode = Mode.DEFAULT;
  };

  #clickFormToCard = () => {
    this.#pointEditComponent.reset(this.#point);
    this.#replaceFormToCard();
  }

  #clickCardToForm = () => {
    this.#replaceCardToForm();
  }
}
