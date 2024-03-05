import React, { FC, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { AppStackScreenProps } from '../../../../navigators'
import { Feather } from '@expo/vector-icons'
import { Screen } from '../../../../components'
import { Divider } from 'react-native-paper'
import { TextInput } from 'react-native-gesture-handler'

interface EditProfileFieldProps extends AppStackScreenProps<'EditProfileField'> {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    // alignItems: 'center',
    backgroundColor: 'white'
    // paddingTop: spacing.md, // Add padding to ensure space from top
  },

  navbarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  backContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },

  fieldsContainer: {
    padding: 20
  },

  fieldNameStyle: {
    fontWeight: 'bold',
    color: 'grey',
    fontSize: 16
  },

  textInputStyle: {
    borderColor: 'lightgray',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    paddingVertical: 5
  }
})

export const EditProfileFieldPage: FC<EditProfileFieldProps> = ({ route, navigation }) => {
  // const { navigation } = props;
  const { fieldName, fieldValue } = route.params ?? { fieldName: 'Username', fieldValue: '' }

  const [value, setValue] = useState(fieldValue)

  const onSave = () => {
    // Save the new value
    console.log('Saving the new value: ', value)
    navigation.navigate('EditProfile')
  }

  return (
    <Screen preset="fixed" safeAreaEdges={['top', 'bottom']} contentContainerStyle={styles.container}>
      {/* Navbar */}
      <View style={styles.navbarContainer}>
        <TouchableOpacity style={styles.backContainer} onPress={() => navigation.navigate('EditProfile')}>
          <Text style={{ fontSize: 18 }}>Cancel</Text>
        </TouchableOpacity>

        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{fieldName}</Text>

        <TouchableOpacity style={styles.backContainer} onPress={() => onSave()}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'red' }}>Save</Text>
        </TouchableOpacity>
      </View>
      {/* Navbar */}
      <Divider />
      <View style={styles.fieldsContainer}>
        <Text style={styles.fieldNameStyle}>{fieldName}</Text>
        <TextInput style={styles.textInputStyle} defaultValue={fieldValue} onChangeText={(text) => setValue(text)} />
      </View>
    </Screen>
  )
}
