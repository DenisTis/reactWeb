import AppDispatcher from '../AppDispatcher';
import { EventEmitter } from 'events';

let percentage = 0;
let locations = [];

class MapStore extends EventEmitter {
  constructor() {
    super();
    this.dispatchToken = AppDispatcher.register(
      this.dispatcherCallback.bind(this)
    );
  }

  emitChange(eventName) {
    this.emit(eventName);
  }

  updatePercentage(value) {
    percentage = value;
  }

  getPercentage() {
    return percentage;
  }

  updateLocations(value) {
    locations = value;
  }

  getLocations() {
    return locations;
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
    }
    this.emitChange('STORE_' + action.actionType);

    return true;
  }
}

export default new MapStore();
