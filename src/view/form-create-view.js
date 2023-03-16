import {createElement} from '../render.js';
import dayjs from 'dayjs';
const createOfferTemplate = ({title, price, id}) => (`
    <div class="event__offer-selector">
       <input class="event__offer-checkbox  visually-hidden" id=${`event-offer-seats-${  id}`} type="checkbox" name="event-offer-seats">
       <label class="event__offer-label" for=${`event-offer-seats-${  id}`}>
       <span class="event__offer-title">${title}</span>
         &plus;&euro;&nbsp;
       <span class="event__offer-price">${price}</span>
       </label>
    </div>
`);
const createDestinationPhotosTemplate = ({src, description}) => `<img class="event__photo" src=${src} alt=${description}>`;
const createDestinationTemplate = ({name}) => ` <option value=${name}></option>`;
const createFormCreateTemplate = (point, offers, destinations) => {
  const {  basePrice, dateFrom, dateTo, destination } = point;

  const dateFromTransform = dayjs(dateFrom);
  const dateToTransform = dayjs(dateTo);
  const currentDestination = destinations.find((des) => des.id === destination);
  const showDestinations = destinations.map(createDestinationTemplate).join('');
  const destinationsPhotos = currentDestination && currentDestination.pictures.map(createDestinationPhotosTemplate).join('');
  const showOffers = offers.map(createOfferTemplate).join('');
  return (
    `
  <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
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
                      Flight
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=${currentDestination ? currentDestination.name : destinations[0].name} list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${showDestinations}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input
                    event__input--time" id="event-start-time-1" type="text" name="event-start-time"
                    value=${dateFromTransform.format('DD/MM/YYHH:mm')}>
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time"
                    value=${dateToTransform.format('DD/MM/YYHH:mm')}>
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value=${basePrice}>
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Cancel</button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                        ${showOffers}
                    </div>
                  </section>
                  ${currentDestination ? (`
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${currentDestination.description}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${destinationsPhotos}
          </div>
        </div>
      </section>
    </section>`) : ''
    }

              </form>
  `
  );};

export default class FormCreateView {
  constructor(point, offers, destination) {
    this.point = point || {
      basePrice: 0,
      dateFrom: new Date(),
      dateTo: new Date(),
      destination: null,
      isFavorite: false,
      offers: [],
      type: 'bus'
    };
    this.offers = offers || [];
    this.destination = destination || {};
  }

  getTemplate() {
    return createFormCreateTemplate(this.point, this.offers, this.destination);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate(this.point, this.offers, this.destination));
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}