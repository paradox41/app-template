const plugins = [
  require('stylelint')({
    config: {
      extends: 'stylelint-config-standard',
      rules: {
        'string-quotes': 'single',
        indentation: 2
      }
    }
  }),
  require('autoprefixer'),
  require('postcss-reporter')({
    clearMessages: true
  })
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(require('cssnano'));
}

module.exports = {
  plugins: plugins
};
