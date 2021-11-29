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
    }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            category_id,
            description,
            brand,
            fine_amount,
            name,
            daily_rate,
            license_plate,
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
}

export { CarsRepository };
