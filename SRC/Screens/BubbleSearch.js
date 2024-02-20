import {
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
const {height, width} = Dimensions.get('window');
import {moderateScale} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SearchData} from '../dummyData/SearchData';
import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import Color from '../Assets/Utilities/Color';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import {useSelector} from 'react-redux';
import { Post } from '../Axios/AxiosInterceptorFunction';
import { baseUrl } from '../Config';

const BubbleSearch = () => {

  const themeColor = useSelector(state => state.authReducer.ThemeColor);
  const privacy = useSelector(state => state.authReducer.privacy);
  const token = useSelector(state => state.authReducer.token);
  const [isSelected, setIsSelected] =useState('bubbles');
  const [data, setData] =useState({})
  const [search, setSearch] = useState('');
  const SearchData = [
    {
      id: 1,
      image: require('../Assets/Images/bubble1.png'),
      name: 'Alchole',
      Tags: '#Architecture',
      bubble: true,
    },
    {
      id: 2,
      image: require('../Assets/Images/bubble2.png'),
      name: 'Alternative Fitness',
      Tags: '#Architecture',
      bubble: false,
    },
    {
      id: 3,
      image: require('../Assets/Images/bubble3.png'),
      name: 'Archery',
      Tags: '#Architecture',
      bubble: true,
    },
    {
      id: 4,
      image: require('../Assets/Images/bubble4.png'),
      name: 'architecture',
      Tags: '#Architecture',
      bubble: true,
    },
    {
      id: 5,
      image: require('../Assets/Images/bubble5.png'),
      name: 'art',
      Tags: '#Architecture',
      bubble: false,
    },
    {
      id: 6,
      image: require('../Assets/Images/bubble6.png'),
      name: 'Astrology',
      Tags: '#Architecture',
      bubble: true,
    },
    {
      id: 7,
      image: require('../Assets/Images/bubble10.png'),
      name: 'Beer',
      Tags: '#Architecture',
      bubble: false,
    },
    {
      id: 8,
      image: require('../Assets/Images/bubble8.png'),
      name: 'Author Books',
      Tags: '#Architecture',
      bubble: true,
    },
    {
      id: 9,
      image: require('../Assets/Images/bubble9.png'),
      name: 'Bird Watching',
      Tags: '#Architecture',
      bubble: false,
    },
    {
      id: 10,
      image: require('../Assets/Images/bubble10.png'),
      name: 'bolging',
      Tags: '#Architecture',
      bubble: true,
    },
    {
      id: 11,
      image: require('../Assets/Images/bubble11.png'),
      name: 'Author books',
      Tags: '#Architecture',
      bubble: false,
    },
    {
      id: 12,
      image: require('../Assets/Images/bubble4.png'),
      name: 'bolging',
      Tags: '#Architecture',
      bubble: false,
    },
    // {
    //   id: 13,
    //   image: require('../Assets/Images/Ellipse2.png'),
    //   name: 'Author books',
    //   Tags: '#Architecture',
    //   bubble: false,
    // },
  ];
const searchBubble = async()=>{
  const url = 'auth/search';
  const body={
    search:search
  }
  const response= await Post(url, body, apiHeader(token));
  
   if(response != undefined){
   console.log("Search : ===> ", response.data);
  setData(response?.data);
}



}

console.log("Feed==> ",data?.feeds)
const filteredData= SearchData.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
  console.log(search)
  const toggleBubbles = () => {
    setIsSelected('bubbles');
  };
  
  const toggleFeeds = () => {
    setIsSelected('feeds');
  };
  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      <Header right Title={'Search'} search />

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
          // alignItems: 'center',
        }}>
        <View style={styles.topContainer}>
          <View style={styles.profileSection}>
            <CustomImage
              source={require('../Assets/Images/dummyman1.png')}
              style={{
                height: '100%',
                width: '100%',
              }}
              resizeMode="contain"
            />
          </View>

          <TextInputWithTitle
            secureText={false}
            placeholder={'Alchole'}
            setText={setSearch}
            value={search}
            viewHeight={0.05}
            viewWidth={0.7}
            inputWidth={0.7}
            backgroundColor={'white'}
            color={themeColor[1]}
            placeholderColor={Color.veryLightGray}
            borderRadius={moderateScale(25, 0.3)}
          />

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={searchBubble}
            style={{justifyContent: 'center'}}>
            <Ionicons name="search" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
 <View style={styles.searchCategories}>
  <TouchableOpacity
  onPress={toggleBubbles}
  >
  <View style={[styles.category,  isSelected == "bubbles" ? { backgroundColor: Color.white} : null]}>
       <CustomText style={styles.txt}>Bubbles</CustomText>       
  </View>
  </TouchableOpacity>
  <TouchableOpacity 
  onPress={toggleFeeds}
  >
  <View style={[styles.category,  isSelected== "feeds" &&{ backgroundColor: Color.white}]}>
       <CustomText style={styles.txt}>feeds</CustomText>       
  </View>
  </TouchableOpacity>
  

</View>
        <View
          style={{width: windowWidth, marginBottom: moderateScale(35, 0.3)}}>
          
          <FlatList
            data={ isSelected === 'bubbles' ? data.community_info : data.feeds }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              marginBottom: moderateScale(10, 0.3),
              paddingBottom: moderateScale(130, 0.6),
              marginTop: moderateScale(10, 0.3),
            }}
            renderItem={({item, index}) => {
            
              return (
                <View style={styles.row}>
                  <View
                    style={[
                      styles.profileSection2,
                      item?.bubble ? {borderRadius: (windowHeight * 0.08) / 2} : {borderRadius:moderateScale(10,.6)}
                    ]}>
                    <CustomImage
                      source={{uri:`${baseUrl}/${item.photo}`}}
                      style={{
                        height: '100%',
                        width: '100%',
                      }}
                      resizeMode="cover"
                    />
                  </View>

                  <View
                    style={{
                      marginLeft: moderateScale(15, 0.6),
                      justifyContent: 'center',
                    }}>
                    <CustomText
                      style={{
                        fontSize: moderateScale(16, 0.6),
                        color: '#000',
                        textAlign: 'left',
                      }}
                      isBold>
                      {item?.name}
                    </CustomText>
                    <CustomText
                      style={{
                        fontSize: moderateScale(9, 0.6),
                        textAlign: 'left',
                        color: '#000',
                      }}>
                      {item.hashtags}
                    </CustomText>
                  </View>
                </View>
              );
              
            
            }
          }
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <View style={styles.bubbleImage}>
                <CustomImage
                style={{width:"100%",height: "100%"}}
                resizeMode={'contain'}
                source={require('../Assets/Images/no-data.png')}
                />
              </View>
              <CustomText style={styles.emptyText}>No data available</CustomText>
              {/* You can add fallback images here if needed */}
            </View>
          )}                  
          />
        </View>
      </ImageBackground>
    </>
  );
};

export default BubbleSearch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    width: windowWidth,
    // height: windowHeight *0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(8, 0.3),
    marginTop: moderateScale(10, 0.3),
  },

  profileSection: {
    height: windowHeight * 0.08,
    width: windowHeight * 0.08,
    backgroundColor: '#fff',
    borderRadius: (windowHeight * 0.08) / 2,
    borderWidth: 3,
    borderColor: Color.green,
    justifyContent: 'center',
    overflow: 'hidden',
    // alignSelf: 'center',
  },
  profileSection2: {
    height: windowHeight * 0.06,
    width: windowHeight * 0.06,
    backgroundColor: '#fff',
    // borderRadius:(windowHeight * 0.06 )/2,
    borderWidth: 2,
    borderColor: Color.green,
    justifyContent: 'center',
    overflow: 'hidden',
    // alignSelf: 'center',
  },
  search: {
    width: windowWidth * 0.7,
    height: windowHeight * 0.06,
    backgroundColor: '#fff',
    borderRadius: 50,
    justifyContent: 'center',
    //   marginLeft:moderateScale(10,0.3)
  },
  row: {
    width: windowWidth,
    height: windowHeight * 0.08,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: moderateScale(14, 0.6),
  },
  searchCategories:{
    marginTop:moderateScale(5,0.3),
    flexDirection:"row",
    // justifyContent:"center",
    gap:moderateScale(18,0.6),
    alignItems:"center",
    paddingHorizontal:moderateScale(40, 9)
  },
  category:{
    borderWidth:1,
    borderRadius: 150,
    padding:moderateScale(5,0.4),
    alignItems:"center",
    width:windowWidth * 0.17,
    
    // backgroundColor: Color.themeBgColor,

  },
  emptyContainer:{
    width:windowWidth,
    height:windowHeight * 0.4,
    justifyContent:'center',
    alignItems:'center',
    paddingTop:moderateScale(10,0.5)
  },
  bubbleImage:{
    width: windowWidth * 0.45,
    height:windowWidth * 0.45,
    overflow:'hidden'
  }

});
