import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import { useSelector } from 'react-redux';
import { mode } from 'native-base/lib/typescript/theme/tools';
import { Divider } from 'native-base';
import CustomButton from './CustomButton';

const SubscriptionCard = ({item}) => {
    const privacy = useSelector(state => state.authReducer.privacy);
    const themeColor = useSelector(state => state.authReducer.ThemeColor);
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
        //   alignItems : 'center'
        }}>
        <CustomImage
          source={item?.image}
          style={{
            width: moderateScale(65, 0.6),
            height: moderateScale(65, 0.6),
            // backgroundColor: 'red',
          }}
        />
        
        <View
          style={{
            // backgroundColor : 'green'
            marginLeft: moderateScale(10, 0.3),
          }}>
          <CustomText
            isBold
            style={{
              fontSize: moderateScale(16, 0.6),
              width: windowWidth * 0.3,
              textAlign : 'left',
              marginTop : 5,
            }}>
            {item?.title}
          </CustomText>
          {![null , undefined , ''].includes(item?.expiring) &&

        
          <View style={{
            paddingHorizontal : moderateScale(5,0.6),
            paddingVertical : moderateScale(3,0.6),
            backgroundColor : themeColor[1],
            borderRadius : moderateScale(15,0.6),
            marginTop : moderateScale(1,0.3),

          }}
          >
            <CustomText style={{
                fontSize : moderateScale(8,0.6),
                color : 'white',
                // backgroundColor : 'red',
                // position : 'absolute'
                
            }}>{item?.expiring}</CustomText>
          </View>
            }
        </View>

      </View>
      <CustomText  style={{
        fontSize : moderateScale(15,0.6),
        marginLeft : moderateScale(10,0.6),
        marginTop : moderateScale(10,0.3),
      }}>Description and price</CustomText>
       <CustomText  style={{
        fontSize : moderateScale(9,0.6),
        marginLeft : moderateScale(10,0.6),
        lineHeight : moderateScale(20,0.3),
        width: windowWidth * 0.7,
        textAlign : 'left'
        // marginTop : moderateScale(10,0.3),
      }}>{`${item?.Description} \n ${item?.Description}`}</CustomText>
       <Divider my="2" bg={themeColor[0]}
    //   color={themeColor[0]}
      />
      <View style={{
        flexDirection : 'row',
        width : windowWidth * 0.8,
        justifyContent : 'space-between',
        alignItems : 'center'
      }}>
        <View>
            <CustomText style={{
                fontSize : moderateScale(13,0.6),
                textDecorationLine : 'line-through',
            }}>
                ${item?.price}
            </CustomText>
            <CustomText
            style={{
                fontSize : moderateScale(20,0.6),
                // textDecorationLine : 'line-through',
            }}
            >
                ${item?.actualPrice}
            </CustomText>
        </View>
        <CustomButton
          text={'Renew'
          
          }
          textColor={themeColor[1]}
          width={windowWidth * 0.35}
          height={windowHeight * 0.05}
          marginTop={moderateScale(10, 0.3)}
          onPress={() => {
          }}
          bgColor={'#FFFFFF'}
          borderRadius={moderateScale(30, 0.3)}
        //   isGradient
          borderColor={themeColor[1]}
          borderWidth={1}
        />

      </View>
    </View>
  );
};

export default SubscriptionCard;

const styles = ScaledSheet.create({
  container: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.3,
    borderRadius: moderateScale(10, 0.3),
    backgroundColor: Color.white,
    marginBottom: moderateScale(15, 0.3),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
    padding: moderateScale(10, 0.6),
    alignItems : 'flex-start'
  },
});
