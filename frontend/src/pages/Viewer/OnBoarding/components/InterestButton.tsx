import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { colors } from 'theme'

interface InterestButtonProps {
  title: string
  isSelected: boolean
  onPress: () => void
}

const InterestButton: React.FC<InterestButtonProps> = ({ title, isSelected, onPress }) => {
  return (
    <TouchableOpacity style={[styles.button, isSelected && styles.btnPressed]} onPress={onPress}>
      <Text style={[styles.buttonText, isSelected && styles.textPressed]}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.ttt.grey200,
    padding: 10,
    marginRight: 10,
    marginBottom: 10
    // Add additional styling to match your design
    // shadowColor: colors.ttt.UIGrey, // Color of the shadow
    // shadowOffset: {
    //   width: 2,
    //   height: 2, // The spread of the shadow
    // },
    // shadowOpacity: 0.01, // Shadow opacity, can be adjusted
    // shadowRadius: 3.84, // Shadow blur radius
    // elevation: 5, // Elevation for Android
  },
  buttonText: {
    // Add styling for the text inside the button
    color: colors.ttt.pjBlack,
    fontSize: 15,
    fontWeight: 'bold'
  },
  btnPressed: {
    backgroundColor: colors.ttt.UIRed,
    borderColor: colors.transparent
  },
  textPressed: {
    color: colors.ttt.pjWhite
  }
})

export default InterestButton
