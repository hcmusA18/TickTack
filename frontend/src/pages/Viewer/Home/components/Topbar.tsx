import React from 'react'
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native'
import Animated from 'react-native-reanimated'
import { colors, typography } from 'theme'
const styles = StyleSheet.create({
  tabBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.border,
    padding: 10,
    gap: 10,
    position: 'absolute',
    zIndex: 100,
    top: 0,
    left: 0,
    right: 0,
    marginStart: 'auto',
    marginEnd: 'auto'
  },
  tabBarText: {
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: typography.primary.normal,
    fontSize: 18,
    color: colors.textDim
  },
  tabBarTextSelected: {
    fontFamily: typography.primary.bold,
    fontSize: 18,
    color: colors.white
  },
  tabBarIndicator: {
    borderRadius: 2,
    height: 3,
    width: '50%',
    backgroundColor: colors.white,
    position: 'absolute',
    bottom: -5,
    left: '20%'
  },
  tabBarSeparator: {
    alignSelf: 'center',
    color: colors.white
  }
})
export const Topbar = ({ currentTab, changeTab }: { currentTab: string; changeTab: (tab: string) => void }) => {
  const tabName = ['Following', 'For You']
  return (
    <View style={styles.tabBar}>
      {tabName.map((tab, index) => {
        return (
          <View style={{ alignSelf: 'center', position: 'relative' }} key={index}>
            <TouchableOpacity
              key={index}
              onPress={() => changeTab(tab)}
              style={{ flex: 1, display: 'flex', flexDirection: 'row', gap: 10 }}>
              <Animated.Text style={[styles.tabBarText, currentTab === tab ? styles.tabBarTextSelected : {}]}>
                {tab}
              </Animated.Text>
              {currentTab === tab && <View style={styles.tabBarIndicator} />}
              {index !== tabName.length - 1 && <Text style={styles.tabBarSeparator}>|</Text>}
            </TouchableOpacity>
          </View>
        )
      })}
    </View>
  )
}
