import { View, Text } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal';
import { windowHeight, windowWidth } from '../Utillity/utils';


const MentionModal = ({isVisible,setIsVisible}) => {
  console.log("🚀 ~ MentionModal ~ isVisible============>:", isVisible)
  return (
    <Modal
    isVisible={isVisible}
    onBackButtonPress={() => {
        setIsVisible(false)
    }}
    >

    <View style={{
        height:windowHeight*0.4,
        width:windowWidth*0.7,
        backgroundColor:'red',

    }}>
      <Text>MentionModal</Text>
    </View>
    </Modal>
  )
}

export default MentionModal