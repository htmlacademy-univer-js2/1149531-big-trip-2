import {createElement} from '../render.js';

const createNoRoutePointsTemplate = () => `<p class="trip-events__msg">Click New Event to create your first point</p>`

export default class NoRoutePointsView {
  #element = null

  get template() {
    return createNoRoutePointsTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
