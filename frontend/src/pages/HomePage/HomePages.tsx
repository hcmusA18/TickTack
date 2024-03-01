import React, { FC, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, FlatList } from 'react-native'
import { Screen } from '../../components'
import { AppStackScreenProps } from '../../navigators'
import { colors } from '../../theme'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { PostSingle } from './components'

interface HomePageProps extends AppStackScreenProps<'Home'> {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  }
})

const Tab = createMaterialTopTabNavigator()

const FollowingTab = () => {
  return (
    <View>
      <Text>Following</Text>
    </View>
  )
}

const ForYouTab = () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const mediaRefs = useRef([])
  const onViewableItemsChanged = useRef(({ changed }) => {
    changed.forEach((item) => {
      const cell = mediaRefs.current[item.key]
      if (cell) {
        console.log('onViewableItemsChanged', item, item.isViewable)
        if (item.isViewable) {
          cell.play()
        } else {
          cell.stop()
        }
      }
    })
  })

  const renderItem = ({ item, index }) => {
    return (
      <View style={[{ flex: 1, height: Dimensions.get('window').height }, { backgroundColor: colors.background }]}>
        <PostSingle ref={(ref) => (mediaRefs.current[index] = ref)} />
      </View>
    )
  }

  return (
    <View style={{ position: 'relative' }}>
      <FlatList
        data={array}
        windowSize={4}
        initialNumToRender={1}
        maxToRenderPerBatch={2}
        removeClippedSubviews
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50
        }}
        snapToAlignment={'start'}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        pagingEnabled
        decelerationRate={'normal'}
        onViewableItemsChanged={onViewableItemsChanged.current}
      />
    </View>
  )
}

const Topbar = ({ state, descriptors, navigation, position }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: colors.border,
        gap: 10,
        padding: 10,
        position: 'absolute',
        zIndex: 100,
        top: 0,
        left: 0,
        right: 0,
        marginStart: 'auto',
        marginEnd: 'auto'
      }}>
      {state.routes.map((route: { key: string | number; name: any }, index: React.Key) => {
        const { options } = descriptors[route.key]
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name
        const isFocused = state.index === index
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true
          })
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        }
        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key
          })
        }

        const inputRange = state.routes.map((_, i) => i)
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map((i: any) => (i === index ? 1 : 0.5))
        })
        console.log(route.key, state.routes.length - 1, index, state.routes.length - 1 === index)

        return (
          <>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}>
              <Animated.Text
                style={{
                  opacity,
                  fontFamily: 'Roboto',
                  fontSize: 18,
                  fontWeight: isFocused ? 'bold' : 'normal',
                  color: isFocused ? colors.white : colors.textDim
                }}>
                {label}
              </Animated.Text>
              {isFocused && (
                <View
                  style={{
                    borderRadius: 2,
                    height: 3,
                    width: '40%',
                    marginStart: 'auto',
                    marginEnd: 'auto',
                    backgroundColor: colors.white
                  }}
                />
              )}
            </TouchableOpacity>
            {index !== state.routes.length - 1 && <Text style={{ color: colors.white }}>|</Text>}
          </>
        )
      })}
    </View>
  )
}

export const HomePage: FC<HomePageProps> = () => {
  return (
    <Screen preset="fixed" safeAreaEdges={['top', 'bottom']} contentContainerStyle={styles.container}>
      <Tab.Navigator tabBar={(props) => <Topbar {...props} />} initialRouteName="For You">
        <Tab.Screen name="Following" component={FollowingTab} key="1" />
        <Tab.Screen name="For You" component={ForYouTab} key="2" />
      </Tab.Navigator>
    </Screen>
  )
}
