import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    Image,
    Alert
} from "react-native";
import { Card, ListItem, Button, Icon, Overlay, Avatar } from '@rneui/themed';
import Navbar from "../components/Navbar";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import { Badge } from "react-native-elements";
import AsyncStorage from "@react-native-community/async-storage";
import OtpInputs from "../components/OTPInputs";

export const BALANCE = 'https://ob-accounts-app.sandbox-workload-cluster-c535fd1191855a1458eb85467de70d4e-i000.us-south.containers.appdomain.cloud/balances?AccountId=';

export default function Checkout() {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [expanded, setExpanded] = useState();
    const [checked, setChecked] = useState([]);
    const [amount, setAmount] = useState(9999);
    const [visible, setVisible] = useState(false);
    const [overlay, setOverlay] = useState(false);
    function getOtp(otp) {
        console.log(otp);
    }
    const List = [
        { name: 'Openbanking' },
        { name: 'UPI' },
        { name: 'Wallets' },
        { name: 'Credit / Debit / ATM Card' },
        { name: 'Net Banking' }
    ];
    const [List2, setList2] = useState([]);
    async function getBalance(){
        let res =  await axios.get(BALANCE+'12345678903',{
            headers: {
                Authorization: 'junaid.khan@ibm.com'
            }
        });
        return res.data?.Data?.Balance[0]?.Amount?.Amount;
    };

    const payment = async()=>{
        console.log(amount)
        if(parseInt(amount)>await getBalance()){
            Alert.alert("You don't have sufficient balance to make the trasaction");
            setOverlay(false);
            setChecked([]);
        }
        else{
            Alert.alert("You have mede the payment successfully!!!");
            AsyncStorage.setItem('payment','true');
            setOverlay(false);
            setChecked([]);
        }
    };
    useEffect(()=>{
        async function get(){
            let accountList = await AsyncStorage.getItem('AccountList');
            accountList = JSON.parse(accountList);
            if(accountList?.length>0)
            setList2(accountList.map(o=>{return {...o, ...
                { name: 'OpenBank', uri: 'https://i.redd.it/msimj5gsoxn01.png'}
            }}));
            let amount = await AsyncStorage.getItem('amount');
            setAmount(amount);
        }
        get();
      },[isFocused]);

    return (
        <>
            <Navbar onClick={() => navigation.openDrawer()} />
            <ScrollView>

                <Card containerStyle={[styles.container]}>
                    <Card.Title style={{ marginBottom: 10, marginTop: 10 }}>
                        Payment Options
                    </Card.Title>
                    <Card.Divider />

                    {List.map((l, i) => (
                        <ListItem.Accordion key={i}
                            content={
                                <>
                                    <ListItem.Content>
                                        <ListItem.Title>{l.name}</ListItem.Title>
                                        <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                                    </ListItem.Content>
                                </>}
                            isExpanded={l.name === 'Openbanking' ? expanded : false}
                            onPress={() => {
                                setExpanded(!expanded);
                            }}
                        >
                            {List2.map((l, i) => (
                                <TouchableOpacity key={i}>
                                    <ListItem bottomDivider>
                                        <TouchableOpacity style={styles.btn} onPress={() => { setChecked([i]); setVisible(true) }}>
                                            <Image
                                                style={styles.img}
                                                source={checked.includes(i) ? require("../assets/images/rb_unselected.png") : require("../assets/images/rb_selected.png")}
                                            />
                                        </TouchableOpacity>
                                        <ListItem.Content style={{ display: 'flex' }}>
                                            <Image source={{ uri: l.uri }} resizeMode="stretch" style={[styles.networkIcon]} /><Text>({l.AccountId})</Text> 
                                        </ListItem.Content>
                                        {i===0 && <Badge value="primary" status="error" />  }  
                                    </ListItem>
                                </TouchableOpacity>
                            ))}
                        </ListItem.Accordion>
                    ))}
                </Card>
            </ScrollView>
            <Overlay overlayStyle={[styles.payment]} isVisible={visible} onBackdropPress={() => setVisible(!visible)}>
                <Text style={[styles.overlayTitle]}>Almost There</Text>
                <Button
                    buttonStyle={{ borderRadius: 10, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: '#fb641b' }}
                    title={`PAY ₹${amount}`}
                    onPress={()=>{setVisible(false),setOverlay(true)}}
                />
            </Overlay>
            <View>
                <Overlay style={[styles.paymentConfirm]} isVisible={overlay} onBackdropPress={()=>setOverlay(!overlay)}>
                    <Text style={[styles.paymentConfirm]}>REQUESTED BY</Text>
                    <Image style={[styles.imgConfirm]} source={require('../assets/images/flipkart.png')}/>
                    
                    <Text style={[styles.balance]}>₹{amount}</Text>
                    <Text style={[styles.paymentConfirm]}>Enter OTP</Text>
                    <OtpInputs getOtp={(otp) => getOtp(otp)} />
                    <Button
                        icon={<Icon name='payment' color='#ffffff' />}
                        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                        title='  PAY'
                        onPress={payment}
                    />
                </Overlay>
            </View>
        </>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 15,
    },
    networkIcon: {
        width: 66,
        height: 43,
    },
    img: {
        height: 22,
        width: 22,
    },
    payment: {
        width: 420,
        textAlign: 'left',
        top: 300,
        paddingBottom: 20,
    },
    overlayTitle: {
        fontWeight: 'bold',
        paddingBottom: 20
    },
    paymentConfirm: {
        width: 300,
        textAlign: 'center'
    },
    imgConfirm: {
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