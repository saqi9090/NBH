import React, { useEffect, useState } from 'react'
import { View, Text, Image, FlatList } from 'react-native'
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { styles } from "./AddvertiseProductStyles";
import Header from "../../components/Header/Header";
import { Colors, ScreenNames } from '../../global';
import SearchComponent from "../../components/SearchComponent/SearchComponent"
import { SCREEN_WIDTH } from '../../global/constants';
import { ProductCatalogueData, registerdata } from '../../components/DummyData/DummyDataScreen';
import MyAsklist from '../../components/MyAsklist/MyAsklist';
import MyCatalogueCard from '../../components/MyCatalogueCard/MyCatalogueCard';
import AddButton from '../../components/AddButton/AddButton';
import Advertisecard from '../../components/Advertisecard/Advertisecard';
import { connect } from 'react-redux';
//service 
import * as service from "./AddvertiseProductService";
import { getService } from '../../services/getService';
import CustomAlert from '../../components/CustomAlert/CusomAlert';

const AddvertiseProductScreen = ({
	navigation, userId
}) => {

	//states
	const [adData, setAdData] = useState(null);
	const [alertTitle, setAlertTitle] = React.useState("");
	const [alertText, setAlertText] = React.useState('');
	const [customAlertVisible, setCustomAlertVisible] = React.useState(false);

	const toggleCustomAlertVisibility = () => { setCustomAlertVisible(!customAlertVisible) }
	const leftButtonFunction = () => {
		toggleCustomAlertVisibility()
	}

	//function : service function
	const getAllAdvertisementByUserId = () => {

		const req = `/premiumPost/${userId}`
		getService(req).then((response) => {
			if (response.code == 200) {
				setAdData(response.data);
			} else {
				setAdData([]);
				setAlertTitle("Alert")
				setAlertText(response.message)
				toggleCustomAlertVisibility()
			}
		})
	}

	useEffect(() => {
		getAllAdvertisementByUserId()
	}, [])

	//UI
	return (
		<View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
			<FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
			<View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
				<View style={{
					backgroundColor: Colors.WHITE, borderBottomLeftRadius: 20, borderBottomRightRadius: 20,
				}}>

					<Header name={"Business Promotion"} backgroundColor={true} FilterIcon={false}
					/>

					{/* <View style={{ marginTop: 20, marginBottom: 20 }}>
                        <SearchComponent />
                    </View> */}
				</View>

				<FlatList
					data={adData && adData}
					showsVerticalScrollIndicator={false}
					numColumns={2}
					style={{ marginHorizontal: 20, width: SCREEN_WIDTH - 40, marginVertical: 10 }}
					renderItem={({ item, index }) => (
						<Advertisecard item={item} />
					)}
				/>
			</View>
			<View style={{ position: "absolute", right: 30, bottom: 50 }}>
				<AddButton onpressFun={() => navigation.navigate(ScreenNames.POSTADVERTISE_SCREEN, { getAllAdvertisementByUserId: getAllAdvertisementByUserId })} />
			</View>

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

const mapStateToProps = state => ({
	userId: state.user.userId,
	userName: state.user.name,
	userImage: state.user.thumbnailImage,
})
export default connect(mapStateToProps, null)(AddvertiseProductScreen);
