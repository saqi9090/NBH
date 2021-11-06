
import * as actionTypes from '../actionTypes/actionTypes';


export const setUserId = payload => ({
	type: actionTypes.SET_USER_ID,
	payload,
});
export const setUserImage = payload => ({
	type: actionTypes.SET_USER_IMAGE,
	payload,
});

export const setName = payload => ({
	type: actionTypes.SET_NAME,
	payload,
});
export const setFirstName = payload => ({
	type: actionTypes.SET_FIRST_NAME,
	payload,
});
export const setOfficeAddress = payload => ({
	type: actionTypes.SET_OFFICE_ADDRESS,
	payload,
});
export const setLastName = payload => ({
	type: actionTypes.SET_LAST_NAME,
	payload,
});
export const setWhatsAppNumber = payload => ({
	type: actionTypes.SET_WHATSAPP_NUMBER,
	payload,
});

export const setEmail = payload => ({
	type: actionTypes.SET_EMAIL,
	payload,
});

export const setSelectAddress = payload => ({
	type: actionTypes.SELECTADDRESS,
	payload,
});
export const setToken = payload => ({
	type: actionTypes.SET_TOKEN,
	payload,
});

export const setUserAddress = payload => ({
	type: actionTypes.USERADDRESS,
	payload,
});



export const setPhone = payload => ({
	type: actionTypes.SET_PHONE_NUMBER,
	payload,
});

export const setReferralCode = payload => ({
	type: actionTypes.REFERRAL_CODE,
	payload,
});
export const setBlock = payload => ({
	type: actionTypes.SET_BLOCK_USER_ID,
	payload,
});
export const setFollowing = payload => ({
	type: actionTypes.SET_FOLLOWING_USER_ID,
	payload,
});

export const setAddressId = payload => ({
	type: actionTypes.ADDRESSID,
	payload,
});

export const setSignedIn = payload => ({
	type: actionTypes.SET_IS_SIGNIN,
	payload,
});

export const clearSession = () => ({
	type: actionTypes.CLEAR_SESSION,
});


// export const setBussinessProfie = () => ({
// 	type: actionTypes.BUSSINESSPROFILE,
// 	payload,
// });


// export const setBussinessBronche = () => ({
// 	type: actionTypes.BUSSINESSBRONCHE,
// 	payload,
// });
export const setBussinessProfie = payload => ({
	type: actionTypes.BUSSINESSPROFILE,
	payload,
});


export const setBussinessBronche = payload => ({
	type: actionTypes.BUSSINESSBRONCHE,
	payload,
});
