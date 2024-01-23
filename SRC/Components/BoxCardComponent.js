import React, {useState} from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import CustomText from '../Components/CustomText';
import Color from '../Assets/Utilities/Color';
import {moderateScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {Icon, Tooltip} from 'native-base';
import { useSelector } from 'react-redux';


const BoxCardComponent = ({imageSource, text, onPress, highlighted, category, setCategory}) => {
  console.log('Box:', text, 'Highlighted:', highlighted);
  const [tooltipAnchor, setTooltipAnchor] = useState(null);
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipText, setTooltipText] = useState('');

  const showTooltip = (text, anchor) => {
    let tooltipText = '';

    switch (text) {
      case 'Content Creator':
        tooltipText =
          'create your bubble and start inviting your subscribers you can have free tiers or get paid for subscriptions';
        break;
      case 'Business & Entrepreneurship':
        tooltipText =
          'Setup your business today and increase connections, collaboration and growth whether you have service offerings or want to link your products, this';
        break;
      case 'Community & Connection':
        tooltipText =
          'Its all about community and connection start building your bubble today!';
        break;
      case 'Learning & Exploring':
        tooltipText =
          'Setup your study groups, sports teams, friend groups Be the leader of the pack that keeps everyone connected and growing';
        break;
      default:
        tooltipText = 'Default tooltip text.';
    }

    setTooltipText(tooltipText);
    setTooltipAnchor(anchor);
    setTooltipVisible(true);
  };

  const toggleTooltip = (text, anchor) => {
    if (isTooltipVisible && tooltipAnchor === text) {
      hideTooltip();
    } else {
      showTooltip(text, anchor);
    }
  };

  const hideTooltip = () => {
    setTooltipVisible(false);
    setTooltipText('');
    setTooltipAnchor(null);
  };

  const handlePress = () => {
    onPress(text);
    hideTooltip();
  };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={()=>{
      handlePress()
      setCategory(text)
      }}>
      <View style={[styles.box, highlighted && styles.highlightedBox]}>
        <Image source={imageSource} style={styles.image} />
        <View style={styles.textContainer}>
          <CustomText isBold style={styles.text}>
            {text}
          </CustomText>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => toggleTooltip(text, text)}>
            <Icon
              name="infocirlceo"
              as={AntDesign}
              color={Color.black}
              size={moderateScale(18, 0.3)}
            />
          </TouchableOpacity>
        </View>
        {tooltipAnchor == text && (
          <Tooltip
            isVisible={isTooltipVisible}
            onBackdropPress={hideTooltip}
            anchor={tooltipAnchor}
            placement="top">
            <View style={styles.tooltipMain}>
              <CustomText style={styles.tooltipText}>{tooltipText}</CustomText>
            </View>
          </Tooltip>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    width: windowWidth * 0.42,
    height: windowHeight * 0.28,
    backgroundColor: Color.white,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '80%',
    resizeMode: 'cover',
    borderTopLeftRadius: moderateScale(10, 0.3),
    borderTopRightRadius: moderateScale(10, 0.3),
  },
  text: {
    fontSize: moderateScale(9, 0.6),
    color: Color.black,
  },
  textContainer: {
    width: windowWidth * 0.4,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: moderateScale(10, 0.3),
  },
  tooltipMain: {
    width: windowWidth * 0.42,
    position: 'absolute',
    bottom: 40,
    right: 0,
    paddingVertical: moderateScale(15, 0.6),
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: moderateScale(5, 0.3),
  },
  tooltipText: {
    color: Color.white,
    paddingHorizontal: moderateScale(10, 0.6),
    fontSize: moderateScale(11, 0.3),
  },

  highlightedBox: {
    width: windowWidth * 0.42,
    height: windowHeight * 0.30,
    borderColor: Color.themeBgColor,
  },
});

export default BoxCardComponent;
