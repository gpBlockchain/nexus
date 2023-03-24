/** @type {import('ts-jest').JestConfigWithTsJest} */
//  "testRunner": "jest-circus/runner"
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    // Force module uuid to resolve with the CJS entry point, because Jest does not support package.json.exports.
    // See https://github.com/uuidjs/uuid/issues/451
    uuid: require.resolve('uuid'),

    // '@vespaiach/axios-fetch-adapter': '<rootDir>/__mocks__/axiosAdapter.js',
  },
  reporters: ['default', 'jest-allure'],
  testRunner: 'jest-jasmine2',
  testMatch: ['**/__tests__/**/*.test.ts'],
  setupFiles: ['<rootDir>/__tests__/setup/setUp.ts'],
  setupFilesAfterEnv: ['jest-allure/dist/setup'],
  testTimeout: 3000000,
  // setupFiles: ['./setupJest.js'],
  // coveragePathIgnorePatterns: ['thirdpartyLib'],
  maxWorkers: 1,
};
