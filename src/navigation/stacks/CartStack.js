import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Stores from '../../screens/Tabs/CartTab/Stores';
// import Login from '../../screens/Auth/Login';
// import SignUp from '../../screens/Auth/SignUp';
// import MaintenanceMode from '../../screens/MaintenanceMode';
// import AllStores from '../../screens/Tabs/CartTab/AllStores';

const Stack = createNativeStackNavigator();
import {useSelector} from 'react-redux';

function HomeStack(props) {
  const login = useSelector(state => state.login);
  return (
    <Stack.Navigator
      initialRouteName="Stores"
      screenOptions={{headerShown: false, animation: 'none' }}>
        <>
          <Stack.Screen name="Stores" component={Stores} />
          {/* <Stack.Screen name="Login" component={Login} initialParams={{ name: 'Stores' }} /> */}
          {/* <Stack.Screen name="SignUp" component={SignUp} initialParams={{ name: 'Stores' }} /> */}
          {/* <Stack.Screen name="MaintenanceMode" component={MaintenanceMode} /> */}
          {/* <Stack.Screen name="AllStores" component={AllStores} /> */}
          {/* <Stack.Screen name="Orders" component={Orders} /> */}
          {/* <Stack.Screen name="OrderItems" component={OrderItems} /> */}

        </>
    </Stack.Navigator>
  );
}

export default HomeStack;
