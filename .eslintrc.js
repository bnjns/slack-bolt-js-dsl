module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
  },
  plugins: [
    '@typescript-eslint',
    '@stylistic',
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/stylistic',
  ],
  env: {
    node: true,
    es2015: true,
  },
  ignorePatterns: [
    'dist/**/*',
    '.gitignore',
  ],
  overrides: [
    {
      files: [
        'src/**/*.spec.ts',
      ],
      env: {
        jest: true,
      },
      rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
      },
    },
  ],

  rules: {
    'no-console': ['warn'],
    'no-debugger': ['warn'],
    eqeqeq: ['error', 'smart'],
    curly: ['error'],
    camelcase: ['error'],

    // Stylistic
    '@stylistic/array-bracket-spacing': ['warn', 'never'],
    '@stylistic/comma-dangle': ['warn', 'always-multiline'],
    '@stylistic/eol-last': ['error', 'always'],
    '@stylistic/indent': ['warn', 2],
    '@stylistic/indent-binary-ops': ['warn', 2],
    '@stylistic/new-parens': ['warn', 'always'],
    '@stylistic/newline-per-chained-call': ['warn', { ignoreChainWithDepth: 2 }],
    '@stylistic/object-curly-spacing': ['warn', 'always'],
    '@stylistic/quotes': ['error', 'single'],
    '@stylistic/rest-spread-spacing': ['warn'],
    '@stylistic/semi': ['error', 'never'],
    '@stylistic/space-before-function-paren': ['warn', 'never'],
    '@stylistic/template-curly-spacing': ['warn', 'always'],

    // Typescript rules
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    '@typescript-eslint/array-type': ['warn', { default: 'array' }],
    '@typescript-eslint/ban-ts-comment': 'error',
    '@typescript-eslint/ban-types': 'error',
    '@typescript-eslint/consistent-generic-constructors': ['error', 'constructor'],
    '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
    '@typescript-eslint/consistent-type-assertions': ['error', {
      assertionStyle: 'as',
      objectLiteralTypeAssertions: 'allow-as-parameter',
    }],
    '@typescript-eslint/consistent-type-imports': ['error', {
      prefer: 'type-imports',
      fixStyle: 'separate-type-imports',
    }],
    '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
    '@typescript-eslint/method-signature-style': ['warn', 'method'],
    '@typescript-eslint/no-unused-vars': ['warn'],
  },
}
