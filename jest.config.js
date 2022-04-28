module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    transform: {
        "^.+\\.ts?$": "ts-jest",
    },
    transformIgnorePatterns: ["<rootDir>/node_modules/"],
    modulePathIgnorePatterns: ["<rootDir>/dist/"],
    coverageThreshold: {
        global: {
            lines: 80,
        },
    },
};
