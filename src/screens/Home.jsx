import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Text, ScrollView, View, StyleSheet, Linking, Platform, Image } from 'react-native';
import { Card, ListItem, Button, Icon, Overlay  } from 'react-native-elements';
import axios from 'axios';
import { Alert } from 'react-native';
import socketIO from 'socket.io-client';

const API_URL = process.env.API_URL || 'https://ob-consent-management-app.sandbox-workload-cluster-c535fd1191855a1458eb85467de70d4e-i000.us-south.containers.appdomain.cloud';
export const  CONCENTS = `${API_URL}/account-access-consents`;
export const BALANCE = 'https://ob-accounts-app.sandbox-workload-cluster-c535fd1191855a1458eb85467de70d4e-i000.us-south.containers.appdomain.cloud/balances?AccountId=';
export const socket = socketIO("http://192.168.10.5:5000");

export default function Home({ route }) {
    const navigation = useNavigation();
    const [checkList, setCheckList] = useState([]);
    const [visible, setVisible] = useState(false);
    const [overlay, setOverlay] = useState(false);
    const [amount, setAmount] = useState();
    const [to, setTo] = useState();
    const [from, setFrom] = useState();
    const isFocused = useIsFocused();

    const toggleOverlay = () => {
        setVisible(!visible);
    };
    const handleCheck = (item) => {
        if (checkList.includes(item))
            setCheckList(checkList.filter(a => a !== item));
        else
            setCheckList(prev => [...prev, item]);
    };

    const addConsent = async () => {
        let accounts = await AsyncStorage.getItem('accounts');
        accounts = JSON.parse(accounts);
        let payments = await AsyncStorage.getItem('payments');
        payments = JSON.parse(payments);
        axios.delete(CONCENTS+'/'+route.params.consentId,{
            headers: {
                Authorization: true
            }
        })
        .catch(()=>{})
        .finally(()=>
        axios.post(CONCENTS,{
            "Data": {
              "Permissions": [...accounts?accounts:[],...payments?payments:[]],
              "ExpirationDateTime": "2023-03-09T10:12:32.252+00:00",
              "TransactionFromDateTime": "2023-03-06T10:12:32.252Z",
              "TransactionToDateTime": "2023-03-06T10:12:32.252Z"
            },
            "Risk": {}
          },{
            headers: {
                Authorization:true,
                emailId:route.params.emailId,
                accountId:route.params.accountId
            }
        }).then(()=>{
            toggleOverlay();
            navigation.navigate('Merchant');
        },err=>
        console.log('err'+err+[...accounts,...payments])))
    };

    async function getBalance(){
        let res =  await axios.get(BALANCE+route.params.accountId,{
            headers: {
                Authorization: route.params.emailId
            }
        });
        return res.data?.Data?.Balance[0]?.Amount?.Amount;
    }

    const payment = async()=>{
        console.log(amount)
        if(amount>await getBalance()){
            Alert.alert("You don't have sufficient balance to make the trasaction");
            setOverlay(false);
            AsyncStorage.removeItem('url');
            socket.emit('message',{state: 'failure', from: this.from,  to: this.to});
        }
    }

    
    const handleOpenURL = (event) => {
        let a = event.url;
        setAmount(parseInt(a.slice(a.lastIndexOf('/')+1,a.length)));
        setOverlay(true);
    }

    useEffect(() => {
        async function get() {
            let accounts = await AsyncStorage.getItem('accounts');
            accounts = JSON.parse(accounts);
            console.log(route.params.emailId);
            let prev = JSON.parse(JSON.stringify(checkList));
            if (accounts?.length > 0)
                prev = [...prev, 'account'];
            else
                prev = prev.filter(a => a !== 'account');
            let payments = await AsyncStorage.getItem('payments');
            payments = JSON.parse(payments);
            if (payments?.length > 0)
                prev = [...prev, 'payment'];
            else
                prev = prev.filter(a => a !== 'payment');

            setCheckList(prev);
            
            let url = await AsyncStorage.getItem('url');
            if(url){
                setAmount(parseInt(url.slice(url.lastIndexOf('/')+1,url.length)));
                setOverlay(true);
            }
        };
        get();
        
        
        Linking.addEventListener('url', handleOpenURL);
        
        socket.on('connect',(data)=>{
            console.log("connected"+ data);
            socket.on('new user',(data)=>{
              console.log('data'+data.socketID);
              setFrom(data.socketID);
            })
            socket.on('message',(data)=>{
              setTo(data.from);
            })
          })
        
    }, [isFocused]);
    return (
        <ScrollView>
            <Card containerStyle={[styles.sectionContainer]}>
                <Icon name="gold" type="material-community" color="gold" />
                <Card.Title style={{ color: '#cd7f32', fontWeight: 'bold' }}>
                    GOLD
                </Card.Title>
                <Card.Divider />
                <Card.Image source={require('../assets/images/politics.png')} />
                <Text style={{ marginBottom: 10, marginTop: 10, fontWeight: 'normal' }}>
                    OpenBank is unleashing a new era with its all-in-one processing platform for banking and payments.
                </Text>
                <ListItem onPress={() => { navigation.navigate('AccountandTransaction') }}>
                    <Icon name={checkList.includes('account') ? "check" : "close"} type="material-community" color="grey" />
                    <ListItem.Content>
                        <ListItem.Title>Account and Tracnsaction</ListItem.Title>
                    </ListItem.Content>
                    <Button
                        icon={<Icon name='arrow-right' color='grey' />}
                        buttonStyle={{ borderRadius: 10, backgroundColor: 'white' }}
                        onPress={() => navigation.navigate('AccountandTransaction')}
                    />
                </ListItem>
                <ListItem onPress={() => navigation.navigate('PaymentInitiation')}>
                    <Icon name={checkList.includes('payment') ? "check" : "close"} type="material-community" color="grey" />
                    <ListItem.Content>
                        <ListItem.Title>Payment Initiation</ListItem.Title>
                    </ListItem.Content>
                    <Button
                        icon={<Icon name='arrow-right' color='grey' />}
                        buttonStyle={{ borderRadius: 10, backgroundColor: 'white' }}
                        onPress={() => navigation.navigate('PaymentInitiation')}
                    />
                </ListItem>
                <ListItem onPress={() => handleCheck('resource')}>
                    <Icon name={checkList.includes('resource') ? "check" : "close"} type="material-community" color="grey" />
                    <ListItem.Content>
                        <ListItem.Title>Resources and Data Models</ListItem.Title>
                    </ListItem.Content>
                    <Button
                        icon={<Icon name='arrow-right' color='grey' />}
                        buttonStyle={{ borderRadius: 10, backgroundColor: 'white' }}
                        onPress={() => navigation.navigate('PaymentInitiation')}
                    />
                </ListItem>
                <ListItem onPress={() => handleCheck('event')}>
                    <Icon name={checkList.includes('event') ? "check" : "close"} type="material-community" color="grey" />
                    <ListItem.Content>
                        <ListItem.Title>Event Notification</ListItem.Title>
                    </ListItem.Content>
                    <Button
                        icon={<Icon name='arrow-right' color='grey' />}
                        buttonStyle={{ borderRadius: 10, backgroundColor: 'white' }}
                        onPress={() => navigation.navigate('PaymentInitiation')}
                    />
                </ListItem>
                <Button
                    icon={<Icon name='flight-takeoff' color='#ffffff' />}
                    buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                    title='  GET STARTED'
                    onPress={addConsent}
                />
            </Card>
            <View>
                <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                    <Icon name='check-circle-outline' size={100} color='green' />
                    <Text>Successfuly Subscribed!</Text>
                </Overlay>
            </View>

            <View>
                <Overlay style={[styles.payment]} isVisible={overlay} onBackdropPress={()=>setOverlay(!overlay)}>
                    <Text style={[styles.payment]}>REQUESTED BY</Text>
                    <Image style={[styles.img]} source={require('../assets/images/flipkart.png')}/>
                    
                    <Text style={[styles.balance]}>9,990</Text>
                    <Button
                        icon={<Icon name='payment' color='#ffffff' />}
                        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                        title='  PAY'
                        onPress={payment}
                    />
                </Overlay>
            </View>
        </ScrollView>)
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
        borderRadius: 15,
    },
    payment: {
        width: 200,
        textAlign: 'center'
    },
    img: {
        alignSelf: 'center',
        margin: 20
    },
    balance: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        padding: 20
    }
});