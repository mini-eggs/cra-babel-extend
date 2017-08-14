const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");

const dir = process.cwd();

const setup = `
  npm link &&
  rm -rf test_example | true &&
  create-react-app test_example &&
  cd test_example &&
  npm link cra-babel-extend &&
  rm -rf src &&
  cp -r ../test/templates/src ./
`;

const installDepsAndBuild = `
  cd test_example &&
  yarn add redux &&
  yarn add react-redux &&
  yarn add --dev babel-plugin-transform-decorators-legacy &&
  yarn add --dev babel-preset-react-optimize &&
  yarn add --dev babel-preset-stage-0 &&
  yarn build
`;

const cleanup = `
  rm -rf test_example package-lock.json
`;

exec(setup, (err, stdout, stderr) => {
  if (err) {
    console.log("\nTest did not pass. Error within setup.\n");
    process.exit(1);
  }

  const packageJSONLocation = path.join(dir, "test_example/package.json");
  const packageJSON = fs.readFileSync(packageJSONLocation, "utf-8");
  const packageData = JSON.parse(packageJSON);

  packageData["craBabelExtend"] = {
    presets: ["stage-0", "react-optimize"],
    plugins: ["transform-decorators-legacy"]
  };

  let nextScripts = {};
  for (scriptKey in packageData["scripts"]) {
    const currentScript = packageData["scripts"][scriptKey];
    nextScripts[scriptKey] = `cra-babel-extend && ${currentScript}`;
  }
  packageData["scripts"] = nextScripts;

  fs.writeFileSync(packageJSONLocation, JSON.stringify(packageData));

  exec(installDepsAndBuild, (err, stdout, stderr) => {
    if (err) {
      console.log("\nTest did not pass. Error within dependency install.\n");

      process.exit(1);
    }

    exec(cleanup, err => {
      if (err) {
        console.log("\nTest did not pass. Error cleaning files.\n");
      }

      console.log("\nComplete.\n");
    });
  });
});
