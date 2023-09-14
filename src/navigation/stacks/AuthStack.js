// import * as React from 'react';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {useSelector} from 'react-redux';
// import Login from '../../screens/Auth/Login';
// import SignUp from '../../screens/Auth/SignUp';

// const Stack = createNativeStackNavigator();

// function AuthStack(props) {
//   const login = useSelector(state => state.login);
//   return (
//     <Stack.Navigator
//       initialRouteName="Login"
//       screenOptions={{headerShown: false, animation: 'none' }}>
//         { !login?.isMaintenanceMode && (
//           <>
//             <Stack.Screen options={{ animation: 'none' }} name="Login" component={Login} />
//             <Stack.Screen options={{ animation: 'none' }} name="SignUp" component={SignUp} />
//           </>
//         )}
//     </Stack.Navigator>
//   );
// }

// export default AuthStack;
