import {
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
  Text,
  Platform,
  ToastAndroid,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
const {height, width} = Dimensions.get('window');
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import {useSelector} from 'react-redux';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {Icon, Tooltip} from 'native-base';
import Color from '../Assets/Utilities/Color';
import BoxCardComponent from '../Components/BoxCardComponent';
import CustomButton from '../Components/CustomButton';
import navigationService from '../navigationService';

const ProfileType = () => {
  const themeColor = useSelector(state => state.authReducer.ThemeColor);
  const privacy = useSelector(state => state.authReducer.privacy);
  const [highlightedBox, setHighlightedBox] = useState(null);
  const [category, setCategory] = useState('');

  const handleBoxPress = text => {
    setHighlightedBox(prevHighlightedBox =>
      prevHighlightedBox === text ? null : text,
    );
  };

  const renderBox = (imageSource, text) => (
    <BoxCardComponent
      setCategory={setCategory}
      category={category}
      imageSource={imageSource}
      text={text}
      tooltipText={`Tooltip for ${text}`}
      highlighted={text === highlightedBox}
      onPress={() => handleBoxPress(text)}
    />
  );

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      <Header right Title={'PROFILE TYPE'} />

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
        }}>
        <View style={styles.container}>
          <View style={styles.row}>
            {renderBox(
              require('../Assets/Images/content.jpg'),
              'Content Creator',
            )}
            {renderBox(
              require('../Assets/Images/business.jpg'),
              'Business & Entrepreneurship',
            )}
          </View>
          <View style={styles.row}>
            {renderBox(
              require('../Assets/Images/community.jpg'),
              'Community & Connection',
            )}
            {renderBox(
              require('../Assets/Images/Learning.jpg'),
              'Learning & Exploring',
            )}
          </View>
          <CustomButton
            text={'Proceed'}
            textColor={themeColor[1]}
            width={windowWidth * 0.5}
            height={windowHeight * 0.06}
            marginTop={moderateScale(20, 0.3)}
            bgColor={Color.white}
            borderRadius={moderateScale(30, 0.3)}
            onPress={() => {
              if (category == '') {
                {
                  return Platform.OS == 'android'
                    ? ToastAndroid.show(
                        'Please select any category',
                        ToastAndroid.SHORT,
                      )
                    : Alert.alert('Please select any category');
                }
              }
              navigationService.navigate('Profile', {category: category});
            }}
          />
        </View>
      </ImageBackground>
    </>
  );
};

export default ProfileType;

const styles = StyleSheet.create({
  container: {
    width: windowWidth * 0.98,
    height: windowHeight * 0.87,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: windowWidth,
    alignItems: 'center',
    marginBottom: moderateScale(20, 0.3),
  },
});
