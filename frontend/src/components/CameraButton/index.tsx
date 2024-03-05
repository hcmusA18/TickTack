import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import styled from 'styled-components/native'

interface Props {
  home: boolean
}

const CameraButton: React.FC<Props> = ({ home }) => {
  return (
    <Container home={home}>
      <Button>
        <FontAwesome5 name="plus" size={18} color={home ? '#000' : '#fff'} />
      </Button>
    </Container>
  )
}

const Container = styled.View<Props>`
  top: 3px;
  width: 45px;
  height: 30px;
  justify-content: center;
  border-radius: 10px;
  align-items: center;
  background: ${(props) => (props.home ? '#fff' : '#000')};
  border-left-width: 3px;
  border-left-color: #20d5ea;
  border-right-width: 3px;
  border-right-color: #ec376d;
`

const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 1
})``

export default CameraButton
