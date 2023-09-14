import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Platform,
  FlatList,
  TextInput,
  ScrollView,
  I18nManager,
  ImageBackground,
  TouchableOpacity,
  BackHandler,
  RefreshControl,
  Image,
  Dimensions,
  PermissionsAndroid,
  Linking,
} from 'react-native';
import { Icon } from 'react-native-elements';
import DeviceInfo from 'react-native-device-info';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HP, colors, size, family, WP, appImages, appLottie } from '../../../../utilities';
import { checkKeyAvailability, cacheData } from '../../../../utilities/helper';
import { Header, InfoModal, Loading, SearchInput } from '../../../../components';
import I18n from '../../../../translations';
import styles from './styles';
import FastImage from 'react-native-fast-image';
// import analytics from '@react-native-firebase/analytics';
// import { Adjust, AdjustEvent } from 'react-native-adjust';
import { storesCacheKey, postNotificationKey } from '../../../../utilities/constants';
// import { check, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';
// redux work
import { useSelector, useDispatch } from 'react-redux';
import { getStoresRequest, getActiveStoreRequest, updateOrder, getAdsRequest } from '../../../../redux/actions';
import { checkConnected } from '../../../../utilities/helper';
import Toast from 'react-native-tiny-toast';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { VERSION_NUMBER } from '../../../../utilities/routes';
import { TrendingStores } from './TrendingStores'
import Lottie from 'lottie-react-native';

const Stores = ({ navigation, route, start }) => {
  const [publishedStores, setPublishedStores] = useState([]);
  const [comingStores, setComingStores] = useState([]);
  const [exitModal, setExitModal] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [advertisements, setAdvertisements] = useState([]);
  const [notificationsAllowed, setNotificationsAllowed] = useState(true);
  const isCarousel = React.useRef(null);
  let isDemoMode = false;
  let [isDemoModeFlag, setIsDemoModeFlag] = useState(false);

  const isFocused = useIsFocused();
  let hasNotch = DeviceInfo.hasNotch();
  // redux stuff
  const dispatch = useDispatch(null);
  const { loading } = useSelector(state => state.order);
  const login = useSelector(state => state.login);
  const SLIDER_WIDTH = Dimensions.get('window').width;
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
  const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 0.65);

  useEffect(() => {

    getData();

  }, []);

  const getData = async () => {
    try {
      const check_internet = await checkConnected();
      if (check_internet) {
        const demoModeFlagValue = await AsyncStorage.getItem('demoModeFlag');
        const demoModeFlag = (demoModeFlagValue == 'true');
        isDemoMode = demoModeFlag;
        setIsDemoModeFlag(demoModeFlag);
        if (!demoModeFlag) {
          dispatch(getAdsRequest(getAdsSuccess, getAdsFailure));
        }
        const storesAvailable = await checkKeyAvailability(storesCacheKey)
        if (storesAvailable) {
          getStoresSuccess(storesAvailable, true);
        } else {
          dispatch(getStoresRequest(demoModeFlag, getStoresSuccess, getStoresFailure));
        }
      } else {
        const storesAvailable = await checkKeyAvailability(storesCacheKey, true)
        if (storesAvailable) {
          getStoresSuccess(storesAvailable, true);
        }
        Toast.show(I18n.t('network_error'), {
          position: Toast.position.CENTER,
          duration: 6000,
        });
      }
    } catch (error) {
      Toast.show(I18n.t('backend_error'), {
        position: Toast.position.CENTER,
        duration: 6000,
      });
    }
  };

  const getAdsFailure = res => {
    console.log('Error getting Ads', res);
  };

  const getAdsSuccess = res => {
    console.log(res.results);

    const advertisementsData = I18nManager.isRTL ? res.results : res.results.reverse()
    setAdvertisements(advertisementsData)
  };
  //Get Faqs Handler
  const getStoresSuccess = (res, isCached = false) => {
    if (!isCached) {
      cacheData(storesCacheKey, res)
    }
    const allStores = res?.results || []
    allStores.sort((a, b) => b.rank - a.rank);
    if (isDemoMode) {
      setPublishedStores(allStores);
      setAdvertisements([])
      return;
    }
    let publishedStoresArr = allStores.filter(
      item => item?.status !== 'unpublished',
    );
    setPublishedStores(publishedStoresArr)
  };

  const getStoresFailure = async ({ error, code }) => {
    //to be removed 
    if (code == 503) {
      return navigation.navigate('MaintenanceMode');
    }
    Toast.show(I18n.t('backend_error'), {
      position: Toast.position.CENTER,
      duration: 6000,
    });
    console.log('Error getting faqs', error);
  };

  const replaceScreen = async item => {

    let val = await AsyncStorage.getItem('isPersist');
    navigation.navigate('Shops', {
      url: item?.url,
      id: item?.id,
      cartUrl: item?.cartUrl,
      extractionCode: item?.extractionCode,
      onLoadCompleteCode: item?.onLoadCompleteCode,
      status: val,
    });
    const storeName = item?.name?.en?.toLowerCase()?.replace(' ', '_') || 'storeName';
    setTimeout(async () => {
      dispatch(getActiveStoreRequest(item));
      //   await analytics().logScreenView({ screen_name: storeName });
      //   const adjustEvent = new AdjustEvent("mud6uh");
      //   adjustEvent.addPartnerParameter('store_name', storeName);
      //   Adjust.trackEvent(adjustEvent);
      dispatch(updateOrder({ couponCode: '' }));
    }, 0);

  };

  const AdBanner = ({ index, item }) => (
    <View style={{ margin: WP('1') }} >
      <TouchableOpacity activeOpacity={0.7}>
        <FastImage
          key={index}
          source={{
            uri: I18nManager.isRTL
              ? item?.arBannerAd?.originalUrl
              : item?.enBannerAd?.originalUrl,
            priority: FastImage.priority.high,
          }}
          style={styles.bgImgStyle}
        />
      </TouchableOpacity>
    </View>

  );

  const renderAllStores = ({ item, index }) => {
    return (
      <>
        < RenderStore index={index} item={item} />
      </>
    )
  };

  const RenderStore = ({ item, index }) => {
    const isClickable = item.status === 'published'
    return (
      <View
        style={{
          marginTop: HP('2'),
          marginRight: WP('3'),
        }}
      >
        <TouchableOpacity activeOpacity={0.7} onPress={() => (isClickable || isDemoModeFlag) && replaceScreen(item)}>
          <View style={styles.backgroundShadow}>
            <FastImage
              key={index}
              source={{
                uri: item?.image?.originalUrl,
                priority: FastImage.priority.high,
              }}
              style={[{ opacity: (isClickable || isDemoModeFlag) ? 1 : 0.2 }, styles.bgImgStyle1]}
            />
          </View>
          <Text numberOfLines={1} style={styles.storesTxtStyle}>{I18nManager.isRTL ? item?.name?.ar : item?.name?.en}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const backAction = () => {
    setExitModal(true);
    return true;
  };

  useEffect(() => {
    if (isFocused) {
      BackHandler.addEventListener('hardwareBackPress', backAction);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', backAction);
    }
  }, [isFocused]);

  const getPagination = () => {
    const advertisementsSize = advertisements?.length || 0
    const activeItem = I18nManager.isRTL ? advertisementsSize - (activeSlide + 1) : activeSlide
    return (
      <Pagination
        dotsLength={advertisementsSize}
        activeDotIndex={activeItem}
        containerStyle={styles.paginationStyle}
        dotStyle={{
          width: 24,
          height: 7,
          borderRadius: 5,
          marginHorizontal: -7,
          backgroundColor: colors.lightGray2
        }}
        inactiveDotStyle={{
          width: 10,
          height: 10,
          marginHorizontal: -10,
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  const renderStores = (storesDetails, title) => {
    const storesLength = storesDetails.length
    const storeStatus = title === 'comingSoon' ? 'comingSoon' : 'published'
    if (storesLength === 0) return <></>
    const viewAllParams = {
      isDemoModeFlag,
      category: title,
      storeStatus
    }
    return (
      <>
        <View style={styles.viewAllStyle}>
          <Text style={styles.titleTxtStyle}>{I18n.t(`${title}_stores`)}</Text>
          {
            storesLength > 8 && <TouchableOpacity activeOpacity={0.7} style={[styles.viewAllStyle, { height: HP('4') }]} onPress={() => navigation.navigate('AllStores', viewAllParams)}>
              <Text style={styles.viewAllText}>{I18n.t('viewAll')}</Text>
              <Icon
                style={{}}
                color={colors.mediumDarkGray}
                type={'feather'}
                name={I18nManager.isRTL ? 'chevron-left' : 'chevron-right'}
                size={WP('4')}
              />
            </TouchableOpacity>
          }
        </View>
        <FlatList
          scrollEnabled={false}
          data={storesDetails.slice(0, 8)}
          numColumns={4}
          renderItem={renderAllStores}
          contentContainerStyle={styles.flStyle}
          keyExtractor={(item, index) => (item + index).toString()}
        />
        <View style={{ marginTop: 10 }} />
      </>
    )
  }

  const handleOpenSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
    closePermissionButton()
  };

  // const checkApplicationPermission = async () => {
  //   const postNotification = await AsyncStorage.getItem(postNotificationKey)
  //   if (postNotification && postNotification === 'true') {
  //     setNotificationsAllowed(true)
  //     return
  //   }
  //   if (Platform.OS === 'android' && DeviceInfo?.getSystemVersion() >= 13) {
  //     check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS)
  //       .then((result) => {
  //         switch (result) {
  //           case RESULTS.UNAVAILABLE:
  //             setNotificationsAllowed(false)
  //             break;
  //           case RESULTS.BLOCKED:
  //             setNotificationsAllowed(false)
  //             break;
  //           case RESULTS.DENIED:
  //             setNotificationsAllowed(false)
  //             break;
  //         }
  //       })
  //       .catch((error) => {
  //         console.error({ error })
  //       });
  //   }
  // };

  const closePermissionButton = () => {
    AsyncStorage.setItem(postNotificationKey, 'true')
    setNotificationsAllowed(true)
  }

  const renderPermissionButton = () => {
    // checkApplicationPermission()
    if (!notificationsAllowed) {
      return (
        <View style={styles.permissionViewStyle} >
          <TouchableOpacity style={styles.permissionButtonStyle} activeOpacity={0.7} onPress={handleOpenSettings}>
            <View>
              <Lottie style={{ width: 30 }} source={appLottie.bell} autoPlay loop />
            </View>
            <Text style={styles.viewAllText}>{I18n.t('permissionRequestMsg')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.permissionButtonStyle, { width: 20, height: '100%' }]} activeOpacity={0.7} onPress={closePermissionButton}>
            <Icon
              color={colors.mediumDarkGray}
              type={'fontisto'}
              name={'close-a'}
              size={10}
            />
          </TouchableOpacity>
        </View>
      )
    }
    return <></>
  }

  return (
    <>
      <View
        style={{
          height: Platform.OS === 'ios' ? (hasNotch ? 44 : 20) : 0,
          backgroundColor: colors.white,
        }}
      />
      {/* <Loading visible={loading} /> */}
      <Header
        title={I18n.t('home_screen_title')}
        titleImg={appImages.buttonIcon}
        fonstSize={size.h4}
        fontFamily={family.Poppins_Bold}
        h3={I18n.t('edit_profile_heder_h3')}
        navigation={navigation}
        disabled={true}
        rightBtnBg={colors.b2}
        rightBtnWidth={WP('20')}
        h3fontFamily={family.Poppins_Bold}
        h3fonstSize={size.small}
      />
      <View style={styles.mainContainer}>
        {renderPermissionButton()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => {
                getData();
              }}
            />
          }>

          {advertisements.length !== 0 &&
            <View>
              <Carousel layout={'default'}
                ref={isCarousel}
                data={advertisements}
                renderItem={AdBanner}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={SLIDER_WIDTH}
                onSnapToItem={(index) => setActiveSlide(index)}
              />
              {getPagination()}
            </View>
          }
          <TrendingStores replaceScreen={replaceScreen} stores={publishedStores} />
          <View style={{ marginTop: 15 }}>
            {renderStores(publishedStores.filter(store => (store.status === 'published' || isDemoModeFlag) && store?.categorys?.includes('international')), 'international')}
            {renderStores(publishedStores.filter(store => (store.status === 'published' || isDemoModeFlag) && store?.categorys?.includes('influencer')), 'influencer')}
            {renderStores(publishedStores.filter(store => (store.status === 'published' || isDemoModeFlag) && store?.categorys?.includes('local')), 'local')}
            {renderStores(publishedStores.filter(store => (store.status === 'commingSoon')), 'comingSoon')}
          </View>
        </ScrollView>
      </View>

      {exitModal && (
        <InfoModal
          show={exitModal}
          title={I18n.t('exit_messages')}
          onPressYes={() => {
            setExitModal(false);
            BackHandler.exitApp();
          }}
          onPressNo={() => {
            setExitModal(false);
          }}
          onPressHide={() => {
            setExitModal(false);
          }}
          btntextYes={I18n.t('yes')}
          btntextNo={I18n.t('no')}
        />
      )}

    </>
  );
};

export default Stores;
