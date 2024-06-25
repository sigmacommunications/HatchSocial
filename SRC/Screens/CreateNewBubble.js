import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
  Platform,
  ToastAndroid,
  Alert,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
const {height, width} = Dimensions.get('window');
import {moderateScale} from 'react-native-size-matters';
import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from '../Components/CustomText';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import DropDownSingleSelect from '../Components/DropDownSingleSelect';
import {Icon} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import LinearGradient from 'react-native-linear-gradient';
import CustomSwitch from '../Components/CustomSwitch';
import CustomButton from '../Components/CustomButton';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import ImagePickerModal from '../Components/ImagePickerModal';
import navigationService from '../navigationService';
import {ScaledSheet} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import {setBubbleCreated} from '../Store/slices/auth';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import CustomDropDownMultiSelect from '../Components/CustomDropDownMultiSelect';
import {useNavigation} from '@react-navigation/native';
import SelectInterestDropdown from '../Components/SelectInterestDropdown';

const CreateNewBubble = props => {
  const item = props?.route?.params?.item;
  const selectedInterest = props?.route?.params?.selectedInterest;
  const fromInterest = props?.route?.params?.fromInterest;

  const token = useSelector(state => state.authReducer.token);
  const userData = useSelector(state => state.commonReducer.userData);
  const themeColor = useSelector(state => state.authReducer.ThemeColor);
  const privacy = useSelector(state => state.authReducer.privacy);
  const profileData = useSelector(state => state.commonReducer.selectedProfile);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [CreateBubble, setCreateBubble] = useState('');
  const [Admin, setAdmin] = useState(
    userData?.first_name ? userData?.first_name : '',
  );
  const [bubbleTitle, setBubbleTitle] = useState(item?.name ? item?.name : '');
  const [moderator, setModerator] = useState(
    item?.moderator ? item?.moderator : '',
  );
  const [interests, setInterests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [profilePicture, setProfilePicture] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [adminCanCreateContent, setadminCanCreateContent] = useState('Yes');
  const [openToAll, setOpenToAll] = useState('Yes');
  const [memberCreateContent, setmemberCreateContent] = useState('Yes');
  const [bubbleTeamCanCreateContent, setbubbleTeamCanCreateContent] =
    useState('Yes');
  const [allCanSendInvite, setAllCanSendInvite] = useState('Yes');
  const [text, setText] = useState('');
  const [displayText, setDisplayText] = useState([]);
  const [architectureValue, setArchitectureValue] = useState([]);
  const [switchValue, setSwitchValue] = useState('Private');
  const ApprovalForAdmittance = ['yes', 'No'];
  const [ApprovalForAdmittanceValue, SetApprovalForAdmittance] = useState('');
  const ApprovaltoPost = ['yes', 'No'];
  const [ApprovalToPostValue, setApprovalToPostValue] = useState('');
  const MembershipCost = ['yes', 'No'];
  const [MembershipCostValue, setMembershipCost] = useState('');
  const [selectedInterests, setSelectedInterests] = useState(null);
  console.log("🚀 ~ CreateNewBubble ~ selectedInterests:", selectedInterests)

  // const newArray = [
  //   {
  //     id: 'img11',
  //     image: require('../Assets/Images/int_Biz_Compress/shutterstock_1.jpg'),
  //     name: 'Finanace',
  //     added: false,
  //   },
  //   {
  //     id: 'img12',
  //     image: require('../Assets/Images/int_Biz_Compress/shutterstock_2.jpg'),
  //     name: 'Alternative Medicine',
  //     added: false,
  //   },
  //   {
  //     id: 'img13',
  //     image: require('../Assets/Images/int_Biz_Compress/shutterstock_3.jpg'),
  //     name: 'Commercial Real-estate',
  //     added: false,
  //   },
  //   {
  //     id: 'img14',
  //     image: require('../Assets/Images/int_Biz_Compress/shutterstock_4.jpg'),
  //     name: 'Management Consulting',
  //     added: false,
  //   },
  //   {
  //     id: 'img15',
  //     image: require('../Assets/Images/int_Biz_Compress/shutterstock_5.jpg'),
  //     name: 'Marketing/sales/Advertising',
  //     added: false,
  //   },
  //   {
  //     id: 'img16',
  //     image: require('../Assets/Images/int_Biz_Compress/shutterstock_6.jpg'),
  //     name: 'Audio/Visual Technology and Communications',
  //     added: false,
  //   },
  //   {
  //     id: 'img17',
  //     image: require('../Assets/Images/int_Biz_Compress/shutterstock_7.jpg'),
  //     name: 'education',
  //     added: false,
  //   },
  //   {
  //     id: 'img18',
  //     image: require('../Assets/Images/int_Biz_Compress/shutterstock_8.jpg'),
  //     name: 'Graphics Designer',
  //     added: false,
  //   },
  //   {
  //     id: 'img19',
  //     image: require('../Assets/Images/int_Biz_Compress/shutterstock_9.jpg'),
  //     name: 'Arts,Entertainment,Recreation',
  //     added: false,
  //   },
  //   {
  //     id: 'img110',
  //     image: require('../Assets/Images/int_Biz_Compress/shutterstock_10.jpg'),
  //     name: 'Tech',
  //     added: false,
  //   },
  //   {
  //     id: 'img111',
  //     image: require('../Assets/Images/int_Biz_Compress/shutterstock_11.jpg'),
  //     name: 'Energy/Public Utiliy',
  //     added: false,
  //   },
  //   {
  //     id: 'img112',
  //     image: require('../Assets/Images/int_Biz_Compress/shutterstock_12.jpg'),
  //     name: 'Restaurant/Hotel',
  //     added: false,
  //   },
  //   {
  //     id: 'img113',
  //     image: require('../Assets/Images/int_Biz_Compress/shutterstock_13.jpg'),
  //     name: 'Proudction',
  //     added: false,
  //   },
  //   {
  //     id: 'img114',
  //     image: require('../Assets/Images/int_Biz_Compress/shutterstock_14.jpg'),
  //     name: 'Publish',
  //     added: false,
  //   },
  //   {
  //     id: 'img115',
  //     image: require('../Assets/Images/int_Biz_Compress/shutterstock_15.jpg'),
  //     name: 'Building/Construction/Desgin',
  //     added: false,
  //   },
  //   {
  //     id: 'img116',
  //     image: require('../Assets/Images/int_Biz_Compress/shutterstock_16.jpg'),
  //     name: 'Statistician',
  //     added: false,
  //   },
  //   {
  //     id: 'img117',
  //     image: require('../Assets/Images/int_Biz_Compress/shutterstock_17.jpg'),
  //     name: 'Insurance',
  //     added: false,
  //   },
  //   {
  //     id: 'img118',
  //     image: require('../Assets/Images/int_Biz_Compress/shutterstock_18.jpg'),
  //     name: 'Residential Real-estate',
  //     added: false,
  //   },
  //   {
  //     id: 'img119',
  //     image: require('../Assets/Images/int_Biz_Compress/shutterstock_19.jpg'),
  //     name: 'IT Support',
  //     added: false,
  //   },
  //   {
  //     id: 'img120',
  //     image: require('../Assets/Images/int_Biz_Compress/shutterstock_20.jpg'),
  //     name: 'Human Resources',
  //     added: false,
  //   },
  //   {
  //     id: 'img121',
  //     image: require('../Assets/Images/int_Biz_Compress/shutterstock_21.jpg'),
  //     name: 'Natural Resources/Mining',
  //     added: false,
  //   },
  //   {
  //     id: 'img122',
  //     image: require('../Assets/Images/int_Biz_Compress/shutterstock_22.jpg'),
  //     name: 'Hospitatlity/Tourism',
  //     added: false,
  //   },
  //   {
  //     id: 'img21',
  //     image: require('../Assets/Images/int_Invest_Compress/invest_1.jpg'),
  //     name: 'Mutual Fund',
  //     added: false,
  //   },
  //   {
  //     id: 'img22',
  //     image: require('../Assets/Images/int_Invest_Compress/invest_2.jpg'),
  //     name: 'Money Market Fund',
  //     added: false,
  //   },
  //   // {
  //   //   id: 'img3',
  //   //   image: require('../Assets/Images/int_Invest_Compress/invest_3.jpg'),
  //   //   name: 'Consectetur Adipiscing',
  //   //   added: false,
  //   // },
  //   {
  //     id: 'img24',
  //     image: require('../Assets/Images/int_Invest_Compress/invest_4.jpg'),
  //     name: 'Stock',
  //     added: false,
  //   },
  //   {
  //     id: 'img25',
  //     image: require('../Assets/Images/int_Invest_Compress/invest_5.jpg'),
  //     name: 'Real-estate',
  //     added: false,
  //   },
  //   {
  //     id: 'img26',
  //     image: require('../Assets/Images/int_Invest_Compress/invest_6.jpg'),
  //     name: 'Ut Labore Et Dolore',
  //     added: false,
  //   },
  //   {
  //     id: 'img27',
  //     image: require('../Assets/Images/int_Invest_Compress/invest_7.jpg'),
  //     name: 'annuity',
  //     added: false,
  //   },
  //   {
  //     id: 'img28',
  //     image: require('../Assets/Images/int_Invest_Compress/invest_8.jpg'),
  //     name: 'Muncipal Bond',
  //     added: false,
  //   },
  //   {
  //     id: 'img29',
  //     image: require('../Assets/Images/int_Invest_Compress/invest_9.jpg'),
  //     name: 'Crowd Funding',
  //     added: false,
  //   },
  //   {
  //     id: 'img210',
  //     image: require('../Assets/Images/int_Invest_Compress/invest_10.jpg'),
  //     name: 'Index Funds',
  //     added: false,
  //   },
  //   {
  //     id: 'img211',
  //     image: require('../Assets/Images/int_Invest_Compress/invest_11.jpg'),
  //     name: 'Crypto',
  //     added: false,
  //   },
  //   {
  //     id: 'img212',
  //     image: require('../Assets/Images/int_Invest_Compress/invest_12.jpg'),
  //     name: 'Exchange-Traded Fund',
  //     added: false,
  //   },
  //   {
  //     id: 'img213',
  //     image: require('../Assets/Images/int_Invest_Compress/invest_13.jpg'),
  //     name: 'investment fund',
  //     added: false,
  //   },
  //   {
  //     id: 'img214',
  //     image: require('../Assets/Images/int_Invest_Compress/invest_14.jpg'),
  //     name: 'NFT',
  //     added: false,
  //   },
  //   {
  //     id: 'img31',
  //     image: require('../Assets/Images/int_Social_Compress/Social_1.jpg'),
  //     name: 'Comedy',
  //     added: false,
  //   },
  //   {
  //     id: 'img32',
  //     image: require('../Assets/Images/int_Social_Compress/Social_2.jpg'),
  //     name: 'Writing',
  //     added: false,
  //   },
  //   {
  //     id: 'img33',
  //     image: require('../Assets/Images/int_Social_Compress/Social_43.jpg'),
  //     name: 'Musician',
  //     added: false,
  //   },
  //   {
  //     id: 'img34',
  //     image: require('../Assets/Images/int_Social_Compress/Social_4.jpg'),
  //     name: 'News',
  //     added: false,
  //   },
  //   {
  //     id: 'img35',
  //     image: require('../Assets/Images/int_Social_Compress/Social_5.jpg'),
  //     name: 'Textile Activities',
  //     added: false,
  //   },
  //   {
  //     id: 'img36',
  //     image: require('../Assets/Images/int_Social_Compress/Social_6.jpg'),
  //     name: 'Birds Watching',
  //     added: false,
  //   },
  //   {
  //     id: 'img37',
  //     image: require('../Assets/Images/int_Social_Compress/Social_7.jpg'),
  //     name: 'Music',
  //     added: false,
  //   },
  //   {
  //     id: 'img38',
  //     image: require('../Assets/Images/int_Social_Compress/Social_8.jpg'),
  //     name: 'Food/Cooking',
  //     added: false,
  //   },
  //   {
  //     id: 'img39',
  //     image: require('../Assets/Images/int_Social_Compress/Social_9.jpg'),
  //     name: 'Entertaining',
  //     added: false,
  //   },
  //   {
  //     id: 'img310',
  //     image: require('../Assets/Images/int_Social_Compress/Social_10.jpg'),
  //     name: 'Equestrian',
  //     added: false,
  //   },
  //   {
  //     id: 'img311',
  //     image: require('../Assets/Images/int_Social_Compress/Social_11.jpg'),
  //     name: 'Pro Sports',
  //     added: false,
  //   },
  //   {
  //     id: 'img312',
  //     image: require('../Assets/Images/int_Social_Compress/Social_12.jpg'),
  //     name: 'Blogging',
  //     added: false,
  //   },
  //   {
  //     id: 'img313',
  //     image: require('../Assets/Images/int_Social_Compress/Social_13.jpg'),
  //     name: 'Floral Design',
  //     added: false,
  //   },
  //   {
  //     id: 'img314',
  //     image: require('../Assets/Images/int_Social_Compress/Social_14.jpg'),
  //     name: 'Alternative Fitness',
  //     added: false,
  //   },
  //   // Up to Social_14.jpg, continue up to Social_42.jpg
  //   {
  //     id: 'img315',
  //     image: require('../Assets/Images/int_Social_Compress/Social_15.jpg'),
  //     name: 'Art',
  //     added: false,
  //   },
  //   {
  //     id: 'img316',
  //     image: require('../Assets/Images/int_Social_Compress/Social_44.jpg'),
  //     name: 'Outdoor Sports',
  //     added: false,
  //   },
  //   {
  //     id: 'img317',
  //     image: require('../Assets/Images/int_Social_Compress/Social_17.jpg'),
  //     name: 'BeeKeeping',
  //     added: false,
  //   },
  //   {
  //     id: 'img318',
  //     image: require('../Assets/Images/int_Social_Compress/Social_45.jpg'),
  //     name: 'Travelling',
  //     added: false,
  //   },
  //   {
  //     id: 'img319',
  //     image: require('../Assets/Images/int_Social_Compress/Social_19.jpg'),
  //     name: 'Brewing',
  //     added: false,
  //   },
  //   {
  //     id: 'img320',
  //     image: require('../Assets/Images/int_Social_Compress/Social_20.jpg'),
  //     name: 'Build',
  //     added: false,
  //   },
  //   {
  //     id: 'img321',
  //     image: require('../Assets/Images/int_Social_Compress/Social_21.jpg'),
  //     name: 'Dining',
  //     added: false,
  //   },
  //   {
  //     id: 'img322',
  //     image: require('../Assets/Images/int_Social_Compress/Social_22.jpg'),
  //     name: 'Board Games',
  //     added: false,
  //   },
  //   {
  //     id: 'img323',
  //     image: require('../Assets/Images/int_Social_Compress/Social_23.jpg'),
  //     name: 'Out-Door Sports',
  //     added: false,
  //   },
  //   {
  //     id: 'img324',
  //     image: require('../Assets/Images/int_Social_Compress/Social_24.jpg'),
  //     name: 'Wine',
  //     added: false,
  //   },
  //   {
  //     id: 'img325',
  //     image: require('../Assets/Images/int_Social_Compress/Social_25.jpg'),
  //     name: 'Cocktails',
  //     added: false,
  //   },
  //   {
  //     id: 'img326',
  //     image: require('../Assets/Images/int_Social_Compress/Social_26.jpg'),
  //     name: 'Poker',
  //     added: false,
  //   },
  //   {
  //     id: 'img327',
  //     image: require('../Assets/Images/int_Social_Compress/Social_27.jpg'),
  //     name: 'Barrista',
  //     added: false,
  //   },
  //   {
  //     id: 'img328',
  //     image: require('../Assets/Images/int_Social_Compress/Social_28.jpg'),
  //     name: 'Snow Sports',
  //     added: false,
  //   },
  //   {
  //     id: 'img329',
  //     image: require('../Assets/Images/int_Social_Compress/Social_29.jpg'),
  //     name: 'Gardening',
  //     added: false,
  //   },
  //   {
  //     id: 'img330',
  //     image: require('../Assets/Images/int_Social_Compress/Social_30.jpg'),
  //     name: 'Architecture',
  //     added: false,
  //   },
  //   {
  //     id: 'img331',
  //     image: require('../Assets/Images/int_Social_Compress/Social_31.jpg'),
  //     name: 'language',
  //     added: false,
  //   },
  //   {
  //     id: 'img332',
  //     image: require('../Assets/Images/int_Social_Compress/Social_32.jpg'),
  //     name: 'Fantasy Sports',
  //     added: false,
  //   },
  //   {
  //     id: 'img333',
  //     image: require('../Assets/Images/int_Social_Compress/Social_33.jpg'),
  //     name: 'Concerts',
  //     added: false,
  //   },
  //   {
  //     id: 'img334',
  //     image: require('../Assets/Images/int_Social_Compress/Social_34.jpg'),
  //     name: 'College Sports',
  //     added: false,
  //   },
  //   {
  //     id: 'img335',
  //     image: require('../Assets/Images/int_Social_Compress/Social_35.jpg'),
  //     name: 'Spirituality',
  //     added: false,
  //   },
  //   {
  //     id: 'img336',
  //     image: require('../Assets/Images/int_Social_Compress/Social_36.jpg'),
  //     name: 'Ut Enim Ad Minim',
  //     added: false,
  //   },
  //   {
  //     id: 'img337',
  //     image: require('../Assets/Images/int_Social_Compress/Social_37.jpg'),
  //     name: 'Fashion',
  //     added: false,
  //   },
  //   {
  //     id: 'img338',
  //     image: require('../Assets/Images/int_Social_Compress/Social_38.jpg'),
  //     name: 'Charity',
  //     added: false,
  //   },
  //   {
  //     id: 'img339',
  //     image: require('../Assets/Images/int_Social_Compress/Social_39.jpg'),
  //     name: 'Dance',
  //     added: false,
  //   },
  //   {
  //     id: 'img340',
  //     image: require('../Assets/Images/int_Social_Compress/Social_40.jpg'),
  //     name: 'Astrology',
  //     added: false,
  //   },
  //   {
  //     id: 'img341',
  //     image: require('../Assets/Images/int_Social_Compress/Social_41.jpg'),
  //     name: 'Beauty',
  //     added: false,
  //   },
  //   {
  //     id: 'img342',
  //     image: require('../Assets/Images/int_Social_Compress/Social_46.jpg'),
  //     name: 'Book Club',
  //     added: false,
  //   },
  //   {
  //     id: 'img343',
  //     image: require('../Assets/Images/int_Social_Compress/Social_47.jpg'),
  //     name: 'Fitness',
  //     added: false,
  //   },
  //   {
  //     id: 'img41',
  //     image: require('../Assets/Images/int_Traders_Compress/traders_1.jpg'),
  //     name: 'Ultrasonographer',
  //     added: false,
  //   },
  //   {
  //     id: 'img42',
  //     image: require('../Assets/Images/int_Traders_Compress/traders_2.jpg'),
  //     name: 'Construction Managers',
  //     added: false,
  //   },
  //   {
  //     id: 'img43',
  //     image: require('../Assets/Images/int_Traders_Compress/traders_3.jpg'),
  //     name: 'Boileramker',
  //     added: false,
  //   },
  //   {
  //     id: 'img44',
  //     image: require('../Assets/Images/int_Traders_Compress/traders_4.jpg'),
  //     name: 'Nuclear Medicine',
  //     added: false,
  //   },
  //   {
  //     id: 'img45',
  //     image: require('../Assets/Images/int_Traders_Compress/traders_5.jpg'),
  //     name: 'Welder',
  //     added: false,
  //   },
  //   {
  //     id: 'img46',
  //     image: require('../Assets/Images/int_Traders_Compress/traders_6.jpg'),
  //     name: 'Mason',
  //     added: false,
  //   },
  //   {
  //     id: 'img47',
  //     image: require('../Assets/Images/int_Traders_Compress/traders_7.jpg'),
  //     name: 'HVAC',
  //     added: false,
  //   },
  //   {
  //     id: 'img48',
  //     image: require('../Assets/Images/int_Traders_Compress/traders_8.jpg'),
  //     name: 'Real estate Inspectors/Appraisor',
  //     added: false,
  //   },
  //   {
  //     id: 'img410',
  //     image: require('../Assets/Images/int_Traders_Compress/traders_10.jpg'),
  //     name: 'Millwright',
  //     added: false,
  //   },
  //   {
  //     id: 'img411',
  //     image: require('../Assets/Images/int_Traders_Compress/traders_11.jpg'),
  //     name: 'Civil engineering tech',
  //     added: false,
  //   },
  //   {
  //     id: 'img412',
  //     image: require('../Assets/Images/int_Traders_Compress/traders_12.jpg'),
  //     name: 'Electrician',
  //     added: false,
  //   },
  //   {
  //     id: 'img413',
  //     image: require('../Assets/Images/int_Traders_Compress/traders_13.jpg'),
  //     name: 'Mechanic',
  //     added: false,
  //   },
  //   {
  //     id: 'img414',
  //     image: require('../Assets/Images/int_Traders_Compress/traders_14.jpg'),
  //     name: 'Dental Hygenists',
  //     added: false,
  //   },
  //   // Up to traders_14.jpg, continue up to traders_21.jpg
  //   {
  //     id: 'img415',
  //     image: require('../Assets/Images/int_Traders_Compress/traders_15.jpg'),
  //     name: 'Industrial Engg. Tech',
  //     added: false,
  //   },
  //   {
  //     id: 'img416',
  //     image: require('../Assets/Images/int_Traders_Compress/traders_16.jpg'),
  //     name: 'Plumber',
  //     added: false,
  //   },
  //   {
  //     id: 'img417',
  //     image: require('../Assets/Images/int_Traders_Compress/traders_17.jpg'),
  //     name: 'Lineworker',
  //     added: false,
  //   },
  //   {
  //     id: 'img418',
  //     image: require('../Assets/Images/int_Traders_Compress/traders_18.jpg'),
  //     name: 'Carpentry',
  //     added: false,
  //   },
  //   {
  //     id: 'img419',
  //     image: require('../Assets/Images/int_Traders_Compress/traders_19.jpg'),
  //     name: 'Respiratory therapist',
  //     added: false,
  //   },

  //   {
  //     id: 'img421',
  //     image: require('../Assets/Images/int_Traders_Compress/traders_21.jpg'),
  //     name: 'Pipefitter',
  //     added: false,
  //   },
  // ];
  const newArray = [
    {
      id: 'img11',
      image: require('../Assets/Images/int_Biz_Compress/Finance.jpg'),
      name: 'Finance',
      added: false,
    },
    {
      id: 'img12',
      image: require('../Assets/Images/int_Biz_Compress/Alternative_Medicine.jpg'),
      name: 'Alternative Medicine',
      added: false,
    },
    {
      id: 'img13',
      image: require('../Assets/Images/int_Biz_Compress/Commercial_Real_estate.jpg'),
      name: 'Commercial Real-estate',
      added: false,
    },
    {
      id: 'img14',
      image: require('../Assets/Images/int_Biz_Compress/Management_Consulting.jpg'),
      name: 'Management Consulting',
      added: false,
    },
    {
      id: 'img15',
      image: require('../Assets/Images/int_Biz_Compress/Marketing_sales_Advertising.jpg'),
      name: 'Marketing/sales/Advertising',
      added: false,
    },
    {
      id: 'img16',
      image: require('../Assets/Images/int_Biz_Compress/Audio_Visual_Technology_and_Communications.jpg'),
      name: 'Audio/Visual Technology and Communications',
      added: false,
    },
    {
      id: 'img17',
      image: require('../Assets/Images/int_Biz_Compress/education.jpg'),
      name: 'education',
      added: false,
    },
    {
      id: 'img18',
      image: require('../Assets/Images/int_Biz_Compress/Graphics_Designer.jpg'),
      name: 'Graphics Designer',
      added: false,
    },
    {
      id: 'img19',
      image: require('../Assets/Images/int_Biz_Compress/Arts_Entertainment_Recreation.jpg'),
      name: 'Arts,Entertainment,Recreation',
      added: false,
    },
    {
      id: 'img110',
      image: require('../Assets/Images/int_Biz_Compress/Tech.jpg'),
      name: 'Tech',
      added: false,
    },
    {
      id: 'img111',
      image: require('../Assets/Images/int_Biz_Compress/Energy_Public_Utiliy.jpg'),
      name: 'Energy/Public Utiliy',
      added: false,
    },
    {
      id: 'img112',
      image: require('../Assets/Images/int_Biz_Compress/Restaurant_Hotel.jpg'),
      name: 'Restaurant/Hotel',
      added: false,
    },
    {
      id: 'img113',
      image: require('../Assets/Images/int_Biz_Compress/Proudction.jpg'),
      name: 'Proudction',
      added: false,
    },
    {
      id: 'img114',
      image: require('../Assets/Images/int_Biz_Compress/Publish.jpg'),
      name: 'Publish',
      added: false,
    },
    {
      id: 'img115',
      image: require('../Assets/Images/int_Biz_Compress/Building_Construction_Desgin.jpg'),
      name: 'Building/Construction/Desgin',
      added: false,
    },
    {
      id: 'img116',
      image: require('../Assets/Images/int_Biz_Compress/Statistician.jpg'),
      name: 'Statistician',
      added: false,
    },
    {
      id: 'img117',
      image: require('../Assets/Images/int_Biz_Compress/Insurance.jpg'),
      name: 'Insurance',
      added: false,
    },
    {
      id: 'img118',
      image: require('../Assets/Images/int_Biz_Compress/Residential_Real_estate.jpg'),
      name: 'Residential Real-estate',
      added: false,
    },
    {
      id: 'img119',
      image: require('../Assets/Images/int_Biz_Compress/IT_Support.jpg'),
      name: 'IT Support',
      added: false,
    },
    {
      id: 'img120',
      image: require('../Assets/Images/int_Biz_Compress/Human_Resources.jpg'),
      name: 'Human Resources',
      added: false,
    },
    {
      id: 'img121',
      image: require('../Assets/Images/int_Biz_Compress/Natural_Resources_Mining.jpg'),
      name: 'Natural Resources/Mining',
      added: false,
    },
    {
      id: 'img122',
      image: require('../Assets/Images/int_Biz_Compress/Hospitatlity_Tourism.jpg'),
      name: 'Hospitatlity/Tourism',
      added: false,
    },
    {
      id: 'img21',
      image: require('../Assets/Images/int_Invest_Compress/Mutual_Fund.jpg'),
      name: 'Mutual Fund',
      added: false,
    },
    {
      id: 'img22',
      image: require('../Assets/Images/int_Invest_Compress/Money_Market_Fund.jpg'),
      name: 'Money Market Fund',
      added: false,
    },
    // {
    //   id: 'img3',
    //   image: require('../Assets/Images/int_Invest_Compress/invest_3.jpg'),
    //   name: 'Consectetur Adipiscing',
    //   added: false,
    // },
    {
      id: 'img24',
      image: require('../Assets/Images/int_Invest_Compress/Stock.jpg'),
      name: 'Stock',
      added: false,
    },
    {
      id: 'img25',
      image: require('../Assets/Images/int_Invest_Compress/Real_estate.jpg'),
      name: 'Real-estate',
      added: false,
    },
    {
      id: 'img26',
      image: require('../Assets/Images/int_Invest_Compress/Ut_Labore_Et_Dolore.jpg'),
      name: 'Ut Labore Et Dolore',
      added: false,
    },
    {
      id: 'img27',
      image: require('../Assets/Images/int_Invest_Compress/annuity.jpg'),
      name: 'annuity',
      added: false,
    },
    {
      id: 'img28',
      image: require('../Assets/Images/int_Invest_Compress/Muncipal_Bond.jpg'),
      name: 'Muncipal Bond',
      added: false,
    },
    {
      id: 'img29',
      image: require('../Assets/Images/int_Invest_Compress/Crowd_Funding.jpg'),
      name: 'Crowd Funding',
      added: false,
    },
    {
      id: 'img210',
      image: require('../Assets/Images/int_Invest_Compress/Index_Funds.jpg'),
      name: 'Index Funds',
      added: false,
    },
    {
      id: 'img211',
      image: require('../Assets/Images/int_Invest_Compress/Crypto.jpg'),
      name: 'Crypto',
      added: false,
    },
    {
      id: 'img212',
      image: require('../Assets/Images/int_Invest_Compress/Exchange_Traded_Fund.jpg'),
      name: 'Exchange-Traded Fund',
      added: false,
    },
    {
      id: 'img213',
      image: require('../Assets/Images/int_Invest_Compress/investment_fund.jpg'),
      name: 'investment fund',
      added: false,
    },
    {
      id: 'img214',
      image: require('../Assets/Images/int_Invest_Compress/NFT.jpg'),
      name: 'NFT',
      added: false,
    },

    {
      id: 'img31',
      image: require('../Assets/Images/int_Social_Compress/Comedy.jpg'),
      name: 'Comedy',
      added: false,
    },
    {
      id: 'img32',
      image: require('../Assets/Images/int_Social_Compress/Writing.jpg'),
      name: 'Writing',
      added: false,
    },
    {
      id: 'img33',
      image: require('../Assets/Images/int_Social_Compress/Musician.jpg'),
      name: 'Musician',
      added: false,
    },
    {
      id: 'img34',
      image: require('../Assets/Images/int_Social_Compress/News.jpg'),
      name: 'News',
      added: false,
    },
    {
      id: 'img35',
      image: require('../Assets/Images/int_Social_Compress/Textile_Activities.jpg'),
      name: 'Textile Activities',
      added: false,
    },
    {
      id: 'img36',
      image: require('../Assets/Images/int_Social_Compress/Birds_Watching.jpg'),
      name: 'Birds Watching',
      added: false,
    },
    {
      id: 'img37',
      image: require('../Assets/Images/int_Social_Compress/Music.jpg'),
      name: 'Music',
      added: false,
    },
    {
      id: 'img38',
      image: require('../Assets/Images/int_Social_Compress/Food_Cooking.jpg'),
      name: 'Food/Cooking',
      added: false,
    },
    {
      id: 'img39',
      image: require('../Assets/Images/int_Social_Compress/Entertaining.jpg'),
      name: 'Entertaining',
      added: false,
    },
    {
      id: 'img310',
      image: require('../Assets/Images/int_Social_Compress/Equestrian.jpg'),
      name: 'Equestrian',
      added: false,
    },
    {
      id: 'img311',
      image: require('../Assets/Images/int_Social_Compress/Pro_Sports.jpg'),
      name: 'Pro Sports',
      added: false,
    },
    {
      id: 'img312',
      image: require('../Assets/Images/int_Social_Compress/Blogging.jpg'),
      name: 'Blogging',
      added: false,
    },
    {
      id: 'img313',
      image: require('../Assets/Images/int_Social_Compress/Floral_Design.jpg'),
      name: 'Floral Design',
      added: false,
    },
    {
      id: 'img314',
      image: require('../Assets/Images/int_Social_Compress/Alternative_Fitness.jpg'),
      name: 'Alternative Fitness',
      added: false,
    },
    // Up to Social_14.jpg, continue up to Social_42.jpg
    {
      id: 'img315',
      image: require('../Assets/Images/int_Social_Compress/Art.jpg'),
      name: 'Art',
      added: false,
    },
    {
      id: 'img316',
      image: require('../Assets/Images/int_Social_Compress/Outdoor_Sports.jpg'),
      name: 'Outdoor Sports',
      added: false,
    },
    {
      id: 'img317',
      image: require('../Assets/Images/int_Social_Compress/BeeKeeping.jpg'),
      name: 'BeeKeeping',
      added: false,
    },
    {
      id: 'img318',
      image: require('../Assets/Images/int_Social_Compress/Travelling.jpg'),
      name: 'Travelling',
      added: false,
    },
    {
      id: 'img319',
      image: require('../Assets/Images/int_Social_Compress/Brewing.jpg'),
      name: 'Brewing',
      added: false,
    },
    {
      id: 'img320',
      image: require('../Assets/Images/int_Social_Compress/Build.jpg'),
      name: 'Build',
      added: false,
    },
    {
      id: 'img321',
      image: require('../Assets/Images/int_Social_Compress/Dining.jpg'),
      name: 'Dining',
      added: false,
    },
    {
      id: 'img322',
      image: require('../Assets/Images/int_Social_Compress/Board_Games.jpg'),
      name: 'Board Games',
      added: false,
    },
    {
      id: 'img323',
      image: require('../Assets/Images/int_Social_Compress/Out-Door_Sports.jpg'),
      name: 'Out-Door Sports',
      added: false,
    },
    {
      id: 'img324',
      image: require('../Assets/Images/int_Social_Compress/Wine.jpg'),
      name: 'Wine',
      added: false,
    },
    {
      id: 'img325',
      image: require('../Assets/Images/int_Social_Compress/Cocktails.jpg'),
      name: 'Cocktails',
      added: false,
    },
    {
      id: 'img326',
      image: require('../Assets/Images/int_Social_Compress/Poker.jpg'),
      name: 'Poker',
      added: false,
    },
    {
      id: 'img327',
      image: require('../Assets/Images/int_Social_Compress/Barrista.jpg'),
      name: 'Barrista',
      added: false,
    },
    {
      id: 'img328',
      image: require('../Assets/Images/int_Social_Compress/Snow_Sports.jpg'),
      name: 'Snow Sports',
      added: false,
    },
    {
      id: 'img329',
      image: require('../Assets/Images/int_Social_Compress/Gardening.jpg'),
      name: 'Gardening',
      added: false,
    },
    {
      id: 'img330',
      image: require('../Assets/Images/int_Social_Compress/Architecture.jpg'),
      name: 'Architecture',
      added: false,
    },
    {
      id: 'img331',
      image: require('../Assets/Images/int_Social_Compress/language.jpg'),
      name: 'language',
      added: false,
    },
    {
      id: 'img332',
      image: require('../Assets/Images/int_Social_Compress/Fantasy_Sports.jpg'),
      name: 'Fantasy Sports',
      added: false,
    },
    {
      id: 'img333',
      image: require('../Assets/Images/int_Social_Compress/Concerts.jpg'),
      name: 'Concerts',
      added: false,
    },
    {
      id: 'img334',
      image: require('../Assets/Images/int_Social_Compress/College_Sports.jpg'),
      name: 'College Sports',
      added: false,
    },
    {
      id: 'img335',
      image: require('../Assets/Images/int_Social_Compress/Spirituality.jpg'),
      name: 'Spirituality',
      added: false,
    },
    {
      id: 'img336',
      image: require('../Assets/Images/int_Social_Compress/Ut_Enim_Ad_Minim.jpg'),
      name: 'Ut Enim Ad Minim',
      added: false,
    },
    {
      id: 'img337',
      image: require('../Assets/Images/int_Social_Compress/Fashion.jpg'),
      name: 'Fashion',
      added: false,
    },
    {
      id: 'img338',
      image: require('../Assets/Images/int_Social_Compress/Charity.jpg'),
      name: 'Charity',
      added: false,
    },
    {
      id: 'img339',
      image: require('../Assets/Images/int_Social_Compress/Dance.jpg'),
      name: 'Dance',
      added: false,
    },
    {
      id: 'img340',
      image: require('../Assets/Images/int_Social_Compress/Astrology.jpg'),
      name: 'Astrology',
      added: false,
    },
    {
      id: 'img341',
      image: require('../Assets/Images/int_Social_Compress/Beauty.jpg'),
      name: 'Beauty',
      added: false,
    },
    {
      id: 'img342',
      image: require('../Assets/Images/int_Social_Compress/Book_Club.jpg'),
      name: 'Book Club',
      added: false,
    },
    {
      id: 'img343',
      image: require('../Assets/Images/int_Social_Compress/Fitness.jpg'),
      name: 'Fitness',
      added: false,
    },

    {
      id: 'img41',
      image: require('../Assets/Images/int_Traders_Compress/Ultrasonographer.jpg'),
      name: 'Ultrasonographer',
      added: false,
    },
    {
      id: 'img42',
      image: require('../Assets/Images/int_Traders_Compress/Construction_Managers.jpg'),
      name: 'Construction Managers',
      added: false,
    },
    {
      id: 'img43',
      image: require('../Assets/Images/int_Traders_Compress/Boileramker.jpg'),
      name: 'Boileramker',
      added: false,
    },
    {
      id: 'img44',
      image: require('../Assets/Images/int_Traders_Compress/Nuclear_Medicine.jpg'),
      name: 'Nuclear Medicine',
      added: false,
    },
    {
      id: 'img45',
      image: require('../Assets/Images/int_Traders_Compress/Welder.jpg'),
      name: 'Welder',
      added: false,
    },
    {
      id: 'img46',
      image: require('../Assets/Images/int_Traders_Compress/Mason.jpg'),
      name: 'Mason',
      added: false,
    },
    {
      id: 'img47',
      image: require('../Assets/Images/int_Traders_Compress/HVAC.jpg'),
      name: 'HVAC',
      added: false,
    },
    {
      id: 'img48',
      image: require('../Assets/Images/int_Traders_Compress/Real_estate_InspectorsAppraisor.jpg'),
      name: 'Real estate Inspectors/Appraisor',
      added: false,
    },
    {
      id: 'img410',
      image: require('../Assets/Images/int_Traders_Compress/Millwright.jpg'),
      name: 'Millwright',
      added: false,
    },
    {
      id: 'img411',
      image: require('../Assets/Images/int_Traders_Compress/Civil_engineering_tech.jpg'),
      name: 'Civil engineering tech',
      added: false,
    },
    {
      id: 'img412',
      image: require('../Assets/Images/int_Traders_Compress/Electrician.jpg'),
      name: 'Electrician',
      added: false,
    },
    {
      id: 'img413',
      image: require('../Assets/Images/int_Traders_Compress/Mechanic.jpg'),
      name: 'Mechanic',
      added: false,
    },
    {
      id: 'img414',
      image: require('../Assets/Images/int_Traders_Compress/Dental_Hygenists.jpg'),
      name: 'Dental Hygenists',
      added: false,
    },
    // Up to traders_14.jpg, continue up to traders_21.jpg
    {
      id: 'img415',
      image: require('../Assets/Images/int_Traders_Compress/Industrial_Engg_Tech.jpg'),
      name: 'Industrial Engg. Tech',
      added: false,
    },
    {
      id: 'img416',
      image: require('../Assets/Images/int_Traders_Compress/Plumber.jpg'),
      name: 'Plumber',
      added: false,
    },
    {
      id: 'img417',
      image: require('../Assets/Images/int_Traders_Compress/Lineworker.jpg'),
      name: 'Lineworker',
      added: false,
    },
    {
      id: 'img418',
      image: require('../Assets/Images/int_Traders_Compress/Carpentry.jpg'),
      name: 'Carpentry',
      added: false,
    },
    {
      id: 'img419',
      image: require('../Assets/Images/int_Traders_Compress/Respiratory_therapist.jpg'),
      name: 'Respiratory therapist',
      added: false,
    },

    {
      id: 'img421',
      image: require('../Assets/Images/int_Traders_Compress/Pipefitter.jpg'),
      name: 'Pipefitter',
      added: false,
    },
  ];

  const createBubble = async () => {
    const url = 'auth/community';
    const body = {
      title: bubbleTitle,
      profile_id: profileData?.id,
      approval_post: ApprovalToPostValue,
      membership_cost: MembershipCostValue,
      admin_create_content: adminCanCreateContent,
      moderator_create_content: bubbleTeamCanCreateContent,
      member_create_content: memberCreateContent,
      privacy: ApprovalForAdmittanceValue,
      // interests :  newArray
      // .filter(data => selectedInterests?.some(data1 => data1 == data?.id))
      // ?.map((item, index) =>{
      //   return {
      //     interest_id: item?.id,
      //     name: item?.name,
      //   }})
      // approval_admittance: ApprovalForAdmittanceValue,
      // post_privacy: adminCanCreateContent,
      // remove_content: bubbleTeamCanCreateContent,
      // remove_comments: memberCreateContent,
      // invite_members: allCanSendInvite,
    };
    // console.log("🚀 ~ createBubble ~ body:", body)
    // return console.log("🚀 ~ file: CreateNewBubble.js:197 ~ createBubble ~ body:", body)
    const formData = new FormData();
    for (let key in body) {
      if (body[key] == '') {
        return Platform.OS == 'android'
          ? ToastAndroid.show(`${key} is required`, ToastAndroid.SHORT)
          : Alert.alert(`${key} is required`);
      } else {
        formData.append(key, body[key]);
      }
    }

    if (Object.keys(profilePicture).length > 0) {
      formData.append('image', profilePicture);
    } else {
      return Platform.OS == 'android'
        ? ToastAndroid.show(`image is empty`, ToastAndroid.SHORT)
        : Alert.alert(`image is empty`);
    }
    if (architectureValue?.length > 0) {
      architectureValue.map((item, index) =>
        formData.append(`keywords[${index}]`, item),
      );
    } else {
      return Platform.OS == 'android'
        ? ToastAndroid.show(
            `Please Add some keywords to your community`,
            ToastAndroid.SHORT,
          )
        : Alert.alert(`Please Add some keywords to your community`);
    }
    if (selectedInterests != null) {
      // interests
      //   .filter(data => selectedInterests?.some(data1 => data1 == data?.id))
      //   ?.map((item, index) => {
      //     const interestObject = {
      //       interest_id: item?.id,
      //       name: item?.name,
      //     };

      //     formData.append(
      //       `interests[${index}][interest_id]`,
      //       interestObject?.interest_id,
      //     );
      //     formData.append(`interests[${index}][name]`, interestObject?.name);
      //   });
            const interestObject = {
            interest_id: selectedInterests?.id,
            name: selectedInterests?.name,
          };
      formData.append(`interest`, selectedInterests?.id);

    } else {
      return Platform.OS == 'android'
        ? ToastAndroid.show(
            `Please Add some Interests related to your community`,
            ToastAndroid.SHORT,
          )
        : Alert.alert(`Please Add some Interests related to your community`);
    }
    console.log(
      '🚀 ~ createBubble ~ formData:',
      JSON.stringify(formData, null, 2),
    );
    setIsLoading(true);
    const response = await Post(url, formData, apiHeader(token));
    setIsLoading(false);
    // return console.log("🚀 ~ createBubble ~ response:", response)

    if (response != undefined) {
      console.log('🚀 ~ createBubble ~ response:', response?.data);
      dispatch(setBubbleCreated(true));
      Platform.OS == 'android'
        ? ToastAndroid.show('Bubble created Successfully', ToastAndroid.SHORT)
        : Alert.alert('Bubble created Successfully');
      // return  console.log('response ==== >' , response?.data)
      navigation.goBack();
    }
  };

  const getInterest = async () => {
    const url = `auth/interest_list`;
    setIsLoading(true);
    const response = await Get(url, token);
    // console.log('🚀 ~ getInterest ~ response:', response?.data?.interest_info);
    setIsLoading(false);
    if (response != undefined) {
      setInterests(response?.data?.interest_info);
    }
  };

  useEffect(() => {
    getInterest();
  }, []);

  // useEffect(() => {
  //   if (Object.keys(profilePicture).length > 0) {
  //   }
  // }, [profilePicture]);

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      <Header Title={'Create new Bubble'} showBack />
      <ScrollView>
        <ImageBackground
          source={
            privacy == 'private'
              ? require('../Assets/Images/theme2.jpg')
              : require('../Assets/Images/Main.png')
          }
          resizeMode={'cover'}
          style={styles.bgimage}>
          <ScrollView nestedScrollEnabled>
            <View style={styles.topContainer}>
              <View>
                <TextInputWithTitle
                  placeholder={'Enter Bubble Title'}
                  setText={setBubbleTitle}
                  value={bubbleTitle}
                  marginTop={moderateScale(5, 0.3)}
                  viewHeight={0.04}
                  viewWidth={0.58}
                  inputHeight={0.05}
                  inputWidth={0.58}
                  color={Color.black}
                  placeholderColor={'#000000'}
                  isBold
                  borderBottomWidth={1}
                />
                <View style={styles.containerView}>
                  <TextInput
                    style={{
                      width: windowWidth * 0.45,
                      borderRadius: moderateScale(5, 0.6),
                      paddingHorizontal: moderateScale(10, 0.6),
                    }}
                    placeholder="More Keywords"
                    value={text}
                    onChangeText={item => setText(item)}
                    placeholderTextColor={'#000000'}
                  />

                  {text.length > 0 && (
                    <CustomButton
                      onPress={() => {
                        setArchitectureValue(prev => [...prev, text]);
                        // setArchitectureValues(text)
                        setText('');
                      }}
                      text={'Add'}
                      textColor={Color.black}
                      height={windowHeight * 0.05}
                      fontSize={moderateScale(10, 0.6)}
                      bgColor={'#FFFFFF'}
                      borderRadius={moderateScale(10, 0.3)}
                      paddingHorizontal={moderateScale(10, 0.3)}
                      marginRight={moderateScale(5, 0.3)}
                    />
                  )}
                </View>

                <View style={styles.mapview}>
                  {architectureValue.map((item, index) => {
                    return (
                      <View
                        style={
                          {
                            // paddingHorizontal: 2,
                            // width : 100,
                          }
                        }>
                        <CustomText
                          style={[
                            styles.mapText,
                            {
                              backgroundColor: Color.white,
                              color: '#000000',
                            },
                          ]}>
                          {item}
                        </CustomText>

                        <Icon
                          name={'close'}
                          as={FontAwesome}
                          color={'red'}
                          size={moderateScale(13, 0.6)}
                          style={{
                            position: 'absolute',
                            right: 2,
                            // zIndex : 1,
                          }}
                          onPress={() => {
                            let temp = [...architectureValue];
                            temp.splice(index, 1);
                            setArchitectureValue(temp);
                          }}
                        />
                      </View>
                    );
                  })}
                </View>
                {/* <View>
                  <CustomText
                    style={{
                      color: Color.Grey,
                      fontSize: moderateScale(14, 0.6),
                      marginTop: moderateScale(20, 0.3),
                      paddingHorizontal: moderateScale(30, 0.6),
                      textAlign: 'center',
                    }}
                    isBold>
                    {text}
                  </CustomText>
                </View> */}
                {/* <CustomDropDownMultiSelect
                  title={'select category'}
                  array={interests}
                  item={architectureValue}
                  setItem={setArchitectureValue}
                  maxHeight={windowHeight * 0.13}
                  marginTop={moderateScale(8, 0.3)}
                  containerStyle={{
                    width: windowWidth * 0.55,
                    height: windowHeight * 0.05,
                  }}
                /> */}
              </View>

              <TouchableOpacity
                onPress={() => {
                  setShowModal(true);
                }}
                style={[
                  {
                    height: windowHeight * 0.27,
                    width: width * 0.35,
                    backgroundColor: 'white',
                    borderRadius: moderateScale(20, 0.6),
                    justifyContent: 'center',
                    overflow: 'hidden',
                  },
                  Object.keys(profilePicture).length == 0 && {
                    alignItems: 'center',
                  },
                ]}>
                {item?.image || Object.keys(profilePicture).length > 0 ? (
                  <CustomImage
                    source={
                      item?.image ? item?.image : {uri: profilePicture?.uri}
                    }
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    onPress={() => {
                      setShowModal(true);
                    }}
                  />
                ) : (
                  <Icon
                    name={'camera'}
                    as={Entypo}
                    size={moderateScale(45, 0.6)}
                    onPress={() => {
                      setShowModal(true);
                    }}
                  />
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.line}></View>

            <View style={styles.view}>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  height: windowHeight * 0.045,
                  width: windowWidth * 0.9,
                  marginBottom: moderateScale(-5, 0.3),
                  marginLeft: moderateScale(0.1, 0.3),
                  color: Color.black,
                  marginTop: moderateScale(5, 0.3),
                  placeholderColor: Color.veryLightGray,
                  borderRadius: moderateScale(20, 0.3),
                  backgroundColor: Color.white,
                  alignItems: 'center',
                  paddingHorizontal: moderateScale(20, 0.3),
                }}>
                <TextInput
                  // style={{
                  //   height:windowHeight*0.045,
                  //   width:windowWidth*0.9,
                  //   marginBottom:moderateScale(-5, 0.3),
                  //   marginLeft:moderateScale(0.1, 0.3),
                  //   color:Color.black,
                  //   marginTop:moderateScale(5, 0.3),
                  //   placeholderColor:Color.veryLightGray,
                  //   borderRadius:moderateScale(20, 0.3),
                  //   // backgroundColor:Color.white,
                  //   backgroundColor:'red',
                  //   justifyContent:'center',
                  //   paddingHorizontal:moderateScale(20,0.3)
                  // }}
                  style={{
                    color: Color.black,
                  }}
                  // placeholder={Admin}
                  disable={true}
                  value={Admin}
                />
                {/* 
                <TextInputWithTitle
                  disable={true}
                  placeholder={'Admin'}
                  setText={setAdmin}
                  value={Admin}
                  viewHeight={0.045}
                  viewWidth={0.9}
                  inputWidth={0.9}
                  inputHeight={0.05}
                  marginBottom={moderateScale(-5, 0.3)}
                  marginLeft={moderateScale(0.1, 0.3)}
                  color={Color.black}
                  marginTop={moderateScale(5, 0.3)}
                  placeholderColor={Color.veryLightGray}
                  borderRadius={moderateScale(20, 0.3)}
                  backgroundColor={Color.white}
                  // placeholder={'owner'}
                /> */}
                <CustomText
                  style={styles.ownerText}
                  isBold>
                  {/* {profileData?.community_list?.role} */}
                  owner
                </CustomText>
              </View>

              <DropDownSingleSelect
                array={ApprovalForAdmittance}
                item={ApprovalForAdmittanceValue}
                setItem={SetApprovalForAdmittance}
                width={windowWidth * 0.9}
                placeholder={'Ápproval for Admittance'}
                dropdownStyle={{
                  borderBottomWidth: 0,
                  width: windowWidth * 0.9,
                  marginTop: 10,
                }}
                btnStyle={{
                  backgroundColor: '#fff',
                  height: windowHeight * 0.045,
                }}
              />

              <DropDownSingleSelect
                array={ApprovaltoPost}
                item={ApprovalToPostValue}
                setItem={setApprovalToPostValue}
                width={windowWidth * 0.9}
                placeholder={'Approval To Post'}
                dropdownStyle={{
                  borderBottomWidth: 0,
                  width: windowWidth * 0.9,
                }}
                btnStyle={{
                  backgroundColor: '#fff',
                  height: windowHeight * 0.045,
                }}
              />

              <DropDownSingleSelect
                array={MembershipCost}
                item={MembershipCostValue}
                setItem={setMembershipCost}
                width={windowWidth * 0.9}
                placeholder={'Membership Cost'}
                dropdownStyle={{
                  borderBottomWidth: 0,
                  width: windowWidth * 0.9,
                }}
                btnStyle={{
                  backgroundColor: '#fff',
                  height: windowHeight * 0.045,
                }}
              />
            </View>
            <View
              style={{
                zIndex: 1,
                // backgroundColor : 'red',
                alignSelf: 'center',
                marginTop: moderateScale(10, 0.3),
              }}>
              {/* <CustomDropDownMultiSelect
                title={'Interests preferences'}
                array={interests}
                item={selectedInterests}
                setItem={setSelectedInterests}
                maxHeight={windowHeight * 0.3}
                marginTop={5}
                containerStyle={{
                  width: windowWidth * 0.9,
                  height: windowHeight * 0.05,
                  marginTop: 1,
                }}
              /> */}
              <SelectInterestDropdown
                interestsArray={interests}
                item={selectedInterests}
                setItem={setSelectedInterests}
                fromInterest={fromInterest}
                selectedInterest={selectedInterest}
              />
            </View>

            <View style={styles.line}></View>

            <View
              style={{
                marginTop: moderateScale(10, 0.3),
                marginBottom: moderateScale(20, 0.3),
              }}>
              <CustomText isBold style={styles.ct}>
                Team Role | Perms
              </CustomText>
              {/* every one can post or not  */}
              <SwitchComponent
                text1={'Admin can create content / post'}
                text2={'(N) Admin can not post'}
                value={adminCanCreateContent}
                setValue={setadminCanCreateContent}
              />
              {/* bubble member can post or not */}

              <SwitchComponent
                text1={'Member can create content / post'}
                text2={'Member can not create content / post'}
                value={memberCreateContent}
                setValue={setmemberCreateContent}
              />
              {/* bubble team / moderator can post or not */}

              <SwitchComponent
                text1={'Bubble team can create content'}
                text2={'bubble team can not create content'}
                value={bubbleTeamCanCreateContent}
                setValue={setbubbleTeamCanCreateContent}
              />
              {/* <SwitchComponent
                text1={'Joining is open to everyone'}
                text2={'(N) Only bubble team can accept request'}
                value={openToAll}
                setValue={setOpenToAll}
              /> */}
              {/* <SwitchComponent
                text1={'Entire bubble can invite new members'}
                text2={'(N) Only bubble team can send invites'}
                value={allCanSendInvite}
                setValue={setAllCanSendInvite}
              />
               */}
            </View>
            <View style={styles.btnView}>
              <CustomButton
                text={'cancel'}
                textColor={themeColor[1]}
                width={windowWidth * 0.4}
                height={windowHeight * 0.06}
                bgColor={['#FFFFFF', '#FFFFFF']}
                borderRadius={moderateScale(30, 0.3)}
                isGradient
                isBold={true}
                marginBottom={moderateScale(50)}
                onPress={() => {
                  navigation.goBack();
                  dispatch(setBubbleCreated(true));
                }}
              />

              <CustomButton
                text={
                  isLoading ? (
                    <ActivityIndicator color={themeColor[1]} size={'small'} />
                  ) : (
                    'Next'
                  )
                }
                textColor={themeColor[1]}
                width={windowWidth * 0.4}
                height={windowHeight * 0.06}
                // marginTop={moderateScale(10, 0.3)}
                bgColor={['#FFFFFF', '#FFFFFF']}
                borderRadius={moderateScale(30, 0.3)}
                isGradient
                isBold={true}
                marginBottom={moderateScale(50)}
                onPress={() => {
                  createBubble();
                }}
              />
            </View>
          </ScrollView>
        </ImageBackground>
      </ScrollView>
      <ImagePickerModal
        show={showModal}
        setShow={setShowModal}
        setFileObject={setProfilePicture}
      />
    </>
  );
};

export default CreateNewBubble;
const styles = ScaledSheet.create({
  topContainer: {
    paddingHorizontal: moderateScale(10, 0.6),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(15, 0.3),
  },
  mapText: {
    color: Color.Grey,
    fontSize: moderateScale(13, 0.6),
    marginHorizontal: moderateScale(5, 0.3),
    marginVertical: moderateScale(5, 0.3),
    padding: moderateScale(5, 0.6),
    borderRadius: moderateScale(10, 0.6),
  },
  bgimage: {
    width: windowWidth,
    height: windowHeight * 0.9,
  },
  switchContainer: {
    height: windowHeight * 0.08,
    width: windowWidth * 0.8,
    marginTop: moderateScale(10, 0.3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  crownIcon: {
    height: windowWidth * 0.12,
    width: windowWidth * 0.12,
    borderWidth: 1,

    borderRadius: (windowWidth * 0.12) / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    width: '90%',
    height: 2,
    backgroundColor: '#a0e8eb',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: moderateScale(15, 0.3),
  },
  ct: {
    width: windowWidth,
    paddingHorizontal: moderateScale(10, 0.6),
    fontSize: moderateScale(15, 0.6),
    marginTop: moderateScale(10, 0.6),
  },
  image: {
    height: height * 0.04,
    width: windowWidth * 0.3,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(30, 0.6),
  },
  ownerText:{
    color: Color.themeColor1,
    fontSize: moderateScale(12, 0.6),
    paddingHorizontal: moderateScale(30, 0.6),
    paddingVertical: moderateScale(6, 0.3),
  },
  view: {
    width: windowWidth * 0.9,
    alignSelf: 'center',
    marginTop: moderateScale(18, 0.3),
    alignItems: 'center',
  },
  Row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: windowHeight * 0.045,
    width: windowWidth * 0.9,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginTop: moderateScale(10, 0.3),
  },
  mapview: {
    width: windowWidth * 0.55,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: moderateScale(5, 0.6),
  },
  containerView: {
    marginTop: moderateScale(5, 0.6),
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: windowWidth * 0.56,
    borderBottomWidth: 1,
    marginLeft: moderateScale(5, 0.3),
  },
});

const SwitchComponent = ({text1, text2, setValue, value}) => {
  // console.log('🚀 ~ SwitchComponent ~ value:', value);
  // const onSelectSwitch = index => {
  //   if (index == 1) {
  //     setValue('Yes');
  //   } else if (index == 2) {
  //     setValue('No');
  //   }
  // };
  return (
    <View style={{flexDirection: 'row'}}>
      <View
        style={{
          width: windowWidth * 0.7,
          paddingVertical: moderateScale(8, 0.6),
          paddingHorizontal: moderateScale(10, 0.6),
        }}>
        <CustomText
          style={{
            fontSize: moderateScale(13, 0.6),
            color: Color.veryLightGray,
          }}>
          {text1}
        </CustomText>
        <CustomText
          style={{
            fontSize: moderateScale(11, 0.6),
            color: Color.black,
          }}>
          {text2}
        </CustomText>
      </View>
      <View
        style={{
          width: windowWidth * 0.3,
          alignItems: 'flex-end',
          justifyContent: 'center',
          paddingHorizontal: moderateScale(10, 0.6),
        }}>
        <CustomSwitch
          // selectionMode={1}
          roundCorner={true}
          option1={'Yes'}
          option2={'No'}
          value={value.toLowerCase() == 'no' ? 2 : 1}
          setValue={setValue}
          // onSelectSwitch={onSelectSwitch}
          selectionColor={'#11d40d'}
        />
      </View>
    </View>
  );
};
