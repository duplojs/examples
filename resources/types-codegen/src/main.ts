import "@duplojs/node";
import "@duplojs/node/globals";
import { Duplo, useRouteBuilder } from "@duplojs/core";

import "@routes";

const duplo = new Duplo({
	environment: "TEST",
	port: 1506,
	host: "localhost",
});

duplo.register(...useRouteBuilder.getAllCreatedRoute());

await duplo.launch();

console.log("Duplo is Ready !");
