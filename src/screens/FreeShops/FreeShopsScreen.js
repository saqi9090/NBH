import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { feedsSaveddata, FreePost } from '../../components/DummyData/DummyDataScreen';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { Colors, Server } from '../../global';
import Headers from "../../components/Header/Header";
// import ViewCart from '../../components/ViewCart/ViewCart';
import { styles } from "./FreeShopsStyles"
import VariantModal from '../../components/VariantModal/VariantModal';
import CartModal from '../../components/CartModal/CartModal';
import CustomToastAlert from '../../components/CustomToastAlert/CustomToastAlert';
import FreeShopsCard from '../../components/FreeShopscard/FreeShopsCard';
import ViewCart from '../../components/ViewCart/ViewCart';
import axios from 'axios';
import { CartItems } from '../../../App';
import CustomAlert from '../../components/CustomAlert/CusomAlert';
import AddressListModal from '../../components/AddressListModal/AddressListModal';
import { connect } from 'react-redux';
import { getService } from '../../services/getService';
const FreeShopsScreen = ({ navigation, }) => {

    const [cartItems, setCartItems] = React.useContext(CartItems)
    const [addCart, setAddCart] = React.useState(false);
    const [show, sethide] = React.useState(false);
    const [showAlert, setShowAlert] = React.useState(false);
    const [activeProduct, setActiveProduct] = React.useState()


    const [allAddress1, setallAddress] = React.useState(null)
    const [addressList, setaddressList] = React.useState(false);
    const [alertTitle, setAlertTitle] = React.useState("");
    const [alertText, setAlertText] = React.useState('');
    const [customAlertVisible, setCustomAlertVisible] = React.useState(false);

    const toggleCustomAlertVisibility = () => { setCustomAlertVisible(!customAlertVisible) }
    const leftButtonFunction = () => {
        toggleCustomAlertVisibility()
    }


    const addressToggle = () => {
        setaddressList(!addressList)
    }

    const activeProducts = async () => {

        const req = `/products/active`
        getService(req).then((response) => {
            if (response.code == 200) {
                setActiveProduct(response.data)
            } else {
                setAlertTitle("Alert")
                setAlertText(response.message)
                toggleCustomAlertVisibility()
            }
        })


    }

    React.useEffect(() => {
        activeProducts()
    }, [])

    //function 

    const toggleCartModal = () => {
        setAddCart(!addCart)
    }

    return (
        <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
            <Headers name="Free Shop" backgroundColor={true} />
            <FlatList data={activeProduct}
                numColumns={2}
                style={{
                    marginHorizontal: 20, marginVertical: 10, marginBottom: 30
                    // cartItems && cartItems.length > 0 ? 90 : 30 
                }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <FreeShopsCard item={item} index={index} toggleCartModal={toggleCartModal} />
                )} />

            {
                cartItems
                &&
                cartItems.length > 0
                &&
                <View style={{ position: "absolute", right: 0, left: 0, bottom: 40, zIndex: 1, }}>
                    <ViewCart />
                </View>
            }
            {/* <CustomToastAlert showAlert={showAlert} setShowAlert={setShowAlert} /> */}

            <CustomAlert
                title={alertTitle}
                desc={alertText}
                leftButtonText={"Ok"}
                leftButtonFunction={leftButtonFunction}
                toggleCustomAlertVisibility={toggleCustomAlertVisibility}
                customAlertVisible={customAlertVisible}
            />

        </View>
    )
}

// export default FreeShopsScreen;


const mapStateToProps = state => ({
    userId: state.user.userId,
    phNo: state.user.phNo,
    name: state.user.name,
    emailRedux: state.user.email,
    userAddressId: state.user.addressId,
    selectAddress: state.user.selectAddress,

});

const mapDispatchToProps = (dispatch) => ({ dispatch, });

export default connect(mapStateToProps, mapDispatchToProps)(FreeShopsScreen);

