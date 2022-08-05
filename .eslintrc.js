module.exports = {
  overrides: [
    {
      files: ['**/*.js'],
      env: {
        browser: true,
        es2021: true
      },
      extends: [
        'standard'
      ],
      parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module'
      }
    },
    {
      files: ['**/*.ts', '**/*.tsx'],
      env: {
        browser: true,
        es2021: true,
        node: true
      },
      extends: [
        'eslint:recommended',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        tsconfigRootDir: __dirname,
        ecmaFeatures: { jsx: true },
        ecmaVersion: 12,
        sourceType: 'module',
        project: './tsconfig.json'
      },
      plugins: ['@typescript-eslint'],
      rules: {
        "no-unused-vars": "off",
        "require-yield": "off"
      }
    }
  ]
}
