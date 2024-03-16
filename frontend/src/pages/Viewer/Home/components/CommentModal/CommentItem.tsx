import { useUser } from 'libs/hooks'
import { Comment } from 'libs/types'
import React from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'
import { Avatar } from 'react-native-paper'
import { colors } from 'theme'

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
  const convertTime = (time: string) => {
    const date = new Date(parseInt(time) * 1000)
    const diff = Date.now() - date.getTime()
    const times = {
      year: 365 * 24 * 60 * 60 * 1000,
      month: 30 * 24 * 60 * 60 * 1000,
      day: 24 * 60 * 60 * 1000,
      hour: 60 * 60 * 1000,
      minute: 60 * 1000
    }
    if (diff < times.minute) return 'Just now'
    if (diff < times.hour) return `${Math.floor(diff / times.minute)}m`
    if (diff < times.day) return `${Math.floor(diff / times.hour)}h`
    if (diff < times.month) return `${Math.floor(diff / times.day)}d`
    if (diff < times.year) return `${Math.floor(diff / times.month)}mo`

    return date.toLocaleString()
  }

  return (
    <View style={styles.commentContainer}>
      {user && user.photoURL ? (
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
