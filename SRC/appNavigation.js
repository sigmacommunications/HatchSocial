import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import navigationService from './navigationService';
import {useSelector} from 'react-redux';
import {Image, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoginScreen from './Screens/LoginScreen';
import ResetPassword from './Screens/ResetPassword';
import Signup from './Screens/Signup';
import ChangePassword from './Screens/ChangePassword';
import EnterPhone from './Screens/EnterPhone';
import VerifyNumber from './Screens/VerifyNumber';
import AddPost from './Screens/AddPost';
import MyGallery from './Screens/MyGallery';
import CreateNewFeed from './Screens/CreateNewFeed';
import AccountSetting from './Screens/AccountSetting';
import BubbleList from './Screens/BubbleList';
import BubbleSearch from './Screens/BubbleSearch';
import Notifications from './Screens/Notifications';
import Posting from './Screens/Posting';
import Profile from './Screens/Profile';
import ProfileList from './Screens/ProfileList';
import BubbleSelection from './Screens/BubbleSelection';
import Inbox from './Screens/Inbox';
import Chat from './Screens/Chat';
import Bubble from './Screens/Bubble';
import BubbleDetail from './Screens/BubbleDetail';
import Feeds from './Screens/Feeds';
import HomeScreen from './Screens/HomeScreen';
import Color from './Assets/Utilities/Color';
import {windowHeight, windowWidth} from './Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Icon} from 'native-base';
import CreateNewBubble from './Screens/CreateNewBubble';
import EmptyScreen from './Screens/EmptyScreen';
import AccountDetails from './Screens/AccountDetails';
import FeedList from './Screens/FeedList';
import MemberList from './Screens/MemberList';
import {profilePicUrl} from './Config';
import SubscriptionScreen from './Screens/SubscriptionScreen';
import PostScreen from './Screens/PostScreen';
import AddEvents from './Screens/AddEvents';
import EventDetails from './Screens/EventDetails';
import AddCard from './Screens/AddCard';
import PaymentMethod from './Screens/PaymentMethod';
import BubbleManagement from './Screens/BubbleManagement';
import ProfilesListing from './Screens/ProfilesListing';
import FeedSelection from './Screens/FeedSelection';
import LoginProfile from './Screens/LoginProfile';
import QuestionScreen from './Screens/QuestionScreen';
import ProfileType from './Screens/ProfileType';
import InterestSelection from './Screens/InterestsSelection';
import Activites from './Screens/Activites';
import ResetPasscode from './Screens/ResetPassword';
import Allcommunities from './Screens/Allcommunities';
import MyPost from './Screens/MyPost';
import MemberShip from './Screens/MemberShip';

const AppNavigator = () => {
  // const isLogin = false;
  const isGoalCreated = useSelector(state => state.authReducer.isGoalCreated);
  const walkThrough = useSelector(state => state.authReducer.userWalkThrough);
  const isVerified = useSelector(state => state.authReducer.isVerified);
  const token = useSelector(state => state.authReducer.token);
  const bubbleCreated = useSelector(state => state.authReducer.bubbleCreated);
  const interestSelected = useSelector(
    state => state.authReducer.interestSelected,
  );

  const bubbleSelected = useSelector(state => state.authReducer.bubbleSelected);

  const numOfProfile = useSelector(state => state.authReducer.numOfProfiles);
  const feedsSelected = useSelector(state => state.authReducer.feedsSelected);

  const profileSelected = useSelector(
    state => state.authReducer.profileSelected,
    );
    console.log(
      '🚀 ~ file: appNavigation.js:63 ~ AppNavigator ~ token:',
      token,
      'interestSelected',
      interestSelected,
      'numOfProfile',
      numOfProfile,
      'profileSelected',
      profileSelected,
      'bubbleSelected',
      bubbleSelected

    );

  const RootNav = createNativeStackNavigator();
  const RootNavLogged = createNativeStackNavigator();

  const AppNavigatorContainer = () => {
    const thirdScreen =
    token == null
    ? 'LoginScreen'
    : numOfProfile == 0
    ? 'ProfileType'
    : profileSelected == false
    ? 'ProfilesListing'
    : interestSelected == false
    ? 'InterestSelection'
    : bubbleSelected == false
    ? 'BubbleSelection'
    : 'TabNavigation';
    console.log("🚀 ~ file: appNavigation.js:95 ~ AppNavigatorContainer ~ thirdScreen:", thirdScreen)

    return (
      <NavigationContainer ref={navigationService.navigationRef}>
        <RootNav.Navigator
          initialRouteName={thirdScreen}
          screenOptions={{headerShown: false}}>
          <RootNav.Screen name="LoginScreen" component={LoginScreen} />
          <RootNav.Screen
            name="InterestSelection"
            component={InterestSelection}
          />
          <RootNav.Screen name="BubbleSelection" component={BubbleSelection} />
          <RootNav.Screen name="PostScreen" component={PostScreen} />
          <RootNav.Screen name="FeedList" component={FeedList} />
          <RootNav.Screen
            name="BubbleManagement"
            component={BubbleManagement}
          />
          <RootNav.Screen name="Feeds" component={Feeds} />

          <RootNav.Screen name="ProfileType" component={MemberShip} />
          {/* <RootNav.Screen name="ProfileType" component={ProfileType} /> */}
          <RootNav.Screen name="QuestionScreen" component={QuestionScreen} />
          <RootNav.Screen name="EventDetails" component={EventDetails} />
          <RootNav.Screen name="BubbleSearch" component={BubbleSearch} />
          <RootNav.Screen name="AccountDetails" component={AccountDetails} />
          <RootNav.Screen name="MemberList" component={MemberList} />
          <RootNav.Screen name="TabNavigation" component={TabNavigation} />
          <RootNav.Screen name="AccountSetting" component={AccountSetting} />
          <RootNav.Screen name="AddPost" component={AddPost} />
          <RootNav.Screen name="CreateNewBubble" component={CreateNewBubble} />
          <RootNav.Screen name="BubbleDetail" component={BubbleDetail} />
          <RootNav.Screen name="Bubble" component={Bubble} />
          <RootNav.Screen name="MyGallery" component={MyGallery} />
          <RootNav.Screen name="FeedSelection" component={FeedSelection} />
          <RootNav.Screen name="EnterPhone" component={EnterPhone} />
          <RootNav.Screen name="BubbleList" component={BubbleList} />
          <RootNav.Screen name="Profile" component={Profile} />
          <RootNav.Screen name="AddEvents" component={AddEvents} />
          <RootNav.Screen name="ProfileList" component={ProfileList} />
          <RootNav.Screen name="Notifications" component={Notifications} />
          <RootNav.Screen name="Allcommunities" component={Allcommunities} />
          <RootNav.Screen name="CreateNewFeed" component={CreateNewFeed} />
          <RootNav.Screen name="Signup" component={Signup} />
          <RootNav.Screen name="ResetPassword" component={ResetPassword} />
          <RootNav.Screen name="ChangePassword" component={ChangePassword} />
          <RootNav.Screen name="MyPost" component={MyPost} />
          <RootNav.Screen name="MemberShipScreen" component={MemberShip} />
          <RootNav.Screen
            name="SubscriptionScreen"
            component={SubscriptionScreen}
          />
          <RootNav.Screen name="VerifyNumber" component={VerifyNumber} />
          <RootNav.Screen name="AddCard" component={AddCard} />
          <RootNav.Screen name="PaymentMethod" component={PaymentMethod} />
          <RootNav.Screen name="ProfilesListing" component={ProfilesListing} />
          <RootNav.Screen name="LoginProfile" component={LoginProfile} />
          <RootNav.Screen name="Activites" component={Activites} />
          <RootNav.Screen name="ResetPasscode" component={ResetPasscode} />


        </RootNav.Navigator>
      </NavigationContainer>
    );
  };

  return <AppNavigatorContainer />;
};

export const TabNavigation = () => {
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const privacy = useSelector(state => state.authReducer.privacy);
  const themeColor = useSelector(state => state.authReducer.ThemeColor);
  const Tabs = createBottomTabNavigator();
  return (
    <Tabs.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused}) => {
          let iconName;
          let color = themeColor[1];
          let size = moderateScale(20, 0.3);
          let type = Ionicons;
          let borderWidth = 0;

          if (route.name === 'HomeScreen') {
            iconName = require('./Assets/Images/home.png');
            color = focused ? themeColor[1] : Color.themeLightGray;
            size = focused ? moderateScale(23, 0.3) : moderateScale(20, 0.3);
            borderWidth = focused ? 5 : 0;
          } else if (route.name === 'Posting') {
            iconName =
              privacy == 'private'
                ? require('./Assets/Images/add1.png')
                : require('./Assets/Images/add.png');

            color = focused ? 'none' : 'none';
            size = moderateScale(35, 0.3);
            borderWidth = focused ? 5 : 0;
          } else if (route.name === 'BubbleSearch') {
            // type = AntDesign;
            iconName = require('./Assets/Images/loading.png');
            color = focused ? themeColor[1] : Color.themeLightGray;
            size = focused ? moderateScale(23, 0.3) : moderateScale(20, 0.3);
            borderWidth = focused ? 5 : 0;
          } else if (route.name === 'Inbox') {
            type = Ionicons;
            iconName = require('./Assets/Images/messenger.png');

            color = focused ? themeColor[1] : Color.themeLightGray;
            size = focused ? moderateScale(23, 0.3) : moderateScale(20, 0.3);
            borderWidth = focused ? 5 : 0;
          } else {
            iconName = require('./Assets/Images/profile.png');
            color = focused ? themeColor[1] : Color.themeLightGray;
            size = focused ? moderateScale(23, 0.3) : moderateScale(20, 0.3);
            borderWidth = focused ? 5 : 0;
          }
          return (
            <View
              style={{
                height: '90%',
                borderBottomWidth: borderWidth,
                justifyContent: 'center',
                borderColor: themeColor[1],
                // backgroundColor : 'red',
                width: windowWidth * 0.18,
                alignItems: 'center',
              }}>
              <Image
                source={iconName}
                style={{
                  width: size,
                  height: size,
                  tintColor: color,
                  // color:'white',
                  // backgroundColor:themeColor[1]
                }}
              />
            </View>
          );
        },
        tabBarShowLabel: false,

        tabBarStyle: {
          position: 'absolute',
          // backgroundColor:'black',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.36,
          shadowRadius: 6.68,

          elevation: 11,
          borderTopRightRadius: moderateScale(30, 0.6),
          borderTopLeftRadius: moderateScale(30, 0.6),
          height: windowHeight * 0.08,
          overflow: 'hidden',
          // backgroundColor : 'red'
        },

        // headerBackgroundContainerStyle :{
        //   backgroundColor :'red'
        // }
      })}>
      <Tabs.Screen name={'HomeScreen'} component={HomeScreen} />
      <Tabs.Screen name={'BubbleSearch'} component={BubbleSearch} />
      <Tabs.Screen name={'Posting'} component={Posting} />
      <Tabs.Screen name={'Inbox'} component={Inbox} />
      <Tabs.Screen
        name={'AccountDetails'}
        component={AccountDetails}
        // options={{
        //   // Pass data as a parameter to the component
        //   data: { fromSpotLight: true },
        // }}
      />
    </Tabs.Navigator>
  );
};

export default AppNavigator;
