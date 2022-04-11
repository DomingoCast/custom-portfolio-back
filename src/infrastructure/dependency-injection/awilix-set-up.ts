const awilix = require("awilix");

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY,
});

function setup() {
    container.register({});
}

module.exports = {
    container,
    setup,
};
