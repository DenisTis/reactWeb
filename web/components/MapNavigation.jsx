import React from 'react';
import { NavLink } from 'react-router-dom';

import '../styles.css';
import MapScene from '../three/MapScene';
import ProgressBar from './ProgressBar.jsx';

export default class MapNavigationPage extends React.Component {
  constructor(props) {
    super(props);
    this.mapScene = new MapScene();
  }

  componentDidMount() {
    this.mapScene.initialize(this.mount);
  }

  componentWillUnmount() {
    this.mapScene.stop();
  }

  render() {
    return (
      <div
        id="container"
        style={{
          width: '100%',
          height: '100%'
        }}
        ref={mount => {
          this.mount = mount;
        }}
      >
        <div>
          <NavLink to="/">
            <span
              className={'glyphicon glyphicon-menu-left'}
              style={{
                position: 'absolute',
                fontSize: '2em',
                left: '1',
                top: '2'
              }}
            />
          </NavLink>
        </div>
        <ProgressBar />
      </div>
    );
  }
}
