import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors, Fonts, ScreenNames } from '../../global';
import ShoppingBagSvg from "../../assets/svg/cart.svg"
import { SCREEN_WIDTH } from '../../global/constants';
import { useNavigation } from '@react-navigation/core';
import { BASE_URL } from '../../global/server';
import { addAProductToCart, CartItems, removeAProductFromCart } from '../../../App';
import AddedToCartSvg from '../../assets/svg/checked';

const FreeShopsCard = ({ item, _toggleCartModal }) => {
  //function
  const navigation = useNavigation()


  // console.warn("CartItems", CartItems.);
  const [cartItems, setCartItems] = React.useContext(CartItems)

  const addAProduct = addAProductToCart();
  const removeAProduct = removeAProductFromCart();

  const [isAddedIntoCart, setAddedIntoCart] = React.useState(false)

  const goSelectVariant = () => {
    navigation.navigate(ScreenNames.SELECTVARIANT_SCREEN, { productId: item.productId })
  }

  const addProductToCart = () => {
    if (isAddedIntoCart) {


      removeAProduct(item.productId)
    } else {


      addAProduct({
        "productId": item.productId,
        "productName": item.productName,
        "productDesc": item.productDesc,
        "points": item.points,
        "quantity": 1,
        "thumbnailImage": item.thumbnailImage,
      })
    }
  }

  React.useEffect(() => {
    const res = cartItems.filter(e => e.productId == item.productId)
    if (res.length > 0) {
      setAddedIntoCart(true)
    } else {
      setAddedIntoCart(false)
    }
  }, [cartItems])
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={goSelectVariant}
      style={{ marginBottom: 20 }}>
      <View style={{ height: 180, borderRadius: 10, width: SCREEN_WIDTH / 2 - 40, marginHorizontal: 10 }}>
        <Image source={{ uri: `${BASE_URL}/products/${item.productId}/${item.thumbnailImage}/thumbnailImage` }} style={{ height: "100%", width: "100%", borderRadius: 10 }} />
        <View style={{ position: "absolute", bottom: -22, right: -6 }}>
          <TouchableOpacity
            onPress={addProductToCart}
            style={{ height: 50, width: 45, alignItems: "center", justifyContent: "center" }}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          >
            {
              isAddedIntoCart
                ?
                <View style={{ backgroundColor: Colors.BLACK, height: 34, width: 34, borderRadius: 10, alignItems: "center", justifyContent: "center" }}>
                  <AddedToCartSvg />
                </View>
                :
                <ShoppingBagSvg />

            }
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginHorizontal: 10, marginTop: 15, width: SCREEN_WIDTH / 2 - 40 }}>
        <Text style={styles.font1} numberOfLines={1}>{item.fasionType}</Text>
        <Text style={styles.font2} numberOfLines={2}>{item.productName}</Text>
        <Text style={styles.font3} numberOfLines={1}>{item.PriceofProduct}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default FreeShopsCard

const styles = StyleSheet.create({
  font1: { fontSize: 12, fontFamily: Fonts.BOLD, color: Colors.ONYX_60 },
  font2: { fontSize: 14, fontFamily: Fonts.BOLD, color: Colors.JUNGLE_BLACK },
  font3: { fontSize: 14, fontFamily: Fonts.BOLD, color: Colors.JUNGLE_BLACK }
})
