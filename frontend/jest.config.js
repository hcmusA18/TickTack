const { defaults: tsjPreset } = require('ts-jest/presets')

/** @type {import('@jest/types').Config.ProjectConfig} */
module.exports = {
  ...tsjPreset,
  preset: 'jest-expo',
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(react-clone-referenced-element|@react-native-community|react-navigation|@react-navigation/.*|@unimodules/.*|native-base|react-native-code-push)',
    'jest-runner'
  ],
  // setup async-storage mock
  setupFiles: ['<rootDir>/__mocks__/setupJest.js'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.maestro/', '@react-native'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.test.tsx?$': [
      'ts-jest',
      {
        useESM: true,
        babelConfig: '<rootDir>/babel.config.js'
      }
    ]
  }
}
