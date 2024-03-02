import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: 'center',
    paddingHorizontal: 40
  },

  username: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: 'bold'
  },

  countContainer: {
    flexDirection: 'row',
    // justifyContent: "space-between",
    // width: "80%",
    marginTop: 15
  },

  countItemContainer: {
    flex: 1,
    alignItems: 'center'
  },

  countNumberContainer: {
    fontSize: 20,
    fontWeight: 'bold'
  },

  countTextContainer: {
    fontSize: 16,
    color: 'gray'
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15
  },

  buttonStyle: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5
  },

  buttonText: {
    fontSize: 18
  }
})

export default styles
