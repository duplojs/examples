import { Duplo, useRouteBuilder } from "@duplojs/core";
import "@duplojs/node";
import "@duplojs/node/globals";
import "@routes";

const duplo = new Duplo({
	environment: "DEV",
	host: "localhost",
	port: 8080,
});

duplo.register(...useRouteBuilder.getAllCreatedRoute());

await duplo.launch(
	() => void console.log("Duplo is ready !"),
);
