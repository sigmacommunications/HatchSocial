import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import Modal from 'react-native-modal';
import TextInputWithTitle from './TextInputWithTitle';
import CustomText from './CustomText';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import { windowHeight, windowWidth } from '../Utillity/utils';
import CustomButton from './CustomButton';
import Feather from 'react-native-vector-icons/Feather'


const HashtagModal = ({isVisible ,setIsVisible}) => {
  const [timerId, setTimerId] = useState(null);
  const [search, setSearch] = useState('');




    const handleInputChange = text => {
        setSearch(text);
        if (timerId) {
          clearTimeout(timerId);
        }
        const newTimerId = setTimeout(() => {
          SearchMembers(text);
        }, 300);
    
        setTimerId(newTimerId);
      };

  return (
  
     <Modal
        isVisible={isVisible}
        onBackdropPress={() => {
          setIsVisible(false);
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor:'red',
          // paddingVertical:moderateScale(20,.6),
        }}>
        <View style={styles.container}>
          <CustomText
            style={[styles.modalHeader, 
                // {backgroundColor: themeColor[1]}
            ]}
            isBold>
            Invite Members
          </CustomText>

          <TextInputWithTitle
            iconName={'search'}
            iconType={Feather}
            secureText={false}
            placeholder={'Alchole'}
            setText={handleInputChange}
            value={search}
            viewHeight={0.05}
            viewWidth={0.8}
            inputWidth={0.7}
            border={1}
            borderColor={Color.veryLightGray}
            marginTop={moderateScale(15, 0.3)}
            // backgroundColor={'black'}
            // color={themeColor[1]}
            placeholderColor={Color.veryLightGray}
            borderRadius={moderateScale(25, 0.3)}
          />

          <FlatList
            // data={newData}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              // marginBottom: moderateScale(10, 0.3),
              paddingBottom: moderateScale(70, 0.6),
              marginTop: moderateScale(10, 0.3),
            }}
            style={{
              height: windowHeight * 0.5,
            }}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.row}
                  onPress={() => {
                    if (
                      invitedPeople?.some((data, index) => data?.id == item?.id)
                    ) {
                      const tempData = [...invitedPeople];
                      tempData.splice(
                        invitedPeople?.findIndex(
                          (data, index) => data?.id == item?.id,
                        ),
                        1,
                      );
                      setInvitedPeople(tempData);
                    } else {
                      setInvitedPeople(prev => [...prev, item]);
                    }
                  }}>
                  <View style={styles.profileSection2}>
                    <CustomImage
                      source={{uri: `${baseUrl}/${item.photo}`}}
                      style={{
                        height: '100%',
                        width: '100%',
                      }}
                      resizeMode="contain"
                    />
                  </View>

                  <View
                    style={{
                      marginLeft: moderateScale(15, 0.6),
                      justifyContent: 'center',
                    }}>
                    <CustomText
                      style={{
                        fontSize: moderateScale(13, 0.6),
                        color: '#000',
                        textAlign: 'left',
                      }}
                      isBold>
                      {/* {item?.name} */}
                    </CustomText>
                    <CustomText
                      style={{
                        fontSize: moderateScale(9, 0.6),
                        textAlign: 'left',
                        color: '#000',
                      }}>
                      {item.Tags}
                    </CustomText>
                  </View>
                  {invitedPeople?.some(
                    (data, index) => data?.id == item?.id,
                  ) && (
                    <View
                      style={[
                        styles.checkIcon,
                        {
                        //   backgroundColor: themeColor[1],
                          position: 'absolute',
                          right: 10,
                          top: 5,
                          borderRadius: moderateScale(10, 0.6),
                          height: moderateScale(20, 0.6),
                          width: moderateScale(20, 0.6),
                        },
                      ]}>
                      <Icon
                        name="check"
                        as={AntDesign}
                        color={'white'}
                        size={4}
                        zIndex={1}
                        onPress={() => {
                          const tempData = [...invitedPeople];
                          tempData.splice(
                            invitedPeople?.findIndex(
                              (data, index) => data?.id == item?.id,
                            ),
                            1,
                          );
                          setInvitedPeople(tempData);
                        }}
                      />
                    </View>
                  )}
                </TouchableOpacity>
              );
            }}
          />
          {/* {invitedPeople?.length > 0 && (
            <View style={styles.invite}>
              <CustomButton
                text={
                  loadingInvite ? (
                    <ActivityIndicator color={'#01E8E3'} size={'small'} />
                  ) : (
                    'invite'
                  )
                }
                textColor={'white'}
                width={windowWidth * 0.4}
                height={windowHeight * 0.05}
                // marginTop={moderateScale(20, 0.3)}
                onPress={() => {
                  invitedPeople.length > 0 && SendInvite();
                }}
                bgColor={themeColor}
                borderRadius={moderateScale(30, 0.3)}
                isGradient
              />
            </View>
          )} */}
        </View>
      </Modal>
   
  )
}

export default HashtagModal
const styles = ScaledSheet.create({
    checkIcon: {
      backgroundColor: Color.white,
      borderRadius: moderateScale(12.5, 0.6),
      height: moderateScale(25, 0.6),
      justifyContent: 'center',
      alignItems: 'center',
      width: moderateScale(25, 0.6),
      padding: moderateScale(3, 0.6),
    },
    followCount: {
      fontSize: moderateScale(20, 0.6),
      color: 'black',
      marginRight: moderateScale(8, 0.3),
      //   width: windowWidth*0.9,
      textAlign: 'center',
    },
    followText: {
      fontSize: moderateScale(14, 0.6),
      color: Color.white,
      marginRight: moderateScale(8, 0.3),
      textAlign: 'center',
    },
    downIcon: {
      backgroundColor: Color.white,
      borderRadius: (windowWidth * 0.11) / 2,
      height: windowWidth * 0.11,
      justifyContent: 'center',
      marginLeft: moderateScale(8, 0.3),
      alignItems: 'center',
      width: windowWidth * 0.11,
      padding: moderateScale(3, 0.6),
    },
    loaderView: {
      // backgroundColor: 'red',
      width: windowWidth,
      height: windowHeight * 0.4,
      justifyContent: 'center',
    },
    eventText: {
      fontSize: moderateScale(14, 0.6),
  
      marginHorizontal: moderateScale(8, 0.3),
      width: windowWidth * 0.22,
      marginLeft: moderateScale(10, 0.3),
      paddingVertical: moderateScale(5, 0.6),
      borderRadius: moderateScale(5, 0.6),
      textAlign: 'center',
      alignItems: 'center',
    },
    container: {
      width: windowWidth * 0.85,
      // height: windowHeight * 0.55,
      // paddingVertical: moderateScale(20, 0.6),
      backgroundColor: Color.white,
      borderRadius: moderateScale(10, 0.6),
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    ct: {
      fontSize: moderateScale(17, 0.6),
      color: 'black',
      marginRight: moderateScale(8, 0.3),
      textAlign: 'center',
    },
    profileSection2: {
      height: windowHeight * 0.05,
      width: windowHeight * 0.05,
      backgroundColor: '#fff',
      borderRadius: (windowHeight * 0.05) / 2,
      borderWidth: 2,
      borderColor: Color.green,
      justifyContent: 'center',
      overflow: 'hidden',
      // alignSelf: 'center',
    },
    modalHeader: {
      color: 'black',
      fontSize: moderateScale(15, 0.6),
      width: '100%',
      textAlign: 'center',
      color: 'white',
      // backgroundColor: themeColor[1],
      padding: moderateScale(10, 0.6),
    },
    row: {
      width: windowWidth * 0.85,
      height: windowHeight * 0.06,
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: moderateScale(14, 0.6),
      marginVertical: moderateScale(2, 0.3),
      // backgroundColor:'red',
    },
    container2: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: moderateScale(30, 0.3),
      paddingHorizontal: moderateScale(30, 0.6),
    },
    textwithicon: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: moderateScale(30, 0.3),
    },
    followbtn: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: moderateScale(30, 0.3),
    },
    mapview: {
      width: windowWidth,
      marginTop: moderateScale(10, 0.3),
      // paddingHorizontal: moderateScale(10, 0.6),
      // marginLeft:moderateScale(10,.3)
    },
    invite: {
      position: 'absolute',
      alignSelf: 'center',
      bottom: 20,
      backgroundColor: 'transparent',
    },
})