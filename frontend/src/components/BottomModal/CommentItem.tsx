import { useUser } from 'libs/hooks'
import { Comment } from 'libs/types'
import React from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'
import { Avatar } from 'react-native-paper'
import { colors } from 'theme'
import { convertTime } from 'libs/utils/convertTime'

const styles = StyleSheet.create({
  avatarSmall: {
    backgroundColor: colors.palette.neutral500,
    height: 40,
    width: 40,
    borderRadius: 999,
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  commentContainer: {
    width: '100%',
    padding: 20,
    flexDirection: 'row'
  },
  containerText: {
    flex: 1,
    marginHorizontal: 14,
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'column',
    height: 42
  },
  displayName: {
    color: colors.palette.neutral500,
    fontSize: 13
  },
  displayTime: {
    color: colors.palette.neutral400,
    fontSize: 12
  }
})

export const CommentItem = ({ item }: { item: Comment }) => {
  const user = useUser(item.creator)

  return (
    <View style={styles.commentContainer}>
      {user?.photoURL ? (
        <Image style={styles.avatarSmall} source={{ uri: user.photoURL }} />
      ) : (
        <Avatar.Icon size={32} icon={'account'} />
      )}
      <View style={styles.containerText}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 1 }}>
          {user && <Text style={styles.displayName}>{user.displayName || user.email}</Text>}
          <Text style={styles.displayTime}>{convertTime(item.time)}</Text>
        </View>
        <Text>{item.comment}</Text>
      </View>
    </View>
  )
}
