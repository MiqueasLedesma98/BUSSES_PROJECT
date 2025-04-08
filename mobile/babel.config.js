module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts', '.tsx', '.js', '.json', '.svg', '.jsx', '.jpg'],
        alias: {
          '@': './src',
        },
      },
    ],
  ],
};
