import React from "react";
import { Link } from "react-router-dom";

import { FaPaw } from "react-icons/lib/fa";
import FlagIcon from "./FlagIcon.js";
import "../styles.css";

import I18n from "i18n-js";
import Context from "../../commons/Context.js";
import I18nHelper from "../../commons/I18nHelper.js";

export default class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { language: Context.language };
    //If this is not done, setState would not be recognized in changeLanguage method
    this.changeLanguage = this.changeLanguage.bind(this);
  }
  changeLanguage(event) {
    let cssClass = event.target.className;
    let languageKey = cssClass.substr(cssClass.length - 2);
    if (languageKey === "gb") {
      languageKey = "en";
    }
    console.log(languageKey);
    I18nHelper.setLanguage(languageKey);
    this.setState({ language: languageKey });
  }

  render() {
    return (
      <div className="container">
        <div
          className="btn-toolbar toolbarTopRight"
          aria-label="Language selection"
          onClick={this.changeLanguage}
        >
          <FlagIcon code={"gb"} size={"3x"} />
          <FlagIcon code={"ru"} size={"3x"} />
          <FlagIcon code={"de"} size={"3x"} />
        </div>
        <div id="content" className="container">
          <h1>{I18n.t("home")}</h1>
          {/* <FaPaw color="orange" size="80" /> */}
          <br />
          <Link to="/menu">
            <button className="btn btn-primary" type="button">
              {I18n.t("enter")}
            </button>
          </Link>
          <div>
            <Link to="/*">{I18n.t("notFound")}</Link>
          </div>
        </div>
      </div>
    );
  }
}
