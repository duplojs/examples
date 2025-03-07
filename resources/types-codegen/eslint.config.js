import { duplojsEslintBase } from "@duplojs/eslint";

export default [
	{
		...duplojsEslintBase,
		files: ["**/*.ts"],
		rules: {
			...duplojsEslintBase.rules,
			"@stylistic/js/line-comment-position": "off",
		},
	},
];
