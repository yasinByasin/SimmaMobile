import {I18nManager} from 'react-native';
import I18n from 'react-native-i18n';
import en from './en';
import ar from './ar';

I18n.fallbacks = false;

I18n.translations = {
  en,
  ar,
};

/*
    Only allow RTL if we have translations for RTL languages (ie. not fallbacks)
*/
I18nManager.allowRTL(I18n.locale in I18n.translations);

export default I18n;
