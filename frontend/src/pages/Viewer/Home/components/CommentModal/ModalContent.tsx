import { CommentItem } from './CommentItem'
import { Comment, Post } from 'libs/types'
import React, { useState } from 'react'
import { StyleSheet, TextInput, View, Image, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'
import { colors } from 'theme'
import { BottomSheetFlatList } from '@gorhom/bottom-sheet'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputContainer: {
    padding: 10,
    flexDirection: 'row'
  },
  input: {
    backgroundColor: colors.palette.neutral200,
    borderRadius: 4,
    flex: 1,
    marginHorizontal: 10,
    paddingHorizontal: 10
  },
  avatarSmall: {
    backgroundColor: colors.palette.neutral500,
    height: 32,
    width: 32,
    borderRadius: 16,
    marginTop: 'auto',
    marginBottom: 'auto'
  }
})

// TODO: implement commentSend Handler
export const ModalContent = ({ post }: { post: Post }) => {
  const [comment, setComment] = useState('')
  const [commentList, setCommentList] = useState<Comment[]>([
    { comment: 'a', creator: 'usr2', id: '1', time: Math.floor((Date.now() - 100000000) / 1000).toString() },
    { comment: 'b', creator: 'usr2', id: '2', time: Math.floor((Date.now() - 200000000) / 1000).toString() },
    { comment: 'c', creator: 'usr2', id: '3', time: Math.floor((Date.now() - 110000000) / 1000).toString() },
    { comment: 'd', creator: 'usr2', id: '4', time: Math.floor((Date.now() - 120000000) / 1000).toString() },
    { comment: 'e', creator: 'usr2', id: '5', time: Math.floor(Date.now() / 1000).toString() }
  ])
  const currentUser = null

  const handleCommentSend = () => {
    if (comment.length === 0) return
    setComment('')

    setCommentList([
      ...commentList,
      {
        id: (commentList.length + 1).toString(),
        creator: post.creator,
        comment,
        time: Math.floor(Date.now() / 1000).toString()
      }
    ])
  }

  const renderItem = ({ item }: { item: Comment }) => {
    return <CommentItem item={item} />
  }

  return (
    <View style={styles.container}>
      <BottomSheetFlatList
        data={commentList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={{ flex: 1 }}
      />
      <View style={styles.inputContainer}>
        {currentUser && currentUser.photoURL ? (
          <Image source={{ uri: currentUser.photoURL }} style={styles.avatarSmall} />
        ) : (
          <Avatar.Icon size={32} icon={'account'} />
        )}
        <TextInput style={styles.input} value={comment} onChangeText={setComment} placeholder="Add a comment..." />
        <TouchableOpacity onPress={handleCommentSend}>
          <Ionicons name="arrow-up-circle" size={34} color="crimson" />
        </TouchableOpacity>
      </View>
    </View>
  )
}
