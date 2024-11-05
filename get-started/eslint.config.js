import { duplojsEslintBase } from "@duplojs/eslint";

export default [
	{
		...duplojsEslintBase,
		files: ["**/*.{ts,js}"],
	},
];
