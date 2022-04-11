import sendEmail from "../../core/use-cases/email/send-email";
import registerUser from "../../core/use-cases/user/register-user";
import { setUpEmail } from "../email/emailer.output";
import createUserRepository from "../persistance/user/user.datasource";

const awilix = require("awilix");

export const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY,
});

container.register({
    registerUser: awilix.asFunction(registerUser),
    userRepository: awilix.asFunction(createUserRepository),
    sendEmail: awilix.asFunction(sendEmail),
    emailSender: awilix.asFunction(setUpEmail),
});
