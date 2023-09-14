import React from 'react';
import { View, Platform, StyleSheet, I18nManager, Text, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import DeviceInfo from 'react-native-device-info';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors, HP, WP, family, appIcons } from '../../utilities';
import I18n from '../../translations';

// Bottom Tabs Screens
import CartStack from '../stacks/CartStack';
// import AppMenuStack from '../stacks/AppMenuStack';
// import WalletStack from '../stacks/WalletStack';

const Tab = createBottomTabNavigator();

export default BottomTabs = ({ }) => {
  let hasNotch = DeviceInfo.hasNotch();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          android: styles.barStyle,
          ios: hasNotch ? styles.notchBarStyle : styles.barStyle,
        }),
      }}
      tabBarOptions={{
        keyboardHidesTabBar: true,
        labelPosition: 'below-icon',
        showLabel: false,
      }}
      initialRouteName={'Stores'}
    >
      <Tab.Screen
        component={CartStack}
        listeners={({ navigation }) => ({
          tabPress: e => {
            navigation.navigate('Stores');
          },
        })}
        name={'Cart'}
        options={{
          tabBarLabel: '.',
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.iconContainer : {}}>
              <Icon
                style={{
                  transform: [
                    { rotateY: I18nManager.isRTL ? '180deg' : '0deg' },
                  ],
                }}
                color={colors.mediumDarkGray}
                type={'fontisto'}
                name={'shopping-store'}
                size={HP('3')}
              />
              <Text style={styles.iconText}>{I18n.t('shop_nav')}</Text>
            </View>
          ),
        }}
      />
      {/* <Tab.Screen
        component={WalletStack}
        name={'WalletPage'}
        listeners={({ navigation }) => ({
          tabPress: e => {
            navigation.navigate('WalletPage', { screen: 'Wallet', params: { refresh: true } })
          },
        })}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.iconContainer : {}}>
              <Icon
                style={{
                  transform: [
                    { rotateY: I18nManager.isRTL ? '180deg' : '0deg' },

                  ],
                }}
                type={'fontisto'}
                name={'wallet'}
                color={colors.mediumDarkGray}
                size={HP('3')}
              />
              <Text style={styles.iconText}>{I18n.t('wallet_nav')}</Text>
            </View>
          ),
        }}
      /> */}
      {/* <Tab.Screen
        component={AppMenuStack}
        name={'AppMenu'}
        listeners={({ navigation }) => ({
          tabPress: e => {
            navigation.navigate('AppMenu', { screen: 'Menu' })
          },
        })}
        options={{
          tabBarLabel: '.',
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.iconContainer : {}}>
              <Icon
                type={'feather'}
                name={'user'}
                color={colors.mediumDarkGray}
                size={HP('3')}
              />
              <Text style={styles.iconText}>{I18n.t('profile_nav')}</Text>
            </View>
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  barStyle: {
    height: Platform.select({ android: 55, ios: 60 }),
    backgroundColor: colors.gray,
  },
  notchBarStyle: {
    backgroundColor: colors.gray
  },
  iconContainer: {
    borderBottomColor: colors.orange,
    borderBottomWidth: 2,
  },
  iconText: {
    color: colors.darkGray,
    fontSize: WP(2.5),
    textAlign: 'center',
    fontFamily: family.Poppins_Regular
  }
});
