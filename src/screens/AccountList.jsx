import {
    Text,
    View,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity,
    TextInput,
  } from 'react-native';
  import {globalStyles} from '../global/globalStyle';
  import Header from '../components/Header';
  import React, {useEffect, useState} from 'react';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import SelectDropdown from 'react-native-select-dropdown';
  import {ScrollView} from 'react-native-gesture-handler';
  import COLORS from '../global/globalColors';
  import AsyncStorage from '@react-native-community/async-storage';
  import axios from 'axios';
  import Navbar from '../components/Navbar';
  import { useIsFocused, useNavigation } from '@react-navigation/native';
  import Footer from '../components/Footer';
import { Avatar, Badge, Icon, ListItem } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import LinearGradient from 'react-native-linear-gradient';
  
  
  export const BALANCE = 'https://ob-accounts-app.sandbox-workload-cluster-c535fd1191855a1458eb85467de70d4e-i000.us-south.containers.appdomain.cloud/balances?AccountId=';
  export const ACCOUNTS = 'https://ob-accounts-app.sandbox-workload-cluster-c535fd1191855a1458eb85467de70d4e-i000.us-south.containers.appdomain.cloud/accounts';

  
  export default function AccountList({route}) {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    
    const [accounts, setAccounts] = useState([]);

    async function getBalance(){
      let accounts = await AsyncStorage.getItem('accounts');
      accounts = JSON.parse(accounts);
      if(accounts?.includes('ReadBalances'))    
      axios.get(BALANCE+route.params.accountId,{
          headers: {
              Authorization: route.params.emailId
          }
      }).then((res)=>{
          alert('Balance: '+res.data?.Data?.Balance[0]?.Amount?.Amount+ ' (INR)');
      }).catch(()=>{
          alert("You don't have access to ReadBalance. Please Subscribe!!");
      })
      else
          alert("You don't have access to ReadBalance. Please Subscribe!!");
      }
      
      useEffect(()=>{
        async function get(){
            let accountList = await AsyncStorage.getItem('AccountList');
            accountList = JSON.parse(accountList);
            if(accountList?.length>0)
            setAccounts(accountList);
        }
        get();
      },[isFocused]);

      return (
      <>
        <Navbar onClick={() => navigation.openDrawer()} />
        <View style={globalStyles.innerPagesContainerWhite}>
          <ScrollView>
            <View style={styles.bannerSection}>
            
              <Image
                resizeMode="stretch"
                source={require('../assets/images/editProfileBanner.png')}
                style={[styles.editBanner]}
              />
            </View>
            <View style={styles.profileInfoWrapper}>
              <View style={styles.profilePicContainer}>
  
             
                <View style={styles.profilePic}>
                  <Image
                    resizeMode="stretch"
                    source={require('../assets/images/avatar.jpg')}
                    style={[styles.profilePicImg]}
                  />
                </View>
                <View style={styles.profileNameCont}>
                  <Text style={styles.profileName}>{route.params?.name}</Text>
                  <TouchableOpacity onPress={getBalance}>
                  </TouchableOpacity>
                </View>
                <View style={styles.profileForm}>
                  <View style={styles.profileFormInner}>
                  <Text style={styles.profileName}>My Accounts</Text>  
                  <Text style={styles.profileName}></Text>  
                  {accounts?.map((ele,index)=>(
                        <ListItem
                            key={index}
                            Component={TouchableScale}
                            friction={90} //
                            tension={100} // These props are passed to the parent component (here TouchableScale)
                            activeScale={0.95} //
                            linearGradientProps={{
                                colors: index===0 ? ['#FFFFFF', '#FFFFFF']: ['#FFFFFF', '#FFFFFF'],
                                start: { x: 1, y: 0 },
                                end: { x: 0.2, y: 0 },
                            }}
                            ViewComponent={LinearGradient} // Only if no expo
                            style={[styles.item]}
                            onPress={()=>navigation.navigate('Sidenav', route.params)}
                        >
                            <Avatar rounded source={require('../assets/images/logo.png')} />
                            <ListItem.Content>
                                <ListItem.Title style={{ color: 'grey', fontWeight: 'bold' }}>
                                    OpenBank
                                </ListItem.Title>
                                <ListItem.Subtitle style={{ color: 'black' }}>
                                    {ele.AccountId}
                                </ListItem.Subtitle>
                            </ListItem.Content>
                            {index===0 && <Badge value="primary" status="error" />  }
                            <Icon name='dots-vertical' type='material-community' />
                        </ListItem>))}
                  {accounts.length === 0 &&
                    <>
                        <Text style={{marginLeft: 100}}>No Bank Account Linked.</Text>
                        <Text style={{marginLeft: 80}}>Add Bank Account to continue.</Text>
                    </>
                  }
                  </View>

                 
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        <Footer />
      </>
    );
  }
  
  const styles = StyleSheet.create({
    bannerSection: {
      width: '100%',
      height: 125,
      flex: 1,
    },
    editBanner: {
      width: '100%',
      height: 125,
      flex: 2,
    },
    profilePicContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: -15,
      position:'relative'
    },
    profileInfoWrapper: {
      backgroundColor: '#fff',
      flex: 6,
  
    },
    profilePic: {
      width: 100,
      height: 100,
      marginTop: -35,
      // marginLeft: 25,
      overflow:'hidden',
      borderRadius: 100,
    },
    profilePicImg: {
      width: '100%',
      height: '100%',
      borderRadius: 100,
    },
    profileNameCont: {
      paddingHorizontal: 15,
      paddingVertical: 10,
      alignItems: 'center',
      
    },
    profileName: {
      fontSize: 20,
      color: '#000',
      fontFamily: 'SFpro-Bold',
      textAlign:'center'
    },
    photosEdit: {
      textDecorationLine: 'underline',
      textDecorationStyle: 'solid',
      textDecorationColor: '#000',
    },
    inputBox: {
      borderColor: '#c1cad3',
      borderWidth: 1,
      marginBottom: 10,
      width: '75%',
    },
    input: {
      fontSize: 14,
      fontFamily: 'SFpro-Regular',
      color: '#333',
      textAlign: 'left',
      paddingLeft: 15,
    },
    profileForm: {
      backgroundColor: '#e6ebf5',
      width: '100%',
      padding: 25,
    },
    profileFormInner: {
      backgroundColor: '#fff',
      padding: 15,
      borderRadius: 8,
      paddingTop: 30,
    },
    privacyIcon: {
      width: 21,
      height: 21,
    },
    inputBoxWithPrivacy: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
      justifyContent: 'center',
    },
    privacyBox: {
      flexDirection:'row',
      backgroundColor: '#fff',
      width: 58,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 100,
      marginLeft: 15,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
  
      elevation: 5,
      marginTop: -15,
    },
    dropIcon:{
      marginLeft:8
    },
    birth: {
      position: 'absolute',
      top: -10,
      left: 25,
      backgroundColor: '#fff',
      zIndex: 1,
    },
    verifyPhText: {
      color: '#1d80e2',
      position: 'relative',
      top: -17,
      left: 15,
    },
    dropLabelText: {
      color: '#323a42',
      fontSize: 14,
      fontFamily: 'SFpro-Regular',
      marginBottom: 8,
    },
    dropdown1BtnStyle: {
      width: '93%',
      height: 50,
      backgroundColor: '#FFF',
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#c1cad3',
    },
    dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left', fontSize: 14},
    dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
    dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
    dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
    dropBox: {
      marginHorizontal: 15,
      width: '100%',
      marginBottom: 15,
    },
    addMore: {
      // marginTop: 8,
      color: COLORS.blue,
    },
    camImg:{
      width:38,
      height:38
    },
    radioMainWrap: {
      flexDirection: 'column',
  
      marginHorizontal: 15,
      // justifyContent: 'center',
      alignItems: 'flex-start',
      marginBottom: 15,
  
      // backgroundColor:'red'
    },
    btn: {
      flexDirection: 'row',
      marginRight: 10,
      alignItems: 'center',
    },
    btntext: {
      fontSize: 16,
      fontFamily: 'SFpro-Regular',
    },
    img: {
      width: 24,
      height: 24,
      marginRight: 8,
    },
    genderText: {
      marginBottom: 10,
      fontFamily: 'SFpro-Regular',
    },
    educationText: {
      color: '#323a42',
      fontFamily: 'SFpro-Medium',
      fontSize: 14,
      marginVertical: 25,
      textTransform: 'uppercase',
    },
    highSchool: {
      color: '#323a42',
      fontFamily: 'SFpro-Medium',
      fontSize: 14,
      marginVertical: 15,
    },
    highSchoolInfo: {
      borderTopColor: '#ccc',
      borderTopWidth: 1,
      paddingTop: 15,
    },
    profileFormInner: {
      backgroundColor: '#fff',
      paddingVertical: 5,
      paddingHorizontal: 15,
      paddingTop: 35,
      borderRadius:15
    },
    inputBoxFullIWidth: {
      width: '100%',
      borderColor: '#c1cad3',
      borderWidth: 1,
      marginBottom: 10,
      marginBottom: 15,
      borderRadius: 4,
    },
    labelSchool: {
      marginBottom: 8,
      color: '#323a42',
      fontSize: 14,
      fontFamily: 'SFpro-Regular',
    },
    fromToCal: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    dateBox: {
      width: '45%',
      borderColor: '#c1cad3',
      borderWidth: 1,
      marginBottom: 10,
      marginBottom: 15,
      borderRadius: 4,
    },
    uniIcon:{
      width:40,
      height:40
    },
    addUInfo:{
      display:'flex',
      alignItems:'center',
      flexDirection:'row',
      paddingBottom:25
    },
    addU:{
      color: COLORS.blue,
      fontFamily: 'SFpro-Medium',
      fontSize: 14,
      marginLeft:10
    },
    saveWrap:{
      position:'absolute',
      right:25,
      top:40,
      flexDirection:'row',
     backgroundColor: '#fff',
     width: 75,
     height: 36,
     alignItems: 'center',
     justifyContent: 'space-around',
     borderRadius: 100,
     marginLeft: 15,
     shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
  
      elevation: 5,
    }
  });
  