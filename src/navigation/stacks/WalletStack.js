// import * as React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import Wallet from '../../screens/Tabs/WalletTab/Wallet';
// import AllTransactions from '../../screens/Tabs/WalletTab/AllTransactions';
// import ChargeBalance from '../../screens/Tabs/WalletTab/ChargeBalance';
// import Login from '../../screens/Auth/Login';
// import SignUp from '../../screens/Auth/SignUp';
// import { useSelector } from 'react-redux';
// import MaintenanceMode from '../../screens/MaintenanceMode';

// const Stack = createNativeStackNavigator();

// function WalletStack(props) {
//   const login = useSelector(state => state.login);
//   const profile = useSelector(state => state.profile);
//   const getRoutes = () => {
//     if (login?.isMaintenanceMode) {
//       return <Stack.Screen name="MaintenanceMode" component={MaintenanceMode} />
//     }
//     const walletRoute = <Stack.Screen name="Wallet" component={Wallet} />
//     if (login?.userdata) {
//       return (<>
//         {walletRoute}
//         <Stack.Screen name="AllTransactions" component={AllTransactions} />
//         <Stack.Screen name="ChargeBalance" component={ChargeBalance} />
//       </>)
//     } else {
//       return (<>
//         {walletRoute}
//         <Stack.Screen name="Login" component={Login} initialParams={{ name: 'Wallet' }} />
//         <Stack.Screen name="SignUp" component={SignUp} initialParams={{ name: 'Wallet' }} />
//       </>)
//     }
//   }
//   return (
//     <Stack.Navigator
//       initialRouteName="Wallet"
//       screenOptions={{ headerShown: false, animation: 'none' }}>
//       {getRoutes()}
//     </Stack.Navigator>
//   );
// }

// export default WalletStack;
