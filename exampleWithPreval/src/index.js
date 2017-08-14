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
