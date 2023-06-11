import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  ImageBackground,
  View,
  Image,
  TouchableOpacity,
  Linking
} from 'react-native';
import { Button, Card, Icon, Input, Text } from 'react-native-elements';

export default function Login() {
  const navigation = useNavigation();
  const { data, error } = useState();
  const [emailId, setEmailId] = useState();
  useEffect(()=>{
    Linking.addEventListener('url', async (event)=>{
      AsyncStorage.setItem('url',event.url);
    });
  },[]);
  return (
    <ImageBackground source={require('../assets/images/login-b-img.png')} resizeMode="cover" style={styles.image}>
      <View style={styles.sectionContainer}>
        <Card>
          <Image
            resizeMode="contain"
            source={require('../assets/images/logo.png')}
            style={[styles.logoSmall]}
          />
          <Card.Title>

          </Card.Title>
          <Card.Divider />
          <Input
            placeholder='email@address.com'
            leftIcon={{ type: 'material', name: 'mail' }}
            errorStyle={{ color: error ? 'red' : 'transparent' }}
            errorMessage={error ? 'ENTER A VALID ERROR HERE' : ''}
            onChangeText={(text)=>{
              setEmailId(text)}}
          />

          <Input
            leftIcon={{ type: 'font-awesome', name: 'lock' }}
            placeholder="Password"
            secureTextEntry={true}
          />
          <Button
            icon={<Icon name='login' color='#ffffff' />}
            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
            title=' Log In'
            onPress={() => navigation.navigate('Account',{ emailId })}
          />
          {/* <Text style={styles.signup}>Don't have an account?
          <TouchableOpacity onPress={()=>navigation.navigate('Registration')}>
            <Text style={styles.underline}>Signup</Text>
          </TouchableOpacity>
          </Text>  */}
        </Card>

      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    paddingHorizontal: 24,
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
  signup: {
    paddingTop: 10,
    paddingLeft: 50,
  },
  underline: {
    color: '#006fcf',
    textDecorationLine: 'underline'
  }
});