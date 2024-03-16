import { useSafeAreaInsets } from 'react-native-safe-area-context'

const useMaterialNavbarHeight = (withoutBottomTabs: boolean) => {
  const { bottom, top } = useSafeAreaInsets()
  return bottom - Math.floor(top) + (withoutBottomTabs ? 24 : 104)
}

export default useMaterialNavbarHeight
