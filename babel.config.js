module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        cwd: 'babelrc',
        extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
        root: ['.'],
        alias: {
          '@': './src',
          '@assets': ['./assets'],
          '@data': ['./src/data'],
          '@redux': ['./src/redux'],
          '@components': ['./src/components'],
          '@navigation': './src/navigation',
          '@screens': ['./src/screens'],
          '@types': ['./src/types'],
          '@utils': ['./src/utils/'],
        },
      },
    ],
  ],
};
