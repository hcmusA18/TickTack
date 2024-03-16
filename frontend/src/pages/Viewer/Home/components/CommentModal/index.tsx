import React, { FC, useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from 'libs/redux'
import { ModalContent } from './ModalContent'
import BottomSheet from '@gorhom/bottom-sheet'
import { clearModal } from 'libs/redux/sliceCommentModal'

const CommentModal: FC = () => {
  const commentModalState = useAppSelector((state) => state.commentModal)
  const bottomSheetRef = useRef<BottomSheet>(null)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (commentModalState.isOpen && bottomSheetRef.current) {
      bottomSheetRef.current.expand()
    }
  }, [commentModalState])

  const renderContent = () => {
    switch (commentModalState.modalType) {
      case 0:
        if (commentModalState.data) {
          return <ModalContent post={commentModalState.data} />
        } else return <></>
      default:
        return <></>
    }
  }

  const onClose = () => {
    dispatch(clearModal())
  }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={['50%']}
      index={-1}
      handleHeight={40}
      onClose={onClose}
      enablePanDownToClose={true}>
      {renderContent()}
    </BottomSheet>
  )
}

export default CommentModal
