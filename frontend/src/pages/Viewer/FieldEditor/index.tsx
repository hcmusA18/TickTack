import React, { FC, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { AppStackScreenProps } from 'navigators'
import { Screen } from 'components'
import { Divider } from 'react-native-paper'
import { colors } from 'theme'

interface FieldEditorProps extends AppStackScreenProps<'FieldEditor'> {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    // alignItems: 'center',
    backgroundColor: colors.background
    // paddingTop: spacing.md, // Add padding to ensure space from top
  },

  navbarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  backContainer: {
    color: colors.palette.neutral100,
    paddingHorizontal: 20,
    paddingVertical: 10
  },

  fieldsContainer: {
    padding: 20
  },

  fieldNameStyle: {
    fontWeight: 'bold',
    color: colors.text,
    fontSize: 16
  },

  textInputStyle: {
    borderColor: colors.border,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    paddingVertical: 5
  }
})
const saveColor = 'red'

export const FieldEditor: FC<FieldEditorProps> = ({ route, navigation }) => {
  // const { navigation } = props;
  const { fieldName, fieldValue } = route.params ?? { fieldName: 'Username', fieldValue: '' }

  const [value] = useState(fieldValue)

  const onSave = () => {
    // Save the new value
    if (__DEV__) console.log('Saving the new value: ', value)
    navigation.navigate('ProfileEditor')
  }

  return (
    <Screen preset="fixed" safeAreaEdges={['top', 'bottom']} contentContainerStyle={styles.container}>
      {/* Navbar */}
      <View style={styles.navbarContainer}>
        <TouchableOpacity style={styles.backContainer} onPress={() => navigation.navigate('ProfileEditor')}>
          <Text style={{ fontSize: 18 }}>Cancel</Text>
        </TouchableOpacity>

        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{fieldName}</Text>

        <TouchableOpacity style={styles.backContainer} onPress={() => onSave()}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: saveColor }}>Save</Text>
        </TouchableOpacity>
      </View>
      {/* Navbar */}
      <Divider />
      <View style={styles.fieldsContainer}>
        <Text style={styles.fieldNameStyle}>{fieldName}</Text>
      </View>
    </Screen>
  )
}
