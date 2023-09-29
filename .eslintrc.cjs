/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-airbnb',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    // Disable eslintimport/no-extraneous-dependencies rule
    'import/no-extraneous-dependencies': 'off'

  }
}
