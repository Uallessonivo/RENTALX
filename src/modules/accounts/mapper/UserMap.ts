import { instanceToInstance } from "class-transformer";

import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../infra/typeorm/entities/User";

class UserMap {
    static toDTO({
        avatar_url,
        avatar,
        email,
        name,
        id,
        driver_license,
    }: User): IUserResponseDTO {
        const user = instanceToInstance({
            avatar_url,
            avatar,
            email,
            name,
            id,
            driver_license,
        });

        return user;
    }
}

export { UserMap };
