//AppActions.js
import AppDispatcher from '../AppDispatcher';

class MapActions {
  updatePercentage(data) {
    AppDispatcher.dispatch({
      actionType: 'UPDATE_PERCENTAGE',
      value: data
    });
  }
  updateLocations(data) {
    AppDispatcher.dispatch({
      actionType: 'UPDATE_LOCATIONS',
      value: data
    });
  }

  navigateToLocation(data) {
    AppDispatcher.dispatch({
      actionType: 'NAVIGATE_TO_LOCATION',
      value: data
    });
  }
}

export default new MapActions();
//Note: Using a new keyword will make this work like a static class
