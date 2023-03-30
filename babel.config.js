module.exports = api => {
  api.cache(true);
  return {
    env: {
      development: {
        plugins: [
          [
            'module-resolver',
            {
              root: ['./src'],
            },
          ],
        ],
      },
    },
    presets: ['babel-preset-expo'],
  };
};
