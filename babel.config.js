module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      require.resolve('expo-router/babel'),
      [
        'babel-plugin-module-resolver',
        {
          alias: {
            '^effector$': 'effector/compat',
            '^effector-react$': 'effector-react/compat',
            '@app': './app/*',
            '@assets': './assets/*',
            '@components': './components/*',
            '@config': './config/*',
            '@services': './services/*',
            '@stores': './stores/*',
            '@styles': './styles/*',
            '@types': './types/*',
          },
          extensions: [
            '.ios.js',
            '.android.js',
            '.js',
            '.jsx',
            '.json',
            '.tsx',
            '.ts',
            '.native.js',
          ],
        },
      ],
    ],
  };
};
