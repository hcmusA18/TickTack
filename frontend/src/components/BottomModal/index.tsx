import React, { FC, useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from 'libs/redux'
import BottomSheet, { BottomSheetHandle } from '@gorhom/bottom-sheet'
import { clearModal } from 'libs/redux/sliceModal'
import { CommentContent } from './CommentContent'
import { ModalType } from 'libs/types'
import { View } from 'react-native'
import { colors } from 'theme'
import { MusicContent } from './MusicContent'

const Modal: FC = () => {
  const modalState = useAppSelector((state) => state.modal)
  const bottomSheetRef = useRef<BottomSheet>(null)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (modalState.isOpen && bottomSheetRef.current) {
      bottomSheetRef.current.expand()
    } else if (!modalState.isOpen && bottomSheetRef.current) {
      bottomSheetRef.current.close()
    }
  }, [modalState])

  const renderContent = () => {
    switch (modalState.modalType) {
      case ModalType.COMMENT:
        if (modalState.data) {
          return <CommentContent post={modalState.data} />
        } else return <></>
      case ModalType.MUSIC_SELECT:
        if (modalState.data) {
          return <MusicContent sounds={modalState.data} />
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
      handleComponent={() => {
        return modalState.modalType === ModalType.MUSIC_SELECT ? (
          <View style={{ alignItems: 'center' }}>
            <View style={{ height: 0, width: 50, backgroundColor: colors.palette.overlay20, borderRadius: 2 }} />
          </View>
        ) : (
          <BottomSheetHandle animatedIndex={undefined} animatedPosition={undefined} />
        )
      }}
      enablePanDownToClose={modalState.modalType !== ModalType.MUSIC_SELECT}>
      {renderContent()}
    </BottomSheet>
  )
}

export default Modal
