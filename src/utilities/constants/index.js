import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dimensions} from 'react-native';

export const userNameRegEx = new RegExp(/@([\w\d.\-_]+)?/g);

export const Constants = {
  windowWidth: Dimensions.get('window').width,
  windowHeight: Dimensions.get('window').height,
};

export let authHeader = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

export let header = async () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${await GetToken()}`,
});

export let GetToken = async () => {
  const token = await AsyncStorage.getItem('usertoken');
  console.log(token);
  return token;
};

export let image_options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export const phoneRegExp = /^[0-9]+$/;
export const phoneArRegExp = /^[۰-۹]+$/;
export const character_format = /[ `!@#$%٪^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
export const voucher_code_format =/^[A-Za-z0-9-]*$/;
export const phonePrefix = '+964';
export const pkphonePrefix = '+964';
export const translateElement = ( translatedWords ) => `

  window.translatedWords = ${translatedWords};
  window.trackDomChange = window.trackDomChange || 0;
  window.trackDomInsertedEvent = window.trackDomInsertedEvent || false;
  if (typeof scanHtml === 'undefined') {
    const scanHtml = ( element = document.querySelector('body')) => {
      let children = [];
      for( const child of element.children ) {
        if( child.tagName !== 'BR'){
          children.push( child );
        }
    };
      if( children && children.length == 0 ){
        console.log(element);
          if(!element.getAttribute('data-translation') && element.innerText && element.innerText.trim() != '' && window.translatedWords[element.innerText.toLowerCase().trim()]){
              element.innerText = window.translatedWords[element.innerText.toLowerCase().trim()];
              element.setAttribute('data-translation', true);
          }
          
      }else{
        for( const child of element.children ) {
            if( child.tagName !== 'SCRIPT' && child.tagName !== 'STYLE' && child.tagName !== 'IFRAME'){
                scanHtml( child );
            }
        };
      }
  }
  scanHtml();
  if( !window.trackDomInsertedEvent){
    window.trackDomInsertedEvent = true;
    document.addEventListener("DOMNodeInserted", function(e) {
      if(e.target.tagName !== undefined){
        clearTimeout(trackDomChange);
        trackDomChange = setTimeout(function(){
          ${extractText}   
        }, 200);
      }
  }, true);
  }
  
}else{
  scanHtml();
}
`;

export const extractText = `
if (typeof extractPlainText === 'undefined') {
  const extractPlainText = ( element ) => {
    const children = element.children;
    let text = ''; 
    if( children && children.length == 0 ){
        if(!element.getAttribute('data-translation') && element.innerText && !element.innerText.includes(' TL') && element.innerText.trim() != '' ){
            return element.innerText.toLowerCase().trim();
        }
        return '';
        
    }else{
      for( const child of element.children ) {
          if( child.tagName !== 'SCRIPT' && child.tagName !== 'STYLE' && child.tagName !== 'IFRAME'){
            const value = extractPlainText( child );
            if( value && value.trim() != ''){
              text += value.trim()+'\\nsimma';
            }
          }
      };
    }
    return text;
  }
  const extractedText = extractPlainText( document.querySelector('body') );
  if( extractedText.trim() != '' ){
    window.ReactNativeWebView.postMessage(JSON.stringify({
      'content': extractedText
    }));
  }

}else{
  const extractedText = extractPlainText( document.querySelector('body') );
  if( extractedText.trim() != '' ){
    window.ReactNativeWebView.postMessage(JSON.stringify({
      'content': extractedText
    }));
  }

}
`;

export const trackPageRoute = appUrl => `
window.trackUrlChange = window.trackUrlChange || 0;
if( !window.trackUrlChangeEvent){
  window.trackUrlChangeEvent = true;
  document.addEventListener("DOMNodeInserted", function(e) {
    if(e.target.tagName !== undefined){
      clearTimeout(window.trackUrlChange);
      window.trackUrlChange = setTimeout(function(){
        if( '${appUrl}' != window.location.href){
          window.ReactNativeWebView.postMessage(JSON.stringify({pathname :window.location.href}));
        }
      }, 500);

    }
  }, true);
}
`;

export const sendPageRoute = `
window.ReactNativeWebView.postMessage(JSON.stringify({pathname :window.location.href}));
`;

export const cashedElementsTTL = {
  STORES: 1,
  CITIES: 1,
  CONFIG: 1,
}

export const storesCacheKey = 'STORES'
export const citiesCacheKey = 'CITIES'
export const configCacheKey = 'CONFIG'
export const otpSentAtKey = 'OTP_SENT_AT'
export const userBlockedAtKey = 'USER_BLOCKED'
export const postNotificationKey = 'POST_NOTIFICATIONS'
export const coachMarkModalKey = 'COACH_MARK_MODAL'
