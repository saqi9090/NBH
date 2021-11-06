import React from 'react'
import { View, Text, Image, FlatList } from 'react-native'
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { styles } from "./ProductCatalogueStyles";
import Header from "../../components/Header/Header";
import { Colors, ScreenNames, Server } from '../../global';
import SearchComponent from "../../components/SearchComponent/SearchComponent"
import { SCREEN_WIDTH } from '../../global/constants';
import { ProductCatalogueData, registerdata } from '../../components/DummyData/DummyDataScreen';
import MyAsklist from '../../components/MyAsklist/MyAsklist';
import MyCatalogueCard from '../../components/MyCatalogueCard/MyCatalogueCard';
import AddButton from '../../components/AddButton/AddButton';
import axios from 'axios';
import { connect } from 'react-redux';
import { BASE_URL } from '../../global/server';
import { getService } from '../../services/getService';
import { deleteService } from '../../services/deleteService';
import CustomAlert from '../../components/CustomAlert/CusomAlert';

const ProductCatalogueScreen = ({ navigation, userId }) => {

    const [productCatalogues, setProductCatalogues] = React.useState(null)
    const [searchResults, setSearchResults] = React.useState(null)
    const [alertTitle, setAlertTitle] = React.useState("");
    const [alertText, setAlertText] = React.useState('');
    const [customAlertVisible, setCustomAlertVisible] = React.useState(false);

    const toggleCustomAlertVisibility = () => { setCustomAlertVisible(!customAlertVisible) }
    const leftButtonFunction = () => {
        toggleCustomAlertVisibility()
    }

    const getProductCatalogue = async () => {
        const req = `/productCatalogues/userId/${userId}`
        getService(req).then((response) => {
            if (response.code == 200) {
                setProductCatalogues(response.data)
            } else {
                setAlertTitle("Alert")
                setAlertText(response.message)
                toggleCustomAlertVisibility()
            }
        })
    }




    React.useEffect(() => {
        getProductCatalogue()
    }, [])

    const handleRemoveImage = async (catalogueId) => {




        const deletereq = `/productCatalogues/${catalogueId}`
        deleteService(deletereq).then((response) => {
            if (response.code == 200) {
                getProductCatalogue()
            } else {
                setAlertTitle("Alert")
                setAlertText(response.message)
                toggleCustomAlertVisibility()
            }

        })

    };
    return (
        <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
            <View style={{ flex: 1 }}>
                <View style={{
                    backgroundColor: Colors.WHITE, borderBottomLeftRadius: 20, borderBottomRightRadius: 20,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,

                    elevation: 3,
                }}>

                    <Header name={"Product Catalogues"} backgroundColor={true} FilterIcon={false}
                    />

                    <View style={{ marginTop: 20, marginBottom: 20 }}>
                        <SearchComponent
                            setSearchResults={setSearchResults}
                            data={productCatalogues && productCatalogues}
                            searchBy={"productTitle"}
                            placeholder={"Search by Product Name"}
                            withApi={true} api={`productCatalogues/userId/${userId}/searchByTitleAndKeyword/`} />
                    </View>
                </View>

                {/* {console.warn("searchResults", searchResults),

                    console.warn("productCatalogues", productCatalogues)

                } */}

                <FlatList
                    data={searchResults && searchResults.length > 0 ? searchResults : productCatalogues}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    style={{ marginHorizontal: 10, marginVertical: 20 }}
                    keyExtractor={(item) => `catalogueId${item.catalogueId}`}
                    renderItem={({ item, index }) => (
                        <MyCatalogueCard
                            edit={true}
                            item={item}
                            handleRemoveImage={handleRemoveImage}
                        // setProductCatalogues={setProductCatalogues}
                        // getProductCatalogue={getProductCatalogue}

                        />
                    )}
                />
            </View>
            <View style={{ position: "absolute", right: 30, bottom: 50 }}>

                <AddButton onpressFun={() => navigation.navigate(ScreenNames.ADDCATALOGUE_SCREEN, { flag: 0, getProductCatalogue })} />
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
    name: state.user.name,
    email: state.user.email,
    phNo: state.user.phNo,
    userImage: state.user.thumbnailImage,
    userId: state.user.userId
});

const mapDispatchToProps = (dispatch) => ({ dispatch, });

export default connect(mapStateToProps, mapDispatchToProps)(ProductCatalogueScreen);
