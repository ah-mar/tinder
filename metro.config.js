const { getDefaultConfig } = require("@expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts.push("cjs");

module.exports = defaultConfig;

// Expo does not recognize cjs extension used in firebase modules, so this adds to the list. Alternatively you can also add it in app.json config file
