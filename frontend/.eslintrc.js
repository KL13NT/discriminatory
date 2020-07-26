module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es6: true,
		node: true,
		jest: true
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:jsx-a11y/recommended'
	],
	parser: 'babel-eslint',
	parserOptions: {
		ecmaVersion: 2018,
		ecmaFeatures: {
			jsx: true,
			modules: true,
			experimentalObjectRestSpread: true
		}
	},
	plugins: ['react', 'jsx-a11y', 'sort-destructure-keys', 'react-hooks'],
	rules: {
		'react/jsx-curly-spacing': 0,
		'prefer-rest-params': 0,
		quotes: [
			'error',
			'single',
			{
				avoidEscape: true
			}
		],
		semi: ['error', 'never'],
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-unused-vars': [
			'error',
			{
				varsIgnorePattern: 'Fragment'
			}
		],
		'quote-props': [
			'error',
			'as-needed',
			{
				keywords: false
			}
		],
		'object-curly-spacing': ['error', 'always'],
		'no-whitespace-before-property': 2,
		'space-unary-ops': [
			2,
			{
				words: true,
				nonwords: false,
				overrides: {
					new: true,
					'=': true
				}
			}
		],
		'prefer-destructuring': [
			'error',
			{
				array: true,
				object: true
			},
			{
				enforceForRenamedProperties: false
			}
		],
		'prefer-const': [
			'error',
			{
				destructuring: 'any',
				ignoreReadBeforeAssign: false
			}
		],
		'comma-dangle': ['error', 'never'],
		'react/prop-types': 0,
		'arrow-spacing': ['error', { before: true, after: true }],
		'block-spacing': [2, 'always'],
		'no-unused-vars': 1
	}
}
