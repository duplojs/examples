import "@duplojs/node";
import "@duplojs/node/globals";
import { Duplo } from "@duplojs/core";
import { envs } from "@envs";

import "@routes";

const duplo = new Duplo({
	environment: envs.ENVIRONMENT,
	port: envs.PORT,
	host: envs.HOST,
});

duplo.register(...useBuilder.getAllCreatedDuplose());

await duplo.launch();

console.log("Duplo is Ready !");

