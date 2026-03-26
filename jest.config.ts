import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      diagnostics: false,
      isolatedModules: true,
    }],
  },
  moduleDirectories: ['node_modules', 'src'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/server.ts',
    '!src/config/env.ts',
  ],
  coverageDirectory: 'coverage',
};

export default config;
