import { useNavigation } from "@react-navigation/native";
import { SearchBar, Avatar, Card, Icon } from "@rneui/themed";
import React, { useState } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";

export default function BankList(){
    const navigation = useNavigation();
    const [search, setSearch] = useState("");

    const updateSearch = (search) => {
        setSearch(search);
    };
    const list = [
        {name: 'State Bank', uri: 'https://bank.sbi/o/SBI-Theme/images/custom/logo.png'},
        {name: 'Open Bank', uri: 'https://i.redd.it/msimj5gsoxn01.png'},
        {name: 'Yes', uri: 'https://th.bing.com/th/id/R.7e6cb234fafae69a58b7cd00712578e8?rik=QB3kDsyO8WiyGg&riu=http%3a%2f%2flogos-download.com%2fwp-content%2fuploads%2f2016%2f06%2fYes_Bank_logo.png&ehk=8PHqelTg6dAn4v2Ee2BdZo6yP7R25CiDdhtLCapkpog%3d&risl=&pid=ImgRaw&r=0'},
        {name: 'Axis', uri: 'https://www.nfcw.com/wp-content/uploads/2020/06/axis-bank-logo.jpg'},
        {name: 'ABC', uri: 'https://cdn.onlinewebfonts.com/svg/img_456573.png'},
        {name: 'HDFC', uri: 'https://cdn.onlinewebfonts.com/svg/img_456573.png'}
    ];
        return (
            <View>
                
                <Text style={[styles.profileName, styles.title]}>Select Bank</Text>
                <SearchBar
                    placeholder="Type Here..."
                    onChangeText={updateSearch}
                    value={search}
                    lightTheme={true}
                    
                />
                <View style={{display:'flex', flexWrap: 'wrap', flexDirection: 'row'}}>
                  {list
                  .filter(ele=>!search || ele.name.includes(search))
                  .map((ele, i)=>
                  <TouchableOpacity key={i} onPress={()=>navigation.navigate('Login')}>
                  <Card containerStyle={{width: 175, borderRadius: 15}}>
                    <Card.Title></Card.Title>
                    <Card.Image style={{height: 50}} source={{uri: ele.uri}} />
                    <Text style={[styles.profileName,styles.bank]}>{ele.name}</Text>
                  </Card>
                  </TouchableOpacity>)}
                </View>
            </View>
        );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    profileName: {
        fontSize: 20,
        color: '#000',
        fontFamily: 'SFpro-Bold',
      },
    bank:{
        marginTop: 50,
        marginLeft: 50
      },
    title:{
        marginTop: 50,
        marginLeft: 10,
    }
});