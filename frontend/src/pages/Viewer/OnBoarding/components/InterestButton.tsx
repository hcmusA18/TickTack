import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { colors } from 'theme'

const InterestButton = ({ title, isSelected, onSelect }) => {
  return (
    <TouchableOpacity style={[styles.button, isSelected && styles.buttonSelected]} onPress={onSelect}>
      <Text style={[styles.buttonText, isSelected && styles.btnPressed]}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.ttt.ink200,
    padding: 10,
    marginRight: 10,
    marginBottom: 10
    // Add additional styling to match your design
  },
  buttonSelected: {
    backgroundColor: colors.ttt.UIRed,
    borderColor: colors.ttt.pjWhite
  },
  buttonText: {
    // Add styling for the text inside the button
    color: colors.ttt.pjBlack,
    fontSize: 15
  },
  btnPressed: {
    color: colors.ttt.pjWhite,
    backgroundColor: colors.ttt.UIRed,
    borderColor: colors.transparent
  }
})

export default InterestButton
