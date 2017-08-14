/* global preval */

import React from "react";
import { render } from "react-dom";
import { Provider, connect } from "react-redux";
import { createStore, combineReducers } from "redux";

/**
 * Example component.
 */
@connect(state => ({ version: state.ExampleReducer.version }))
class ExampleComponent extends React.Component {
  render() {
    return <h1 children={`Example project version: ${this.props.version}`} />;
  }
}

/**
 * Reducers.
 */
const initialState = preval`
  const path = require("path");
  const fs = require("fs");
  const packageLocation = path.join(process.cwd(), "package.json");
  const { version } = JSON.parse(fs.readFileSync(packageLocation, "utf-8"));
  module.exports = {
    version
  };
`;
function ExampleReducer(state = initialState) {
  return state;
}

/**
 * Configs.
 */
const reducers = combineReducers({ ExampleReducer });
const store = createStore(reducers);
const app = <Provider store={store} children={<ExampleComponent />} />;
const node = document.getElementById("root");

/**
 * Run app.
 */
render(app, node);
