import React from "react";
import { NavLink } from "react-router-dom";

import "../styles.css";
import I18n from "i18n-js";
import MapScene from "../three/MapScene";

export default class MapNavigationPage extends React.Component {
  constructor(props) {
    super(props);
    this.updateLoadedPercentage = this.updateLoadedPercentage.bind(this);
    this.state = { loadedPercentage: 0 };
    this.mapScene = new MapScene(this);
  }

  updateLoadedPercentage(newPercentage) {
    this.setState({ loadedPercentage: newPercentage });
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
          width: "100%",
          height: "100%"
        }}
        ref={mount => {
          this.mount = mount;
        }}
      >
        <div>
          <NavLink to="/">
            <span
              className={"glyphicon glyphicon-menu-left"}
              style={{
                position: "absolute",
                fontSize: "2em",
                left: "1",
                top: "2"
              }}
            />
          </NavLink>
        </div>
        {this.state.loadedPercentage !== "100" && (
          <div
            className="progress"
            style={{
              position: "absolute",
              top: "0",
              bottom: "0",
              left: "0",
              right: "0",
              margin: "auto",
              width: "50%"
            }}
          >
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuenow={this.state.loadedPercentage}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: this.state.loadedPercentage + "%" }}
            >
              {this.state.loadedPercentage} {I18n.t("PercentsLoaded")}
            </div>
          </div>
        )}
      </div>
    );
  }
}
