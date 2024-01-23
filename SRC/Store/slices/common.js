import {createSlice} from '@reduxjs/toolkit';
import Color from '../../Assets/Utilities/Color';

const initialState = {
  architecture: [
    {name: 'Sports', id: 1},
    {name: 'Music',id: 2,},
    {name: 'Technology',id: 3,},
    {name: 'Arts and Crafts',id: 4,},
    {name: 'Travel',id: 5,},
    {name: 'Food',id: 6,},
    {name: 'Gaming',id: 7,},
    {name: 'pets',id: 8,},
    {name: 'learning',id: 9,},
    {name: 'Books',id: 10,},
    {name: 'Fashion',id: 11,},
    {name: 'Health',id: 12,},
    {name: 'Photography',id: 13,},
    {name: 'Movies and entertainment',id: 14,},
    {name: 'Science and nature',id: 15,},
    {name: 'Parenting',id: 16,},
  ],
  userData: {},
  categories: [],
  categoryProperties: [],
  financeBreakDown: [],
  notification: false,
  selectedProfile: [],
  selectedBubble: [],
  selectedFeeds: [],
  // theme: require('../../Assets/Images/Main.png'),

  selectedRole: '',
};

const CommonSlice = createSlice({
  name: 'commonReducer',
  initialState: initialState,
  reducers: {
    setCategoryProperties(state, action) {
      state.categoryProperties = action?.payload;
      // console.log("reduxxxx", state.categoryProperties);
    },

    setUserData(state, action) {
      state.userData = action?.payload;
      // state.userData = action?.payload?.userData;
    },

    setUserLogOut(state, action) {
      state.userData = {};
    },

    setServiceCategories(state, action) {
      state.categories = action?.payload;
    },

    setFinanceBreakDown(state, action) {
      state.financeBreakDown = action.payload;
    },

    setNotification(state, action) {
      state.notification = action.payload;
    },

    setSelectedRole(state, action) {
      state.selectedRole = action.payload;
    },

    setSelectedProfileData(state, action) {
      state.selectedProfile = action.payload;
    },

    setSelectedBubbles(state, action) {
      state.selectedBubble = action.payload;
      console.log(
        '🚀 ~ file: common.js:58 ~ setSelectedBubbles ~ action.payload00000:',
        action.payload,
      );
    },
    setSelectedFeeds(state, action) {
      state.selectedFeeds = action.payload;
    },
  },
});

export const {
  setUserData,
  setUserLogOut,
  setServiceCategories,
  setCategoryProperties,
  setFinanceBreakDown,
  setNotification,
  setSelectedRole,
  setSelectedBubbles,
  setSelectedProfileData,
  setSelectedFeeds,
} = CommonSlice.actions;

export default CommonSlice.reducer;
