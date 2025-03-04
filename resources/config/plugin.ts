import { type Duplo } from "@duplojs/core";

export interface MyPluginOptions {
	disabledOptimization?: boolean;
}

export function myPlugin(options?: MyPluginOptions) {
	return (instance: Duplo) => {
		if (options?.disabledOptimization) {
			instance.config.disabledZodAccelerator = true;
		}
	};
}
