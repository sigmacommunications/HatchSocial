import React, {useRef, useCallback, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  I18nManager,
  NativeTouchEvent,
  TouchableOpacity,
  Image,
  Text,
  Dimensions,
} from 'react-native';
import {
  WP,
  pointOnCircle,
  calculateRadius,
  calculateAngleBetweenTwoPoints,
} from 'react-native-rotating-menu/src/services';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {
  StylesheetInterface,
  PropsI,
  pointI,
} from 'react-native-rotating-menu/src/services/interfaces';
import * as Animatable from 'react-native-animatable';
import Svg, {Ellipse} from 'react-native-svg';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Icon} from 'native-base';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const RoundMenu = ({
  setHighlightedIcon,
  setAnimationStopped,
  content = [],
  size = WP('100'),
  contentContainerStyle,
  centerContent,
  profileData,
  centerContentSize = size / 2.5,
  rotateCenterImage,
  rotationAngle,
  backgroundColor,
  alignment,
  setIsVisible,
  setBubbleData,
  setclicked,
  setSelectedBubbleId,
  borderColor,
  ceneterImageOnLongPress,
  centerImageOnPress

}) => {
  // console.log("🚀 ~ content===================> here is content:", content)
  const navigation = useNavigation()   
  const innerContainerRef = useRef(null);
  const outerContainerRef = useRef(null);
  const [menuRef, setMenuRef] = useState(null);
  const touchEvent = useRef<pointI>({x: undefined, y: undefined});
  const touchEventPrev = useRef<pointI>({x: undefined, y: undefined});
  const touchStart = useRef(undefined);
  const center = {x: size / 2, y: size / 2};
  const radius = size / 3;
  const divisionAngle = content.length > 0 ? 360 / content.length : 0;
  // console.log("🚀 ~ divisionAngle:", divisionAngle)
  const [offsetAngle, setOffsetAngle] = useState(0);
  const [pointsDone, setPointsDone] = useState(false);

  const pointsArray = [];

  const handleGesture = (e: any) => {
    touchEvent.current = e.nativeEvent;
    if (!touchStart.current) {
      touchStart.current = {
        touchEvent: e.nativeEvent,
        angle: offsetAngle,
      };
      touchEventPrev.current = e.nativeEvent;
      return;
    }

    const touchDistanceFromCenter = calculateRadius(center, touchEvent.current);
    if (
      touchDistanceFromCenter > radius * 0.3 &&
      touchDistanceFromCenter < radius * 1.5
    ) {
      const angleMoved = calculateAngleBetweenTwoPoints(
        center,
        touchEventPrev.current,
        touchEvent.current,
      );
      touchEventPrev.current = e.nativeEvent;
      setOffsetAngle(
        offsetAngle + (I18nManager.isRTL ? -angleMoved : angleMoved),
      );
    }
  };

  function calculateDistance(x1: any, y1: any, x2: any, y2: any) {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    return distance;
  }

  const findCenterpoints = (x: any, y: any) => {
    let xPoint1 = [0, 0];
    let xPoint2 = [0, 0];
    let yPoint1 = [0, 0];
    let yPoint2 = [0, 0];
    if (Math.round(x) >= 0 && Math.round(x) < 95) {
      xPoint1 = [x, y];
    }
    if (Math.round(x) >= 300) {
      xPoint2 = [x, y];
    }
    if (Math.round(x) >= 190 && Math.round(x) < 210 && Math.round(y) < 65) {
      yPoint1 = [x, y];
    }
    if (Math.round(x) >= 190 && Math.round(x) < 210 && Math.round(y) > 320) {
      yPoint2 = [x, y];
    }

    // const xPoint2 = (Math.round(x)>=300) && [x,y];
    const xcenter = (xPoint1[0] + xPoint2[0]) / 2;
    const ycenter = (xPoint1[1] + xPoint2[1]) / 2;
    const xRadius =
      calculateDistance(xPoint2[0], xPoint2[1], xPoint1[0], xPoint1[1]) / 2;

    // const yPoint1 =( ) && [x,y]
    // const yPoint2 =  ( ) && [x,y]
    const yRadius =
      calculateDistance(yPoint1[0], yPoint1[1], yPoint2[0], yPoint2[1]) / 2;
    setPointsDone(true);
    return {
      xCenter: xcenter,
      yCenter: ycenter,
      xRadius: xRadius,
      yRadius: yRadius,
    };
    // return(
    //     <Svg>
    //         <Ellipse cx={192} cy={190} rx={50} ry={80} stroke={"red"} strokeWidth="2"/>
    //         <Ellipse cx={250} cy={150} rx={60} ry={30} stroke={"green"} strokeWidth="2"/>
    //     </Svg>
    // )
  };

  const onTouchRelease = (e: any) => {
    if (e.nativeEvent.oldState === 4) {
      touchEventPrev.current = undefined;
      touchStart.current = undefined;
    }
  };
  const animateInnerContainer = () => {
    innerContainerRef.current?.animate('zoomIn', 500);
  };

  const animateOuterContainer = () => {
    outerContainerRef.current?.animate('zoomIn', 1500);
  };

  useEffect(() => {
    animateOuterContainer();
    animateInnerContainer();
    setAnimationStopped(true);
  }, []);

  return (
    <View>
      <PanGestureHandler
        onHandlerStateChange={onTouchRelease}
        onGestureEvent={handleGesture}
        ref={ref => {
          setMenuRef(ref);
        }}>
        <View>
          {centerContent && (
            <Animatable.View
            
              ref={innerContainerRef}
              style={{
                transform: [{rotate: `${rotationAngle}deg`}],
                left:
                  alignment == 'left'
                    ? center.x - centerContentSize / 1.7
                    : center.x - centerContentSize / 2.3,
                top: center.x - centerContentSize / 2,
                width: centerContentSize,
                backgroundColor:'#d7d7d7',
                height: centerContentSize,
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 500 / 2,
                overflow: 'hidden',
                borderColor :borderColor,
                borderWidth :3,
                zIndex : 1,
              }}>
                <TouchableOpacity 
                activeOpacity={0.8}
                onPress={centerImageOnPress} 
                onLongPress={ceneterImageOnLongPress}
                style={{
                   height: '100%',
                   width: '100%',
                }}>
              {centerContent}
              </TouchableOpacity>
            </Animatable.View>
          )}
          <View
            style={{
              top: center.x - size / 2.8,
              width: size / 1.4,
              zIndex: -1,
              height: size / 1.4,
              alignSelf: 'center',
              position: 'absolute',
              borderRadius: size / 2.8,
              backgroundColor: 'rgba(255,255,255,0.4)',
            }}></View>

          <Animatable.View
            ref={outerContainerRef}
            style={styles({size, backgroundColor}).container}>
            {content.map((el, i) => {
            //  console.log("🚀 ~ {content.map ~ el=============> here i m:", el)
             
              const [x, y] = pointOnCircle({
                radius,
                angle:
                  divisionAngle * (i + 1) + offsetAngle + rotationAngle + 90,
                cx: center.x,
                cy: center.y,
              });
              const minx = alignment == 'left' ? 325 : 65;
              const maxx = alignment == 'left' ? 330 : 70;
              const miny = alignment == 'left' ? 130 : 150;
              const maxy = alignment == 'left' ? 230 : 230;
              const smallmin = alignment == 'left' ? 0 : 280;
              const smallmax = alignment == 'left' ? 150 : 350;
              const elContainerSize =
                alignment == 'left'
                  ? x /
                    (Math.round(x) >= minx &&
                    Math.round(x) < maxx &&
                    Math.round(y) >= miny &&
                    Math.round(y) < maxy
                      ? 3
                      : 4)
                  : (Dimensions.get('window').width - x) /
                    (Math.round(x) >= minx &&
                    Math.round(x) < maxx &&
                    Math.round(y) >= miny &&
                    Math.round(y) < maxy
                      ? 3
                      : 4);
              if (
                Math.round(x) >= minx &&
                Math.round(x) < maxx &&
                Math.round(y) >= miny &&
                Math.round(y) < maxy
              ) {
                setHighlightedIcon(el?.image);
              }

              

              return (
                // i <= 8 ?
                <>
                  <Animatable.View
                    animation={
                      (elContainerSize == x / 3 ||
                        elContainerSize ==
                          (Dimensions.get('window').width - x) / 3) &&
                      (el?.bubble ? 'pulse' : 'pulse')
                    }
                    easing="ease-in"
                    iterationCount="infinite"
                    style={[
                      styles({elContainerSize, elContainerCoOrdinates: {x, y}})
                        .elContainer,
                      {
                        backgroundColor: contentContainerStyle?.backgroundColor
                          ? contentContainerStyle?.red
                          : undefined,
                        borderColor:el?.interest
                            ? 'red'
                            : el?.item?.role == 'owner' ? 'green' : 'yellow',

                        borderRadius:  elContainerSize / 2
                          ,
                        borderWidth:
                          elContainerSize == x /3 ||
                          elContainerSize ==
                            (Dimensions.get('window').width - x) / 3
                            ? 4.5
                            : 4,
                        overflow: 'hidden',
                      },
                    ]}>
                    <TouchableOpacity
                      onPress={() => {
                        // if(el.onPress){
                          el.onPress()
                        // }
                      //   else{

                        
                      //   if (el?.bubble && el?.private) {
                      //     console.log('here')
                      //     console.log('Hrere=========>>>>>>', el?.item);
                      //     if (
                      //       el?.item?.profile_id == profileData?.id ||
                      //       el?.item?.follow?.status == 'follow' ||
                      //       el?.item?.follow?.status == 'blocked'
                      //     ) {
                      //       setSelectedBubbleId(el?.id);
                      //       setclicked(true);
                      //       setBubbleData(el?.item);
                      //     } else {
                      //       setIsVisible(true);
                      //       setSelectedBubbleId(el?.id);
                      //       setBubbleData(el?.item);
                      //     }
                      //   } else if (el?.bubble && !el?.private) {
                          
                      //     setclicked(true);
                      //     setSelectedBubbleId(el?.id);
                      //   } else if (!el?.bubble && !el?.private) {
                      //     // setIsVisible(true);
                      //     navigation.navigate('PostScreen' , {item : el?.item});
                      //   }
                      // }
                       
                      }}
                      key={i}
                      activeOpacity={1}
                      style={{
                        // position: "absolute",
                        // left: x -( elContainerSize*0.7) / 2,
                        // top: y - ( elContainerSize*0.7) / 2,
                        width: elContainerSize * 0.7,
                        height: elContainerSize * 0.7,
                      }}>
                      {el?.private && (
                        <View
                          style={{
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            zIndex: 2,
                            width: elContainerSize / 4,
                            height: elContainerSize / 4,
                            borderRadius: elContainerSize / 2,

                            backgroundColor: '#fff',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Icon
                            as={AntDesign}
                            name="lock"
                            size={elContainerSize / 6}
                            color={'black'}
                          />
                        </View>
                      )}
                      <Image
                          // source={require('./readme-images/centersize.jpg')}
                        source={el.source}
                        style={{width: '100%', height: '100%' , backgroundColor : 'white'}}
                      />
                      <View
                        style={{     
                          alignSelf: 'center',
                          position: 'absolute',
                          // right: 0,
                          bottom: 0,
                          zIndex: 2,
                          // width: elContainerSize / 4,
                          // height: elContainerSize / 4,
                          // borderRadius: elContainerSize / 2,

                          backgroundColor: '#fff',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        {/* <Text
                          style={{
                            fontSize: 10,
                          }}>
                          {el?.item?.title}
                        </Text> */}
                      </View>
                    </TouchableOpacity>
                  </Animatable.View>
                </>
              // :
              // <Animatable.View
              
              // animation={
              //   (elContainerSize == x / 3 ||
              //     elContainerSize ==
              //       (Dimensions.get('window').width - x) / 3) &&
              //   (el?.bubble ? 'pulse' : 'swing')
              // }
              // easing="ease-in"
              // iterationCount="infinite"
              // style={[
              //   styles({elContainerSize, elContainerCoOrdinates: {x, y}})
              //     .elContainer,
              //   {
              //     backgroundColor: 'rgba(0,0,0,0.5)',
              //     // borderColor: elContainerSize == size /3 ? 'yellow':'rgb('+(x)%255+','+(y)%255+','+(x+y)%255+')',
              //     borderColor:
              //      'red',
              //     // borderColor: 'yellow',

              //     borderRadius:  elContainerSize / 4,
              //     borderWidth:
              //       elContainerSize == x / 3 ||
              //       elContainerSize ==
              //         (Dimensions.get('window').width - x) / 3
              //         ? 3
              //         : 1,
              //     overflow: 'hidden',
              //   },
              // ]}>
              //   <TouchableOpacity 
              //   onPress={()=>{
              //     navigation.navigate('BubbleList')
              //   }}
              //   style={{
              //     width : '100%',
              //     height : '100%',
              //     alignItems : 'center',
              //     justifyContent : 'center',
              //   }}>

              // <Text style={{
              //   color : 'white',
              //   fontSize : 20,
              // }}>9+</Text>
              // </TouchableOpacity>
              // </Animatable.View>
              );
            })}
          </Animatable.View>
        </View>
      </PanGestureHandler>
    </View>
  );
};

export default RoundMenu;

const styles = ({
  size,
  elContainerSize,
  elContainerCoOrdinates = {x: 0, y: 0},
  backgroundColor,
}: StylesheetInterface) =>
  StyleSheet.create({
    container: {
      width: size ? size : WP('100'),
      height: size ? size : WP('100'),
      // backgroundColor:'purple',
      // borderColor:'black',
      // borderWidth:3,
      // borderRadius:size ? size : WP('60') /2,
    },
    textStyle: {
      marginTop: 10,
      textAlign: 'center',
      color: '#000000',
      overflow: 'visible',
    },
    imageStyle: {
      width: '100%',
      height: '100%',
    },
    shadowLine: {
      position: 'absolute',
      width: 2, // Adjust as needed
      backgroundColor: 'rgba(0, 0, 0, 0.2)', // Shadow color
      borderRadius: 1, // Half of the width to create a line effect
      top: 0,
      bottom: 0,
      left: '50%',
      transform: [{translateX: -1}], // Adjust to center the line
      zIndex: -1, // Put it behind the menu items
    },
    elContainer: {
      position: 'absolute',
      left: elContainerCoOrdinates.x - (elContainerSize * 0.7) / 2,
      top: elContainerCoOrdinates.y - (elContainerSize * 0.7) / 2,
      width: elContainerSize * 0.7,
      height: elContainerSize * 0.7,
      justifyContent: 'center',
      alignItems: 'center',
    },
    // path: {
    //     position: 'absolute',
    //     width: 2, // Line width
    //     height: 1, // Adjust as needed
    //     borderTopWidth: 2, // Line height
    //     borderColor: 'rgba(0, 0, 0, 0.2)', // Line color
    //   },
  });

// const CircularPath = ({ radius, offsetAngle, divisionAngle }) => {
//     const pathPoints = Array.from({ length: 360 / divisionAngle }).map((_, i) => {
//       const rotation = (i * divisionAngle + offsetAngle) % 360;
//       const radians = (rotation * Math.PI) / 180;
//       const x = Math.cos(radians) * radius;
//       const y = Math.sin(radians) * radius;
//       return `${x},${y}`;
//     });

//     const pathData = `M${pathPoints.join(' ')}Z`;

//     return (
//       <Svg style={{ position: 'absolute',
//       top: '50%',
//       left: '50%',
//       transform: [{ translateX: -radius }, { translateY: -radius }],}} width={radius  2} height={radius  2}>
//         <Path
//         clipPath={pathData}
//         //   d={pathData}
//           fill="none"
//           stroke="rgba(0, 0, 0, 0.2)" // Line color
//           strokeWidth={2} // Adjust line width as needed
//         />
//       </Svg>
//     );
//   };

//   const style = StyleSheet.create({
//     // pathSegment:
//     pathContainer: {

//       },
//       path: {
//         position: 'absolute',
//         width: 2, // Line width
//         height: 1, // Adjust as needed
//         borderTopWidth: 2, // Line height
//         borderColor: 'rgba(0, 0, 0, 0.2)', // Line color
//       },

//   });
