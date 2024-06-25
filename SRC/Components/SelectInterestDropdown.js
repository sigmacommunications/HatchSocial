import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from './CustomText';
import {moderateScale} from 'react-native-size-matters';
import {Icon} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import Color from '../Assets/Utilities/Color';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import CustomImage from './CustomImage';
import {baseUrl} from '../Config';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SelectInterestDropdown = ({interestsArray, item, setItem ,fromInterest ,selectedInterest}) => {
  console.log("🚀 ~ selectedInterest:", selectedInterest)
  console.log("🚀 ~ interestsArray:", interestsArray)
  const themeColor = useSelector(state => state.authReducer.ThemeColor);
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
      disabled={fromInterest ? true :false}
        style={{
          height: windowHeight * 0.045,
          width: windowWidth * 0.9,
          backgroundColor: 'white',
          borderRadius: moderateScale(20, 0.6),
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: moderateScale(5, 0.6),
          flexDirection: 'row',
        }}
        onPress={() => {
          setIsVisible(true);
        }}>
        <CustomText
          //   isBold
          style={{
            fontSize: moderateScale(12, 0.6),
            color: Color.mediumGray,
            paddingHorizontal: moderateScale(10, 0.6),
          }}>
          {fromInterest ? selectedInterest : item?.name  ?item?.name:'interest preference'}
        </CustomText>
        <Icon
          name="chevron-small-down"
          as={Entypo}
          size={moderateScale(27, 0.6)}
          color={Color.themeColor}
        />
      </TouchableOpacity>

      <Modal
        isVisible={isVisible}
        onBackdropPress={() => {
          setIsVisible(false);
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={styles.container}>
          <View
            style={{
              backgroundColor: themeColor[1],
              //   alignItems: 'center',
              //   justifyContent: 'center',
            }}>
            <CustomText
              style={[
                styles.text,
                {
                  color: 'white',
                },
              ]}
              isBold>
              interests
            </CustomText>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {interestsArray?.map((data, index) => {
              // console.log("🚀 ~ {interestsArray?.map ~ data:", data?.image)
              return (
                <TouchableOpacity
                  onPress={() => {
                    setItem(data);
                    setIsVisible(false)
                  }}
                  style={{
                    padding: moderateScale(5, 0.6),
                    flexDirection: 'row',
                    paddingHorizontal: moderateScale(10, 0.6),
                    paddingVertical: moderateScale(10, 0.6),
                  }}>
                  <View style={styles.circle}>
                    <CustomImage
                      source={{uri: `${baseUrl}${'/'}${data?.image}`}}
                      style={{width: '100%', height: '100%'}}
                    />
                  </View>
                  <CustomText
                    style={[styles.text, {fontSize: moderateScale(15, 0.6)}]}
                    isBold>
                    {data?.name}
                  </CustomText>
                  {item?.name == data?.name && (
                    <Icon
                    style={{
                        position:'absolute',
                        right :8,
                        top:22
                    }}
                      as={FontAwesome}
                      color={Color.green}
                      name={'check'}
                      size={moderateScale(15, 0.6)}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

export default SelectInterestDropdown;

const styles = StyleSheet.create({
  container: {
    width: windowWidth * 0.85,
    paddingBottom: moderateScale(20, 0.6),
    backgroundColor: Color.white,
    borderRadius: moderateScale(10, 0.6),
    overflow: 'hidden',
    height: windowHeight * 0.45,
  },
  text: {
    color: Color.darkGray,
    fontSize: moderateScale(17, 0.6),
    paddingVertical: moderateScale(10, 0.6),
    paddingHorizontal: moderateScale(30, 0.6),
    textAlign: 'center',
  },
  circle: {
    width: windowWidth * 0.09,
    height: windowHeight * 0.05,
    borderRadius: moderateScale(5, 0.6),
    // justifyContent: 'center',
    overflow: 'hidden',
    // padding :moderateScale(10,.6)
  },
});
