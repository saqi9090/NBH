import * as actionTypes from '../actionTypes/actionTypes';

const initialState = {
	userId: null,
	name: "",
	firstName: "",
	lastName: "",
	email: "",
	phNo: "",
	thumbnailImage: "",
	whatsAppNumber: null,
	referralCode: "",
	isSignedIn: false,
	updatedBlockUserId: 0,
	updatedBlockOtherUserId: 0,
	blockState: false,
	updatedFollowingUserId: 0,
	updatedFollowingOtherUserId: 0,
	followingState: false,
	addressId: 0,
	bussinessbronche: null,
	bussinessprofile: null,
	officeAddress: {
		"officeBuilding": null,
		"officeFloor": null,
		"officeFlatNo": null,
		"officeLandmark": null,
		"officeCity": "",
		"officeLatitude": null,
		"officeLongitude": null,
		"officePincode": 0,
	},
	userAddress: {
		"addressId": null,
		"userId": null,
		"addressType": "",
		"building": null,
		"floor": null,
		"flatNo": null,
		"landmark": null,
		"latitude": null,
		"longitude": null,
		"city": "",
		"pincode": 0
	},
	selectAddress: {
		"addressId": null,
		"userId": null,
		"addressType": "",
		"building": null,
		"floor": null,
		"flatNo": null,
		"landmark": null,
		"latitude": null,
		"longitude": null,
		"city": "",
		"pincode": 0
	},
	token: ""
	// referralCode:""
};

const user = (state = initialState, action) => {

	const { type, payload } = action;

	switch (type) {
		case actionTypes.SET_USER_ID:
			return {
				...state,
				userId: payload,
			};
		case actionTypes.SET_IS_SIGNIN:
			return {
				...state,
				isSignedIn: payload,
			};
		case actionTypes.SET_NAME:
			return {
				...state,
				name: payload,
			};
		case actionTypes.SET_OFFICE_ADDRESS:
			return {
				...state,
				officeAddress: payload,
			};
		case actionTypes.SET_TOKEN:
			return {
				...state,
				token: payload,
			};
		case actionTypes.SET_USER_IMAGE:
			return {
				...state,
				thumbnailImage: payload,
			};
		case actionTypes.SET_WHATSAPP_NUMBER:
			return {
				...state,
				whatsAppNumber: payload,
			};
		case actionTypes.SET_FIRST_NAME:
			return {
				...state,
				firstName: payload,
			};
		case actionTypes.SET_LAST_NAME:
			return {
				...state,
				lastName: payload,
			};
		case actionTypes.SET_EMAIL:
			return {
				...state,
				email: payload,
			};
		case actionTypes.SET_PHONE_NUMBER:
			return {
				...state,
				phNo: payload,
			};



		case actionTypes.ADDRESSID:
			return {
				...state,
				addressId: payload,
			};


		case actionTypes.USERADDRESS:
			return {
				...state,
				userAddress: payload,
			};
		case actionTypes.SET_BLOCK_USER_ID:
			return {
				...state,
				updatedBlockUserId: payload.userId,
				updatedBlockOtherUserId: payload.otherUserId,
				blockState: !state.blockState
			};
		case actionTypes.SET_FOLLOWING_USER_ID:
			return {
				...state,
				updatedFollowingOtherUserId: payload.userId,
				updatedFollowingUserId: payload.otherUserId,
				followingState: !state.followingState
			};
		case actionTypes.SELECTADDRESS:
			return {
				...state,
				selectAddress: payload,
			};

		case actionTypes.REFERRAL_CODE:
			return {
				...state,
				referralCode: payload,
			};

		case actionTypes.BUSSINESSPROFILE:
			return {
				...state,
				bussinessprofile: payload,
			};
		case actionTypes.BUSSINESSBRONCHE:
			return {
				...state,
				bussinessbronche: payload,
			};
		case actionTypes.CLEAR_SESSION:
			return {
				isSignedIn: false,
				userId: null,
				name: "",
				firstName: "",
				lastName: "",
				email: "",
				phNo: "",
				thumbnailImage: "",
				whatsAppNumber: null,
				referralCode: "",
				isSignedIn: false,
				addressId: 0,
				officeAddress: {
					"officeBuilding": null,
					"officeFloor": null,
					"officeFlatNo": null,
					"officeLandmark": null,
					"officeCity": "",
					"officeLatitude": null,
					"officeLongitude": null,
					"officePincode": 0,
				},
				userAddress: {
					"addressId": null,
					"userId": null,
					"addressType": "",
					"building": null,
					"floor": null,
					"flatNo": null,
					"landmark": null,
					"latitude": null,
					"longitude": null,
					"city": "",
					"pincode": 0
				},
				selectAddress: {
					"addressId": null,
					"userId": null,
					"addressType": "",
					"building": null,
					"floor": null,
					"flatNo": null,
					"landmark": null,
					"latitude": null,
					"longitude": null,
					"city": "",
					"pincode": 0
				},
				token: ""
			};
		default:
			return state;
	}
};

export default user;