/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import Sidenav from './src/components/Sidenav';
import Login from './src/screens/Login';
import Account from './src/screens/Account';
import Registration from './src/screens/Registration';
import Web from './src/screens/api_profile/web';
import MerchantHome from './src/screens/MerchantHome';
import Merchant from './src/screens/Merchant';
import BankList from './src/screens/BankList';

export default function App(): JSX.Element {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Registration">
        <Stack.Screen options={{headerShown: false}} name="Merchant" component={Merchant} />
        <Stack.Screen options={{headerShown: false}} name="Sidenav" component={Sidenav} />
        <Stack.Screen options={{headerShown: false}} name="Account" component={Account} />
        <Stack.Screen options={{headerShown: false}} name="Login" component={Login} />
        <Stack.Screen options={{headerShown: false}} name="BankList" component={BankList} />
        <Stack.Screen options={{headerShown: false}} name="Registration" component={Registration} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
