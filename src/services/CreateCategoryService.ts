import { CategoriesRepository } from "../repositories/CategoriesRepository";

interface IRquest {
    name: string;
    description: string;
}

class CreateCategoryService {
    constructor(private categoriesRepository: CategoriesRepository) {}

    execute({ description, name }: IRquest): void {
        const categoryAlreadyExists =
            this.categoriesRepository.findByName(name);

        if (categoryAlreadyExists) {
            throw new Error(`Category ${name} already exists`);
        }

        this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryService };
