import React from "react";
import { render } from "react-dom";
import { Provider, connect } from "react-redux";
import { createStore, combineReducers } from "redux";

@connect(state => ({ data: state.ExampleReducer.data }))
class ExampleComponent extends React.Component {
  render = () => <h1 children={this.props.data} />;
}

const ExampleReducer = (state = { data: "Hello world!" }) => state;
const reducers = combineReducers({ ExampleReducer });
const store = createStore(reducers);
const app = <Provider store={store} children={<ExampleComponent />} />;
const node = document.getElementById("root");

render(app, node);
