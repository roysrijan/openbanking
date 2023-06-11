import React from "react";
import { 
    ScrollView,
    Text,
    StyleSheet
} from "react-native";
import Navbar from "../components/Navbar";
import { useNavigation } from "@react-navigation/native";
import { Card, ListItem, Button, Icon, Overlay  } from 'react-native-elements';
import AsyncStorage from "@react-native-community/async-storage";

export default function Cart(){
        const navigation = useNavigation();
        return (
            <ScrollView style={styles.container}>
                <Navbar onClick={() => navigation.openDrawer()} />
                <Card containerStyle={[styles.sectionContainer]}>
                <Card.Image source={{uri: 'https://fdn2.gsmarena.com/vv/pics/oppo/oppo-a12-1.jpg'}} />
                <Card.Title style={{ marginBottom: 10, marginTop: 10}}>
                    OPPO A12 (black,32 GB)
                </Card.Title>
                <ListItem>
                <Icon name={"circle"} type="material-community" color="grey" size={10} />
                    <ListItem.Content>
                        <ListItem.Title>6 GB RAM | 128 GB ROM</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                <ListItem>
                <Icon name={"circle"} type="material-community" color="grey" size={10} />
                    <ListItem.Content>
                        <ListItem.Title>16.23 cm (6.39 inch) Full HD+ Display</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                <ListItem>
                <Icon name={"circle"} type="material-community" color="grey" size={10} />
                    <ListItem.Content>
                        <ListItem.Title>48MP + 13MP + 8MP | 20MP Front Camera</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                <ListItem>
                    <Icon name={"circle"} type="material-community" color="grey" size={10} />
                    <ListItem.Content>
                        <ListItem.Title>4000 mAh Li-polymer Battery</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                <Card.Divider />
                <Button
                    buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: '#fb641b' }}
                    title='PLACE ORDER'
                    onPress={()=>{AsyncStorage.setItem('amount','9999'), navigation.navigate('Checkout')}}
                />
            </Card>
            </ScrollView>
        );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
});