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

    it("Should not be able to create a new car with same license plate", async () => {
        await createCarUseCase.execute({
            name: "Name car 1",
            description: "Description car 1",
            daily_rate: 50,
            license_plate: "ABC-123456",
            fine_amount: 80,
            brand: "Brand car 1",
            category_id: "Category car 1",
        });

        await expect(
            createCarUseCase.execute({
                name: "Name car 2",
                description: "Description car 2",
                daily_rate: 60,
                license_plate: "ABC-123456",
                fine_amount: 90,
                brand: "Brand car 2",
                category_id: "Category car 2",
            })
        ).rejects.toEqual(new AppError("Car already exists"));
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
