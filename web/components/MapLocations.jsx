import React from 'react';
import I18n from 'i18n-js';
import '../styles.css';

import MapStore from '../flux/stores/MapStore';

export default class MapLocations extends React.Component {
  constructor(props) {
    super(props);
    this.updateLocations = this.updateLocations.bind(this);
    this.state = { locations: [] };
  }

  componentDidMount() {
    MapStore.addChangeListener('STORE_UPDATE_LOCATIONS', this.updateLocations);
  }

  componentWillUnmount() {
    MapStore.removeChangeListener(
      'STORE_UPDATE_LOCATIONS',
      this.updateLocations
    );
  }

  updateLocations() {
    this.setState({ locations: MapStore.getLocations() });
  }

  render() {
    const locations = [];
    for (let location of this.state.locations) {
      locations.push(
        <div
          id={location.id}
          style={{
            position: 'absolute',
            top: location.position.top + 'px',
            left: location.position.left - 60 + 'px',
            width: '120px'
          }}
        >
          <div style={{ margin: 'auto' }}>
            <p style={{ textAlign: 'center' }} className="bg-primary">
              {location.id}
            </p>
          </div>
        </div>
      );
    }
    return <div>{locations}</div>;
  }
}
