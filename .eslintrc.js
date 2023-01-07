module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'plugin:vue/vue3-recommended',
        'eslint:recommended',
        '@vue/typescript/recommended',
        'plugin:prettier/recommended',
    ],
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2021,
        sourceType: 'module',
    },
    plugins: ['vue'],
    rules: {
        'max-lines': [
            'error',
            { max: 800, skipBlankLines: false, skipComments: false },
        ],
        'vue/multi-word-component-names': [
            'error',
            {
                ignores: ['index'],
            },
        ],
        '@typescript-eslint/no-unused-vars': ['error'],
        '@typescript-eslint/no-explicit-any': 'off',
        'prettier/prettier': ['error', { singleQuote: true }],
    },
};
