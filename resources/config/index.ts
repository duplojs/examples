import "@duplojs/node";
import { Duplo, useProcessBuilder, useRouteBuilder } from "@duplojs/core";

const duplo = new Duplo({
	environment: "DEV",
	port: 1506,
	host: "localhost",
});

duplo.register(...useProcessBuilder.getAllCreatedProcess());
duplo.register(...useRouteBuilder.getAllCreatedRoute());

await duplo.launch();
