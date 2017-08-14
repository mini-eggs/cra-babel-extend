# Create React App Babel Extend.
Add Babel presets and plugins to a create-react-app project without ejecting.

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
1. `$ npm install --save-dev cra-babel-extend`.
2. Add `cra-babel-extend && ` in front of the four default npm scripts found in a create-react-app project: `start`, `build`, `test` and `eject`. Like so:

    ```json
    "scripts": {
      "start": "cra-babel-extend && react-scripts start",
      "build": "cra-babel-extend && react-scripts build",
      "test": "cra-babel-extend && react-scripts test --env=jsdom",
      "eject": "cra-babel-extend && react-scripts eject"
    },
    ```
3. Add a field called `craBabelExtend` to your package.json with two fields (optional) within it: `plugins` and `presets`. These behave exactly like those found in .babelrc. Here's how this would look:

    ```json
    "craBabelExtend": {
      "presets": ["stage-0", "react-optimize"],
      "plugins": ["transform-decorators-legacy"]
    },
    ```
4. You should now be golden! npm install your babel plugins and presets while adding them to their respective field in the `craBabelExtend` field in your package.json. Check out the examples if something goes awry and open an issue if it persists.
    