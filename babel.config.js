module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'react-native-unistyles/plugin',
        {
          // All styled components must live under this folder
          // for the plugin to process them.
          root: 'app',
        },
      ],
    ],
  };
};
