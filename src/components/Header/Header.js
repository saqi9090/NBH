import React from 'react';
import {
	Text,
	View,
	TouchableOpacity,
} from 'react-native';

//my imports
import { styles } from './styles'
import { useNavigation } from '@react-navigation/native';
// import EditProfileSvg from '../../assets/svg/EditProfile';
import BackSvg from "../../assets/svg/back icon.svg";
import { Fonts, Colors } from "../../global/index";
import FilterSvg from "../../assets/svg/filter.svg";
import HomeSvg from "../../assets/svg/whitehouse.svg";
import YellowHomeSvg from "../../assets/svg/yellowhouse.svg";
import RefreshSvg from "../../assets/svg/refresh.svg"
import DeleteSvg from "../../assets/svg/Delete"

import WhiteHomeSvg from "../../assets/svg/home-unfill.svg";



// import Back from '../../assets/svg/Back';

const Header = ({
	name,
	activateLeftIcon = true,
	activateRightIcon,
	backgroundColor,
	HomeIcon,
	FilterIcon,
	WhiteHomeIcon,
	YellowHomeIcon,
	filterOnpress,
	YellowHomeOnpress,
	notificationIcon,
	HomeOnpress,
	WhiteHomeOnpress,
	NotificationOnpress,
	updateBtn,
	NotificationOnpressDelete,
	UpdateOnpress
}) => {

	const navigation = useNavigation();

	const goBack = () => navigation.goBack();

	return (
		// backgroundColor: true= white ,false=primary 
		<View style={[styles.container, { backgroundColor: backgroundColor ? Colors.WHITE : Colors.PRIMARY }]}>
			{/* header left */}

			{/* <View style={styles.NBHContainer}> */}
			<View style={{ alignItems: "center", justifyContent: "space-between", flexDirection: "row", flex: 1, marginHorizontal: 20 }}>
				<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
					{activateLeftIcon == true ?
						<TouchableOpacity onPress={goBack} hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}>
							<BackSvg />
						</TouchableOpacity>
						:
						null

					}
					<Text style={[styles.headerText, { marginLeft: 10, marginRight: 20 }]} numberOfLines={1}>{name}</Text>
				</View>

				<View style={{ flexDirection: "row", alignItems: "center" }}>
					{updateBtn ?
						<TouchableOpacity style={{
							height: 30, width: 50,
							backgroundColor: Colors.PRIMARY, alignItems: "center",
							justifyContent: "center", borderRadius: 7,
							marginRight: 10
						}}
							onPress={() => UpdateOnpress()}
						>
							<Text style={{ fontFamily: Fonts.BOLD, color: Colors.JUNGLE_BLACK, fontSize: 12 }}>Update</Text>
						</TouchableOpacity>
						:
						null
					}
					{FilterIcon
						?
						<TouchableOpacity
							hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}
							onPress={() => filterOnpress()}>

							<FilterSvg />
						</TouchableOpacity>
						: HomeIcon ?
							<TouchableOpacity hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }} onPress={() => HomeOnpress()}>

								<HomeSvg />
							</TouchableOpacity>
							:

							YellowHomeIcon ?
								<TouchableOpacity hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }} onPress={() => YellowHomeOnpress()}>

									<YellowHomeSvg />
								</TouchableOpacity>
								:
								WhiteHomeIcon ?
									<TouchableOpacity hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }} onPress={() => WhiteHomeOnpress()}>
										<WhiteHomeSvg />

									</TouchableOpacity>
									:
									notificationIcon ?
										<View style={{ flexDirection: "row" }}>

											<TouchableOpacity style={{ marginRight: 10 }} hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }} onPress={() => NotificationOnpress()}>
												<RefreshSvg
												/>

											</TouchableOpacity>
											<TouchableOpacity hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }} onPress={() => NotificationOnpressDelete()}>
												<DeleteSvg
												/>

											</TouchableOpacity>
										</View>
										:
										null

					}

				</View>

			</View>


		</View >
	);
}

export default React.memo(Header);
