import { zod } from "@duplojs/core";
import { config as dotenvConfig } from "dotenv";

dotenvConfig();

export const envs = zod.object({
	ENVIRONMENT: zod.enum(["DEV", "PROD"]),
	PORT: zod.coerce.number(),
	HOST: zod.enum(["localhost", "0.0.0.0"]),
	ACCESS_TOKEN_KEY: zod.string(),
	SALT: zod.coerce.number(),
})
	.parse(process.env);
