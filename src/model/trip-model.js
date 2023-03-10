import {generateTripDestination, generateTripOffer, generateTripPoint} from '../mock/trip-mock';


export default class TripModel {
  #trips = null;
  #offers = null;
  #destinations = null;
  constructor(length) {
    this.#trips = Array.from({ length }, generateTripPoint );
    this.#offers = Array.from({ length }, (item, index) => generateTripOffer(index % 2) );
    this.#destinations = Array.from({ length }, generateTripDestination );
  }

  get tripsInfo() {
    return this.#trips;
  }

  get tripsOffers() {
    return this.#offers;
  }

  get tripsDestinations() {
    return this.#destinations;
  }
}
