import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState} from 'react';
import COLORS from '../global/globalColors';
import LinearGradient from 'react-native-linear-gradient';

import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

export default function Footer() {
    const isFocused = useIsFocused();
    const [display, setDisplay] = useState(false);
    const [tab, setTab] = useState('Home');
    const navigation = useNavigation();
    useEffect(()=>{
        async function get(){
            let tab = await AsyncStorage.getItem('tab');
            if(tab)
            setTab(tab);
        }
        get();
    },[isFocused]);
    return (
        <>
            <View
                style={[styles.menuItemsWrap, { display: display ? 'flex' : 'none' }]}>
                <View style={styles.menuItemsInnerWrap}>
                    <TouchableOpacity style={styles.menuItems}>
                        {/* <IonIcon name="ios-home-outline" size={20} color={COLORS.blue} /> */}
                        <View style={styles.iconCont}>
                            <Icon
                                type='ionicon'
                                name="chatbubble-outline"
                                size={25}
                                color={COLORS.blue}
                            />
                        </View>

                        <Text style={[styles.createInnerText]}>Chat</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItems2}>
                        <View style={styles.iconCont}>
                            {/* <IonIcon name="ios-home-outline" size={20} color={COLORS.blue} /> */}
                            <Icon type='ionicon' name="people-outline" size={25} color={COLORS.blue} />
                        </View>
                        <Text style={[styles.createInnerText]}>Group</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.menuItems3}
                        onPress={() => navigation.push('BankList')}>
                        {/* <IonIcon name="ios-home-outline" size={20} color={COLORS.blue} /> */}
                        <View style={styles.iconCont}>
                            <Icon type='ionicon' name="md-card-outline" size={25} color={COLORS.blue} />
                        </View>
                        <Text style={[styles.createInnerText]}>Account</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.footIconBox, { marginRight: 15 }]}
                    onPress={() => {AsyncStorage.setItem('tab','Home'), navigation.navigate('Home')}}>
                    {/* <IonIcon name="ios-home-outline" size={20} color={COLORS.blue} /> */}
                    {/* <IonIcon name="ios-home" size={25} color={COLORS.blue} /> */}
                    {/* <Image
              resizeMode="stretch"
              source={require('../assets/images/home.png')}
              style={[styles.homeIcon]}/> */}

                    <Icon
                        name='home'
                        style={[styles.homeIcon]}
                        color={tab==='Home'?COLORS.blue:COLORS.grey}
                    />

                    <Text style={[styles.footIconText, tab==='Home'?styles.active:{}]}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.footIconBox, { marginRight: 15 }]}
                    onPress={()=>{AsyncStorage.setItem('tab','Wallet'), navigation.navigate('AccountList',{accountId: '12345678901', emailId: 'junaid.khan@ibm.com', name: 'Junaid Khan'})}}
                >
                    {/* <IonIcon name="ios-people" size={20} color={COLORS.blue} /> */}
                    {/* <IonIcon name="ios-people-outline" size={30} color={COLORS.blue} /> */}
                    <Icon
                        name='wallet'
                        type='ionicon'
                        style={[styles.networkIcon]}
                        color={tab==='Wallet'?COLORS.blue:COLORS.grey}
                    />
                    <Text style={[styles.footIconText, tab==='Wallet'?styles.active:{}]}>Accounts</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.footIconBoxCreate}
                    onPress={() => setDisplay(!display)}>
                    {/* <IonIcon name="ios-people" size={20} color={COLORS.blue} /> */}

                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={['#037ee5', '#15a2e0', '#28cad9']}
                        style={styles.createBt}>
                        {!display ? <Icon type='feather' name="plus" size={35} color="#fff" />
                            : <Icon type='feather' name="x" size={35} color="#fff" />}
                    </LinearGradient>

                    <Text style={styles.footIconText}>Create</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.footIconBox}
                    onPress={()=>{AsyncStorage.setItem('tab','Profile'), navigation.navigate('Setting',{accountId: '12345678901', emailId: 'junaid.khan@ibm.com', name: 'Junaid Khan'})}}
                >
                    {/* <IonIcon name="ios-notifications" size={20} color={COLORS.blue} /> */}
                    {/* <IonIcon
                name="ios-notifications-outline"
                size={26}
                color={COLORS.blue}
              /> */}

                    <Icon
                        name='account'
                        type='material-community'
                        style={[styles.notIcon]}
                        color={tab==='Profile'?COLORS.blue:COLORS.grey}
                    />

                    <Text style={[styles.footIconText, tab==='Profile'?styles.active:{}]}>Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.footIconBox}
                    onPress={() => {AsyncStorage.setItem('tab','Transaction'), navigation.navigate('Transaction',{accountId: '12345678901', emailId: 'junaid.khan@ibm.com', name: 'Junaid Khan'})}}>
                    {/* <IonIcon name="chatbubbles-sharp" size={20} color={COLORS.blue} /> */}
                    {/* <IonIcon name="chatbubbles-outline" size={26} color={COLORS.blue} /> */}
                    <Icon
                        name='file-document-multiple'
                        type='material-community'
                        style={[styles.chatIcon]}
                        color={tab==='Transaction'?COLORS.blue:COLORS.grey}
                    />

                    <Text style={[styles.footIconText, tab==='Transaction'?styles.active:{}]}>Transactions</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    footer: {
        paddingVertical: 6,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        position: 'relative',
        zIndex: 999,
        height: 55,
    },
    footIconBox: {
        alignItems: 'center',
        // backgroundColor:'red',
        height: 45,
        justifyContent: 'space-between',
    },
    footIconText: {
        fontFamily: 'Lato-Regular',
        fontSize: 13,
        color: '#adadad',
    },
    footIconBoxCreate: {
        alignItems: 'center',
    },
    createBt: {
        width: 60,
        height: 60,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -50,
    },
    active: {
        color: COLORS.blue,
    },

    menuItemsWrap: {
        position: 'absolute',
        marginBottom: 50,
        left: 0,
        top: 0,
        zIndex: 9,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        width: '100%',
        height: '100%',
        alignItems: 'flex-end',
    },
    menuItemsInnerWrap: {
        position: 'absolute',
        bottom: 170,
        left: '50%',
        marginLeft: -10,
    },
    menuItems: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: -80,
        top: 28,
    },
    menuItems2: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: -15,
        top: 0,
    },
    menuItems3: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: -90,
        top: 28,
    },
    iconCont: {
        backgroundColor: '#fff',
        width: 40,
        height: 40,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    createInnerText: {
        color: '#fff',
        fontFamily: 'SFpro-Regular',
        fontSize: 14,
    },

    iconCont: {
        backgroundColor: '#fff',
        width: 40,
        height: 40,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    createInnerText: {
        color: '#fff',
        fontFamily: 'SFpro-Regular',
        fontSize: 13,
    },
    homeIcon: {
        width: 26,
        height: 24,
    },
    chatIcon: {
        width: 32,
        height: 20,
    },
    notIcon: {
        width: 23,
        height: 25,
    },
    networkIcon: {
        width: 26,
        height: 24,
    },
});
