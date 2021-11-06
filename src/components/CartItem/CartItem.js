import { View, Text, KeyboardAvoidingView, Platform, Modal, TouchableOpacity, TextInput, FlatList, Image, StyleSheet, ToastAndroid, Linking } from 'react-native'
import { styles } from "./CartModalStyles";
import React from 'react'
import MinusSvg from "../../assets/svg/minus.svg";
import PlusSvg from "../../assets/svg/Plus.svg";
import { CartItems, decrementQuantity, incrementQuantity, removeAProductFromCart } from '../../../App';




const CartItem = ({ item, toggleCartModal }) => {
    const [quantity, setQuantity] = React.useState(item.quantity)
    const removeAProduct = removeAProductFromCart();
    const incrementProductQuantity = incrementQuantity();
    const decerementProductQuantity = decrementQuantity();
    const [cartItems, setCartItems] = React.useContext(CartItems)

    const increment = () => {
        incrementProductQuantity(item.productId)
        setQuantity(quantity + 1)
    }
    const decrement = () => {
        if (quantity == 1) {
            if (cartItems.length == 1) {
                toggleCartModal()
            }
            removeAProduct(item.productId)
            setQuantity(quantity - 1)
        } else {
            decerementProductQuantity(item.productId)
            setQuantity(quantity - 1)
        }
    }

    return (
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View style={{ flex: 1, marginRight: 20 }}>
                <Text style={[styles.font5, { marginTop: 5 }]} >{item.productName}</Text>
                <Text style={[styles.font5, { marginTop: 5 }]} >{item.points * item.quantity} pts</Text>
            </View>
            <View style={styles.quantity}>
                <TouchableOpacity
                    disabled={quantity > 0 ? false : true}
                    onPress={decrement}
                    style={{ padding: 3, paddingVertical: 8 }}>
                    <MinusSvg />
                </TouchableOpacity>

                <Text style={styles.font5} >{quantity}</Text>
                <TouchableOpacity
                    onPress={increment}
                    style={{ padding: 3 }}>
                    <PlusSvg />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CartItem


