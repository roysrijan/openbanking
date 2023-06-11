import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  StyleSheet,
  ImageBackground,
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import { Button, Card, Icon, Input } from 'react-native-elements';
import OtpInputs from '../components/OTPInputs';

export default function Registration() {
  const navigation = useNavigation();
  const { data, error } = useState();
  const [verify, setVerify] = useState();
  function getOtp(otp) {
    console.log(otp);
  }
  return (
    <>
      <Text style={styles.profileName}><Icon style={{left: 0}} name='arrow-left' type='material-community'/></Text>
      {verify ?
      <View style={styles.container}>
        <Text style={styles.text}>Enter Verification Code</Text>
        <OtpInputs getOtp={(otp) => getOtp(otp)} />
        <Button
            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginTop: 200 }}
            title='NEXT'
            onPress={() => navigation.navigate('Merchant')}
          />
      </View>
      :<><Text style={styles.profileName}>Sign Up</Text>
      <View style={styles.sectionContainer}>
          <Input
            placeholder='email@address.com'
            leftIcon={{ type: 'material', name: 'mail' }}
            errorStyle={{ color: error ? 'red' : 'transparent' }}
            errorMessage={error ? 'ENTER A VALID ERROR HERE' : ''}
          />

          <Input
            leftIcon={{ type: 'font-awesome', name: 'lock' }}
            placeholder="Password"
            secureTextEntry={true}
          />

          <Input
            placeholder='First Name'
            leftIcon={{ type:'material-community', name: 'account' }}
            errorStyle={{ color: error ? 'red' : 'transparent' }}
            errorMessage={error ? 'ENTER A VALID ERROR HERE' : ''}
          />

          <Input
            placeholder='Last Name'
            leftIcon={{ type:'material-community', name: 'account' }}
            errorStyle={{ color: error ? 'red' : 'transparent' }}
            errorMessage={error ? 'ENTER A VALID ERROR HERE' : ''}
          />

          <Button
            icon={<Icon name='how-to-reg' color='#ffffff' />}
            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
            title=' SIGN UP'
            onPress={() => setVerify(true)}
          />

      </View></>}
      </>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    paddingHorizontal: 24,
    marginTop: 50
  },
  container: {
    paddingHorizontal: 24,
    marginTop: 200,
    textAlign: 'center'
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  logoSmall: {
    width: 55,
    height: 36,
    marginLeft: 120
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  signin: {
    paddingTop: 10,
    paddingLeft: 50,
  },
  underline: {
    color: '#006fcf',
    textDecorationLine: 'underline'
  },
  profileName: {
    fontSize: 20,
    color: '#000',
    fontFamily: 'SFpro-Bold',
    textAlign:'left',
    padding: 20
  },
  text: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'SFpro-Bold',
    textAlign:'center',
    padding: 20
  }
});