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

export default function PaintCart(){
        const navigation = useNavigation();
        return (
            <ScrollView style={styles.container}>
                <Navbar onClick={() => navigation.openDrawer()} />
                <Card containerStyle={[styles.sectionContainer]}>
                <Card.Image source={require('../assets/deal4.jpeg')} />
                <Card.Title style={{ marginBottom: 10, marginTop: 10}}>
                    Buddha Religious Panel Painting
                </Card.Title>
                <ListItem>
                <Icon name={"circle"} type="material-community" color="grey" size={10} />
                    <ListItem.Content>
                        <ListItem.Title>Theme: Modern Art</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                <ListItem>
                <Icon name={"circle"} type="material-community" color="grey" size={10} />
                    <ListItem.Content>
                        <ListItem.Title>Frame Included</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                <ListItem>
                <Icon name={"circle"} type="material-community" color="grey" size={10} />
                    <ListItem.Content>
                        <ListItem.Title>W x H: 18 inch x 12 inch</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                <ListItem>
                    <Icon name={"circle"} type="material-community" color="grey" size={10} />
                    <ListItem.Content>
                        <ListItem.Title>Type: Digital Reprint</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                <Card.Divider />
                <Button
                    buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: '#fb641b' }}
                    title='PLACE ORDER'
                    onPress={()=>{AsyncStorage.setItem('amount','99'), navigation.navigate('Checkout')}}
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