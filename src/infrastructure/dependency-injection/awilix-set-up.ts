import registerUser from "../../core/use-cases/register-user";
import createUserRepository from "../persistance/user/user.datasource";

const awilix = require("awilix");

export const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY,
});

export const setUpAwilix = () => {
    container.register({
        registerUser: awilix.asFunction(registerUser),
        userRepository: awilix.asFunction(createUserRepository),
    });
};
