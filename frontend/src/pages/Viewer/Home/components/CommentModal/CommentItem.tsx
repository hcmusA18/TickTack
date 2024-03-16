import { useUser } from 'libs/hooks'
import { Comment } from 'libs/types'
import React from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'
import { Avatar } from 'react-native-paper'
import { colors } from 'theme'

const styles = StyleSheet.create({
  avatarSmall: {
    backgroundColor: colors.palette.neutral500,
    height: 32,
    width: 32,
    borderRadius: 16,
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  commentContainer: {
    padding: 20,
    flexDirection: 'row'
  },
  containerText: {
    marginHorizontal: 14
  },
  displayName: {
    color: colors.palette.neutral500,
    fontSize: 13
  }
})

export const CommentItem = ({ item }: { item: Comment }) => {
  const user = useUser(item.creator)

  return (
    <View style={styles.commentContainer}>
      {user && user.photoURL ? (
        <Image style={styles.avatarSmall} source={{ uri: user.photoURL }} />
      ) : (
        <Avatar.Icon size={32} icon={'account'} />
      )}
      <View style={styles.containerText}>
        {user && <Text style={styles.displayName}>{user.displayName || user.email}</Text>}
        <Text>{item.comment}</Text>
      </View>
    </View>
  )
}
