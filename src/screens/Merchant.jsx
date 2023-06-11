import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, Platform, StatusBar } from 'react-native';
import { Container, Header, Content, ListItem, Left, Body } from 'native-base';
// import { createDrawerNavigator } from 'react-navigation';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import MyIcon from '../components/MyIcon';
import HomeScreen from '../screens/MerchantHome';
import Cart from './Cart';
import Checkout from './Checkout';
import ProfileEdit from './Profile';
import COLORS from '../global/globalColors';
import AccountList from './AccountList';
import Transaction from './Transaction';
import PaintCart from './PaintCart';

const Drawer = createDrawerNavigator();

export default function Merchant(props) {
    return (
        <Drawer.Navigator
          initialRouteName={"Home"}
          drawerContent={(props) => <CustomDrawerContentComponent {...props} />}
          screenOptions={{
            headerShown: false
          }}
        >
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Viewcart" component={Cart} />
          <Drawer.Screen name="ViewPaintcart" component={PaintCart} />
          <Drawer.Screen name="Checkout" component={Checkout} />
          <Drawer.Screen
                name="Setting"
                component={ProfileEdit}
                initialParams={props.route.params}
                options={{
                    title: 'Setting',

                    drawerActiveTintColor: COLORS.blue,
                    drawerInactiveTintColor: COLORS.blue,
                    headerShown: false
                }}
            />
            <Drawer.Screen
                name="AccountList"
                component={AccountList}
                initialParams={props.route.params}
                options={{
                    title: 'AccountList',

                    drawerActiveTintColor: COLORS.blue,
                    drawerInactiveTintColor: COLORS.blue,
                    headerShown: false
                }}
            />
            <Drawer.Screen
                name="Transaction"
                component={Transaction}
                initialParams={props.route.params}
                options={{
                    title: 'Transaction',

                    drawerActiveTintColor: COLORS.blue,
                    drawerInactiveTintColor: COLORS.blue,
                    headerShown: false
                }}
            />
        </Drawer.Navigator>
    );
}

const CustomDrawerContentComponent = (props)=>{
  return (
    <Container>
        <View style={[{ height: 100, backgroundColor: '#2874f0', justifyContent: 'center' }, styles.androidHeader]} >
          <ListItem noBorder style={{ justifyContent: 'space-between' }} >
            <View style={{ flexDirection: 'row', alignItems: 'baseline' }} >
              <MyIcon name='md-home' style={[styles.drawerIcon, { color: '#fff' }]} />
              <Text style={{ fontSize: 14, color: '#fff', fontWeight: 'bold' }} >
                Home
              </Text>
            </View>
            <View style={{ width: 32, height: 32, }} >
                <Image 
                    style={{ width: null, height: null, flexGrow: 1, resizeMode: 'contain', }}
                    source={require('../assets/fk-logo_1.png')} />
            </View>
          </ListItem>
        </View>
        <FlatList
          style={{ borderTopWidth: 0.5, borderTopColor: '#f0f0f0'}}
          data={[
            { key: 'Electronics', icon: 'md-tablet-portrait' }, 
            { key: 'TVs & Appliances', icon: 'fontawesome|tv' }, 
            { key: 'Fashion', icon: 'md-shirt' }, 
            { key: 'Home and Furniture', icon: 'MaterialCommunityIcons|lamp' }, 
            { key: 'Sports, Books and More', icon: 'fontawesome|book' }, 
            { key: 'Recharges', icon: 'fontawesome|money' }, 
            { key: 'Travel - Flights', icon: 'Entypo|aircraft' }, 
          ]}
          renderItem={({item}) => (
            <ListItem noBorder style={{ alignItems: 'baseline' }} >
              <MyIcon  name={item.icon} style={styles.drawerIcon} />
              <Text style={{ color: '#9E9E9E',}} >{item.key}</Text>
            </ListItem>
          )}
        />

        <FlatList
          style={{ borderTopWidth: 1, borderTopColor: '#f0f0f0'}}
          data={[
            { key: 'Offer Zone', icon: 'MaterialCommunityIcons|ticket-percent' }, 
            { key: 'Notifications', icon: 'md-notifications' }, 
          ]}
          renderItem={({item}) => (
            <ListItem noBorder style={{ alignItems: 'baseline' }} >
              <MyIcon  name={item.icon} style={ styles.drawerIcon } />
              <Text style={{ color: '#9E9E9E' }} >{item.key}</Text>
            </ListItem>
          )}
        />
        <FlatList
          style={{ borderTopWidth: 1, borderTopColor: '#f0f0f0'}}
          data={[
            { key: 'My Rewards', icon: 'fontawesome|ticket' }, 
            { key: 'My Cart', icon: 'md-cart' }, 
            { key: 'My Wishlist', icon: 'ios-heart' }, 
            { key: 'My Orders', icon: 'MaterialCommunityIcons|folder-upload' }, 
            { key: 'My Account', icon: 'md-person' }, 
          ]}
          renderItem={({item}) => (
            <ListItem noBorder style={{ alignItems: 'baseline' }} >
              <MyIcon  name={item.icon} style={ styles.drawerIcon } />
              <Text style={{ color: '#9E9E9E' }} >{item.key}</Text>
            </ListItem>
          )}
        />
        <FlatList
          style={{ borderTopWidth: 1, borderTopColor: '#f0f0f0'}}
          data={[
            { key: 'Gift Card' },
            { key: 'Register as a Seller' },
            { key: 'Stores' },
            { key: 'My Chats' },
            { key: 'Help Centre' },
            { key: 'Legal' },
          ]}
          renderItem={({item}) => (
            <ListItem noBorder style={{ alignItems: 'baseline' }} >
              <Text style={{ color: '#9E9E9E' }} >{item.key}</Text>
            </ListItem>
          )}
        />
    </Container>
  );
};

// const AppDrawerNavigator = createDrawerNavigator({
//   HomeScreen: { screen: Home }
// },{
//   drawerPosition: 'left',
//   contentComponent: CustomDrawerContentComponent,
//   drawerOpenRoute: 'DrawerOpen',
//   drawerCloseRoute: 'DrawerClose',
//   drawerToggleRoute: 'DrawerToggle',
// });

const styles = StyleSheet.create({
  androidHeader: {
      ...Platform.select({
          android: {
              paddingTop: StatusBar.currentHeight,
          }
      })
  },
  drawerIcon: { 
    width: 24,
    fontSize: 18, 
    color: '#9E9E9E',  

    textAlign: 'center',
    marginRight: 15,
  }
});