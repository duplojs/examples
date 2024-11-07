import { Duplo, useBuilder } from "@duplojs/core";
import "./route";

const duplo = new Duplo({
	environment: "TEST",
});

duplo.register(...useBuilder.getAllCreatedDuplose());
