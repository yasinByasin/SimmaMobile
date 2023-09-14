import NetInfo from '@react-native-community/netinfo';
import I18n from '../../translations';
import { getDeviceId, getReadableVersion, getSystemVersion } from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { cashedElementsTTL, otpSentAtKey, configCacheKey, userBlockedAtKey } from '../constants'
export const languageSelector = (lang, defaultLang = 'English') => {
  if (lang === 'English') {
    return 'en';
  } else if (lang === 'Arabic') {
    return 'ar';
  } else {
    if (defaultLang === 'English') {
      return 'en';
    } else if (defaultLang === 'Arabic') {
      return 'ar';
    } else {
      return 'en';
    }
  }
};
export const checkConnected = () => {
  return NetInfo.fetch().then(state => {
    return state.isConnected;
  });
};

export const numberWithCommas = (number = 0) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const round = (value, decimals = 2) => {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

export const getDeviceDetails = async () => {
  return {
    os: Platform.OS,
    id: await getDeviceId(),
    appVersion: await getReadableVersion(),
    osVersion: await getSystemVersion()
  };
}

export const createBiometricsKey = (rnBiometrics) => {
  return rnBiometrics.createKeys()
    .then((resultObject) => {
      const { publicKey } = resultObject
      return `-----BEGIN PUBLIC KEY-----\n${publicKey}\n-----END PUBLIC KEY-----`
    })
}

export const checkKeyAvailability = async (key, forceFetch = false) => {
  let currentTime = new Date().getTime()
  const cachedData = await AsyncStorage.getItem(key)
  if (!cachedData) {
    return false
  }
  const parsedData = JSON.parse(cachedData)
  if ((currentTime - parsedData.timeToLive <= cashedElementsTTL[key]) || forceFetch) {
    return parsedData.data;
  }
  return false
}

export const cacheData = async (key, value) => {
  let currentTime = new Date().getTime()
  AsyncStorage.setItem(key, JSON.stringify({ data: value, timeToLive: currentTime }))
}

const msToTime = (duration) => {
  var seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds
}

const checkAddToTries = async (loginWindowDuration, maxLoginAttempts) => {
  const otpSentAt = await AsyncStorage.getItem(otpSentAtKey)
  const currentTime = new Date().getTime()
  const updateRecords = async (values) => {
    AsyncStorage.setItem(otpSentAtKey, JSON.stringify(values))
  }
  if (otpSentAt) {
    const records = JSON.parse(otpSentAt)
    const validTries = records.filter(record => (currentTime - record.createdAt) < loginWindowDuration)
    console.log({ validTries })
    if (validTries.length < maxLoginAttempts) {
      validTries.push({ createdAt: currentTime })
      updateRecords(validTries)
      return false
    }
    AsyncStorage.removeItem(otpSentAtKey);
    AsyncStorage.setItem(userBlockedAtKey, JSON.stringify(currentTime))
    return true
  }
  updateRecords([{ createdAt: currentTime }])
  return false
}

export const checkAddUserRecord = async () => {
  const config = await checkKeyAvailability(configCacheKey, true)
  if (config && config.blockDuration > 0) {
    const userBlockedAt = await AsyncStorage.getItem(userBlockedAtKey)
    const currentTime = new Date().getTime()
    const blockDuration = config.blockDuration * 3600000
    const loginWindowDuration = config.loginWindow * 3600000
    const otpSentAt = await AsyncStorage.getItem(otpSentAtKey)
    if (userBlockedAt && (currentTime - Number(userBlockedAt)) < blockDuration) {
      if (otpSentAt) AsyncStorage.removeItem(otpSentAtKey)
      return { isBlocked: true, remaining: msToTime(blockDuration - (currentTime - Number(userBlockedAt))) };
    } else {
      const canAdd = await checkAddToTries(loginWindowDuration, config.maxLoginAttempts)
      return { isBlocked: canAdd, remaining: msToTime(blockDuration) };
    }
  }
  return { isBlocked: false };
}