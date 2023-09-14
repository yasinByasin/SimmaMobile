import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Splash from '../screens/Splash';
import Shops from '../screens/Tabs/CartTab/Shops';
// import OrderItems from '../screens/Tabs/MenuTab/OrderItems'
import BottomTabs from './tabs/BottomTabs';
import Language from '../screens/Welcome/Language/Language';
import WelcomeSteps from '../screens/Welcome/WelcomeSteps';
// import Billing from '../screens/Tabs/CartTab/Billing';
// import StoreInfo from '../screens/Tabs/CartTab/StoreInfo';
// import PlaceOrder from '../screens/Tabs/CartTab/PlaceOrder';
// import WalletEligible from '../screens/Tabs/MenuTab/WalletEligible'
// import AuthStack from './stacks/AuthStack'

const AppStack = createNativeStackNavigator();

const MainAppNav = ({ route, flag }) => {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        screenOptions={{ headerShown: false, gestureEnabled: false, animation: 'none' }}>
        <AppStack.Screen name={'Splash'} component={Splash} flag={flag} />
        <AppStack.Screen name={'App'} component={BottomTabs} />
        <AppStack.Screen name="Language" component={Language} />
        <AppStack.Screen name="WelcomeSteps" component={WelcomeSteps} />
        <AppStack.Screen name="Shops" component={Shops} />
        {/* 
        <AppStack.Screen name="OrderItems" component={OrderItems} />
        <AppStack.Screen name="Billing" component={Billing} />
        <AppStack.Screen name="StoreInfo" component={StoreInfo} />
        <AppStack.Screen name="PlaceOrder" component={PlaceOrder} />
        <AppStack.Screen name="WalletEligible" component={WalletEligible} /> */}

        {/* <AppStack.Screen name={'Auth'} component={AuthStack} /> */}
      </AppStack.Navigator>
    </NavigationContainer>
  )
};

export default MainAppNav;
