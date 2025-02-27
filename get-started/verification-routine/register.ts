import { Duplo, useProcessBuilder } from "@duplojs/core";
import { mustBeConnectedProcess } from "./process";

const duplo = new Duplo({
	environment: "DEV",
});

duplo.register(mustBeConnectedProcess);
// or
duplo.register(...useProcessBuilder.getAllCreatedProcess());
