import {View, Text,  ScrollView, ImageBackground, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import ScreenBoiler from '../Components/ScreenBoiler';
import {useSelector} from 'react-redux';
import {windowHeight, windowWidth} from '../Utillity/utils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Divider, Icon} from 'native-base';
import CustomText from '../Components/CustomText';
import Color from '../Assets/Utilities/Color';
import {moderateScale} from 'react-native-size-matters';
import CustomButton from '../Components/CustomButton';
import MemberShipCard from '../Components/memberShipCard';
import Header from '../Components/Header';
import navigationService from '../navigationService';

const MemberShip = ({route}) => {
  const fromHeaderMenu= route?.params?.fromHeaderMenu;
  const privacy = useSelector(state => state.authReducer.privacy);
  const roles=[
    {r1:"Students",r2:'Explorers'},
    {r1:"Content Creator",r2:'Business Owners'},

 
  ]
    const basicSubscription =
    [
        {
          "id": 1,
          "heading": "Reduced Cost",
          "description": "Students can join the platform for 3.99/month, making it accessible to a wide audience of young users."
        },
        {
          "id": 2,
          "heading": "Interest Exploration",
          "description": "Access to explore a variety of interests, follow content creators, subscribe to communities and discover new topics and trends."
        },
        {
          "id": 3,
          "heading": "Basic Communication",
          "description": "Ability to interact with others through likes, comments, and direct messaging to connect and engage with peers."
        },
        {
          "id": 4,
          "heading": "Learning Resources",
          "description": "Access to educational content and resources to support academic growth and personal development."
        },
        {
          "id": 5,
          "heading": "Data Control",
          "description": "We will not leverage, sell, or use algorithms to manipulate your judgement."
        },
        {
          "id": 6,
          "heading": "Profile Customization",
          "description": "Basic profile customization options to express individuality and interests participate in a thriving community."
        },
        {
          "id": 7,
          "heading": "No Advertising",
          "description": "The only advertising you will see is for in-app communities in the feed section of the platform, ensuring that advertisers do not own the direction of this platform or influence the experience for users."
        },
        {
          "id": 8,
          "heading": "Community Engagement",
          "description": "Participation in public forums and groups to connect with like-minded individuals."
        }
      ]
      const premimuSubscription=[
        {
          "id": 9,
          "heading": "Exclusive Community",
          "description": "Access to a private community of fellow content creators and entrepreneurs for networking and collaboration. You set the tone and govern your community the way you see fit."
        },
        {
          "id": 10,
          "heading": "No Centralized Community/Content Policies",
          "description": "As long as it is legal and decent, your opinions will not end in de-monetization or shadow banning. We want you to grow and prosper, not control or reduce you."
        },
        {
          "id": 11,
          "heading": "Monetization Features",
          "description": "Unlock revenue streams such as paid subscriptions and links to Shopify and creator's websites for merchandise and service sales."
        },
        {
          "id": 12,
          "heading": "Audience Building",
          "description": "Platform-enabled ability to analyze and grow followers, engagement and reach, aiding content creators and entrepreneurs in building their brand."
        },
        {
          "id": 13,
          "heading": "Moderation Control",
          "description": "Full control over content moderation, allowing creators to maintain a safe and positive community."
        },
        {
          "id": 14,
          "heading": "Event Scheduling",
          "description": "Ability to schedule and promote live events, webinars, or meetups directly on the platform."
        },
        {
          "id": 15,
          "heading": "Advertising Opportunities",
          "description": "The option to advertise products, services, or events to a targeted audience within your community, or out to a larger audience in the FEEDS section of the platform."
        },
        {
          "id": 16,
          "heading": "Analytics and Insights",
          "description": "Access to in-depth analytics and insights on content performance and audience demographics. (Next Phase)"
        },
        {
          "id": 17,
          "heading": "Enhanced Communication",
          "description": "Priority messaging and chat support for networking and collaboration opportunities."
        }
      ]
      
  return (
      <ImageBackground
        source={
            // require('../Assets/Images/activity1.png')
          privacy == 'private'
            ? require('../Assets/Images/theme2.jpg')
            : require('../Assets/Images/Main.png')
        }
        resizeMode={'cover'}
        style={styles.mainScreen}
        >
        <Header Title={"MemberShip"} showBack={fromHeaderMenu}/>  
            <ScrollView style={{
                width: windowWidth,
                height:windowHeight * 0.8,
                // paddingVertical:12,
                
            }}
            contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
            >
          <View style={{alignItems:'center', justifyContent:'center', paddingVertical:moderateScale(18,0.2)}}>

          <MemberShipCard plan={'BASIC SUBSCRIPTION'} 
         colors={['#F4397A', "#F4397A"]}
         price={'$3.99/month'}
         subscriptionRules={basicSubscription}
          heading={roles[0].r1}
          subHeading={roles[0].r2}
          onSubscribe={() =>{
            navigationService.navigate("Profile", {subscriptionPlan:"Basic"})

          }}
          
          />
          <MemberShipCard 
          colors={['#EFBE32', "#EFBE32"]}
          bgColor={'#EFBE32'} plan={'PREMIUM SUBSCRIPTION'} 
          price={"$12.99/month"}
          subscriptionRules={premimuSubscription}
          heading={roles[1].r1}
          subHeading={roles[1].r2}
          onSubscribe={() =>{
            navigationService.navigate("Profile",
            
            {
            
              subscriptionPlan: "Premium"})
          }}
          
          />
          </View>
        </ScrollView>
      </ImageBackground>
  );
};

export default MemberShip;

const styles = StyleSheet.create({
  mainScreen: {
    width: windowWidth,
    height: windowHeight ,
    paddingBottom:moderateScale(14,0.2)

  },
  card: {
    marginTop:moderateScale(12,0.2),
    backgroundColor: '#F4397A',
    width: windowWidth * 0.85,
    height: windowHeight * 0.75,
    paddingHorizontal:moderateScale(12,0.3),
    borderRadius: moderateScale(12, 0.2),
    paddingVertical:moderateScale(12,0.3)
  },
  outlinedButton:{
    backgroundColor:'transparent'
    // borderRadius:mpd
  }
});
