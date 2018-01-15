import AppDispatcher from '../AppDispatcher';
import { EventEmitter } from 'events';

class MapStore extends EventEmitter {
  constructor() {
    super();
    this.percentage = 0;
    this.locations = [];
    this.dispatchToken = AppDispatcher.register(
      this.dispatcherCallback.bind(this)
    );
  }

  emitChange(eventName) {
    this.emit(eventName);
  }

  updatePercentage(value) {
    this.percentage = value;
  }

  getPercentage() {
    return this.percentage;
  }

  updateLocations(value) {
    this.locations = value;
  }

  getLocations() {
    return this.locations;
  }

  navigateToLocation(newLocation) {
    return newLocation;
  }

  addChangeListener(eventName, callback) {
    this.on(eventName, callback);
  }

  removeChangeListener(eventName, callback) {
    this.removeListener(eventName, callback);
  }

  dispatcherCallback(action) {
    switch (action.actionType) {
    case 'UPDATE_PERCENTAGE':
      this.updatePercentage(action.value);
      break;
    case 'UPDATE_LOCATIONS':
      this.updateLocations(action.value);
      break;
    case 'NAVIGATE_TO_LOCATION':
      this.navigateToLocation(action.value);
      break;
    }
    this.emitChange('STORE_' + action.actionType);

    return true;
  }
}

export default new MapStore();
