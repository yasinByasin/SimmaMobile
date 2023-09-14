import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Platform,
  I18nManager,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
  Keyboard,
  Image,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CookieManager from '@react-native-cookies/cookies';
import { Loading, CoachMarkModal } from '../../../../components';
import DeviceInfo from 'react-native-device-info';
import { colors, WP, translateElement, extractText, sendPageRoute, appImages } from '../../../../utilities';
import styles from './styles';
import MyStatusBar from '../../../../components/Header/statusBar';
import I18n from '../../../../translations';
import { useSelector, useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import Toast from 'react-native-tiny-toast';
import { checkConnected, cacheData, checkKeyAvailability } from '../../../../utilities/helper';
import { getCartRequest, getCitiesRequest } from '../../../../redux/actions';
// import analytics from '@react-native-firebase/analytics';
import translate from 'translate-google-api';
// import { Adjust, AdjustEvent } from 'react-native-adjust';
import { citiesCacheKey } from '../../../../utilities/constants';
const Shops = ({ navigation, route }) => {

  const webViewRef = useRef(null);
  const dispatch = useDispatch(null);
  const [isLoading, setIsLoading] = useState(false);
  const [webUrl, setWebUrl] = useState('');
  const [buttonText, setButtonText] = useState(I18n.t('showCart'));
  const [translatedWordsList, setTranslatedWordsList] = useState({});
  const [isCookieRemoved, setIsCookieRemoved] = useState(false);
  const [orderParams, setOrderParams] = useState(false);
  const [clearCookieFlag, setClearCookieFlag] = useState(false);
  const discountCodesList = ['discountCode', 'firstTimeDiscountCode', 'oneTimeDiscountCode'];
  const [clearTimeoutForLoading, setClearTimeoutForLoading] = useState(false);
  const [timeoutForOnloadCompleteIsSet, setTimeoutForOnloadCompleteIsSet] = useState(false);
  const [isScriptCart, setIsScriptCart] = useState(false);
  const [citiesLoaded, setCitiesLoaded] = useState(false);
  const [cartLoaded, setCartLoaded] = useState(false);
  const login = useSelector(state => state.login);
  const { activeStore, order } = useSelector(state => state.order);
  let hasNotch = DeviceInfo.hasNotch();
  const isFocus = useIsFocused();

  const goToMainPage = async () => {
    webViewRef?.current.injectJavaScript(`window.location = '${route?.params?.url}';`);
    await setWebUrl(route?.params?.url);
  }

  useEffect(() => {
    if (citiesLoaded && cartLoaded) {
      navigation.navigate('OrderItems', orderParams)
    }
  }, [citiesLoaded, cartLoaded]);

  useEffect(() => {
    if (isFocus) {
      if (cartLoaded) {
        setCartLoaded(false);
      }
      AsyncStorage.getItem('isPersist').then(flag => {
        setClearCookieFlag(flag);
        if (flag === 'true') {
          CookieManager.clearAll(true).then(async res => {
            await AsyncStorage.setItem('isPersist', 'false');
          });
        }
      });
      if(route?.params?.goToMainPage){
        if(route?.params?.goToMainPage && buttonText !== I18n.t('showCart')){
          setButtonText(I18n.t('showCart'));
        } else if (buttonText !== I18n.t('checkout')){
          setButtonText(I18n.t('checkout'));
        }
      }
      if (route?.params?.goToMainPage && webUrl === route?.params?.cartUrl) {
        goToMainPage()
      }
    }
  }, [isFocus]);

  useEffect(() => {
    if (route?.params?.goToCart) {
      setWebUrl(route?.params?.cartUrl);
      setButtonText(I18n.t('checkout'));
    } else {
      setWebUrl(route?.params?.url);
      setButtonText(I18n.t('showCart'));
    }
  }, []);

  const backAction = () => {
    return true;
  };

  useEffect(() => {
    if (isFocus) {
      BackHandler.addEventListener('hardwareBackPress', backAction);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', backAction);
    }
  }, [isFocus]);


  const onLoadInjectJavaScript = (url = false) => {
    return `if (typeof extractUrl === 'undefined') {
    const extractUrl =  () => {
      let lastUrl = '${url}' || location.href; 
      new MutationObserver(() => {
      const url = location.href;
      if (url !== lastUrl) {
        lastUrl = url;
        onUrlChange();
      }
    }).observe(document, {subtree: true, childList: true});
      function onUrlChange() {
        ${sendPageRoute}
        ${activeStore.translation ? extractText : ''}
      }
    }; 
    extractUrl();
  }`;
  }

  const onNavStateChange = ({ url, loading, canGoBack }) => {
    if (url.includes('https://jhrp.adj.st/n/?adj_t') && canGoBack) {
      webViewRef?.current.goBack();
      return;
    }
    if (url === 'about:blank') {
      setIsLoading(false);
      return;
    }

    webViewRef?.current.injectJavaScript(`${sendPageRoute}`);
    setIsLoading(loading);
    if (!loading) {
      if (activeStore.translation) {
        webViewRef?.current?.injectJavaScript(extractText);

      }
      if (url === route?.params?.cartUrl) {
        webViewRef?.current?.injectJavaScript(`
        document.querySelector('div[id="bottomPop"]').remove();
        var gifts  = document.querySelectorAll('div[class*="-gift"]');
        for (let i = 0; i < gifts.length; i++) {
          gifts[i].remove();
        }
        const alerts = document.querySelectorAll('div[role="alert"]');
        for (let i = 0; i < alerts.length; i++) {
          alerts[i].remove();
        }
        `);
        if (!isScriptCart) setButtonText(I18n.t('checkout'));
        if (route?.params?.goToCart) {
          setTimeout(() => {
            webViewRef?.current.injectJavaScript(`${route?.params?.extractionCode}`);
          }, 1500);
        }
      } else if (!timeoutForOnloadCompleteIsSet) {
        setTimeoutForOnloadCompleteIsSet(true);
        if (url !== webUrl && url == route?.params?.url && webUrl == route?.params?.cartUrl) {
          setWebUrl(url);
        }
        setTimeout(() => {
          setTimeoutForOnloadCompleteIsSet(false);
          webViewRef?.current?.injectJavaScript(
            `${route?.params?.onLoadCompleteCode}`,
          );
        }, 1000);
        setIsLoading(false);
        if (!isScriptCart) setButtonText(I18n.t('showCart'));
      }
    } else if (!clearTimeoutForLoading) {
      setClearTimeoutForLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setClearTimeoutForLoading(false);
        if (activeStore.translation) {
          webViewRef?.current?.injectJavaScript(extractText);
        }
        webViewRef?.current?.injectJavaScript(
          `${route?.params?.onLoadCompleteCode}`,
        );
      }, 1500);
    }
  };

  const onLoadWebUrl = () => {
    webViewRef?.current?.injectJavaScript(onLoadInjectJavaScript(webUrl));
    if (activeStore.translation) {
      webViewRef?.current?.injectJavaScript(extractText);
    }
    if (clearCookieFlag === 'true') {
      setTimeout(() => setIsCookieRemoved(true), 5000);
    }
  };

  const onHandleMessage = async e => {
    try {

      let data = e?.nativeEvent?.data;
      if (data === 'invalidCurrency') {
        Toast.show(I18n.t('invalidSite'), {
          position: Toast.position.CENTER,
          duration: 6000,
        });
        return;
      }
      const dataObject = JSON.parse(data);
      if (dataObject?.cartIsOpen === true) {
        setIsScriptCart(true);
        setButtonText(I18n.t('checkout'));
        return
      }
      if (dataObject?.cartIsOpen === false) {
        setIsScriptCart(true);
        setButtonText(I18n.t('showCart'));
        return
      }

      if (dataObject.pathname) {
        if (isLoading) {
          return true;
        }
        if (webUrl !== route?.params?.cartUrl && dataObject.pathname.includes(route?.params?.cartUrl)) {
          setButtonText(I18n.t('checkout'));
        } else if (buttonText == I18n.t('checkout') && !dataObject.pathname.includes(route?.params?.cartUrl)) {
          setWebUrl(dataObject.pathname);
          setButtonText(I18n.t('showCart'));
          webViewRef?.current?.injectJavaScript(
            `window.ReactNativeWebView.postMessage(JSON.stringify({pathname :window.location.href}));`,
          );
        }
      }
      else if (dataObject.content) {
        setIsLoading(false);
        let pages = 1;
        if (dataObject.content.trim() === '') {
          return;
        }

        const words = dataObject.content.split(/\nsimma/g).filter(text => text.trim() != '');
        try {
          let rawWords = words.filter(word => !translatedWordsList[word]);
          if (!rawWords || rawWords.length == 0) {
            webViewRef?.current?.injectJavaScript(`
          ${translateElement(JSON.stringify(translatedWordsList))}
          `);
            return;
          }
          if (parseInt(rawWords.join().length / 5000) > 0) {
            pages = parseInt(rawWords.join().length / 5000) + 1;
            const lastIndex = parseInt(rawWords.length / pages);
            rawWords = rawWords.slice(0, lastIndex)
          }
          const language = I18n.t('lang') == 'en' ? 'en' : 'ar';
          const translatedWords = await translate(rawWords, { from: 'tr', to: language });
          const translatedList = {};
          translatedWords.forEach((word, index) => {
            translatedList[rawWords[index]] = word;
          });

          const mergedTranslatedLists = { ...translatedList, ...translatedWordsList };
          setTranslatedWordsList(mergedTranslatedLists);
          const test = translateElement(JSON.stringify(mergedTranslatedLists));
          webViewRef?.current?.injectJavaScript(`
        ${test}
        `);
          if (pages > 1) {
            webViewRef?.current?.injectJavaScript(extractText);
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        setIsLoading(true);
        getCartInfo(JSON.parse(data))
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const getCartInfo = async cartInfo => {
    const appliedCouponCodeDiscount = order.discountOptions && order.discountOptions.find(discount => !discountCodesList.includes(discount.category));
    const data = {
      cart: cartInfo,
      merchantId: route.params.id,
      token: login?.userdata?.token?.accessToken,
      appliedDiscount: appliedCouponCodeDiscount
    };
    const iternetConnected = await checkConnected();
    if (iternetConnected) {
      const citiesAvailable = await checkKeyAvailability(citiesCacheKey);
      if (citiesAvailable) {
        setCitiesLoaded(true)
      } else {
        dispatch(getCitiesRequest(getCitiesSuccess, getCitiesFailure));
      }
      dispatch(getCartRequest(data, onloadSuccess, onloadFailed));
    } else {
      setIsLoading(false)
      Toast.show(I18n.t('network_error'), {
        position: Toast.position.CENTER,
        duration: 6000,
      });
      return;
    }
  };

  const getCitiesSuccess = (res, isCached = false) => {
    setCitiesLoaded(true);
    if (!isCached) {
      cacheData(citiesCacheKey, res)
    }
  }

  const getCitiesFailure = (err) => {
    setCitiesLoaded(false);
  }

  const onloadSuccess = (data) => {
    setIsLoading(false);
    if (data?.grandTotal < 1) {
      setWebUrl(route?.params?.url);
      setButtonText(I18n.t('showCart'));
      Toast.show(I18n.t('emptyCart'), {
        position: Toast.position.CENTER,
        containerStyle: { padding: 10 },
        duration: 6000,
      });
    } else {
      setOrderParams({
        ...route.params,
        order: data,
        activeStoreId: activeStore.id,
        extractionCode: route.params.extractionCode
      })
      setCartLoaded(true)
    }
  };

  const onloadFailed = ({ error, code }) => {
    setCartLoaded(false);
    setIsLoading(false);
    if (code == 503) {
      return navigation.navigate('MaintenanceMode');
    }
    Toast.show(I18n.t('backend_error'), {
      position: Toast.position.CENTER,
      duration: 6000,
    });
  };

  const showTheCart = () => {
    webViewRef?.current.injectJavaScript(`window.location = '${route?.params?.cartUrl}';`);
    webViewRef?.current?.injectJavaScript(
      `window.ReactNativeWebView.postMessage(JSON.stringify({pathname :${route?.params?.cartUrl}}));`,
    );
    setWebUrl(route?.params?.cartUrl)
    setIsLoading(true);
    setButtonText(I18n.t('checkout'));
    setTimeout(() => setIsLoading(false), 1500);
  };

  const handleCheckout = async () => {
    try {
      webViewRef?.current.injectJavaScript(`${route?.params?.extractionCode}`);
    } catch (error) {
      console.log('Code error is ==> ', error);
    }
    // setTimeout(async () => {
    //   await analytics().logBeginCheckout();
    //   const adjustEvent = new AdjustEvent("giy86j");
    //   Adjust.trackEvent(adjustEvent);
    // }, 0);
  };

  const handleBackButton = async () => {
    webViewRef?.current?.stopLoading();
    navigation.navigate('Stores');
    await AsyncStorage.setItem('isPersist', 'false');
  };

  return (
    <>
      <MyStatusBar backgroundColor={colors.gray} barStyle={'dark-content'} />
      <View style={styles.mainContainer}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.backButtonStyle}
            onPress={() => {
              handleBackButton()
            }}>
            <View>
              <Icon
                style={{
                  transform: [
                    { rotateY: I18nManager.isRTL ? '180deg' : '0deg' },
                  ],
                }}
                color={colors.mediumDarkGray}
                type={'fontisto'}
                name={'shopping-store'}
                size={WP('7')}
              />
              <Text style={styles.iconText}>{I18n.t('home_nav')}</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.webBackForward}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.backForwardButton}
              onPress={() => {
                webViewRef?.current.goBack()
              }}>
              <View>
                <Icon
                  color={colors.mediumDarkGray}
                  type={'feather'}
                  name={ 'chevron-left'}
                  size={22}
                />
                <Text style={styles.iconText}>{I18n.t('webBack')}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.backForwardButton, { width: WP('20'), }]}
              onPress={() => {
                webViewRef?.current.injectJavaScript("location.reload();");
              }}>
              <View>
                <Icon
                  color={colors.mediumDarkGray}
                  type={'feather'}
                  name={'rotate-ccw'}
                  size={20}
                />
                <Text style={styles.iconText}>{I18n.t('webReload')}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.backForwardButton}
              onPress={() => {
                webViewRef?.current.goForward();
              }}>
              <View>
                <Icon
                  color={colors.mediumDarkGray}
                  type={'feather'}
                  name={'chevron-right'}
                  size={22}
                />
                <Text style={styles.iconText}>{I18n.t('webNext')}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.backButtonStyle}
            onPress={() => {
              navigation.navigate('StoreInfo', { activeStore, order });
            }}>
            <View>
              <Icon
                style={{
                  transform: [
                    { rotateY: I18nManager.isRTL ? '180deg' : '0deg' },
                  ],
                }}
                color={colors.mediumDarkGray}
                type={'feather'}
                name={'info'}
                size={WP('7')}
              />
              <Text style={styles.iconText}>{I18n.t('about_store')}</Text>
            </View>
          </TouchableOpacity>
        </View>
        {
          webUrl !== '' && <WebView
            ref={webViewRef}
            source={{ uri: webUrl }}
            onNavigationStateChange={webViewState =>
              onNavStateChange(webViewState)
            }
            injectedJavaScriptBeforeContentLoaded={`if(${clearCookieFlag === 'true' && !isCookieRemoved}){window.localStorage.clear();window.sessionStorage.clear();}`}
            setSupportMultipleWindows={false}
            cacheEnabled={false}
            incognito={false}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            mixedContentMode={'compatibility'}
            injectJavaScript={onLoadInjectJavaScript(false)}
            startInLoadingState={true}
            onLoadEnd={() => onLoadWebUrl()}
            style={styles.webViewStyles}
            androidLayerType={'hardware'}
            // androidHardwareAccelerationDisabled={true}
            renderLoading={() => <Loading visible />}
            // onError={() => webViewRef.current.reload()}
            onMessage={event => {
              try {
                onHandleMessage(event);
              } catch (error) {
                console.log(error);
              }
            }}
          />
        }
        <View
          style={[Platform.select({
            android: styles.barStyle,
            ios: hasNotch ? styles.notchBarStyle : styles.barStyle,
          }), {position: 'absolute', bottom: hasNotch ? 20 : 0, left: 0, right: 0}]}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: WP('4'), }}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.bottomIconContainer}
              disabled={isLoading}
              onPress={() => {
                if (buttonText === I18n.t('showCart')) {
                  showTheCart();
                } else {
                  handleCheckout();
                }
              }}>
              {isLoading ? (
                <ActivityIndicator color={colors.b2} size="small" />
              ) : (
                <>
                  <View style={{ width: WP('20'), alignItems: 'center' }}>
                    <Image source={appImages.buttonIcon} style={[styles.checkoutImgStyle]} />
                  </View>
                  <Image source={appImages.line} />
                  <View style={{ width: WP('25'), alignItems: 'center', justifyContent: 'center' }}>
                    <Text numberOfLines={1} style={[styles.checkoutTxtStyle]}>{buttonText}</Text>
                  </View>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <CoachMarkModal hasNotch={hasNotch} />
    </>
  );
};

export default Shops;
