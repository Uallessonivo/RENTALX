import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dto/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepositories";

import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>;

    constructor() {
        this.repository = getRepository(Car);
    }

    async create({
        category_id,
        description,
        brand,
        fine_amount,
        name,
        daily_rate,
        license_plate,
        specifications,
        id,
    }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            category_id,
            description,
            brand,
            fine_amount,
            name,
            daily_rate,
            license_plate,
            specifications,
            id,
        });

        await this.repository.save(car);

        return car;
    }
    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({
            license_plate,
        });

        return car;
    }

    async findAvailable(
        brand?: string,
        category_id?: string,
        name?: string
    ): Promise<Car[]> {
        const carsQuery = await this.repository
            .createQueryBuilder("car")
            .where("available = :available", { available: true });

        if (brand) {
            carsQuery.andWhere("car.brand = :brand", { brand });
        }

        if (category_id) {
            carsQuery.andWhere("car.category_id = :category_id", {
                category_id,
            });
        }

        if (name) {
            carsQuery.andWhere("car.name = :name", { name });
        }

        const cars = await carsQuery.getMany();

        return cars;
    }

    async findById(id: string): Promise<Car> {
        const car = await this.repository.findOne(id);

        return car;
    }
}

export { CarsRepository };
