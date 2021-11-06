import React from 'react'
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { styles } from "./SelectVariantStyles";
import Headers from "../../components/Header/Header";
import { Colors, Constants, Fonts, ScreenNames, Server } from '../../global';
import { Variantsizedata, feedsSaveddata } from '../../components/DummyData/DummyDataScreen';
import ViewCart from '../../components/ViewCart/ViewCart';
import { globalStyles } from '../../global/globalStyles';
import CartModal from '../../components/CartModal/CartModal';
import CustomToastAlert from '../../components/CustomToastAlert/CustomToastAlert';
import axios from 'axios';
import { BASE_URL } from '../../global/server';
import Carousel, {
    Pagination
} from 'react-native-x-carousel';
import { addAProductToCart, CartItems } from '../../../App';
import { SCREEN_WIDTH } from '../../global/constants';
import { getService } from '../../services/getService';

const SelectVariantScreen = ({ productId, route, params }) => {

    //state
    const [selectVariant, setSelectVariant] = React.useState();
    const [addCart, setAddCart] = React.useState(false);
    const [showAlert, setShowAlert] = React.useState(false);
    const [cartItems, setCartItems] = React.useContext(CartItems)

    const [productDetail, setProductDetail] = React.useState(null)

    //function 


    const addAProduct = addAProductToCart();

    const ProductDetail = async () => {
        // const response = await axios.get(`${Server.BASE_URL}/products/${route.params.productId}`)
        // setProductDetail(response.data)

        const req = `/products/${route.params.productId}`
        getService(req).then((response) => {
            setProductDetail(response.data)
        })

    }

    const renderItem = (data) => {
        return (
            <View style={{ height: 210, width: Constants.SCREEN_WIDTH - 40, borderRadiust: 10, backgroundColor: Colors.WHITE, elevation: 1 }}>
                <Image source={{ uri: `${BASE_URL}/products/${productDetail.productId}/otherImage/${data}` }} style={{ height: "100%", width: "100%", borderRadius: 10 }} resizeMode="contain" />
            </View>
        )
    }


    React.useEffect(() => {
        ProductDetail()
    }, [])

    const addToCart = () => {
        addAProduct({
            "productId": productDetail.productId,
            "productName": productDetail.productName,
            "productDesc": productDetail.productDesc,
            "points": productDetail.points,
            "quantity": 1,
            "thumbnailImage": productDetail.thumbnailImage,
        })
    }

    const _toggleCartModal = () => {
        setAddCart(!addCart)
    }
    return (
        <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
            <Headers name={productDetail && productDetail.productName} backgroundColor={true} />
            <ScrollView style={{ marginHorizontal: 20, marginVertical: 20 }} showsVerticalScrollIndicator={false}>
                <View
                    style={{ flex: 1 }}
                >
                    {
                        productDetail &&
                        <Carousel
                            pagination={Pagination}
                            renderItem={renderItem}
                            // autoplay={true}
                            data={productDetail.otherImageName}

                        />
                    }
                </View>
                <View style={{ flex: 1 }}>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 30 }}>
                        <View style={{ width: SCREEN_WIDTH / 1.5 }}>
                            <Text style={styles.font2}>{productDetail && productDetail.productName}</Text>
                            {/* <Text style={styles.font3}>Fashion</Text> */}
                        </View>
                        <View style={{ flex: 1, marginLeft: 10, alignItems: "flex-end" }}>
                            <Text style={styles.font4}>{productDetail && productDetail.points} pts</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={styles.font5}>Product Description</Text>
                        <View>
                            <Text style={styles.font6}>{productDetail && productDetail.productDesc}</Text>
                        </View>
                    </View>
                </View>


            </ScrollView>
            {
                cartItems
                &&
                cartItems.length > 0
                &&
                <View style={{ marginBottom: 10, position: "absolute", bottom: 0, left: 0, right: 0 }}>
                    <ViewCart />
                </View>
            }
            <TouchableOpacity style={[globalStyles.button, {
                marginHorizontal: 30, height: 40, marginBottom: cartItems
                    &&
                    cartItems.length > 0 ? 70 : 0
            }]}
                onPress={addToCart}>
                <Text style={[globalStyles.buttonText, { fontFamily: Fonts.SEMIBOLD }]}>Add to Cart</Text>
            </TouchableOpacity>

        </View>
    )
}

export default SelectVariantScreen


