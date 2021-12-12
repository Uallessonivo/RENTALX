import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create rental", () => {
    const dayAdd24Hours = dayjs().add(1, "day").toDate();

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory,
            dayjsDateProvider,
            carsRepositoryInMemory
        );
    });

    it("Should be able to create a new rental", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Name car",
            description: "Description car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            category_id: "12345",
            brand: "Fiat",
        });

        const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: car.id,
            expected_return_date: dayAdd24Hours,
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("should not be able to create a new rental if there's an opened rental for the user", async () => {
        await rentalsRepositoryInMemory.create({
            car_id: "12345-685",
            expected_return_date: dayAdd24Hours,
            user_id: "12345",
        });

        await expect(async () => {
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "776678",
                expected_return_date: dayAdd24Hours,
            });
        }).rejects.toEqual(new AppError("User already has an open rental"));
    });

    it("should not be able to create a new rental if there's an opened rental for the car", async () => {
        await rentalsRepositoryInMemory.create({
            user_id: "5674",
            car_id: "1234-9871",
            expected_return_date: dayAdd24Hours,
        });

        await expect(async () => {
            await createRentalUseCase.execute({
                user_id: "5675",
                car_id: "1234-9871",
                expected_return_date: dayAdd24Hours,
            });
        }).rejects.toEqual(new AppError("Car is unavailable"));
    });

    it("Should not be able to create a new rental with invalid return time", async () => {
        await expect(
            createRentalUseCase.execute({
                user_id: "123",
                car_id: "test",
                expected_return_date: dayjs().toDate(),
            })
        ).rejects.toEqual(
            new AppError("Expected return date must be at least 24 hours")
        );
    });
});
