import "@duplojs/node";
import "@duplojs/node/globals";
import { Duplo, useProcessBuilder, useRouteBuilder } from "@duplojs/core";
import { envs } from "@envs";

import "@routes";

const duplo = new Duplo({
	environment: envs.ENVIRONMENT,
	port: envs.PORT,
	host: envs.HOST,
});

duplo.register(...useProcessBuilder.getAllCreatedProcess());
duplo.register(...useRouteBuilder.getAllCreatedRoute());

await duplo.launch();

console.log("Duplo is Ready !");
