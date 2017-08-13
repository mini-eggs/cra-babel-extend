import Path from "path";
import FileSystem from "fs";

/**
 * Helper function to get path of webpack configs.
 */
function getConfigPath(type) {
  return `node_modules/react-scripts/config/webpack.config.${type}.js`;
}

/**
 * Helper function for determining where
 * the plugin/preset will be require'd from.
 */
function attachRequestResolve(type) {
  return e => `require.resolve('babel-${type}-${e}')`;
}

/**
 * Build string to insert from presets array.
 */
function getPresetsString(presetArray) {
  if (!presetArray.includes("react-app")) {
    presetArray.push("react-app");
  }
  return presetArray.map(attachRequestResolve("preset")).join(",");
}

/**
 * Build string to insert from plugins array.
 */
function getPluginsString(pluginsArray) {
  return `plugins:[${pluginsArray
    .map(attachRequestResolve("plugin"))
    .join(",")}],`;
}

function overwrite() {
  // Get current directory.
  const dir = process.cwd();

  /**
   * Get react-scripts dev and prod webpack config.
   * Leave as mutatable to overwrite their babel loader.
   */
  const webpackDevLocation = Path.join(dir, getConfigPath("dev"));
  const webpackProdLocation = Path.join(dir, getConfigPath("prod"));
  let webpackDev = FileSystem.readFileSync(webpackDevLocation, "utf-8");
  let webpackProd = FileSystem.readFileSync(webpackProdLocation, "utf-8");

  /**
   * Parse current package.json to see what presets and plugins
   * we will be inserting.
   */
  const packageLocation = Path.join(dir, "package.json");
  let data;
  let presets;
  let plugins;
  try {
    data = JSON.parse(FileSystem.readFileSync(packageLocation, "utf-8"));
    presets = data.craBabelExtend.presets || [];
    plugins = data.craBabelExtend.plugins || [];
  } catch (err) {
    console.log(
      "\nYour package.json is not formatted correctly for `cra-babel-extend` to work. See our README.md at https://github.com/mini-eggs/cra-babel-extend\n"
    );
    process.exit(1);
  }

  /**
   * Insert presets! 😄
   */
  const presetReplace = "require.resolve('babel-preset-react-app')";
  const presetsString = getPresetsString(presets);
  webpackDev = webpackDev.replace(presetReplace, presetsString);
  webpackProd = webpackProd.replace(presetReplace, presetsString);

  /**
   * Insert plugins! 😄
   */
  const pluginsReplace = "babelrc: false,";
  const pluginsString = pluginsReplace + getPluginsString(plugins);
  webpackDev = webpackDev.replace(pluginsReplace, pluginsString);
  webpackProd = webpackProd.replace(pluginsReplace, pluginsString);

  /**
   * Write... and done. 🎸
   */
  FileSystem.writeFileSync(webpackDevLocation, webpackDev, "utf-8");
  FileSystem.writeFileSync(webpackProdLocation, webpackProd, "utf-8");
}

// Init.
overwrite();
