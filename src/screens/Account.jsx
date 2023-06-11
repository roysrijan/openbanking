import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ListItem, Avatar, Card } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import LinearGradient from 'react-native-linear-gradient'; // Only if no expo
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { AccountList, PaymentList } from '../shared/List';

const API_URL = process.env.API_URL || 'https://ob-consent-management-app.sandbox-workload-cluster-c535fd1191855a1458eb85467de70d4e-i000.us-south.containers.appdomain.cloud';
export const ACCOUNTS = 'https://ob-accounts-app.sandbox-workload-cluster-c535fd1191855a1458eb85467de70d4e-i000.us-south.containers.appdomain.cloud/accounts';
export const CONCENTS = `${API_URL}/account-access-consents/account`;

export default function Account({route}) {
    const navigation = useNavigation();
    const [accounts, setAccounts] = useState([]);
    useEffect(()=>{
        axios.get(ACCOUNTS,{
            headers: {
                Authorization: route.params.emailId
            }
        }).then((res)=>{
            console.log(res.data.Data.AccountsList)
            setAccounts(res.data?.Data?.AccountsList);
        })
    },[]);
    const navigate = async ({ accountId, emailId, name }) => {
        let accountList = await AsyncStorage.getItem('AccountList');
        accountList = JSON.parse(accountList);
        if(accountList?.length>0 && !accountList.map(o=>o.AccountId).includes(accountId)){
            accountList.push({ AccountId: accountId });
        }
        else accountList = [{ AccountId: accountId}];
        AsyncStorage.setItem('AccountList', JSON.stringify(accountList));
        AsyncStorage.removeItem('accounts');
        AsyncStorage.removeItem('payments');
        axios.get(CONCENTS,{
            headers: {
                accountId,
                emailId
            }
        }).then((res)=>{
            console.log(res.data);
            let data = res.data.filter(a => a.AccountId === accountId)[0]?.Data;
            let permissions = data?.Permissions;
            let consentId = data?.ConsentId;
            console.log(permissions);
            if(permissions){
                AsyncStorage.setItem('accounts',JSON.stringify(permissions?.filter(a => AccountList.map(a=>a.name).includes(a))));
                AsyncStorage.setItem('payments',JSON.stringify(permissions?.filter(a => PaymentList.map(a=>a.name).includes(a))));
            }
            navigation.navigate('Sidenav', {accountId, emailId, name, consentId });
        },err=>{
            navigation.navigate('Sidenav', {accountId, emailId, name });            
        })
    };
    return (
        <>
            <Card containerStyle={[styles.sectionContainer]}>
                <Card.Title style={{ color: '#cd7f32', fontWeight: 'bold' }}>

                </Card.Title>
                <Card.Divider />
                {accounts?.map((ele,index)=>(
                <ListItem
                    key={index}
                    Component={TouchableScale}
                    friction={90} //
                    tension={100} // These props are passed to the parent component (here TouchableScale)
                    activeScale={0.95} //
                    linearGradientProps={{
                        colors: index===0 ? ['#FF9800', '#F44336']: ['#006fcf', '#f0f'],
                        start: { x: 1, y: 0 },
                        end: { x: 0.2, y: 0 },
                    }}
                    ViewComponent={LinearGradient} // Only if no expo
                    style={[styles.item]}
                    onPress={() => navigate({ accountId: ele.AccountId, emailId: route.params.emailId, name: ele.Nickname})}
                >
                    <View style={{ backgroundColor: 'white'}}>
                        <Avatar rounded source={require('../assets/images/logo.png')} />                     
                    </View>
                    <ListItem.Content>
                        <ListItem.Title style={{ color: 'white', fontWeight: 'bold' }}>
                            {ele.AccountId}
                        </ListItem.Title>
                        <ListItem.Subtitle style={{ color: 'white' }}>
                            {ele.AccountType}
                        </ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron color="white" />
                </ListItem>))}
                {/* <ListItem
                    Component={TouchableScale}
                    friction={90} //
                    tension={100} // These props are passed to the parent component (here TouchableScale)
                    activeScale={0.95} //
                    linearGradientProps={{
                        colors: ['#006fcf', '#f0f'],
                        start: { x: 1, y: 0 },
                        end: { x: 0.2, y: 0 },
                    }}
                    ViewComponent={LinearGradient} // Only if no expo
                    style={[styles.item]}
                    onPress={() => navigate({emailId: 'midhun.p@ibm.com', name: 'Midhun P'})}
                >
                    <Avatar rounded source={require('../assets/images/logo.png')} />
                    <ListItem.Content>
                        <ListItem.Title style={{ color: 'white', fontWeight: 'bold' }}>
                            Midhun P
                        </ListItem.Title>
                        <ListItem.Subtitle style={{ color: 'white' }}>
                            Vice Chairman
                        </ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron color="white" />
                </ListItem>
                <ListItem
                    Component={TouchableScale}
                    friction={90} //
                    tension={100} // These props are passed to the parent component (here TouchableScale)
                    activeScale={0.95} //
                    linearGradientProps={{
                        colors: ['#006fcf', '#1ff'],
                        start: { x: 1, y: 0 },
                        end: { x: 0.2, y: 0 },
                    }}
                    ViewComponent={LinearGradient} // Only if no expo
                    style={[styles.item]}
                    onPress={() => navigate({emailId: 'chris.jackson@ibm.com', name: 'Chris Jackson'})}
                >
                    <Avatar rounded source={require('../assets/images/logo.png')} />
                    <ListItem.Content>
                        <ListItem.Title style={{ color: 'white', fontWeight: 'bold' }}>
                            Chris Jackson
                        </ListItem.Title>
                        <ListItem.Subtitle style={{ color: 'white' }}>
                            Vice Chairman
                        </ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron color="white" />
                </ListItem> */}
            </Card>
        </>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 132,
        paddingHorizontal: 54,
        borderRadius: 15,
    },
    item: {
        marginBottom: 10
    },
    logoSmall: {
        width: 55,
        height: 36,
    },
});