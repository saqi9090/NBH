import moment from 'moment'
import React from 'react'
import { FlatList, StyleSheet, Text, View, Image } from 'react-native'
import { Colors, Fonts } from '../../global'
import { SCREEN_WIDTH } from '../../global/constants'
import { BASE_URL } from '../../global/server'
import { keyworddata } from '../DummyData/DummyDataScreen'

const Advertisecard = ({ item }) => {

	return (
		<View style={{ marginVertical: 10 }}>
			<View style={[styles.imageBox]}>
				<Image
					source={{ uri: `${BASE_URL}/premiumPost/${item.premiumPostId}/${item.postImage}/postImage` }}
					style={{ height: "100%", width: "100%" }} />
			</View>
			{/* <View style={{ marginTop: 10, marginRight: 20, flex:1 }}> */}
			{/* <Text style={[styles.font1, { marginBottom: 5 }]}>{item.deatilname}</Text> */}
			<View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10, marginRight: 20, }}>
				<Text style={[styles.font3, { color: "#00000085" }]}>{moment(item.purchasedForDate).format("l")}</Text>
				{
					item.discountType == "POINTS"
						?
						<Text style={styles.font2} >{item.finalCharge}pts</Text>
						:
						<Text style={styles.font2} >₹{item.finalCharge}</Text>
				}
			</View>


			{/* </View> */}
		</View>
	)
}

export default Advertisecard

const styles = StyleSheet.create({
	imageBox: { height: 180, width: SCREEN_WIDTH / 2 - 30, marginRight: 20 },
	font1: { fontSize: 18, fontFamily: Fonts.BOLD, color: Colors.JUNGLE_BLACK },
	font2: { fontSize: 13, fontFamily: Fonts.BOLD, color: "#00000090" },
	font3: { fontSize: 13, fontFamily: Fonts.BOLD, color: "#00000090" },
	font4: { fontSize: 12, fontFamily: Fonts.REGULAR, color: Colors.JUNGLE_BLACK },
})


// <View style={{ flexDirection: "row", }}>

// <Text style={[styles.font2, { marginBottom: 7 }]} >{item.Price}</Text>
// <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 7, marginLeft: 20 }}>
//     <Text style={styles.font3} >MOQ:</Text>
//     <Text style={[styles.font3, { color: "#00000085" }]}>   {item.MAQ}</Text>
// </View>
// </View>