import sendEmailUseCase from "../../core/use-cases/email/send-email.use-case";
import registerUserUseCase from "../../core/use-cases/user/register-user.use-case";
import { setUpEmail } from "../email/emailer.output";
import createUserRepository from "../persistance/user/user.datasource";

import * as awilix from "awilix";
import getLogger from "../../interface/server/logger/get-logger";

export const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY,
});

container.register({
    registerUserUseCase: awilix.asFunction(registerUserUseCase),
    userRepository: awilix.asFunction(createUserRepository),
    sendEmailUseCase: awilix.asFunction(sendEmailUseCase),
    emailSender: awilix.asFunction(setUpEmail),
    logger: awilix.asFunction(getLogger),
});
