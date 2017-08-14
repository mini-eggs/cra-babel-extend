## Create React App Babel Extend.
Add Babel preset and plugins to a create-react-app project without ejecting.

Excerpt from examples, what using decorators would look like:
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

Another excerpt from examples, using `babel-plugin-preval`:
```javascript
/* global preval */
import React from "react";
import { render } from "react-dom";

const { version } = preval`
  const path = require("path");
  const fs = require("fs");
  const packageLocation = path.join(process.cwd(), "package.json");
  const { version } = JSON.parse(fs.readFileSync(packageLocation, "utf-8"));
  module.exports = {
    version
  };
`;

class ExampleComponent extends React.Component {
  render() {
    return <h1 children={`Example project version: ${version}`} />;
  }
}

render(<ExampleComponent />, document.getElementById("root"));
```

## How to install and use.
(1) `$ npm install cra-babel-extend`.

(2) Add `cra-babel-extend && ` in front of the four scripts found in a create-react-app project: `start`, `build`, `test`, and `eject`.

(3) Add a field called `craBabelExtend` in your package.json with two fields within it `plugins` and `presets`, both of which will be arrays similar to babelrc.

(4) Ready to go! Add your Babel presets and plugins and run create-react-app scripts as you normally would.
