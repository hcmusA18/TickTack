import { CommentItem } from './CommentItem'
import { Comment, Post } from 'libs/types'
import React, { useEffect, useState } from 'react'
import { StyleSheet, TextInput, View, Image, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'
import { colors } from 'theme'
import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import axiosInstance from 'libs/utils/axiosInstance'

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
export const CommentContent = ({ post }: { post: Post }) => {
  const [comment, setComment] = useState('')
  const [commentList, setCommentList] = useState<Comment[]>([])
  const currentUser = null

  const getCommentCount = async (videoId: number) => {
    try {
      const response = await axiosInstance.getAxios().get(`/comments/comments/${videoId}`)
      // console.debug(videoId, ' + ', userId, ' + ', response.data)

      let rpComments = response.data
      rpComments = rpComments.map((element) => {
        const commentId = element.user_id.toString() + element.video_id.toString() + element.time.toString()
        return {
          id: commentId,
          creator: element.user_id,
          comment: element.comment_text,
          time: Math.floor(element.time / 1000).toString()
        }
      })

      console.debug('comments: ', rpComments)
      setCommentList(rpComments)
      // const isLiked = response.data.status
      // setLikeState((prevState) => ({ ...prevState, state: isLiked }))
    } catch (error) {
      console.error('Error fetching likes:', error)
      // Optionally handle error state in UI
    }
  }

  useEffect(() => {
    getCommentCount(Number(post.video_id))
  }, [])

  const handleCommentSend = () => {
    if (comment.length === 0) return
    setComment('')

    setCommentList([
      ...commentList,
      {
        id: (commentList.length + 1).toString(),
        creator: post.user_id.toString(),
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
