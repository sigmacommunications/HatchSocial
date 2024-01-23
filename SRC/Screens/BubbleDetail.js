import {StyleSheet, View, ImageBackground} from 'react-native';
import React from 'react';

import {moderateScale} from 'react-native-size-matters';
import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import { useSelector } from 'react-redux';

const BubbleDetail = () => {
  const privacy = useSelector(state=> state.authReducer.privacy)

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      <Header right
       Title={'Bubble Details'} search
       showBack/>

      <ImageBackground
        source={
          privacy == 'private'
            ? require('../Assets/Images/theme2.jpg')
            : require('../Assets/Images/Main.png')
        }
        resizeMode={'cover'}
        style={{
          width: windowWidth * 1,
          height: windowHeight * 0.9,
          alignItems: 'center',
        }}>
        <View style={styles.profileSection}>
          <CustomImage
            source={require('../Assets/Images/dummyman1.png')}
            style={{height: '100%', width: '100%'}}
            resizeMode="contain"
          />
        </View>

        <View style={styles.Box}>
          <CustomText style={styles.title} isBold>
            Bubble Title
          </CustomText>
          <CustomText
            style={{
              fontSize: moderateScale(10, 0, 6),
              color: '#000',
              textAlign: 'center',
            }}>
            #Architecture
          </CustomText>

          <CustomText style={styles.text}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </CustomText>

          <View
            style={styles.container2}>
            <CustomText
              style={styles.boldText}>
              Moderator:{' '}
            </CustomText>
            <CustomText style={styles.boldText} isBold>
              Jonathan
            </CustomText>
          </View>

          <View
            style={styles.container2}>
            <CustomText
             style={styles.boldText}>
              Admin:{' '}
            </CustomText>
            <CustomText style={styles.boldText} isBold>
              Jonathan
            </CustomText>
          </View>
          <CustomText style={styles.approvalText}>
            Approval for admittance
          </CustomText>

          <CustomText style={styles.approvalText}>Approval to post</CustomText>

          <CustomText style={styles.approvalText}>Membership Cost</CustomText>
        </View>
      </ImageBackground>
    </>
  );
};

export default BubbleDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  profileSection: {
    height: windowWidth * 0.3,
    width: windowWidth * 0.3,
    borderRadius: (windowWidth * 0.3) / 2,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#00801f',
    alignSelf: 'center',
    zIndex: 1,
    marginTop: moderateScale(40, 0.3),
  },

  Box: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.6,
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginTop: moderateScale(-40, 0.3),
    borderRadius: 15,
    elevation: 10,
  },
  text: {
    fontSize: moderateScale(12, 0.6),
    color: '#353434',
    width: windowWidth * 0.85,
    alignSelf: 'center',
    textAlign: 'center',
    lineHeight: 18,
    marginTop: moderateScale(10, 0.3),
  },
  approvalText: {
    fontSize: moderateScale(14, 0.6),
    color: '#353434',
    alignSelf: 'center',
    textAlign: 'center',
    width: windowWidth * 0.85,
    marginTop: moderateScale(10, 0.3),
    //   marginTop: moderateScale(10, 0.3),
  },
  boldText: {
    fontSize: moderateScale(14, 0.6),
    color: '#353434',
    alignSelf: 'center',
    textAlign: 'center',
    //   marginTop: moderateScale(10, 0.3),
  },
  title: {
    marginTop: moderateScale(45, 0.3),
    fontSize: moderateScale(17, 0, 6),
    // fontWeight: '700',
    textAlign: 'center',
    color: '#000',
  },
  container2:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth * 0.85,
    marginTop: moderateScale(10, 0.3),
  }
});
