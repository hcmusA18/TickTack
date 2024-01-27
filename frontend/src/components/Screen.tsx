/* eslint-disable react-native/sort-styles */
import { useScrollToTop } from '@react-navigation/native'
import { StatusBar, StatusBarProps } from 'expo-status-bar'
import React, { FC, useRef, useState } from 'react'
import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  LayoutChangeEvent,
  Platform,
  ScrollView,
  ScrollViewProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle
} from 'react-native'
import { colors } from '../theme'
import { ExtendedEdge, useSafeAreaInsetsStyle } from 'libs/utils/useSafeAreaInsetsStyle'

interface BaseScreenProps {
  /**
   * Children components.
   */
  children?: React.ReactNode
  /**
   * Style for the outer content container useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  /**
   * Style for the inner content container useful for padding & margin.
   */
  contentContainerStyle?: StyleProp<ViewStyle>
  /**
   * Override the default edges for the safe area.
   */
  safeAreaEdges?: ExtendedEdge[]
  /**
   * Background color
   */
  backgroundColor?: string
  /**
   * Status bar setting. Defaults to dark.
   */
  statusBarStyle?: 'light' | 'dark'
  /**
   * By how much should we offset the keyboard? Defaults to 0.
   */
  keyboardOffset?: number
  /**
   * Pass any additional props directly to the StatusBar component.
   */
  StatusBarProps?: StatusBarProps
  /**
   * Pass any additional props directly to the KeyboardAvoidingView component.
   */
  KeyboardAvoidingViewProps?: KeyboardAvoidingViewProps
}

interface FixedScreenProps extends BaseScreenProps {
  preset?: 'fixed'
}

interface ScrollScreenProps extends BaseScreenProps {
  preset?: 'scroll'
  /**
   * Should keyboard persist on screen tap. Defaults to handled.
   * Only applies to scroll preset.
   */
  keyboardShouldPersistTaps?: 'handled' | 'always' | 'never'
  /**
   * Pass any additional props directly to the ScrollView component.
   */
  ScrollViewProps?: ScrollViewProps
}

interface AutoScreenProps extends Omit<ScrollScreenProps, 'preset'> {
  preset?: 'auto'
  /**
   * Threshold to trigger the automatic disabling/enabling of scroll ability.
   * Defaults to `{ percent: 0.92 }`.
   */
  scrollEnabledToggleThreshold?: { percent?: number; point?: number }
}

export type ScreenProps = FixedScreenProps | ScrollScreenProps | AutoScreenProps

const isIos = Platform.OS === 'ios'

const isNonScrolling = (preset?: ScreenProps['preset']) => !preset || preset === 'fixed'

const useAutoPreset = (props: AutoScreenProps) => {
  const { preset, scrollEnabledToggleThreshold } = props
  const { percent = 0.92, point = 0 } = scrollEnabledToggleThreshold || {}

  const scrollViewHeight = useRef<null | number>(null)
  const scrollViewContentHeight = useRef<null | number>(null)
  const [scrollEnabled, setScrollEnabled] = useState(true)

  const updateScrollState = () => {
    if (!scrollViewHeight.current || !scrollViewContentHeight.current) return

    // check whether content fits the screen then toggle scroll state
    const contentFitsScreen = point
      ? scrollViewContentHeight.current < scrollViewHeight.current - point
      : scrollViewContentHeight.current < scrollViewHeight.current * percent

    if (scrollEnabled && contentFitsScreen) setScrollEnabled(false)
    if (!scrollEnabled && !contentFitsScreen) setScrollEnabled(true)
  }

  const onContentSizeChange = (width: number, height: number) => {
    scrollViewContentHeight.current = height
    updateScrollState()
  }

  const onLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout
    scrollViewHeight.current = height
    updateScrollState()
  }

  if (preset === 'auto') updateScrollState()

  return {
    scrollEnabled: preset === 'auto' ? scrollEnabled : true,
    onContentSizeChange,
    onLayout
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%'
  } as ViewStyle,
  keyboardAvoidingViewStyle: {
    flex: 1
  } as ViewStyle,
  outerStyle: {
    flex: 1,
    height: '100%',
    width: '100%'
  } as ViewStyle,
  innerStyle: {
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  } as ViewStyle
})

const ScreenWithoutScrolling = (props: ScreenProps) => {
  const { style, contentContainerStyle, children } = props
  return (
    <View style={[styles.outerStyle, style]}>
      <View style={[styles.innerStyle, contentContainerStyle]}>{children}</View>
    </View>
  )
}

const ScreenWithScrolling = (props: ScreenProps) => {
  const {
    style,
    contentContainerStyle,
    children,
    ScrollViewProps,
    keyboardShouldPersistTaps = 'handled'
  } = props as ScrollScreenProps
  const ref = useRef<ScrollView>(null)
  const { scrollEnabled, onContentSizeChange, onLayout } = useAutoPreset(props as AutoScreenProps)

  // Add native behavior of pressing the active tab to scroll to the top of the content
  // More info at: https://reactnavigation.org/docs/use-scroll-to-top/
  useScrollToTop(ref)

  return (
    <ScrollView
      {...{ keyboardShouldPersistTaps, scrollEnabled, ref }}
      {...ScrollViewProps}
      onLayout={(e) => {
        onLayout(e)
        ScrollViewProps?.onLayout?.(e)
      }}
      onContentSizeChange={(width, height) => {
        onContentSizeChange(width, height)
        ScrollViewProps?.onContentSizeChange?.(width, height)
      }}
      style={[styles.outerStyle, ScrollViewProps?.style, style]}
      contentContainerStyle={[styles.innerStyle, ScrollViewProps?.contentContainerStyle, contentContainerStyle]}>
      {children}
    </ScrollView>
  )
}

export const Screen: FC<ScreenProps> = (props) => {
  const {
    backgroundColor = colors.background,
    statusBarStyle = 'dark',
    StatusBarProps,
    KeyboardAvoidingViewProps,
    keyboardOffset = 0,
    safeAreaEdges
  } = props
  const containerInsets = useSafeAreaInsetsStyle(safeAreaEdges)
  return (
    <View style={[styles.container, containerInsets, { backgroundColor }]}>
      <StatusBar style={statusBarStyle} {...StatusBarProps} />
      <KeyboardAvoidingView
        behavior={isIos ? 'padding' : undefined}
        keyboardVerticalOffset={keyboardOffset}
        {...KeyboardAvoidingViewProps}
        style={[styles.keyboardAvoidingViewStyle, KeyboardAvoidingViewProps?.style]}>
        {isNonScrolling(props.preset) ? <ScreenWithoutScrolling {...props} /> : <ScreenWithScrolling {...props} />}
      </KeyboardAvoidingView>
    </View>
  )
}
