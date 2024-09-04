const webpack = require('webpack');

module.exports = function override(config, env) {
  config.module.rules[1].oneOf.unshift({
    test: /\.(js|mjs|jsx|ts|tsx)$/,
    exclude: /node_modules/,
    use: {
      loader: require.resolve('babel-loader'),
      options: {
        presets: [
          ['@babel/preset-env', { loose: true }],
          '@babel/preset-react',
        ],
        plugins: [
          ['@babel/plugin-transform-class-properties', { loose: true }],
          ['@babel/plugin-transform-private-methods', { loose: true }],
          ['@babel/plugin-transform-private-property-in-object', { loose: true }]
        ],
      },
    },
  });

  config.resolve.fallback = {
    ...config.resolve.fallback,
    stream: require.resolve('stream-browserify'),
    os: require.resolve('os-browserify/browser'),
  };

  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    })
  );

  return config;
};

