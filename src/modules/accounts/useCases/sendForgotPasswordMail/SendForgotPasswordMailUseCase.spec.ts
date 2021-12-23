import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UserRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send forgot Mail", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UserRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        mailProvider = new MailProviderInMemory();
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider,
            mailProvider
        );
    });

    it("Should be able to send a forgot Mail to user", async () => {
        const sendMail = spyOn(mailProvider, "sendMail");

        await usersRepositoryInMemory.create({
            driver_license: "38693842",
            email: "zop@emrewnem.org",
            name: "Elizabeth Roberts",
            password: "123456",
        });

        await sendForgotPasswordMailUseCase.execute("zop@emrewnem.org");

        expect(sendMail).toHaveBeenCalled();
    });

    it("Should not be able to send a forgot Mail to non-existing user", async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute("gulepsot@dausgo.tt")
        ).rejects.toEqual(new AppError("Email not found"));
    });

    it("Should be able to create an users token", async () => {
        const generateTokenMail = spyOn(
            usersTokensRepositoryInMemory,
            "create"
        );

        usersRepositoryInMemory.create({
            driver_license: "23414034",
            email: "gowerfos@oga.kr",
            name: "Alberta Bass",
            password: "1234567",
        });

        await sendForgotPasswordMailUseCase.execute("gowerfos@oga.kr");

        expect(generateTokenMail).toHaveBeenCalled();
    });
});
