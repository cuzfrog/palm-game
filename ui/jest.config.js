const fileMockPath = "<rootDir>/test/__setup__/__mocks__/fileMock.js";

module.exports = {
    preset: 'ts-jest',
    setupFiles: ["<rootDir>/test/__setup__/testSetup.js"],
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": fileMockPath,
        "\\.(css|less)$": "identity-obj-proxy"
    },
    testMatch: ["<rootDir>/test/**/?(*.)+(spec|test).[tj]s?(x)"],
    testPathIgnorePatterns: ["/node_modules/", "/build/"],
    collectCoverage: false,
    collectCoverageFrom: [
        "src/**/*.{ts,tsx,js,jsx}",
        "!src/defs.d.ts",
    ],
};
