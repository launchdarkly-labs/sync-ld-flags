module.exports = {
  extends: ['eslint:recommended', 'prettier'],
  env: {
    browser: false,
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  ignorePatterns: ['.fig/*'],
  rules: {
    'no-duplicate-imports': 'error',

    // Forbid unnecessary backticks
    // https://github.com/prettier/eslint-config-prettier/blob/master/README.md#forbid-unnecessary-backticks
    quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: false }],
  },
  globals: {
    describe: true,
    it: true,
    expect: true,
    beforeEach: true,
    afterEach: true,
    beforeAll: true,
    afterAll: true,
    chai: true,
    before: true,
    after: true,
  },
};
