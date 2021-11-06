import axios from 'axios'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { CartItems } from '../../../App'
import { Colors, Fonts, Server } from '../../global'
import { getService } from '../../services/getService'
import AddressListModal from '../AddressListModal/AddressListModal'
import CartModal from '../CartModal/CartModal'
import CustomAlert from '../CustomAlert/CusomAlert'

const ViewCart = ({ viewOnPress, userId }) => {


    const [cartItems, setCartItems] = React.useContext(CartItems)
    const [totalAmount, setTotalAmount] = React.useState(0)
    const [addCart, setAddCart] = React.useState(false);
    const [addressList, setaddressList] = React.useState(false);
    const [userAddress, setUserAddress] = React.useState([])

    const [alertTitle, setAlertTitle] = React.useState("");
    const [alertText, setAlertText] = React.useState('');
    const [customAlertVisible, setCustomAlertVisible] = React.useState(false);

    const toggleCustomAlertVisibility = () => { setCustomAlertVisible(!customAlertVisible) }
    const leftButtonFunction = () => {
        toggleCustomAlertVisibility()
    }
    const getUserAddress = async () => {

        const req = `/users/${userId}/allAddress`
        getService(req).then((response) => {
            if (response.code == 200) {
                setUserAddress(response.data)
            } else {
                setAlertTitle("Alert")
                setAlertText(response.message)
                toggleCustomAlertVisibility()
            }
        })

    }
    const addressToggle = () => {
        setaddressList(!addressList)
    }
    const toggleCartModal = () => {
        setAddCart(!addCart)
    }
    React.useEffect(() => {
        getUserAddress()
    }, [])
    React.useEffect(() => {
        let total = 0
        cartItems.map(e => {
            total += e.quantity * e.points
        })
        setTotalAmount(total);
    }, [cartItems])
    return (
        <TouchableOpacity
            onPress={toggleCartModal}
            style={{ height: 45, backgroundColor: Colors.PRIMARY, borderRadius: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, marginHorizontal: 20 }}>
            <Text style={styles.font1} >{cartItems.length} item</Text>
            <Text style={styles.font2} >View Cart</Text>
            <Text style={styles.font3} >{totalAmount}</Text>
            <CartModal
                getAddress={getUserAddress}
                addCart={addCart}
                toggleCartModal={toggleCartModal}
                addressLength={userAddress.length}
                addressToggle={addressToggle}
            />
            <AddressListModal
                toggleCartModal={toggleCartModal}
                addressToggle={addressToggle}
                userAddress={userAddress}
                addressList={addressList}
            />

            <CustomAlert
                title={alertTitle}
                desc={alertText}
                leftButtonText={"Ok"}
                leftButtonFunction={leftButtonFunction}
                toggleCustomAlertVisibility={toggleCustomAlertVisibility}
                customAlertVisible={customAlertVisible}
            />
        </TouchableOpacity>
    )
}
const mapStateToProps = state => ({
    userId: state.user.userId,

});

const mapDispatchToProps = (dispatch) => ({ dispatch, });

export default connect(mapStateToProps, mapDispatchToProps)(ViewCart)
const styles = StyleSheet.create({
    font1: { fontSize: 14, fontFamily: Fonts.SEMIBOLD, color: Colors.JUNGLE_BLACK },
    font2: { fontSize: 20, fontFamily: Fonts.BOLD, color: Colors.JUNGLE_BLACK },
    font3: { fontSize: 14, fontFamily: Fonts.SEMIBOLD, color: Colors.JUNGLE_BLACK }
})
