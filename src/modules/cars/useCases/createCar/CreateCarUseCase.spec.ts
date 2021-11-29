import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);

    it("Should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "Name car",
            description: "Description car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand car",
            category_id: "Category car",
        });

        expect(car).toHaveProperty("id");
    });

    it("Should not be able to create a new car with same license plate", () => {
        expect(async () => {
            await createCarUseCase.execute({
                name: "Name car 1",
                description: "Description car",
                daily_rate: 100,
                license_plate: "ABC-1234",
                fine_amount: 60,
                brand: "Brand car",
                category_id: "Category car",
            });

            await createCarUseCase.execute({
                name: "Name car 2",
                description: "Description car",
                daily_rate: 100,
                license_plate: "ABC-1234",
                fine_amount: 60,
                brand: "Brand car",
                category_id: "Category car",
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should be able to create a new car with available true by default", async () => {
        const car = await createCarUseCase.execute({
            name: "Name Available",
            description: "Description car",
            daily_rate: 100,
            license_plate: "ABC-12345",
            fine_amount: 60,
            brand: "Brand car",
            category_id: "Category car",
        });

        expect(car.available).toBe(true);
    });
});
