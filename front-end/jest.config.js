import { defaults as tsjPreset } from "ts-jest/presets"

/** @type {import('@jest/types').Config.ProjectConfig} */
export default {
  ...tsjPreset,
  preset: "jest-expo",
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(react-clone-referenced-element|@react-native-community|react-navigation|@react-navigation/.*|@unimodules/.*|native-base|react-native-code-push)",
    "jest-runner",
  ],
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.maestro/", "@react-native"],
  testEnvironment: "jsdom",
  setupFiles: ["<rootDir>/test/setup.ts"],
  transform:{
    '^.+\\.test.tsx?$': ['ts-jest', {
      tsconfig: '<rootDir>/test/test-tsconfig.json'
    }]
  }
}
