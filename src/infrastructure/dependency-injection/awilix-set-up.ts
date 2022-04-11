import registerUser from "../../core/use-cases/register-user";

const awilix = require("awilix");

export const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY,
});

export const setUpAwilix = () => {
    container.register({
        registerUser: awilix.asFunction(registerUser),
    });
};
