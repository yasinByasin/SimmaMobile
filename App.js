import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { I18nManager, LogBox, AppState, Platform } from 'react-native';
import MainNavigation from './src/navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import store, { persistor } from './src/redux/store';
import RNRestart from 'react-native-restart';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import messaging from '@react-native-firebase/messaging';
// import { Adjust, AdjustConfig } from 'react-native-adjust';
// import * as Sentry from '@sentry/react-native';
// import { get } from './src/services';
// import { CONFIG_CONST, VERSION_NUMBER, ENVIRONMENT } from './src/utilities/routes';
// import MaintenanceMode from './src/screens/MaintenanceMode';
// import Update from './src/screens/Update';
import { configCacheKey } from './src/utilities/constants';
import { checkConnected, checkKeyAvailability, cacheData } from './src/utilities/helper';
// import Clipboard from '@react-native-community/clipboard';
// sentry init , environment control
// Sentry.init({ 
//   environment: ENVIRONMENT,
//   dsn: 'https://70b02034663244098bcbc0e4b5f275b7@o4505356479430656.ingest.sentry.io/4505356482904064', 
// });

// ignore warnings
LogBox.ignoreAllLogs();


const App = () => {
  // const [aState, setAppState] = useState(AppState.currentState);
  // const [route, setRoute] = useState('');
  // const [flag, setFlag] = useState(null);

  // const setUpAdjust = () => {
  //   let adjustConfig = null
  //   adjustConfig = new AdjustConfig('xrby129ehog0', AdjustConfig.EnvironmentProduction);
  //   adjustConfig.setLogLevel(AdjustConfig.LogLevelVerbose);
  //   adjustConfig.setReadMobileEquipmentIdentity(true);
  //   Adjust.create(adjustConfig);
  //   // if (process.env.NODE_ENV === 'development') {
  //   //   adjustConfig = new AdjustConfig('xrby129ehog0', AdjustConfig.EnvironmentSandbox);
  //   // } else {
  //   // }
  // }

  // // const getInitUrl = async() => {
  // //   const referralCode = await Clipboard.getString();
  // //   if(referralCode){
  // //     await AsyncStorage.setItem('referralCode', referralCode);
  // //   }
  // // }

  // const messagingHandler = async () => {
  //   messaging().requestPermission();
  //   messaging().setBackgroundMessageHandler(async remoteMessage => {
  //   });
  //   await messaging().subscribeToTopic('all');
  // };

  // useEffect(async () => {
  //   // getInitUrl();
  //   checkLang();
  //   messagingHandler();
  //   setUpAdjust();

  // }, []);

  // useEffect(() => {
  //   const appStateListener = AppState.addEventListener(
  //     'change',
  //     async nextAppState => {
  //       if (nextAppState == 'active') {
  //         const configAvailable = await checkKeyAvailability(configCacheKey)
  //         let response;
  //         if (configAvailable) {
  //           response = configAvailable
  //         } else {
  //           response = await get(`${CONFIG_CONST}`);
  //           response = response.data
  //           cacheData(configCacheKey, response)
  //         }
  //         const { maintenanceMode, deviceTypes } = response;
  //         const { minimumRequiredVersion, demoMode, demoVersion } = deviceTypes[Platform.OS.toLowerCase()];
  //         const demoModeFlag = demoMode && demoVersion.split(',').findIndex(value => parseInt(value) == parseInt(VERSION_NUMBER)) > -1;
  //         await AsyncStorage.setItem('demoModeFlag', `${demoModeFlag}`);
  //         if (maintenanceMode != undefined) {
  //           if (parseInt(VERSION_NUMBER) < parseInt(minimumRequiredVersion)) {
  //             setRoute('Update');
  //             return;
  //           }
  //           setFlag(response.maintenanceMode);
  //           if (response.maintenanceMode) {
  //             setRoute('MaintenanceMode');
  //           } else {
  //             setRoute('Splash');
  //           }

  //         } else {
  //           setRoute('MaintenanceMode');
  //         }
  //       } else {

  //         const flag = await AsyncStorage.getItem('maintenanceModeFalg');
  //         if (flag == 'true') {
  //           setRoute('MaintenanceMode');
  //         } else {
  //           setRoute('Splash');
  //         }
  //         setFlag(flag);
  //       }

  //       setAppState(nextAppState);
  //     },
  //   );
  //   return () => {
  //     appStateListener?.remove();
  //   };
  // }, []);

  // const checkLang = async () => {
  //   const lang = await AsyncStorage.getItem('lang') || 'ar';
  //   if (lang == 'ar') {
  //     I18nManager.locale = 'ar';
  //     I18nManager.forceRTL(true);
  //     !I18nManager.isRTL && RNRestart.Restart();
  //   } else {
  //     I18nManager.locale = 'en';
  //   }
  // };

  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <MainNavigation route="splash" flag={false} />
          {/* {(() => {
            switch (route) {
              case 'MaintenanceMode':
                return <MaintenanceMode flag={flag} />
              case 'Update':
                return <Update />
              default:
                return <MainNavigation route={route} flag={flag} />
            }
          })()} */}
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
