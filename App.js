/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {StripeProvider} from '@stripe/stripe-react-native';
import {NativeBaseProvider} from 'native-base';

import {store, persistor} from './SRC/Store/index';
import {stripeKey} from './SRC/Config';
import AppNavigator from './SRC/appNavigation';
import {
  requestCameraPermission,
  requestLocationPermission,
  requestWritePermission,
} from './SRC/Utillity/utils';
import SplashScreen from './SRC/Screens/SplashScreen';
import LoginScreen from './SRC/Screens/LoginScreen';
import Signup from './SRC/Screens/Signup';
import ResetPassword from './SRC/Screens/ResetPassword';
import ChangePassword from './SRC/Screens/ChangePassword';
import Feeds from './SRC/Screens/Feeds';
import FeedSelection from './SRC/Screens/FeedSelection';

// import AppNavigator, {DrawerRoot} from './SRC/appNavigation';

const App = () => {
  const [publishableKey, setPublishableKey] = useState('');

  const fetchPublishableKey = async () => {
    const key = await fetchKey(); // fetch key from your server here
    setPublishableKey(key);
  };

  


  console.reportErrorsAsExceptions = false;
  return (
    <StripeProvider 
    publishableKey={"pk_test_51McSueJ0WRwehn2Uuf4rm6WNHPQvaJY9NGU235gUEqPA3AJuc9Mq1x98Y8B8uE5eMfivo5l2xK4Vau21zau7ZBDp00g7qWfkx3"}
    // merchantIdentifier="merchant.identifier" // required for Apple Pay
    // urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
  >
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider>
          <MainContainer />
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
    </StripeProvider>
  );
};

const MainContainer = () => {
  const dispatch = useDispatch();

 
  useEffect(() => {
    async function GetPermission() {
      await requestCameraPermission();
      await requestWritePermission();
      await requestLocationPermission();
    }
    GetPermission();
  }, []);

  const [isloading] = useloader(true);
  if (isloading == true) {
    return <SplashScreen />;
  }
  // return <FeedSelection/>;

  return <AppNavigator />;
};

const useloader = value => {
  const [isloading, setIsloading] = useState(value);
  const [loadingTime] = useState(6000);
  useEffect(() => {
    setTimeout(() => setIsloading(false), loadingTime);
  }, []);
  return [isloading];
};
export default App;
