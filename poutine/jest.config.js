module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFilesAfterEnv: ['<rootDir>/jest/setup.ts'],
    cacheDirectory: '<rootDir>/.cache/jest',
    moduleNameMapper: {
        '@controllers/(.*)': '<rootDir>/src/controllers/$1',
        '@controllers': '<rootDir>/src/controllers/index',
        '@middlewares/(.*)': '<rootDir>/src/middlewares/$1',
        '@middlewares': '<rootDir>/src/middlewares/index',
        '@models/(.*)': '<rootDir>/src/models/$1',
        '@models': '<rootDir>/src/models/index',
        '@schema/(.*)': '<rootDir>/src/schema/$1',
        '@schema': '<rootDir>/src/schema/index',
        '@services/(.*)': '<rootDir>/src/services/$1',
        '@services': '<rootDir>/src/services/index',
        '@shared/(.*)': '<rootDir>/src/shared/$1',
        '@shared': '<rootDir>/src/shared/index',
    },
    globals: {
        'ts-jest': {
            tsConfig: './tsconfig-test.json',
        },
    },
};
