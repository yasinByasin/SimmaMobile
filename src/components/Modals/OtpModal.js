import React, { useState, useEffect } from 'react';
import I18n from '../../translations';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  I18nManager,
  Image
} from 'react-native';
// import OTPInputView from '@twotalltotems/react-native-otp-input';
// import { phoneRegExp, configCacheKey } from '../../utilities/constants';
// import Modal from 'react-native-modal';
import { colors, family, size, WP, phonePrefix, appIcons } from '../../utilities';
// import { createBiometricsKey, checkKeyAvailability, cacheData, checkConnected } from '../../utilities/helper';
// import { updateUserBiometricsKey, getConfigRequest } from '../../redux/actions';
// import auth from '@react-native-firebase/auth';
// import { useSelector, useDispatch } from 'react-redux';
// import Toast from 'react-native-tiny-toast';
// import { Loader } from '../Loaders/Loader';
// import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'
// import { Icon } from 'react-native-elements';
// import { Loading } from '../Loaders/Loading';

export const OtpModal = ({
  show,
  handleShowOtp,
  pinCount = 6,
  phoneNumber,
  setOrderOtp,
  orderOtp,
  callBack,
  navigation,
  isLoading,
  setIsLoading
}) => {
  // const [loading, setLoading] = useState(false)
  // const [bioLoading, setBioLoading] = useState(false)
  // const [bioError, setBioError] = useState(false)
  // const [code, setCode] = useState('')
  // const [confirm, setConfirm] = useState(null);
  // const [codeError, setCodeError] = useState('');
  // const [sendCodeError, setSendCodeError] = useState('');
  // const [resendCode, setResendCode] = useState(false);
  // const [verificationId, setVerificationId] = useState(null)
  // const [showBioModal, setShowBioModal] = useState(false)
  // const login = useSelector(state => state.login);
  // const [sensorAvailable, setSensorAvailable] = useState(null);
  // const [enableOtp, setEnableOtp] = useState(true);

  // const { isvalidUser } = login
  // const dispatch = useDispatch(null);
  // const rnBiometrics = new ReactNativeBiometrics()
  // const createUserSignature = async () => {
  //   const epochTimeSeconds = new Date().getTime().toString()
  //   const payload = epochTimeSeconds + '_createOrder'
  //   const signatureParams = {
  //     promptMessage: I18n.t('interBioAvailable'),
  //     payload: payload
  //   }
  //   const userSignature = {
  //     payload: payload,
  //     signature: ''
  //   }
  //   const { success, signature } = await rnBiometrics.createSignature(signatureParams)
  //   if (success) {
  //     userSignature.signature = signature
  //     setIsLoading(true)
  //     closeOtp()
  //     callBack(phoneNumber, { userSignature });
  //   } else {
  //     Toast.show(I18n.t('errorBioAvailable'), {
  //       position: Toast.position.CENTER,
  //       duration: 6000,
  //     });
  //   }
  // }

  // let timer = () => { };

  // const createBioKey = async () => {
  //   if (isLoading) return
  //   const isAvailable = await isBiometricsAvailable()
  //   if (isAvailable) {
  //     const biometricsKey = await createBiometricsKey(rnBiometrics)
  //     setBioLoading(true)
  //     dispatch(updateUserBiometricsKey({ biometricsKey }, updateBioKeySuccess, updateBioKeyFail))
  //   } else {
  //     setShowBioModal(true)
  //   }
  // }

  // const updateBioKeySuccess = (response) => {
  //   setBioLoading(false)
  //   createUserSignature()
  // }

  // const updateBioKeyFail = (error, logout = false) => {
  //   setBioLoading(false)
  //   if (logout) {
  //     closeOtp()
  //     navigation.navigate('Cart', { screen: 'Login', params: { forceLogout: true } });
  //   } else {
  //     setBioError(true)
  //     setTimeout(() => {
  //       setBioError(false)
  //     }, 3000);
  //   }
  // }

  // const isBiometricsAvailable = async () => {
  //   const { available, biometryType } = await rnBiometrics.isSensorAvailable()
  //   if (available) setSensorAvailable(biometryType)
  //   return available
  // }
  // const checkConfig = async () => {
  //   const check_internet = await checkConnected();
  //   if (check_internet) {
  //     setLoading(true)
  //     const configAvailable = await checkKeyAvailability(configCacheKey)
  //     if (configAvailable) {
  //       getConfigSuccess(configAvailable, true);
  //     } else {
  //       dispatch(getConfigRequest(getConfigSuccess, () => { setLoading(false) }))
  //     }
  //   } else {
  //     Toast.show(I18n.t('network_error'), {
  //       position: Toast.position.CENTER,
  //       duration: 6000,
  //     });
  //     const storesAvailable = await checkKeyAvailability(configCacheKey, true)
  //     if (storesAvailable) {
  //       getConfigSuccess(storesAvailable, true);
  //     }
  //   }
  // }

  // const getConfigSuccess = (res, isCached = false) => {
  //   if (!isCached) {
  //     cacheData(configCacheKey, res)
  //   }
  //   const isOtpEnable = res?.enableOtpLogin
  //   if (isOtpEnable) {
  //     sendOTP()
  //   }
  //   setEnableOtp(isOtpEnable)
  //   setLoading(false)
  // }

  // useEffect(() => {
  //   if (show) {
  //     checkConfig()
  //     isBiometricsAvailable()
  //     if (orderOtp && orderOtp?.confirm) {
  //       setConfirm(orderOtp?.confirm)
  //     }
  //   }
  //   setCode('')
  //   setCodeError('')
  //   setSendCodeError('')
  //   return () => clearTimeout(timer);
  // }, [show]);


  // const startTimer = () => {
  //   timer = setTimeout(() => {
  //     setResendCode(true);
  //   }, 60000);
  // };

  // const onCodeFilled = () => { }

  // const verifyCode = async () => {
  //   if (confirm === null) {
  //     setCodeError(I18n.t('signup_invalid_code'))
  //     return
  //   }
  //   setCodeError('')
  //   setLoading(true);
  //   try {
  //     let num = '';
  //     if (phoneRegExp.test(code)) {
  //       num = code;
  //     } else {
  //       let engNum = code
  //         ?.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))
  //         ?.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));
  //       num = engNum;
  //     }
  //     try {
  //       let res = await confirm.confirm(num);
  //       if (res) {
  //         onAuthStateChange(true);
  //       } else {
  //         setLoading(false);
  //         Toast.show(I18n.t('network_error'), {
  //           position: Toast.position.CENTER,
  //           duration: 6000,
  //         });
  //       }
  //     } catch (error) {
  //       if (error.code === 'auth/invalid-verification-code') {
  //         Toast.show('auth/invalid-verification-code', {
  //           position: Toast.position.CENTER,
  //           duration: 6000,
  //         });
  //         setCodeError(I18n.t('signup_invalid_code'));
  //         setLoading(false);
  //       } else if (error?.code === 'auth/session-expired') {
  //         if (verificationId) {
  //           setLoading(false);
  //           setVerificationId(null);
  //           const credential = auth.PhoneAuthProvider.credential(verificationId, code);
  //           const { user } = await auth().signInWithCredential(credential);
  //           user.getIdToken().then(async function (idToken) {
  //             setIsLoading(true)
  //             callBack(phoneNumber, { idToken });
  //           });
  //         } else {
  //           autoVerfied();
  //         }

  //       } else {
  //         setLoading(false);
  //         Toast.show(error.code, {
  //           position: Toast.position.CENTER,
  //           duration: 6000,
  //         });
  //       }
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //     setCodeError(I18n.t('backend_error'));
  //     Toast.show(error.message, {
  //       position: Toast.position.CENTER,
  //       duration: 6000,
  //     });
  //   }

  // };
  // const autoVerfied = () => {
  //   auth()
  //     .verifyPhoneNumber(isvalidUser?.phone)
  //     .on(
  //       'state_changed',
  //       phoneAuthSnapshot => {
  //         switch (phoneAuthSnapshot.state) {
  //           case auth.PhoneAuthState.CODE_SENT: // or 'error'
  //             setVerificationId(phoneAuthSnapshot.verificationId)
  //             setLoading(false);
  //             break;
  //           case auth.PhoneAuthState.ERROR: // or 'error'
  //             setLoading(false);
  //             Toast.show(I18n.t('backend_error'), {
  //               position: Toast.position.CENTER,
  //               duration: 6000,
  //             });
  //             break;
  //           case auth.PhoneAuthState.AUTO_VERIFIED: // or 'verified'
  //             onAuthStateChange();
  //             break;
  //           case auth.PhoneAuthState.AUTO_VERIFY_TIMEOUT: // or 'timeout' 
  //             Toast.show(I18n.t('sign_up_timeout'), {
  //               position: Toast.position.CENTER,
  //               duration: 6000,
  //             });
  //             setLoading(false);
  //             break;
  //           default:
  //             setLoading(false);
  //         }
  //       },
  //       error => {
  //         setLoading(false);
  //         Toast.show(I18n.t('backend_error'), {
  //           position: Toast.position.CENTER,
  //           duration: 6000,
  //         });
  //       },
  //     );
  // };
  // const onAuthStateChange = (onclick = false) => {
  //   try {
  //     const unsubscribeAuth = auth().onAuthStateChanged(function (user) {
  //       if (user) {
  //         user.getIdToken().then(async function (idToken) {
  //           unsubscribeAuth();
  //           setIsLoading(true)
  //           callBack(phoneNumber, { idToken });
  //         });
  //       } else {
  //         setCodeError('error');
  //         setLoading(false);
  //       }
  //     });
  //   } catch (error) {
  //     Toast.show(I18n.t('backend_error'), {
  //       position: Toast.position.CENTER,
  //       duration: 6000,
  //     });
  //     setLoading(false);
  //   }
  // };

  // const sendOTP = async () => {
  //   if(!enableOtp) return;
  //   try {
  //     setResendCode(false);
  //     let currentTime = new Date().getTime()
  //     if (orderOtp && (currentTime - orderOtp.otpTime <= 60000)) {
  //       setLoading(false)
  //       return
  //     }
  //     setLoading(false)
  //     const confirmation = await auth().signInWithPhoneNumber(isvalidUser?.phone);
  //     currentTime = new Date().getTime()
  //     startTimer();
  //     if (confirmation) {
  //       setOrderOtp(currentTime, confirmation);
  //       setConfirm(confirmation)
  //     } else {
  //       setSendCodeError(I18n.t('backend_error'))
  //     }
  //   } catch (error) {
  //     if (error.code === ' auth/invalid-phone-number') {
  //       setCodeError(I18n.t('invalid_phone_number'))
  //     } else {
  //       Toast.show(I18n.t('network_error'), {
  //         position: Toast.position.CENTER,
  //         duration: 6000,
  //       });
  //     }
  //   }
  // }

  // const closeOtp = () => {
  //   setCode('');
  //   setCodeError('');
  //   setSendCodeError('');
  //   handleShowOtp(false);
  //   setLoading(true);
  //   setBioLoading(false);
  //   setBioError(false);
  // }

  // const renderModalContent = () => {
  //   if (loading) {
  //     return (<View style={styles.modalContainer}>
  //       <Loader loader_color={colors.black} loader_size={35} />
  //     </View>)
  //   }
  //   if (showBioModal) {
  //     return (
  //       <View style={styles.modalContainer}>
  //         <Text style={styles.textTitle}>{I18n.t('biometricsAvailable')}</Text>
  //         <View style={[styles.rowStyle, { marginVertical: 20 }]}>
  //           <View style={{ alignItems: 'center' }}>
  //             <View style={[styles.bioBlock, styles.shadow]} >
  //               <Image
  //                 source={appIcons.faceId}
  //                 style={[{ backgroundColor: colors.white, resizeMode: 'contain', width: '100%', }]}
  //               />
  //             </View>
  //             <Text style={styles.bioName}>{I18n.t('faceRecognition')}</Text>
  //           </View>
  //           <View style={{ alignItems: 'center' }}>
  //             <View style={[styles.bioBlock, styles.shadow]} >
  //               <Image
  //                 source={appIcons.fingerPrint}
  //                 style={[{ backgroundColor: colors.white, resizeMode: 'contain', width: '100%', }]}
  //               />
  //             </View>
  //             <Text style={styles.bioName}>{I18n.t('fingerprint')}</Text>
  //           </View>
  //         </View>
  //         <View style={styles.buttonContainer}>
  //           <TouchableOpacity onPress={() => setShowBioModal(false)} style={styles.closeButton}>
  //             <Text style={styles.btnText}>{I18n.t('close')}</Text>
  //           </TouchableOpacity>
  //         </View>

  //       </View>
  //     )
  //   }
  //   if (sendCodeError != '') {
  //     return (<View style={styles.modalContainer}>
  //       <Text style={styles.errorStyle}>
  //         {sendCodeError}
  //       </Text>
  //     </View>)
  //   }

  //   return (
  //     <View style={styles.modalContainer}>
  //       <TouchableOpacity onPress={() => closeOtp()} style={[styles.btnContainer, { width: 40, height: 40, alignSelf: 'flex-end', backgroundColor: colors.white, marginRight: 5 }]}>
  //         <Text style={styles.btnText}>X</Text>
  //       </TouchableOpacity>
  //       <Text style={styles.textStyle}>{I18n.t('smsCode')}</Text>
  //       <View style={styles.rowStyle}>
  //         <Text style={styles.contentStyle}>{I18n.t('thisNumber')}:</Text>
  //         <Text style={[styles.contentStyle, { textDecorationLine: 'underline' }]}>{isvalidUser?.phone}</Text>
  //       </View>
  //       <View style={styles.inputContainer}>
  //         <OTPInputView
  //           autoFocusOnLoad={false}
  //           pinCount={pinCount}
  //           codeInputFieldStyle={styles.inputStyle}
  //           onCodeFilled={onCodeFilled}
  //           code={code}
  //           onCodeChanged={setCode}
  //         />
  //       </View>
  //       {codeError !== '' && <Text style={styles.errorStyle}>{codeError}</Text>}
  //       <View style={styles.buttonContainer}>
  //         <TouchableOpacity onPress={() => verifyCode()} style={styles.btnContainer}>
  //           <Text style={styles.btnText}>{I18n.t('simma_payment_ok_title')}</Text>
  //         </TouchableOpacity>
  //       </View>
  //       <TouchableOpacity disabled={!resendCode} onPress={() => resendCode && sendOTP()} style={styles.btnResend}>
  //         <Text style={[styles.btnResendText, { color: resendCode ? colors.mediumDarkGray : colors.midLightGray }]}>{I18n.t('simma_payment_code_resend')}</Text>
  //       </TouchableOpacity>
  //       <TouchableOpacity disabled={bioLoading || bioError || isLoading} onPress={() => createBioKey()} style={styles.btnResend}>
  //         {
  //           bioLoading || isLoading
  //             ? <Loader loader_color={colors.black} />
  //             : bioError
  //               ? <Text style={[styles.btnResendText, { color: colors.pink }]}>{I18n.t('backend_error')}</Text>
  //               : <Text style={styles.btnResendText}>{I18n.t('biometricsConfirmation')}</Text>

  //         }
  //       </TouchableOpacity>
  //     </View>
  //   )

  // }

  // const renderModalContentOtpNotEnabled = () => {
  //   return (
  //     <View style={[styles.modalContainer, { height: 250 }]}>
  //       <TouchableOpacity onPress={() => closeOtp()} style={[styles.closeButtonContainer, { width: 40, height: 40, alignSelf: 'flex-end', backgroundColor: colors.white, marginRight: 5 }]}>
  //         <Text style={styles.btnText}>X</Text>
  //       </TouchableOpacity>
  //       <Text style={styles.textStyle}>{I18n.t('bioCodeMsg')}</Text>
  //       <View style={styles.buttonContainer}>
  //         <TouchableOpacity disabled={bioLoading || bioError || isLoading} onPress={() => createBioKey()} style={styles.btnContainer}>
  //           <Text style={styles.btnText}>{I18n.t('bioPopUpButton')}</Text>
  //         </TouchableOpacity>
  //       </View>
  //     </View>
  //   )
  // }
  return (
    <Modal
      isVisible={show}
      avoidKeyboard={true}>
        <Text>Hiiiiii</Text>
      {/* {enableOtp && renderModalContent()}
      {!enableOtp && renderModalContentOtpNotEnabled()} */}
    </Modal>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   modalContainer: {
//     backgroundColor: colors.white,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 12,
//     height: 400,
//     overflow: 'hidden',
//   },
//   textStyle: {
//     paddingTop: 5,
//     fontFamily: family.Poppins_Bold,
//     fontSize: size.h4,
//     color: colors.mediumDarkGray,
//     lineHeight: 38,
//     width: 250,
//     textAlign: 'center'
//   },
//   buttonContainer: {
//     width: '100%',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'row',
//     marginTop: 5,
//   },
//   btnContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: colors.trasn_g13,
//     height: 33,
//     width: 130,
//     borderRadius: 5,
//     backgroundColor: colors.orange
//   },
//   btnResend: {
//     padding: 10,
//     height: 45
//   },
//   btnText: {
//     color: colors.mediumDarkGray,
//     fontFamily: family.Poppins_Medium,
//     fontSize: size.normal,
//   },
//   btnResendText: {
//     color: colors.mediumDarkGray,
//     fontFamily: family.Poppins_Regular,
//     fontSize: size.xxsmall,
//     textDecorationLine: 'underline'
//   },
//   contentStyle: {
//     marginTop: 5,
//     color: colors.mediumDarkGray,
//     fontFamily: family.Poppins_Regular,
//     fontSize: size.normal,
//     lineHeight: 28,
//   },
//   rowStyle: {
//     flexDirection: 'row'
//   },
//   inputStyle: {
//     height: 50,
//     width: 50,
//     fontSize: size.small,
//     color: colors.mediumDarkGray,
//     borderRadius: 5,
//     fontWeight: '600',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 4.65,
//     elevation: 2,
//     backgroundColor: colors.white
//   },
//   shadow: {
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 4.65,
//     elevation: 2,
//     backgroundColor: colors.white
//   },
//   inputContainer: {
//     height: 44,
//     width: WP('85'),
//     marginVertical: 20
//   },
//   errorStyle: {
//     color: colors.pink,
//     fontFamily: family.Poppins_Regular
//   },
//   textTitle: {
//     padding: 5,
//     fontFamily: family.Poppins_Medium,
//     fontSize: size.large,
//     color: colors.mediumDarkGray,
//     lineHeight: I18nManager.isRTL ? 30 : 20,
//     textAlign: 'center'
//   },
//   bioBlock: {
//     width: 100,
//     height: 100,
//     borderRadius: 5,
//     justifyContent: 'center',
//     margin: 5,
//     marginTop: 10,
//   },
//   closeButton: {
//     marginTop: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: colors.trasn_g13,
//     height: 50,
//     width: '90%',
//     borderRadius: 5,
//     backgroundColor: colors.orange
//   },
//   bioName: {
//     fontFamily: family.Poppins_Regular,
//     textAlign: 'center',
//     color: colors.mediumDarkGray
//   },
//   closeButtonContainer: {
//     alignItems: 'center',
//     position: 'absolute',
//     top: 10,
//   },
// });
