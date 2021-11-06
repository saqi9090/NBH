import React from 'react';
import { ScreenNames } from '../../global/index';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack'

//screens imports
// import HomeScreen from '../../screens/Home/HomeScreen';
import MyProfileScreen from '../../screens/MyProfile/MyProfileScreen';
import MyAccountScreen from '../../screens/MyAccount/MyAccountScreen';
import EditProfileScreen from '../../screens/EditProfile/EditProfileScreen';
// import HomepageScreen from '../../screens/Homepage/HomepageScreen';
import UploadAchivementScreen from '../../screens/UploadAchivement/UploadAchivementScreen';
import OrderDetailsScreen from '../../screens/OrderDetails/OrderDetailsScreen';
import ViewProductScreen from '../../screens/ViewProduct/ViewProductScreen';
import PostImageScreen from '../../screens/PostImage/PostImageScreen';
import AddCatalogueScreen from '../../screens/AddCatalogue/AddCatalogueScreen';
import CatalogueDetailScreen from '../../screens/CatalogueDetail/CatalogueDetailScreen';
import OrderListingScreen from '../../screens/OrderListing/OrderListingScreen';
import ProductCatalogueScreen from '../../screens/ProductCatalogue/ProductCatalogueScreen';
// import PostFeedsScreen from '../../screens/PostFeeds/PostFeedsScreen';
import CommentsScreen from '../../screens/Comments/CommentsScreen';
import NBHMemberDetailScreen from '../../screens/NBHMemberDetail/NBHMemberDetailScreen';
import SeacrhByTagScreen from '../../screens/SeacrhByTag/SeacrhByTagScreen';
// import HomeScreen from '../../screens/Home/HomeScreen';
import MyFollowingScreen from '../../screens/MyFollowing/MyFollowingScreen';
import WalletScreen from '../../screens/Wallet/WalletScreen';
import AddressListScreen from '../../screens/AddressList/AddressListScreen';
import InVoiceScreen from '../../screens/InVoice/InVoiceScreen';

enableScreens();
const stack = createNativeStackNavigator();

const BrandStack = () => {
	return (
		<stack.Navigator
			screenOptions={
				{
					headerShown: false
				}}
			initialRouteName={ScreenNames.MYACCOUNT_SCREEN}
		// initialRouteName='Test'
		>
			{/* <stack.Screen
				name={ScreenNames.HOME}
				component={HomeScreen} /> */}
			<stack.Screen name={ScreenNames.PROFILE} component={MyProfileScreen} />
			<stack.Screen name={ScreenNames.MYACCOUNT_SCREEN} component={MyAccountScreen} />
			<stack.Screen name={ScreenNames.EDITPROFILE_SCREEN} component={EditProfileScreen} />
			{/* <stack.Screen name={ScreenNames.HOME_SCREEN} component={HomeScreen} /> */}
			<stack.Screen name={ScreenNames.UPLOADACHIVEMETN_SCREEN} component={UploadAchivementScreen} />
			<stack.Screen name={ScreenNames.ORDERDETAILS_SCREEN} component={OrderDetailsScreen} />
			<stack.Screen name={ScreenNames.VIEWPRODUCT_SCREEN} component={ViewProductScreen} />
			<stack.Screen name={ScreenNames.MYPROFILE_SCREEN} component={MyProfileScreen} />
			<stack.Screen name={ScreenNames.POSTIMAGE_SCREEN} component={PostImageScreen} />
			<stack.Screen name={ScreenNames.ADDCATALOGUE_SCREEN} component={AddCatalogueScreen} />
			<stack.Screen name={ScreenNames.CATALOGUEDETAIL_SCREEN} component={CatalogueDetailScreen} />
			<stack.Screen name={ScreenNames.ORDERLISTING_SCREEN} component={OrderListingScreen} />
			<stack.Screen name={ScreenNames.PRODUCTCATALOGUE_SCREEN} component={ProductCatalogueScreen} />
			<stack.Screen name={ScreenNames.MYFOLLOWING_SCREEN} component={MyFollowingScreen} />
			<stack.Screen name={ScreenNames.COMMENTS_SCREEN} component={CommentsScreen} />
			<stack.Screen name={ScreenNames.NBHMEMBERDETAIL_SCREEN} component={NBHMemberDetailScreen} />
			<stack.Screen name={ScreenNames.SEARCHBYTAG_SCREEN} component={SeacrhByTagScreen} />
			<stack.Screen name={ScreenNames.ADDRESS_LIST_SCREEN} component={AddressListScreen} />

			<stack.Screen name={ScreenNames.INVOICE} component={InVoiceScreen} />



			<stack.Screen name={ScreenNames.WALLET_SCREEN} component={WalletScreen} />





		</stack.Navigator>
	);
};
export default BrandStack;