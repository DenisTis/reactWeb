//AppActions.js
import AppDispatcher from '../AppDispatcher';

class MapActions {
  updatePercentage(data) {
    AppDispatcher.dispatch({
      actionType: 'UPDATE_PERCENTAGE',
      value: data
    });
  }
}

export default new MapActions();
//Note: Using a new keyword will make this work like a static class
