const COMPILER = process.env.TS_COMPILER_TEST || 'tsc';
const COMPILERS: Record<string, string> = {
  tsc: 'ts-jest',
  swc: '@swc/jest',
};
const TS_TRANSFORM = COMPILERS[COMPILER];

if (!TS_TRANSFORM) {
  throw new Error(
    `Unknown compiler: ${COMPILER}. Available options: ${Object.keys(COMPILERS).join(', ')}`,
  );
}

module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': TS_TRANSFORM,
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  testEnvironment: 'node',
  collectCoverage: true,
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  coverageDirectory: 'coverage',
};
