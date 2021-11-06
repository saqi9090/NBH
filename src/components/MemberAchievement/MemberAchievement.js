import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
// import { connect } from 'react-redux'
import { ScreenNames, Server } from '../../global'
import ViewFoodMenuImagesModal from '../ViewFoodMenuImagesModal/ViewFoodMenuImagesModal'

const MemberAchievement = ({ item, userId }) => {

    const [isVisible, setVisibility] = React.useState(false);
    const [index, setIndex] = React.useState(0);

    const showModal = () => {
        setVisibility(true);
    };

    const hideModal = () => {
        setVisibility(false);
    };



    //state
    const navigation = useNavigation()

    // function
    return (
        <TouchableOpacity onPress={showModal}>
            <View style={{ height: 160, width: 160, marginHorizontal: 10 }}>
                <Image source={{ uri: `${Server.BASE_URL}/users/${userId}/${item}/memberAchivementsOtherImages` }} style={{ height: "100%", width: "100%" }} />
            </View>
            <ViewFoodMenuImagesModal
                visible={isVisible}
                hideModal={hideModal}
                index={index}
                route={0}
                otherImageNames={[`${Server.BASE_URL}/users/${userId}/${item}/memberAchivementsOtherImages`]} />
        </TouchableOpacity>
    )
}

// const mapStateToProps = state => ({
//     userId: state.user.userId
// });

const mapStateToProps = state => ({
    name: state.user.name,
    email: state.user.email,
    phNo: state.user.phNo,
    userImage: state.user.thumbnailImage,
});

const mapDispatchToProps = (dispatch) => ({ dispatch, });

export default connect(mapStateToProps, mapDispatchToProps)(MemberAchievement);
// export default MemberAchievement

const styles = StyleSheet.create({})
