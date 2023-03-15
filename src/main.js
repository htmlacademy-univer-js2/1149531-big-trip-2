import {render} from './render';
import NavigationView from './view/navigation-view';
import FilterView from './view/filter-view';
import SortView from './view/sort-view';
import TripPresenter from './presenter/trip-presenter';

const pageElement = document.querySelector('.page-body');
const navigationContainer = pageElement.querySelector('.trip-controls__navigation');
const filterContainer = pageElement.querySelector('.trip-controls__filters');
const tripEventsContainer = pageElement.querySelector('.trip-events');

const tripPresenter = new TripPresenter();

render(new NavigationView(), navigationContainer);
render(new FilterView(), filterContainer);
render(new SortView(), tripEventsContainer);
tripPresenter.init(tripEventsContainer);
