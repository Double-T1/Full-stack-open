module.exports = {
	"env": {
		"node": true,
		"commonjs": true,
		"es2021": true,
		"jest": true
	},
	"extends": "eslint:recommended",
	"parserOptions": {
		"ecmaVersion": "latest"
	},
	"rules": {
		"eqeqeq": "error",
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"windows"
		],
		"semi": [
			"error",
			"never"
		]
	}
}
