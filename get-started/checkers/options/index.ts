import { createChecker } from "@duplojs/core";

interface InputCompareDate {
	reference?: Date;
	compared: Date;
}

interface optionsCompareDate {
	compareType: "greater" | "lower";
}

export const compareDateCheck = createChecker<optionsCompareDate>(
	"compareDate",
	{ compareType: "lower" }, // default options value
)
	.handler(
		(input: InputCompareDate, output, options) => {
			const { reference = new Date(), compared } = input;

			if (options.compareType === "greater") {
				if (reference.getTime() > compared.getTime()) {
					return output("valid", null);
				} else {
					return output("invalid", null);
				}
			} else if (reference.getTime() < compared.getTime()) {
				return output("valid", null);
			} else {
				return output("invalid", null);
			}
		},
	);
