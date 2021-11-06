import moment from 'moment';
import React from 'react';
import { FlatList, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { Colors, Fonts } from '../../global';
import PdfDocument from '../PdfDocument/PdfDocument';
import SendBox from '../SendBox/SendBox';


const MessageBox = ({ item, userId, userName, checkPermission, pdfDownload }) => {
	console.warn("item ", item.pdf);
	return (
		// const renderItem = ({ item, index }) => (
		<View style={{ flex: 1, marginVertical: 5, alignItems: item.userId == userId ? "flex-end" : "flex-start" }}>
			<View style={{ flex: 1 }}>

				{
					item.imageUrl || item.DocumentUrl
						?
						<View style={{ flex: 1, }}>
							<View style={{ alignItems: "flex-end" }}>
								<Text style={styles.font7}>{moment(item.time).format('LT')}</Text>
							</View>
							<SendBox
								userName={userName}
								imagePath={item.imageUrl}
								item={item}
								checkPermission={checkPermission}
							/>

						</View>

						: item.message ?

							<View style={{ flex: 1 }}>
								<View style={{ alignItems: "flex-end" }}>
									<Text style={styles.font7}>{moment(item.time).format('LT')}</Text>
								</View>
								<View style={{
									padding: 10,
									// width: 100,
									maxWidth: 200,
									borderTopLeftRadius: item.userId == userId ? 0 : 7,
									borderTopRightRadius: item.userId == userId ? 7 : 0,
									borderBottomRightRadius: 7,
									borderBottomLeftRadius: 7,
									backgroundColor: item.userId == userId ? "#fff0bc" : "#ffffff"
									// backgroundColor: "red"
								}}>
									<Text style={styles.font8}>{item.message}</Text>
								</View>
							</View>

							:
							item.pdf ?

								<View View style={{ flex: 1 }}>
									<PdfDocument />
									<View style={{ alignItems: "flex-end" }}>
										<Text style={styles.font7}>{moment(item.time).format('LT')}</Text>
									</View>
								</View>
								:
								null


				}
				{/* {console.warn("tee",item.pdf)} */}

			</View>


		</View>
	)
};
const mapStateToProps = state => ({
	userId: state.user.userId,
})
export default connect(mapStateToProps, null)(MessageBox);


const styles = StyleSheet.create({
	chatBox: {
		// flex: 1,

	},
	font7: {
		fontSize: 10, fontFamily: Fonts.BOLD, color: Colors.GRAY_DARK
	},
	font8: {
		fontSize: 15, fontFamily: Fonts.SEMIBOLD, color: Colors.BLACK
	}
})

