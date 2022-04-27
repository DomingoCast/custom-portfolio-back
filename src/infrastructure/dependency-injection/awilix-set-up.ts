import registerUserUseCase from "../../core/use-cases/user/register-user.use-case";
import { setUpEmail } from "../email/emailer.output";
import createUserRepository from "../persistance/user/user.datasource";

import * as awilix from "awilix";
import createHashFunction from "../password/create-hash-function";

export const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY,
});

container.register({
    registerUserUseCase: awilix.asFunction(registerUserUseCase),
    userRepository: awilix.asFunction(createUserRepository),
    emailSender: awilix.asFunction(setUpEmail),
    hashFunction: awilix.asFunction(createHashFunction),
});
