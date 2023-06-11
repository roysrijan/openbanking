import React, { useState, useEffect } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    Image,
    View,
} from 'react-native';
import COLORS from '../global/globalColors';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import IonIcon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import Home from '../screens/Home';
import Setting from '../screens/Setting';
import { useNavigation } from '@react-navigation/native';
import ExpandableDrawer from './Expandable';
import AccountandTransaction from '../screens/api_profile/AccountandTransaction';
import PaymentInitiation from '../screens/api_profile/PaymentInitiation';
import Web from '../screens/api_profile/web';
import ProfileEdit from '../screens/Profile';

const Drawer = createDrawerNavigator();

const CustomDrawer = (props) => {
    const [user, setUser] = useState();
    useEffect(() => {
        const getUserDetails = async () => setUser({ firstName: 'Srijan Roy' });
        getUserDetails();
    }, [])
    const c = new Map();
    c.set('Account and Transaction', 'AccountandTransaction');
    c.set('Payment Initiation', 'PaymentInitiation');
    const expandable = {
        title: 'V3.1.10',
        choices: c,
        navigation: props.navigation,
        state: props.state,
        descriptors: props.descriptors,
        progress: props.progress,
    };
    return (
        <DrawerContentScrollView>
            <TouchableOpacity style={styles.navProfile}>
                <View style={styles.avatarImgWrap}>
                    <Image
                        resizeMode="cover"
                        source={require('../assets/images/avatar.jpg')}
                        style={[styles.avatarImg]}
                    />
                </View>
                <Text style={styles.avatarText}>{user && props.name}</Text>
            </TouchableOpacity>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
};


export default function Sidenav({ route }) {
    const navigation = useNavigation();
    const [balance, setBalance] = useState();
    const logOut = () => {
        AsyncStorage.clear();
        navigation.navigate('Login')
    };
    return (
        <Drawer.Navigator

            drawerContent={props => <CustomDrawer {...{...props, ...route.params, balance: balance}} />}

            screenOptions={{
                drawerStyle: {
                    backgroundColor: COLORS.white,
                    width: 290,
                },
                headerStyle: { backgroundColor: COLORS.white },
                headerTitleAlign: 'center',
                headerTintColor: COLORS.blue,
                headerTitle: () => (
                    <Image
                        resizeMode="contain"
                        source={require('../assets/images/logo.png')}
                        style={[styles.logoSmall]}
                    />
                ),
                headerRight: ({ size = 30 }) => (
                    <IonIcon
                        name="power-outline"
                        size={size}
                        style={[styles.powerIcon]}
                        color={COLORS.blue}
                        onPress={logOut}
                    />
                ),
            }}

            useLegacyImplementation
            initialRouteName="Home">
            <Drawer.Screen
                name="Home"
                initialParams={route.params}
                component={Home}
                options={{
                    title: 'Home',
                    headerShown: false,
                    drawerActiveTintColor: COLORS.blue,
                    drawerInactiveTintColor: COLORS.blue,
                    drawerIcon: ({ focused, size }) => (
                        <IonIcon
                            name="home-outline"
                            size={size}
                            color={COLORS.blue}
                        />
                    ),
                }}
            />

            

            <Drawer.Screen
                name="AccountandTransaction"
                component={AccountandTransaction}
                options={{
                    drawerItemStyle: {
                        display: 'none'
                    },
                    headerShown: false
                }}
            />

            <Drawer.Screen
                name="PaymentInitiation"
                component={PaymentInitiation}
                options={{
                    drawerItemStyle: {
                        display: 'none'
                    },
                    headerShown: false
                }}
            />

            <Drawer.Screen
                name="AccessConsent"
                options={{
                    drawerItemStyle: {
                        display: 'none'
                    }
                }}
            >
                {() =>
                    <Web url='https://openbankinguk.github.io/read-write-api-site3/v3.1.10/resources-and-data-models/aisp/account-access-consents.html' />
                }
            </Drawer.Screen>

            <Drawer.Screen
                name="Account"
                options={{
                    drawerItemStyle: {
                        display: 'none'
                    }
                }}
            >
                {() =>
                    <Web url='https://openbankinguk.github.io/read-write-api-site3/v3.1.10/resources-and-data-models/aisp/Accounts.html' />
                }
            </Drawer.Screen>

            <Drawer.Screen
                name="Balance"
                options={{
                    drawerItemStyle: {
                        display: 'none'
                    }
                }}
            >
                {() =>
                    <Web url='https://openbankinguk.github.io/read-write-api-site3/v3.1.10/resources-and-data-models/aisp/Balances.html' />
                }
            </Drawer.Screen>

            <Drawer.Screen
                name="Transaction"
                options={{
                    drawerItemStyle: {
                        display: 'none'
                    }
                }}
            >
                {() =>
                    <Web url='https://openbankinguk.github.io/read-write-api-site3/v3.1.10/resources-and-data-models/aisp/Transactions.html' />
                }
            </Drawer.Screen>

            <Drawer.Screen
                name="Beneficiary"
                options={{
                    drawerItemStyle: {
                        display: 'none'
                    }
                }}
            >
                {() =>
                    <Web url='https://openbankinguk.github.io/read-write-api-site3/v3.1.10/resources-and-data-models/aisp/Beneficiaries.html' />
                }
            </Drawer.Screen>

            <Drawer.Screen
                name="DirectDebit"
                options={{
                    drawerItemStyle: {
                        display: 'none'
                    }
                }}
            >
                {() =>
                    <Web url='https://openbankinguk.github.io/read-write-api-site3/v3.1.10/resources-and-data-models/aisp/direct-debits.html' />
                }
            </Drawer.Screen>

            <Drawer.Screen
                name="StandingOrder"
                options={{
                    drawerItemStyle: {
                        display: 'none'
                    }
                }}
            >
                {() =>
                    <Web url='https://openbankinguk.github.io/read-write-api-site3/v3.1.10/resources-and-data-models/aisp/standing-orders.html' />
                }
            </Drawer.Screen>

            <Drawer.Screen
                name="Product"
                options={{
                    drawerItemStyle: {
                        display: 'none'
                    }
                }}
            >
                {() =>
                    <Web url='https://openbankinguk.github.io/read-write-api-site3/v3.1.10/resources-and-data-models/aisp/Products.html' />
                }
            </Drawer.Screen>

            <Drawer.Screen
                name="Offer"
                options={{
                    drawerItemStyle: {
                        display: 'none'
                    }
                }}
            >
                {() =>
                    <Web url='https://openbankinguk.github.io/read-write-api-site3/v3.1.10/resources-and-data-models/aisp/Offers.html' />
                }
            </Drawer.Screen>

            <Drawer.Screen
                name="Party"
                options={{
                    drawerItemStyle: {
                        display: 'none'
                    }
                }}
            >
                {() =>
                    <Web url='https://openbankinguk.github.io/read-write-api-site3/v3.1.10/resources-and-data-models/aisp/Parties.html' />
                }
            </Drawer.Screen>

            <Drawer.Screen
                name="ScheduledPayment"
                options={{
                    drawerItemStyle: {
                        display: 'none'
                    }
                }}
            >
                {() =>
                    <Web url='https://openbankinguk.github.io/read-write-api-site3/v3.1.10/resources-and-data-models/aisp/scheduled-payments.html' />
                }
            </Drawer.Screen>

            <Drawer.Screen
                name="Statement"
                options={{
                    drawerItemStyle: {
                        display: 'none'
                    }
                }}
            >
                {() =>
                    <Web url='https://openbankinguk.github.io/read-write-api-site3/v3.1.10/resources-and-data-models/aisp/Statements.html' />
                }
            </Drawer.Screen>


        </Drawer.Navigator>
    )
}

const styles = StyleSheet.create({
    logoSmall: {
        width: 55,
        height: 36,
    },
    user: {
        position: 'absolute',
        right: 15,
        top: 20,
    },
    hambg: {
        position: 'absolute',
        left: 15,
        top: 20,
    },
    avatarImgWrap: {
        width: 60,
        height: 60,
        overflow: 'hidden',
        borderRadius: 100,
    },
    navProfile: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    avatarImg: {
        width: '100%',
    },
    avatarText: {
        color: COLORS.blue,
        marginLeft: 25,
        fontFamily: 'Lato-Regular',
        fontSize: 20,
    },
    powerIcon: {
        width: 40,
        height: 30
    },
    hamIcon: {
        width: 20,
        height: 25
    }
});