import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useRef} from 'react';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import {baseUrl} from '../Config';

const VideoController = ({item}) => {
  console.log('🚀 ~ VideoController ~ item =====> kamal :', item);
  const [clicked, setClicked] = useState(false);
  const [paused, setPaused] = useState(true);
  const [progress, setProgress] = useState(null);
  const [fullScreen, setFullScreen] = useState(false);
  const [loading, setLoading] = useState(false);
  const videoRef = useRef();

  const format = secound => {
    let mins = parseInt(secound / 60)
      .toString()
      .padStart(2, '0');
    let secs = (Math.trunc(secound) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <View
      style={{
        width: windowWidth,
        // backgroundColor: Color.white,
        // alignItems: 'center',
        // marginTop: moderateScale(10, 0.3),
        // backgroundColor: 'red',
      }}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          setClicked(!clicked);
        }}
        style={{width: windowWidth}}>
        <Video
          muted
          paused={paused}
          source={{
            uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          }}
          // source={{uri: `${baseUrl}${item?.name}`}}
          ref={videoRef}
          onProgress={x => {
            setProgress(x);
            console.log('heyyyyyyyyyyyyyyyyyyyyyyyyyyyyy' ,x)
          }}
          onBuffer={() => {
            console.log('buffering video');
            // setLoading(true);
          }}
          style={{
            width: '100%',
            height: '80%',
            // backgroundColor: Color.white,
          }}
          
          onLoadStart={data => {
            console.log('video is loading ', data);
          }}
          onLoad={x => {
            console.log('video successfully loaded ', x);
          }}
        />
        {/* {loading  && <ActivityIndicator size={moderateScale(20,.6)} color={'black'} />} */}
        {/* {clicked && (
          <TouchableOpacity
            onPress={() => {
              setClicked(!clicked);
            }}
            style={{
              width: '100%',
              height: '100%',
              // height: windowWidth * 0.42,
              position: 'absolute',
              // top: moderateScale(22, 0.3),
              backgroundColor: 'rgba(0,0,0,.3)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                width: windowWidth * 0.6,
                alignItems: 'center',
              }}>
              <CustomImage
                onPress={() => {
                  videoRef.current.seek(parseInt(progress.currentTime) - 10);
                }}
                source={require('../Assets/Images/backword.png')}
                style={{width: 32, height: 32, tintColor: '#fff'}}
              />

              <CustomImage
                onPress={() => {
                  setPaused(!paused);
                }}
                source={
                  paused
                    ? require('../Assets/Images/play.png')
                    : require('../Assets/Images/paused.png')
                }
                style={{width: 35, height: 35, tintColor: '#fff'}}
              />

              <CustomImage
                onPress={() => {
                  videoRef.current.seek(parseInt(progress.currentTime) + 10);
                }}
                source={require('../Assets/Images/forward.png')}
                style={{width: 32, height: 32, tintColor: '#fff'}}
              />
            </View>

            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                position: 'absolute',
                bottom: 10,
                paddingLeft: moderateScale(20, 0.6),
                paddingRight: moderateScale(20, 0.6),
                alignItems: 'center',
              }}>
              <CustomText style={{color: '#fff'}}>
                {format(progress.currentTime)}
              </CustomText>

              <Slider
                style={{width: windowWidth * 0.5, height: windowHeight * 0.02}}
                minimumValue={0}
                maximumValue={progress.seekableDuration}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#ffffff"
                onValueChange={x => {
                  videoRef.current.seek(x);
                }}
              />
              <CustomText style={{color: Color.white}}>
                {format(progress.seekableDuration)}
              </CustomText>
            </View>
          </TouchableOpacity>
        )} */}
      </TouchableOpacity>
    </View>
  );
};

export default VideoController;
