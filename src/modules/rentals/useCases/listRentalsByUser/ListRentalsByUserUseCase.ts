import { inject } from "tsyringe";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

class ListRentalsByUserUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalRepository: IRentalsRepository
    ) {}

    async execute(user_id: string): Promise<Rental[]> {
        const rentalsByUser = await this.rentalRepository.findByUser(user_id);

        return rentalsByUser;
    }
}

export { ListRentalsByUserUseCase };
