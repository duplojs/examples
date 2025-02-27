import { duplojsEslintBase } from "@duplojs/eslint";

export default [
	{
		...duplojsEslintBase,
		files: ["**/*.{ts,js}"],
		rules: {
			...duplojsEslintBase.rules,
			"@stylistic/js/line-comment-position": "off",
		},
	},
];
