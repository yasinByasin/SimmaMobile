import Toast from 'react-native-tiny-toast';
import * as yup from 'yup';
import I18n from '../../translations';
import {character_format, phoneRegExp} from '../constants';

const PHONE_NUMBER_COUNT = 10;

export const signupFormFields = {
  phone: '',
  firstName: '',
  lastName: '',
  email: '',
  code: '',
};
export const loginFormFields = {
  phone: '',
};
export const contactUsFields = {
  message: '',
  category: '',
};
//Edit Form
export const editFormFields = {
  phone: '',
  firstName: '',
  lastName: '',
  email: '',
  city: '',
  address: '',
  language: '',
};

export const editOrderFormFields = {
  paymentMethod: '',
  city: '',
  address: '',
};

//Login Schema

yup.addMethod(yup.string, 'phoneLength', function (errorMessage) {
  return this.test(`phone`, errorMessage, function (value) {
    const {path, createError} = this;

    if(value){
      let num = '';
      if (phoneRegExp.test(value)) {
        num = value;
      } else {
        let engNum = value
          .replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))
          .replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));
        num = engNum;
      }
      return (
        (num?.length === PHONE_NUMBER_COUNT && num.startsWith('7')) ||
        createError({
          path,
          message: errorMessage,
        })
      );
    }
  });
});

yup.addMethod(yup.string, 'phoneNumber', function (errorMessage) {
  return this.test(`phone`, errorMessage, function (value) {
    if(value){   
      const {path, createError} = this;
      if (character_format.test(value)) {
        return createError({
          path,
          message: errorMessage,
        });
      } else {
        return value;
      }
    }
    return '';
  });
});

yup.addMethod(yup.string, 'convertCodeToEnglish', function (errorMessage) {
  return this.test(`phone`, errorMessage, function (value) {
    if(value){
      if (phoneRegExp.test(value)) {
        return value;
      } else {
        let engCode = value
          .replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))
          .replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));
        return engCode;
      }
    }
    return ''
  });
});

export const loginSchema = yup.object().shape({
  phone: yup
    .string()
    .min(PHONE_NUMBER_COUNT, I18n.t('login_mobile_number_error_min'))
    .max(PHONE_NUMBER_COUNT, I18n.t('login_mobile_number_error_min'))
    .required(I18n.t('login_mobile_number_error_required'))
    .phoneLength(I18n.t('login_mobile_number_error_min'))
    .convertCodeToEnglish(I18n.t('login_mobile_number_error_min'))
    .phoneNumber(I18n.t('login_mobile_number_error_min')),
});

//SignUp Schema

export const signupSchema = yup.object().shape({
  phone: yup
    .string()
    .matches(phoneRegExp, I18n.t('login_mobile_number_error_phone'))
    .min(PHONE_NUMBER_COUNT, I18n.t('login_mobile_number_error_min'))
    .max(PHONE_NUMBER_COUNT, I18n.t('login_mobile_number_error_min'))
    .optional(),
  firstName: yup.string().required(I18n.t('signup_first_name_error_required')),
  lastName: yup.string().required(I18n.t('signup_last_name_error_required')),
  email: yup
    .string()
    .trim()
    .email(I18n.t('signup_email_error_format'))
    .optional(I18n.t('signup_email_error_required')),
  code: yup
    .string()
    .convertCodeToEnglish(I18n.t('login_mobile_number_error_phone'))
    .min(6, I18n.t('signup_code_error_min'))
    .max(6, I18n.t('signup_code_error_min'))
    .required(I18n.t('signup_code_error_required')),
});

//Login Schema
export const verifyCodeSchema = yup.object().shape({
  code: yup
    .string().trim().required(I18n.t('signup_code_error_required'))
    .min(6, I18n.t('signup_code_error_min'))
    .max(6, I18n.t('signup_code_error_min'))
    .convertCodeToEnglish(I18n.t('login_mobile_number_error_phone')),
});


//Edit Order Schema
export const orderSchema = yup.object().shape({
  address: yup.string().trim().required(I18n.t('edit_profile_error_address')),
});

//Edit Schema
export const profileSchema = yup.object().shape({
  phone: yup
    .string()
    .matches(phoneRegExp, I18n.t('login_mobile_number_error_phone'))
    .min(PHONE_NUMBER_COUNT, I18n.t('login_mobile_number_error_min'))
    .max(PHONE_NUMBER_COUNT, I18n.t('login_mobile_number_error_min'))
    .optional(),
  firstName: yup.string().required(I18n.t('signup_first_name_error_required')),
  lastName: yup.string().required(I18n.t('signup_last_name_error_required')),
  email: yup
    .string()
    .trim()
    .email(I18n.t('signup_email_error_format'))
    .optional(I18n.t('signup_email_error_required')),
  address: yup.string().trim().required(I18n.t('edit_profile_error_address')),
});

//Contact Form Schema
export const contactusSchema = yup.object().shape({
  message: yup.string().trim().required(I18n.t('contact_us_detail_error')),
  category: yup.string().required(I18n.t('contact_us_answer_error')),
});

//Response Validator
export const responseValidator = (response, msg) => {
  let errorCode = response.substring(32, 36);
  if (errorCode == 401) {
    Toast.show(I18n.t('session_expiry'), {
      position: Toast.position.CENTER,
      duration: 6000,
    });
    return {
      logout: true,
      code: errorCode
    };
  } else if (errorCode == 400) {
    Toast.show(I18n.t('backend_error'), {
      position: Toast.position.CENTER,
      duration: 6000,
    });
  } else if (errorCode == 404) {
    Toast.show(I18n.t('backend_error'), {
      position: Toast.position.CENTER,
      duration: 6000,
    });
  } else if (errorCode == 500) {
    Toast.show(I18n.t('backend_error'), {
      position: Toast.position.CENTER,
      duration: 6000,
    });
  } else if (errorCode == 503) {
    return {
      maintenanceMode: true,
      code: errorCode
    };
  }

  return {
    maintenanceMode: false,
    code: errorCode
  };
};
