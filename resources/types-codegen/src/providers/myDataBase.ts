import { getTypedEntries, hasKey } from "@duplojs/utils";

export interface User {
	id: number;
	name: string;
	email: string;
	password: string;
}

export interface Product {
	id: number;
	name: string;
	price: number;
	quantity: number;
}

interface DataBase {
	user: User[];
	product: Product[];
}

const dataBase: DataBase = {
	user: [],
	product: [],
};

const notfoundIndex = -1;
const quantityDelete = 1;

export class MyDataBase {
	public static create<
		GenericEntitie extends keyof DataBase,
	>(
		entityName: GenericEntitie,
		data: Omit<DataBase[GenericEntitie][number], "id">,
	) {
		const newEntity: DataBase[GenericEntitie][number] = <never>{
			...data,
			id: dataBase[entityName].length,
		};

		dataBase[entityName].push(newEntity);

		return Promise.resolve(newEntity);
	}

	public static findOne<
		GenericEntitie extends keyof DataBase,
	>(
		entityName: GenericEntitie,
		by?: Partial<DataBase[GenericEntitie][number]>,
	): Promise<DataBase[GenericEntitie][number] | null> {
		return Promise.resolve(
			<never>dataBase[entityName].find(
				(entity) => {
					if (!by) {
						return true;
					}

					return getTypedEntries(by)
						.every(
							([key, value]) => hasKey(entity, key) && entity[key] === value,
						);
				},
			),
		);
	}

	public static async findOneOrThrow<
		GenericEntitie extends keyof DataBase,
	>(
		entityName: GenericEntitie,
		by?: Partial<DataBase[GenericEntitie][number]>,
	) {
		const entity = await this.findOne(entityName, by);

		if (!entity) {
			throw new Error(`Entity "${entityName}" not found`);
		}

		return entity;
	}

	public static find<
		GenericEntitie extends keyof DataBase,
	>(
		entityName: GenericEntitie,
		by?: Partial<DataBase[GenericEntitie][number]>,
	): Promise<DataBase[GenericEntitie][number][]> {
		return Promise.resolve(
			<never>dataBase[entityName].filter(
				(entity) => {
					if (!by) {
						return true;
					}

					return getTypedEntries(by)
						.every(
							([key, value]) => hasKey(entity, key) && entity[key] === value,
						);
				},
			),
		);
	}

	public static async update<
		GenericEntitie extends keyof DataBase,
	>(
		entityName: GenericEntitie,
		id: number,
		data: Partial<Omit<DataBase[GenericEntitie][number], "id">>,
	) {
		const index = dataBase[entityName].findIndex(
			(entity) => entity.id === id,
		);

		dataBase[entityName][index] = getTypedEntries(data)
			.reduce(
				(pv, [key, value]) => {
					if (value !== undefined && hasKey(pv, key)) {
						pv[key] = <never>value;
					}

					return pv;
				},
				dataBase[entityName][index],
			);

		return Promise.resolve<
			DataBase[GenericEntitie][number]
		>(dataBase[entityName][index]);
	}

	public static async delete(entityName: keyof DataBase, id: number) {
		const index = dataBase[entityName].findIndex(
			(entity) => entity.id === id,
		);

		if (index === notfoundIndex) {
			return Promise.resolve(false);
		}

		dataBase[entityName].splice(index, quantityDelete);

		return Promise.resolve(true);
	}
}
