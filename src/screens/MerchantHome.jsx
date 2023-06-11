import React from "react";
import { 
    View,
    Text,
    Image,
    ImageBackground,
    Dimensions,
    Button,
    StyleSheet
} from "react-native";
import { Container, Content, Row, } from 'native-base';

import Navbar from "../components/Navbar";
import AppSwiper from "../components/AppSwiper";
import SaleItem from "../components/SaleItem";
import DealCard from "../components/DealCard";
import { useNavigation } from "@react-navigation/native";
import Footer from "../components/Footer";

let SCREEN_WIDTH = Dimensions.get('window').width;


export default function MerchantHome (){
        const navigation = useNavigation();
        return (
            <Container>
                <Navbar onClick={() => navigation.openDrawer()} />
                <Content style={{ backgroundColor: '#d5d5d6', }} >
                    <AppSwiper />
                    <View 
                        style={{ flexDirection: 'row', height: SCREEN_WIDTH / 3, backgroundColor: '#fff' }} >
                        <SaleItem imageUri={require('../assets/sale_0.jpg')} />
                        <SaleItem imageUri={require('../assets/sale_1.jpg')} />
                        <SaleItem imageUri={require('../assets/sale_2.jpg')} />
                    </View>
                    <View style={{  flex: 1, height: 90, backgroundColor: '#2874f0', paddingHorizontal: 10, }} >
                        <ImageBackground 
                            source={require('../assets/deal_of_day_bg.jpg')}
                            style={{ width: '100%', height: '100%' }} >

                            <View 
                                style={{ flex: 1, flexDirection: 'row', alignItems: 'center', 
                                    justifyContent: 'space-between', backgroundColor: '#2874f090' }} >

                                <View>
                                    <Text style={{ fontSize: 18, color: '#fff' }} >Deal of the Day</Text>
                                    <Text style={{ color: '#fff' }} >16hr 32m remaning</Text>
                                </View>
                                
                                <Text style={{ backgroundColor: '#fff', fontWeight: '400', paddingVertical: 5, 
                                    paddingHorizontal: 10, borderRadius: 2 }} >
                                    View All
                                </Text>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={{  flex: 1, backgroundColor: '#2874f0', padding: 10, }} >
                        <View style={{  flex: 1, flexDirection: "row",  backgroundColor: '#fff', borderRadius: 5, flexWrap: 'wrap', justifyContent: 'space-between' }} >
                            <DealCard 
                                imageUri={require('../assets/deal1.jpeg')}
                                heading="Headphones&Speakers"
                                price="Under ₹1049"
                                onClick={()=>navigation.navigate('Viewcart')}
                            />
                            <DealCard 
                                imageUri={require('../assets/deal4.jpeg')}
                                heading="Digital Painting"
                                price="Under ₹99"
                                onClick={()=>navigation.navigate('ViewPaintcart')}
                            />
                            <DealCard 
                                imageUri={require('../assets/deal3.jpeg')}
                                heading="Mixers & Hand Blenders"
                                price="Under ₹699"
                                onClick={()=>navigation.navigate('Viewcart')}
                            />
                            <DealCard 
                                imageUri={{uri: 'https://fdn2.gsmarena.com/vv/pics/oppo/oppo-a12-1.jpg'}}
                                heading="Mobile & Accessories"
                                price="Under ₹9999"
                                onClick={()=>navigation.navigate('Viewcart')}
                            />

                        </View>
                    </View>
                </Content>
                <Footer />
            </Container>
        );
}

const styles = StyleSheet.create({
    slide: { 
        flex: 1, 
        width: SCREEN_WIDTH / 3,
    },
    image: { 
        width: null, 
        height: null, 
        flexGrow: 1, 
        resizeMode: 'contain',
    },
});