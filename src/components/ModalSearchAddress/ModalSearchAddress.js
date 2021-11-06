import React from 'react';
import { KeyboardAvoidingView, Modal, Text, TouchableOpacity, View } from 'react-native';

//svgs
import CancelSvg from "../../assets/svg/crossSmall.svg";
import LocationSvg from "../../assets/svg/locationHome.svg";
//my imports
import { styles } from './ModalSearchAddressStyle';
import { useNavigation } from '@react-navigation/native';
import { Colors, Fonts, ScreenNames } from '../../global';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const SearchAddressModal = ({
	toggleSearchAddressModal,
	searchAddressModalVisibility,
	setCoordinates,
	checkAvailability,
	setUserAddress,
	setAddress,
	requestPermission
}) => {

	return (

		<Modal
			onRequestClose={toggleSearchAddressModal}
			animationType="slide"
			transparent={true}
			statusBarTranslucent={true}
			visible={searchAddressModalVisibility}>

			<View style={styles.centeredView}>
				<KeyboardAvoidingView behavior="padding" >
					<View style={[styles.modalView]}>
						<View style={{
							backgroundColor: Colors.PRIMARY,
							flexDirection: 'row',
							height: 50,
							borderRadius: 10,
							justifyContent: 'space-between',
						}}>
							<Text style={{
								paddingLeft: 20,
								paddingTop: 15,
								paddingBottom: 15,
								fontFamily: Fonts.BOLD,
								fontSize: Fonts.SIZE_16,
								color: Colors.WHITE,
								letterSpacing: 0.2,
							}}>Search location</Text>

							<TouchableOpacity
								onPress={toggleSearchAddressModal}
								style={{
									paddingRight: 20,
									justifyContent: 'center',
								}}>
								<CancelSvg />
							</TouchableOpacity>
						</View>
						{/* <View> */}
						<TouchableOpacity
							onPress={() => {
								toggleSearchAddressModal()
								requestPermission()
							}
							}
							style={styles.currentLocation}>
							<LocationSvg />
							<Text style={{ color: Colors.PRIMARY, paddingLeft: 10, fontFamily: Fonts.MEDIUM, fontSize: Fonts.SIZE_16 }}>Use current location</Text>
						</TouchableOpacity>
						<GooglePlacesAutocomplete
							placeholder='Search for your location...'
							onPress={(data, details = null) => {
								const result = details.address_components.map(e => e.long_name)
								setAddress(details.formatted_address)
								setUserAddress(result)
								setCoordinates([details.geometry.location.lng, details.geometry.location.lat])
								checkAvailability(details.geometry.location.lat, details.geometry.location.lng)
								toggleSearchAddressModal();
								// setchangeaddress(data.description)
								// getLatLongByAddress(data.description);
							}}
							query={{
								key: 'AIzaSyB1ZrDpEqK0-3kDn7APiOnn-RA8ia8pzww',
								language: 'en',
							}}
							minLength={2}
							autoFocus={true}
							returnKeyType={'default'}
							fetchDetails={true}
							styles={{
								textInput: {
									height: 38,
									color: Colors.PRIMARY,
									fontSize: 16,
									paddingLeft: 20,
									borderColor: Colors.PRIMARY,
									borderRadius: 5,
									borderWidth: 1,
									margin: 20,
									backgroundColor: Colors.WHITE
								},
								predefinedPlacesDescription: {
									color: 'red',
								},
							}}
						>
							<View style={{ top: 28, left: 28, position: 'absolute', }}>
								{/* <Search_Icon /> */}
							</View>
						</GooglePlacesAutocomplete>
						{/* </View> */}
						{/* <View style={styles.searchInput}>
            <Search_Icon />
            <TextInput
              placeholder={'Search for your location...'}
              style={styles.textInput} />
          </View> */}

						<View>
						</View>
					</View >
				</KeyboardAvoidingView>

			</View>
			{/* </KeyboardAvoidingView> */}
		</Modal>
	);
}
export default SearchAddressModal;
