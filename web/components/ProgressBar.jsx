import React from 'react';
import I18n from 'i18n-js';
import '../styles.css';

import MapStore from '../flux/stores/MapStore';

export default class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.updatePercentage = this.updatePercentage.bind(this);
    this.state = { percentage: 0 };
  }

  componentDidMount() {
    MapStore.addChangeListener(
      'STORE_UPDATE_PERCENTAGE',
      this.updatePercentage
    );
  }

  componentWillUnmount() {
    MapStore.removeChangeListener(
      'STORE_UPDATE_PERCENTAGE',
      this.updatePercentage
    );
  }

  updatePercentage() {
    this.setState({ percentage: MapStore.getPercentage() });
  }

  render() {
    return (
      <div>
        {this.state.percentage !== '100' && (
          <div
            className="progress"
            style={{
              position: 'absolute',
              top: '0',
              bottom: '0',
              left: '0',
              right: '0',
              margin: 'auto',
              width: '50%'
            }}
          >
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuenow={this.state.percentage}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: this.state.percentage + '%' }}
            >
              {this.state.percentage} {I18n.t('PercentsLoaded')}
            </div>
          </div>
        )}
      </div>
    );
  }
}
