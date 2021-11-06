import React from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar'
import Header from '../../components/Header/Header'
import { styles } from './CatalogueDetailStyles'
import { Colors, Constants, ScreenNames, Server } from '../../global'
import axios from 'axios'
import Carousel, {
    Pagination
} from 'react-native-x-carousel';
import { connect } from 'react-redux'
import { getService } from '../../services/getService'
const CatalogueDetailScreen = ({ route, params, navigation, name, userId, userImage }) => {

    const [catalogueDetails, setCatalogueDetails] = React.useState(null)
    const gotoMemberDetail = () => {
        navigation.navigate(ScreenNames.NBHMEMBERDETAIL_SCREEN, { userId: catalogueDetails.userId })
    }

    console.warn("userIdff", catalogueDetails);

    const getCatalogueDetails = async () => {
        // const response = await axios.get(`${Server.BASE_URL}/productCatalogues/${route.params.catalogueId}`)
        // setCatalogueDetails(response.data)

        const req = `/productCatalogues/${route.params.catalogueId}`
        getService(req).then((response) => {
            setCatalogueDetails(response.data)
        })


    }

    React.useEffect(() => {
        getCatalogueDetails()
    }, [])

    const renderItem = (data, index) => {
        return (
            <View style={{
                width: Constants.SCREEN_WIDTH,
                height: Constants.SCREEN_WIDTH,
                alignItems: 'center',
                justifyContent: 'center',
                overflow: "hidden"
            }}>
                <Image source={{ uri: `${Server.BASE_URL}/productCatalogues/${route.params.catalogueId}/${data}/otherImages` }} style={{ height: "100%", width: "100%" }} />
            </View>
        )
    }


    return (
        <View style={{ flex: 1, backgroundColor: Colors.WHITE }} >
            <FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
            <Header name={"Catalogue Details"} backgroundColor={true} />
            {
                catalogueDetails
                &&
                <ScrollView>

                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={gotoMemberDetail}
                        style={{ flexDirection: "row", alignItems: "center", paddingLeft: 30, paddingVertical: 10, backgroundColor: Colors.WHITE }}>
                        <Image source={{ uri: `${Server.BASE_URL}/users/${catalogueDetails.userId}/${catalogueDetails.userThumbnailImage}/thumbnailImage` }} style={{ height: 49, width: 49, borderRadius: 50 }} />
                        <Text style={[styles.font1, { marginLeft: 10 }]} >{catalogueDetails.userName}</Text>
                    </TouchableOpacity>
                    <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>

                        {/* <View style={{ alignItems: "center" }}> */}
                        <Carousel
                            pagination={Pagination}
                            renderItem={renderItem}
                            // autoplay={true}
                            data={catalogueDetails.otherImageName}
                        />
                        {/* </View> */}
                        <View style={{ marginHorizontal: 20 }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 20 }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.font1}>{catalogueDetails.productTitle}</Text>
                                </View>
                                <View >

                                    <Text style={[styles.font2, { marginVertical: 20 }]}>₹ {catalogueDetails.productPrice}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: "row", alignItems: "center" }} >
                                <Text style={styles.font3}>MOQ:  </Text>
                                <Text style={styles.font4}>{catalogueDetails.productMoq}</Text>
                            </View>
                        </View>

                        <View style={{ marginHorizontal: 20, marginBottom: 50 }}>
                            <Text style={[styles.font5, { marginBottom: 10, marginTop: 20 }]}>
                                Description
                            </Text>
                            <View style={styles.font6} >
                                <Text style={styles.font7}>{catalogueDetails.description}</Text>
                            </View>
                        </View>

                    </View>

                </ScrollView>
            }
        </View>
    )
}
const mapStateToProps = state => ({
    name: state.user.name,
    email: state.user.email,
    phNo: state.user.phNo,
    userImage: state.user.thumbnailImage,
    userId: state.user.userId
});

const mapDispatchToProps = (dispatch) => ({ dispatch, });

export default connect(mapStateToProps, mapDispatchToProps)(CatalogueDetailScreen);
