module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            assets: './assets',
            components: './components',
            constants: './constants',
            modals: './modals',
            navigation: './navigation',
            screens: './screens',
            schemas: './schemas',
            store: './store',
            storybook: './storybook',
            styles: './styles',
            utils: './utils',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
