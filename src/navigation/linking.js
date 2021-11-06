import { Platform } from "react-native";

const config = {
    screens: {
        Home: "home",
        NBHMEMBERDETAIL_SCREEN: {
            path: "memberDetails/:userId",
            parse: {
                userId: (userId) => userId,
            }
        },
        DEEPLINK_POST: {
            path: "postDetails/:postId",
            parse: {
                postId: (postId) => postId,
            }
        },
    }
}

const linking = {
    prefixes: ['https://nbh.com', Platform.OS == "android" ? 'nbh' : 'nbh://'],
    config
}

export default linking;