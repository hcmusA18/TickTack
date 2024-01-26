import * as ReactNative from 'react-native'
import mockFile from './mockFile'

// libraries to mock
jest.doMock('react-native', () => {
  // Extend ReactNative
  return Object.setPrototypeOf(
    {
      Image: {
        ...ReactNative.Image,
        resolveAssetSource: jest.fn((_source) => mockFile),
        getSize: jest.fn(
          (
            _uri,
            success: (width: number, height: number) => void,
            failure?: (_error: any) => void // eslint-disable-line @typescript-eslint/no-unused-vars
          ) => success(100, 100)
        )
      }
    },
    ReactNative
  )
})

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)

declare const tron // eslint-disable-line @typescript-eslint/no-unused-vars

jest.useFakeTimers()
declare global {
  let __TEST__: boolean
}
