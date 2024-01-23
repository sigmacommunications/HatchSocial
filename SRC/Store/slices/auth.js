import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  token: null,
  isLoggedIn: false,
  fcmToken: null,
  isVerified: false,
  userWalkThrough: false,
  isGoalCreated: false,
  bubbleSelected: false,
  feedsSelected: false,
  newSignUp : false,
  questionAnswered: false,
  bubbleCreated: false,
  interestSelected: false,
  privacy: 'public',
  numOfProfiles: 0,
  profileSelected: false,
  ThemeColor: ['#01E8E3', '#1296AF'],
};

const AuthSlice = createSlice({
  name: 'authReducer',
  initialState: initialState,
  reducers: {
    setUserToken(state, action) {
      state.token = action?.payload?.token;
    },

    SetFCMToken(state, action) {
      state.fcmToken = action?.payload?.fcmToken;
    },
    setUserLogin(state, action) {
      state.token = action?.payload;
    },
    setUserLogoutAuth(state, action) {
      state.token = null;
      state.fcmToken = null;
    },
    setWalkThrough(state, action) {
      state.userWalkThrough = action.payload;
    },
    setBubbleSelected(state, action) {
      state.bubbleSelected = action.payload;
    },
    setNumOfProfiles(state, action) {
      // console.log("🚀 ~ file: common.js:46 ~ setNumOfProfiles ~ action:", action?.payload)
      state.numOfProfiles = action.payload;
    },
    setFeedsSelected(state, action) {
      state.feedsSelected = action.payload;
    },
    setProfileSelcted(state, action) {
      state.profileSelected = action.payload;
    },
    setQuestionAnswered(state, action) {
      state.questionAnswered = action.payload;
    },
    setBubbleCreated(state, action) {
      state.bubbleCreated = action.payload;
    },
    setInterestSelected(state, action) {
      state.interestSelected = action.payload;
    },
    setNewSignUp(state, action) {
      state.newSignUp = action.payload;
    },
    setAccountPrivate(state, action) {
      // console.log("🚀 ~ file: common.js:68 ~ setAccountPrivate ~ action:", action.payload)
      if (action.payload == 'private') {
        state.ThemeColor = ['#FFDE3E', '#EA9F04'];
        // state.theme = require('../../Assets/Images/theme2.jpg')
        // themeColor = ['#FFDE3E','#EA9F04']
        // themeColor[1]='#EA9F04'
      } else {
        // state.theme = require('../../Assets/Images/Main.png')
        state.ThemeColor = ['#01E8E3', '#1296AF'];
      }

      state.privacy = action.payload;
    },
  },
});

export const {
  setUserLogin,
  setUserLogoutAuth,
  setUserToken,
  SetFCMToken,
  setWalkThrough,
  setBubbleSelected,
  setFeedsSelected,
  setAccountPrivate,
  setNumOfProfiles,
  setProfileSelcted,
  setNewSignUp,
  setBubbleCreated,
  setInterestSelected,
  setQuestionAnswered,
} = AuthSlice.actions;

export default AuthSlice.reducer;
