import registerUserUseCase from "../../core/use-cases/user/register-user.use-case";
import { setUpEmail } from "../email/emailer.output";
import createUserRepository from "../persistance/user/user.datasource";

import * as awilix from "awilix";
import getLogger from "../logger/get-logger";
import createHashFunction from "../password/create-hash-function";
import loginUseCase from "../../core/use-cases/user/login-user.use-case";
import accessToken from "../access-token/access-token";
import { magicUseCase } from "../../core/use-cases/user/magic.use-case";

export const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY,
});

container.register({
    registerUserUseCase: awilix.asFunction(registerUserUseCase),
    loginUseCase: awilix.asFunction(loginUseCase),
    magicUseCase: awilix.asFunction(magicUseCase),
    userRepository: awilix.asFunction(createUserRepository),
    emailSender: awilix.asFunction(setUpEmail),
    accessToken: awilix.asFunction(accessToken),
    logger: awilix.asFunction(getLogger),
    hashFunction: awilix.asFunction(createHashFunction),
});
