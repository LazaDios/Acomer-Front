// babel.config.js

module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Es crucial que este plugin sea el último en la lista.
      'react-native-reanimated/plugin',
    ],
  };
};
