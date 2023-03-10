import {render} from '../render';
import TripListView from '../view/trip-list-view';
import RoutePointView from '../view/route-point-view';
import FormCreateView from '../view/form-create-view';

export default class TripPresenter {
  #tripEventsContainer = null;
  #tripListContainer = new TripListView();
  #trips = null;
  #offers = null;
  #destinations = null;

  constructor(tripEventsContainer, tripModel) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#trips = tripModel.tripsInfo;
    this.#offers = tripModel.tripsOffers;
    this.#destinations = tripModel.tripsDestinations;
  }

  init() {
    render(this.#tripListContainer, this.#tripEventsContainer);
    this.#renderRoutePoints()
  }

  #renderRoutePoints = () => {
    for (let i = 0; i < this.#trips.length; i++) {
      const matchOffers = this.#offers.filter((offer) => this.#trips[i].offers.includes(offer.id));
      const matchDestination = this.#destinations.filter((destination) => this.#offers[i].destination === destination);
      const routePoint = new RoutePointView(this.#trips[i], matchOffers, matchDestination)
      this.#settingsRenderPoint(routePoint)
      render(routePoint, this.#tripListContainer.element);
    }
  }

  #settingsRenderPoint = (routePoint) => {
    const form = new FormCreateView(this.#trips[0], this.#offers, this.#destinations)
    const escCloseForm = (e) => {
      if (e.key !== 'Esc' && e.key !== 'Escape') return;
      closeForm(e)
    }

    const closeForm = (event) => {
      event.preventDefault();
      this.#tripListContainer.element.replaceChild(routePoint.element, form.element)
      document.removeEventListener('keydown', escCloseForm)
    }

    const openForm = () => {
      this.#tripListContainer.element.replaceChild(form.element, routePoint.element)
      document.addEventListener('keydown', escCloseForm)
    }
    form.element.addEventListener('submit', closeForm)
    form.element.querySelector('.event__rollup-btn').addEventListener('click', closeForm)
    routePoint.element.querySelector('.event__rollup-btn').addEventListener('click', openForm)

  }
}
