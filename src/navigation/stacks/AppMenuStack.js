// import * as React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { useSelector } from 'react-redux';
// import AppMenu from '../../screens/Tabs/MenuTab/AppMenu';
// import Login from '../../screens/Auth/Login';
// import SignUp from '../../screens/Auth/SignUp';
// import Profile from '../../screens/Tabs/MenuTab/Profile';
// // import Wallet from '../../screens/Tabs/WalletTab/Wallet';
// import Orders from '../../screens/Tabs/MenuTab/Orders';
// import ContactUs from '../../screens/Tabs/MenuTab/ContactUs';
// import Faq from '../../screens/Tabs/MenuTab/Faq';
// import OrderItems from '../../screens/Tabs/MenuTab/OrderItems';
// import WalletEligible from '../../screens/Tabs/MenuTab/WalletEligible';
// import ChargeBalance from '../../screens/Tabs/WalletTab/ChargeBalance';
// import MaintenanceMode from '../../screens/MaintenanceMode';

// const Stack = createNativeStackNavigator();

// function MenuStack(props) {
//   const login = useSelector(state => state.login);
//   const getRoutes = () => {
//     if (login?.isMaintenanceMode) {
//       return <Stack.Screen name="MaintenanceMode" component={MaintenanceMode} />
//     }

//     return <>
//       <Stack.Screen name="Menu" component={AppMenu} />
//       {
//         login?.userdata && <>
//           <Stack.Screen name="Profile" component={Profile} />
//           <Stack.Screen name="Orders" component={Orders} />
//           <Stack.Screen name="OrderItems" component={OrderItems} />
//           <Stack.Screen name="WalletEligible" component={WalletEligible} />
//           <Stack.Screen name="ChargeBalance" component={ChargeBalance} />
//           <Stack.Screen name="ContactUs" component={ContactUs} />
//           <Stack.Screen name="Faq" component={Faq} />
//         </>
//       }
//       {
//         !login?.userdata && <>
//           <Stack.Screen name="Login" component={Login} initialParams={{ name: 'Menu' }} />
//           <Stack.Screen name="SignUp" component={SignUp} initialParams={{ name: 'Menu' }} />
//         </>
//       }
//     </>
//     if (login?.userdata) {
//       return (<>
//         <Stack.Screen name="Menu" component={AppMenu} />
//         <Stack.Screen name="Profile" component={Profile} />
//         {/* <Stack.Screen name="Orders" component={Orders} />
//         <Stack.Screen name="ContactUs" component={ContactUs} />
//         <Stack.Screen name="Faq" component={Faq} />
//         <Stack.Screen name="ChargeBalance" component={ChargeBalance} />
//         <Stack.Screen name="Wallet" component={Wallet} /> */}
//       </>)
//     } else {
//       return (<>
//         {/* <Stack.Screen name="Menu" component={AppMenu} />
//         <Stack.Screen name="Wallet" component={Wallet} /> */}
//         <Stack.Screen name="Login" component={Login} initialParams={{ name: 'Menu' }} />
//         <Stack.Screen name="SignUp" component={SignUp} initialParams={{ name: 'Menu' }} />
//       </>)
//     }
//   }

//   return (
//     <Stack.Navigator
//       initialRouteName="Menu"
//       screenOptions={{ headerShown: false, animation: 'none' }}>
//       {getRoutes()}
//     </Stack.Navigator>
//   );
// }

// export default MenuStack;
