import React from 'react';
import { ScreenNames } from '../../global/index';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
//screens imports
import HomeScreen from '../../screens/Home/HomeScreen';
import NBHMemberScreen from '../../screens/NBHMember/NBHMemberScreen';
import SeacrhByTagScreen from '../../screens/SeacrhByTag/SeacrhByTagScreen';
import NBHMemberDetailScreen from '../../screens/NBHMemberDetail/NBHMemberDetailScreen';
import NBHBusnessDetailScreen from '../../screens/NBHBusnessDetail/NBHBusnessDetailScreen';
// import PostFeedsScreen from '../../screens/MyFollowing/MyFollowingScreen';
// import SavedFeedsScreen from '../../screens/SavedFeeds/SavedFeedsScreen';
import AddPostScreen from '../../screens/AddPost/AddPostScreen';
// import ProductScreen from '../../screens/Products/ProductScreen';
import SelectVariantScreen from '../../screens/SelectVariant/SelectVariantScreen';
import PostImageScreen from '../../screens/PostImage/PostImageScreen';
// import OrderDetailsScreen from '../../screens/OrderDetails/OrderDetailsScreen';
import OrderListingScreen from '../../screens/OrderListing/OrderListingScreen';
import CommentsScreen from '../../screens/Comments/CommentsScreen';
import TimeLineScreen from '../../screens/TimeLine/TimeLineScreen';
import CatalogueDetailScreen from '../../screens/CatalogueDetail/CatalogueDetailScreen';
import AddCatalogueScreen from '../../screens/AddCatalogue/AddCatalogueScreen';
import AddClientsScreen from '../../screens/AddClients/AddClientsScreen';
import MyAskListScreen from '../../screens/MyAskList/MyAskListScreen';
import ProductCatalogueScreen from '../../screens/ProductCatalogue/ProductCatalogueScreen';
// import MyAccountScreen from '../../components/MyAccount/MyAccountScreen';
// import MyProfileScreen from '../../screens/MyProfile/MyProfileScreen';
import MyClientScreen from '../../screens/MyClient/MyClientScreen';
import PostAdavertiseScreen from '../../screens/PostAdavertise/PostAdavertiseScreen';
// import MyAccountScreen from '../../screens/MyAccount/MyAccountScreen';
// import HomepageScreen from '../../screens/Home/HomeScreen';
import CircularsScreen from '../../screens/Circulars/CircularsScreen';
import EventssScreen from '../../screens/Eventss/EventssScreen';
import UtilityDeskScreen from '../../screens/UtilityDesk/UtilityDeskScreen';
import ScheduleMeetUpScreen from '../../screens/ScheduleMeetUp/ScheduleMeetUpScreen';
import SeasonalGreetingsScreen from '../../screens/SeasonalGreetings/SeasonalGreetingsScreen';
import GreetingDetailsScreen from '../../screens/GreetingOfDewali/GreetingOfDewaliScreen';
// import EditProfileScreen from '../../screens/EditProfile/EditProfileScreen';
import AddvertiseProductScreen from '../../screens/AddvertiseProduct/AddvertiseProductScreen';
import ViewProductScreen from '../../screens/ViewProduct/ViewProductScreen';
import PostAdDetailScreen from '../../screens/PostAdDetail/PostAdDetailScreen';
import MyTimeLineScreen from '../../screens/MyTimeLine/MyTimeLineScreen';
import MyFollowingScreen from '../../screens/MyFollowing/MyFollowingScreen';
import FreeShopsScreen from '../../screens/FreeShops/FreeShopsScreen';
import AddAddressMapScreen from '../../screens/AddAddressMap/AddAddressMapScreen';
import AddAddressScreen from '../../screens/AddAddress/AddAddressScreen';
import ChatScreenCode from '../../screens/ChatScreen/ChatScreenCode';
import ChatImageScreen from '../../screens/ChatScreen/ChatImageScreen';
import DocumentViewScreen from '../../screens/ChatScreen/DocumentViewScreen';
import GeoLocationScreen from '../../screens/GeoLocation/GeoLocationScreen';
import BackImage from '../../screens/BackImage/BackImage';
import MakePaymentEventsScreen from '../../screens/MakePaymentEvents/MakePaymentEventsScreen';
import MakePaymentAdvertismentPostScreen from '../../screens/MakePaymentAdvertismentPost/MakePaymentAdvertismentPostScreen';
import DeepLinkScreen from '../../screens/DeepLink/DeepLinkScreen';



enableScreens();
const stack = createNativeStackNavigator();
const HomeStack = () => {
	return (
		<stack.Navigator
			screenOptions={
				{
					headerShown: false
				}}
			initialRouteName={ScreenNames.HOME_SCREEN}
		>
			{/* - */}
			<stack.Screen name={ScreenNames.NBHMEMBER_SCREEN} component={NBHMemberScreen} />
			<stack.Screen name={ScreenNames.SEARCHBYTAG_SCREEN} component={SeacrhByTagScreen} />
			<stack.Screen name={ScreenNames.NBHMEMBERDETAIL_SCREEN} component={NBHMemberDetailScreen} />
			<stack.Screen name={ScreenNames.NBHBUSSNESSDETAIL_SCREEN} component={NBHBusnessDetailScreen} />
			<stack.Screen name={ScreenNames.MYFOLLOWING_SCREEN} component={MyFollowingScreen} />
			<stack.Screen name={ScreenNames.MYTIMELINE_SCREEN} component={MyTimeLineScreen} />
			<stack.Screen name={ScreenNames.ADDPOST_SCREEN} component={AddPostScreen} />
			<stack.Screen name={ScreenNames.FREESHOPS_SCREEN} component={FreeShopsScreen} />
			<stack.Screen name={ScreenNames.SELECTVARIANT_SCREEN} component={SelectVariantScreen} />
			<stack.Screen name={ScreenNames.POSTIMAGE_SCREEN} component={PostImageScreen} />
			{/* <stack.Screen name={ScreenNames.ORDERDETAILS_SCREEN} component={OrderDetailsScreen} /> */}
			<stack.Screen name={ScreenNames.ORDERLISTING_SCREEN} component={OrderListingScreen} />
			<stack.Screen name={ScreenNames.COMMENTS_SCREEN} component={CommentsScreen} />
			<stack.Screen name={ScreenNames.TIMELINE_SCREEN} component={TimeLineScreen} />
			<stack.Screen name={ScreenNames.CATALOGUEDETAIL_SCREEN} component={CatalogueDetailScreen} />
			<stack.Screen name={ScreenNames.ADDCATALOGUE_SCREEN} component={AddCatalogueScreen} />
			<stack.Screen name={ScreenNames.ADDCLIENTS_SCREEN} component={AddClientsScreen} />
			<stack.Screen name={ScreenNames.MYASKLIST_SCREEEN} component={MyAskListScreen} />
			<stack.Screen name={ScreenNames.PRODUCTCATALOGUE_SCREEN} component={ProductCatalogueScreen} />
			{/* <stack.Screen name={ScreenNames.MYACCOUNT_SCREEN} component={MyAccountScreen} /> */}
			{/* <stack.Screen name={ScreenNames.MYPROFILE_SCREEN} component={MyProfileScreen} /> */}
			<stack.Screen name={ScreenNames.MYCLIENT_SCREEN} component={MyClientScreen} />
			<stack.Screen name={ScreenNames.POSTADVERTISE_SCREEN} component={PostAdavertiseScreen} />
			<stack.Screen name={ScreenNames.HOME_SCREEN} component={HomeScreen} />
			<stack.Screen name={ScreenNames.CIRCULARS_SCREEN} component={CircularsScreen} />
			<stack.Screen name={ScreenNames.EVENTS_SCREEN} component={EventssScreen} />
			<stack.Screen name={ScreenNames.UTILITYDESK_SCREEN} component={UtilityDeskScreen} />
			<stack.Screen name={ScreenNames.SCHEDULEMEETUP_SCREEN} component={ScheduleMeetUpScreen} />
			<stack.Screen name={ScreenNames.GREETINGS_DETAILS_SCREEN} component={GreetingDetailsScreen} />
			<stack.Screen name={ScreenNames.SEASONALGREETINGS_SCREEN} component={SeasonalGreetingsScreen} />
			{/* <stack.Screen name={ScreenNames.EDITPROFILE_SCREEN} component={EditProfileScreen} /> */}
			<stack.Screen name={ScreenNames.ADVETISEPRODUCT_SCREEN} component={AddvertiseProductScreen} />
			<stack.Screen name={ScreenNames.VIEWPRODUCT_SCREEN} component={ViewProductScreen} />
			<stack.Screen name={ScreenNames.POSTADDETAIL_SCREEN} component={PostAdDetailScreen} />
			<stack.Screen name={ScreenNames.CHAT_SCREEN} component={ChatScreenCode} />
			<stack.Screen name={ScreenNames.CHATIMAGE_SCREEN} component={ChatImageScreen} />
			<stack.Screen name={ScreenNames.DOCUMENT_VIEW_SCREEN} component={DocumentViewScreen} />
			<stack.Screen name={ScreenNames.GEO_LOCATION_SCREEN} component={GeoLocationScreen} />

			<stack.Screen name={ScreenNames.BACKIMAGE} component={BackImage} />
			<stack.Screen name={ScreenNames.MAKEPAYMENTEVENTS_SCREEN} component={MakePaymentEventsScreen} />
			<stack.Screen name={ScreenNames.MAKEPAYMENTADVERTISMENTPOST_SCREEN} component={MakePaymentAdvertismentPostScreen} />
			{/* <stack.Screen name={ScreenNames.DEEPLINK} component={DeepLinkScreen} /> */}




			<stack.Screen
				name={ScreenNames.ADD_ADDRESS_MAP_SCREEN}
				component={AddAddressMapScreen} />
			<stack.Screen
				name={ScreenNames.ADD_ADDRESS_SCREEN}
				component={AddAddressScreen} />


















			{/* - */}
			<stack.Screen name={ScreenNames.HOME} component={HomeScreen} />

		</stack.Navigator>
	);
};
export default HomeStack;