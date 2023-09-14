import React, { useEffect } from 'react';
import { View, Text, I18nManager, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import I18n from '../../translations';
import MyStatusBar from '../../components/Header/statusBar';
import { Header } from '../../components/Header/Header';
import { appLottie, colors, appStrings, HP } from '../../utilities';
import { useDispatch, useSelector } from 'react-redux';
import { availabilityFlagRequest } from '../../redux/actions';
import Lottie from 'lottie-react-native';

const Splash = ({ navigation, flag = false }) => {
  const login = useSelector(state => state.login);
  const dispatch = useDispatch(null);
  useEffect(() => {
    dispatch(availabilityFlagRequest(false, onSuccessAvailabilityFlag, onFailureAvailabilityFlag));
    handleNavigation();
  }, []);

  const handleNavigation = async () => {
    const lang = await AsyncStorage.getItem('lang') || 'ar';
    if (lang === null || lang === undefined) {
      I18n.locale = 'en';
    } else {
      I18n.locale = lang;
    }
  };

  const onSuccessAvailabilityFlag = async (flag) => {
    if (flag) {
      await AsyncStorage.setItem('maintenanceModeFalg', `${flag}`);
      return navigation.navigate('MaintenanceMode');
    }
    const homeViseted = await AsyncStorage.getItem('home__page') || 'false';

    setTimeout(() => {
      if (homeViseted === 'false') {
        return navigation.navigate('Language');
      }
      if (!login?.loggedInMode || login?.userdata !== null) {
        navigation.replace('App', { screen: 'Cart' });
      } else {
        navigation.replace('Auth');
        // navigation.replace('App', {screen: 'Cart'});
      }
    }, 2500);
  }

  const onFailureAvailabilityFlag = () => {
    return navigation.replace('Auth');
  }

  // splash
  return (
    <View style={styles.mainContainer}>
      <MyStatusBar backgroundColor={colors.white} barStyle={'dark-content'} />
      <Lottie style={{ height: '30%', width: '100%' }} source={appLottie.splash} autoPlay loop />
    </View>
  );
};

export default Splash;
