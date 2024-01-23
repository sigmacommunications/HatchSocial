import {View , ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { moderateScale, ScaledSheet } from 'react-native-size-matters'
import { windowHeight, windowWidth } from '../Utillity/utils'
import ScreenBoiler from '../Components/ScreenBoiler'
import { Icon } from 'native-base'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Color from '../Assets/Utilities/Color'
import CustomImage from '../Components/CustomImage'
import CustomText from '../Components/CustomText'
import { GiftedChat } from 'react-native-gifted-chat'
import TextInputWithTitle from '../Components/TextInputWithTitle'
import { useNavigation } from '@react-navigation/native'

const SelectedChat = ({route}) => {
  const navigation = useNavigation()
  const themeColor = useSelector(state => state.authReducer.ThemeColor);
  const secondUser = route?.params?.user2
  console.log("🚀 ~ file: SelectedChat.js:8 ~ SelectedChat ~ secondUser:", secondUser)

  const [messages, setMessages] = useState([]);
  const [text , setText] = useState('');

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])
  
  return (
    <ScreenBoiler
    statusBarBackgroundColor={['#273443','#273443']}
    statusBarContentStyle={'light-content'}
    showHeader={false}
    // headerColor={['#273443','#273443']}
    //  showBack={true}
  >
    <View style={styles.chatHeader}>

    <Icon 
    name={'arrowleft'}
    as={AntDesign}
    color={Color.white}
    size={moderateScale(20,0.3)}
    onPress={()=>{
      navigation.goBack()
    }}
    />
     <CustomImage source={secondUser?.image} style={styles.image} />
     <CustomText style={styles.name}>{secondUser?.name}</CustomText>
     </View>
     <View style={{height : windowHeight * 0.9}}>
     {/* <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={true}
            onSend={messages => onSend(messages)}
            user={{
                _id: 1,
                name: secondUser?.name,
                avatar: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4"
            }}
            renderFooter={()=>{
              return(
                <View style={{
                  width : windowWidth,
                  height : 50,
                  backgroundColor : 'red'
                  
                }}></View>
              )
            }}
            renderInputToolbar={()=>{
              <TextInputWithTitle
              titleText={'Current Passwrod'}
              secureText={false}
              placeholder={'Current Passwrod'}
              setText={setText}
              value={text}
              viewHeight={0.07}
              viewWidth={0.75}
              inputWidth={0.7}
              // border={1}
              borderColor={'#ffffff'}
              backgroundColor={'#FFFFFF'}
              marginTop={moderateScale(35, 0.3)}
              color={themeColor[1]}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(25, 0.3)}
              elevation
            />
            }}
        />       */}
    
     </View> 
    </ScreenBoiler>
  ) 
}

export default SelectedChat

const styles = ScaledSheet.create({
  container :  {
    width : windowWidth,
    height : windowHeight * 0.9,
    backgroundColor : 'white'
  },
  chatHeader : { 
    width : windowWidth ,
    height : windowHeight * 0.1,
    backgroundColor : '#273443',
    alignItems : 'center',
    flexDirection : 'row',
    paddingHorizontal : moderateScale(5,0.6)
  },
  image: {
    width: moderateScale(44, 0.3),
    height: moderateScale(44, 0.3),
    borderRadius: moderateScale(22, 0.3),
    marginLeft: moderateScale(10, 0.3),
    // marginTop: moderateScale(2.5, 0.3),
  },
  name  : {
    color : Color.white
,   fontSize : moderateScale(13,0.6),
marginLeft : moderateScale(10,0.3)
  },
})