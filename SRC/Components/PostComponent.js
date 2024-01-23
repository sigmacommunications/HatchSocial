import {
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  video,
  Alert,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import {Icon} from 'native-base';
import {Divider} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import LinearGradient from 'react-native-linear-gradient';
import CustomImage from './CustomImage';
import ShowMoreAndShowLessText from './ShowMoreAndShowLessText';
import VideoController from './VideoController';
import OptionsMenu from 'react-native-options-menu';
import RBSheet from 'react-native-raw-bottom-sheet';
import {FlatList} from 'react-native';
import navigationService from '../navigationService';

const PostComponent = ({data}) => {
  const [like, setLike] = useState(false);
  const refRBSheet = useRef();
  const MoreIcon = require('../Assets/Images/threedots.png');
  const editPost = () => {
    Alert.alert('Edit Your Post');
  };

  const deletePost = () => {
    Alert.alert('Delete Your Post');
  };

  return (
    <>
      <View
        style={styles.mainVew}>
        <View
          style={styles.profileView}>
          <View style={styles.profileSection2}>
            <CustomImage
              source={data?.profileImage}
              style={{
                height: '100%',
                width: '100%',
              }}
              resizeMode="contain"
            />
          </View>

          <View style={{width: windowWidth * 0.65, justifyContent: 'center'}}>
            <CustomText numberOfLines={2}>{data?.Name}</CustomText>

            <View
              style={styles.btnView}>
              <CustomText style={{textAlign: 'left'}}>{data?.date}</CustomText>
              <TouchableOpacity activeOpacity={0.7}>
                <Entypo name="globe" size={14} color={Color.veryLightGray} />
              </TouchableOpacity>
            </View>
          </View>

          <OptionsMenu
          
            button={MoreIcon}
            buttonStyle={{
              width: 36,
              height: 30,
              tintColor: '#000',
            }}
            destructiveIndex={1}
            options={['Edit', 'Delete']}
            actions={[editPost, deletePost]}
          />
        </View>

        <View
          style={styles.textView}>
          <CustomText
            style={styles.customT}>
            {data?.desc}
          </CustomText>
        </View>
        {(data?.image || data?.video) && (
          <View style={{width: windowWidth, height: windowHeight * 0.3}}>
            {data?.image ? (
              <CustomImage
              onPress={()=>{
                navigationService.navigate('Feeds',{image : data?.image})
              }}
                source={data?.image}
                style={{
                  height: '100%',
                  width: '100%',
                  marginTop: moderateScale(5, 0.3),
                }}
                resizeMode="cover"
              />
            ) : (
              <VideoController item={data} />
            )}
          </View>
        )}

        <View
          style={styles.container}>
          <View
            style={styles.containerView}>
            <View
              style={styles.imageView}>
              <CustomImage
                source={require('../Assets/Images/like.png')}
                style={{
                  height: '100%',
                  width: '100%',
                }}
                resizeMode="cover"
              />
            </View>
            <View
              style={styles.image2}>
              <CustomImage
                source={require('../Assets/Images/heart.png')}
                style={{
                  height: '100%',
                  width: '100%',
                }}
                resizeMode="cover"
              />
            </View>
            <CustomText
              style={styles.text1}>
              {data?.Like}K
            </CustomText>
          </View>

          <View
            style={styles.rbView}>
            <CustomText
             onPress={() => refRBSheet.current.open()}
              numberOfLines={1}
              style={[
                {
                  color: Color.veryLightGray,
                  fontSize: moderateScale(13, 0.6),
                  width: windowWidth * 0.3,
                },
                data?.View == null && {textAlign: 'right', width: '90%'},
              ]}>
              {data?.comment} comments
            </CustomText>
            {data?.View && (
              <CustomText
                numberOfLines={1}
                style={styles.cT}>
                {data?.View} views
              </CustomText>
            )}
          </View>
        </View>

        <Divider my="2" _light={{color: Color.veryLightGray}} />

        <View
          style={{

            flexDirection: 'row',
            // backgroundColor : 'red'
            // justifyContent: 'space-around',
            // paddingHorizontal: moderateScale(5, 0.6),
          }}>
          <TouchableOpacity
            onPress={() => {
              setLike(!like);
            }}
            style={styles.likebtn}>
            <Icon
              as={AntDesign}
              name={like ? 'like2' : 'like1'}
              size={23}
              color={like ? Color.themeBlack : '#2a95fd'}
              onPress={() => {
                setLike(!like);
              }}
            />

            <CustomText>Like</CustomText>
          </TouchableOpacity>

          <TouchableOpacity
           onPress={() => refRBSheet.current.open()}
            style={styles.button}>
            <Octicons
              name="comment"
              size={23}
              color={Color.themeBlack}
              onPress={() => refRBSheet.current.open()}
            />
            <CustomText>comments</CustomText>
          </TouchableOpacity>

          <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={false}
            customStyles={{
              draggableIcon: {
                backgroundColor: Color.veryLightGray,
              },
            }}
            height={700}>
            <FlatList
              data={data?.commentData}
              renderItem={({item, index}) => {
                return (
                  <View style={{width: windowWidth}}>
                    <View
                      style={styles.flatView}>
                      <View
                        style={styles.profileView2}>
                        <View style={styles.profileSection2}>
                          <CustomImage
                            source={item?.pic}
                            style={{
                              height: '100%',
                              width: '100%',
                            }}
                            resizeMode="contain"
                          />
                        </View>

                        <View
                          style={styles.Views}>
                          <CustomText
                            numberOfLines={1}
                            style={{
                              color: 'black',
                              fontSize: moderateScale(14, 0.6),
                            }}
                            isBold>
                            {item?.name}
                          </CustomText>
                          <CustomText
                            style={styles.text}
                            numberOfLines={2}>
                            {item?.comment}
                          </CustomText>
                        </View>
                      </View>

                      <View
                        style={styles.rowView}>
                        <CustomText style={styles.text}>
                          {item?.Time}h
                        </CustomText>
                        <CustomText style={styles.text}>Like</CustomText>
                        <CustomText style={styles.text}>Reply</CustomText>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          </RBSheet>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainVew:{
    width: windowWidth,
    paddingVertical: moderateScale(15, 0.6),
    backgroundColor: Color.white,
    marginTop: moderateScale(10, 0.3),
    elevation: 2,
  },
  likebtn:{
    flexDirection: 'row',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth : 1,
    borderColor : Color.veryLightGray
  },
  flatView:{
    width: windowWidth,
    marginTop: moderateScale(10, 0.3),
  },
  cT:{
    color: Color.veryLightGray,
    fontSize: moderateScale(13, 0.6),
    width: windowWidth * 0.3,
  },
  customT:{
    textAlign: 'left',
    marginLeft: moderateScale(15, 0.3),
    fontSize: moderateScale(13, 0.6),
  },
  button:{
    flexDirection: 'row',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image2:{
    width: moderateScale(25, 0.6),
    height: moderateScale(25, 0.6),
  },
  container:{
    flexDirection: 'row',
    width: windowWidth,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(10, 0.3),
    marginTop: moderateScale(15, 0.3),
  },
  text1:{
    color: Color.veryLightGray,
    marginLeft: moderateScale(5, 0.3),
    fontSize: moderateScale(13, 0.6),
    width: windowWidth * 0.16,
  },
  rbView:{
    flexDirection: 'row',
    width: windowWidth * 0.62,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  profileSection2: {
    height: windowHeight * 0.08,
    width: windowHeight * 0.08,
    backgroundColor: '#336ecb',
    borderRadius: (windowHeight * 0.08) / 2,
    borderWidth: 2,
    borderColor: Color.themeColor,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  rowView:{
    flexDirection: 'row',
    width: windowWidth * 0.4,
    marginLeft: moderateScale(60, 0.3),
    justifyContent: 'space-evenly',
    marginTop: moderateScale(5, 0.3),
  } ,
  imageView:{
    marginRight: moderateScale(3, 0.3),
    width: moderateScale(20, 0.6),
    height: moderateScale(20, 0.6),
  },
  profileView2 :{
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10, 0.6),
    width: windowWidth,
  },
  Views:{
    paddingVertical: moderateScale(5, 0.6),
    paddingHorizontal: moderateScale(15, 0.6),
    backgroundColor: Color.lightGrey,
    borderRadius: moderateScale(10, 0.6),
    marginLeft: moderateScale(10, 0.3),
  },
  text: {fontSize: moderateScale(12, 0.6), color: 'black'},
  profileSection2: {
    height: windowHeight * 0.06,
    width: windowHeight * 0.06,
    backgroundColor: '#336ecb',
    borderRadius: (windowHeight * 0.06) / 2,
    borderWidth: 2,
    borderColor: Color.themeColor,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  containerView:{
    flexDirection: 'row',
    width: windowWidth * 0.25,
    // backgroundColor:'green',
    alignItems: 'center',
  },
  btnView:{
    flexDirection: 'row',
    width: windowWidth * 0.17,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  textView:{
    width: windowWidth,
    marginTop: moderateScale(8, 0.3),
  },
  profileView:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(10, 0.6),
    marginTop: moderateScale(10, 0.3),
  },
});

export default PostComponent;
