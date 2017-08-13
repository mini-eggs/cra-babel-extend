## Create React App Babel Extend.
Add Babel preset and plugins to a create-react-app project without ejecting.

Excerpt from example, what this package allows you to do within your create-react-app project: 
```javascript
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
```

## How to install and use.
(1) `$ npm install cra-babel-extend`.

(2) Add `cra-babel-extend && ` in front of the four scripts found in a create-react-app project: `start`, `build`, `test`, and `eject`.

(3) Add a field called `craBabelExtend` in your package.json with two fields within it `plugins` and `presets`, both of which will be arrays similar to babelrc.

(4) Ready to go! Add your Babel presets and plugins and run create-react-app scripts as you normally would.
