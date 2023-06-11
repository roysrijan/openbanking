import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native';
import { Avatar, Icon, ListItem } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import COLORS from '../../global/globalColors';
import Header from '../../components/Header';
import AsyncStorage from '@react-native-community/async-storage';
import { AccountList } from '../../shared/List';

export default function AccountandTransaction() {
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState();
  const [checked, setChecked] = useState([]);
  useEffect(()=>{
    async function get() {
      let accounts = await AsyncStorage.getItem('accounts');
      accounts = JSON.parse(accounts);
      setChecked(accounts?accounts:[]);
    }
    get();
  },[]);
  return (
    <>
      <Header isBack={true} />
      <ScrollView style={styles.sectionContainer}>
        <ListItem.Accordion
          content={
            <>
              <Icon name="account-balance" size={30} />
              <ListItem.Content>
                <ListItem.Title>Account and Transaction API</ListItem.Title>
              </ListItem.Content>
            </>
          }
          isExpanded={expanded}
          onPress={() => {
            setExpanded(!expanded);
          }}
        >
          {AccountList.map((l, i) => (
            <TouchableOpacity key={i}
              onPress={() => {
                if (checked.includes(l.name)) {
                  setChecked(prev => prev.filter(a => a !== l.name));
                  AsyncStorage.setItem('accounts', JSON.stringify(checked.filter(a => a !== l.name)));
                }
                else {
                  setChecked(prev => [...prev, l.name]);
                  AsyncStorage.setItem('accounts', JSON.stringify([...checked, l.name]));
                }
              }}
            >
              <ListItem bottomDivider>
                <ListItem.CheckBox
                  // Use ThemeProvider to change the defaults of the checkbox
                  iconType="material-community"
                  checkedIcon="checkbox-marked"
                  uncheckedIcon="checkbox-blank-outline"
                  checked={checked.includes(l.name)}
                  checkedColor={COLORS.blue}
                />
                <ListItem.Content>
                  <ListItem.Title>{l.name.replace('Account.','')}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron size={40} />
              </ListItem>
            </TouchableOpacity>
          ))}
        </ListItem.Accordion>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    flex: 0.9
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
});