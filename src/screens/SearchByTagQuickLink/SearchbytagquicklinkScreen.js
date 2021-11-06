import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native';
import BlockedMemberModal from '../../components/BlockedMemberModal/BlockedMemberModal';
import CartModal from '../../components/CartModal/CartModal';
import CatalogueFilterModal from '../../components/CatalogueFilterModal/CatalogueFilterModal';
import { quickLinkData } from '../../components/DummyData/DummyDataScreen';
import FollowerMemberModal from '../../components/FollowerMemberModal/FollowerMemberModal';
import FollowingMemberModal from '../../components/FollowingMemberModal/FollowingMemberModal';
import LikesModal from '../../components/LikesModal/LikesModal';
import QuickLink from '../../components/QuickLink/QuickLink'
import ReportModal from '../../components/ReportModal/ReportModal';
import SelectAddress from '../../components/SelectAddress/SelectAddress';
import VariantModal from '../../components/VariantModal/VariantModal';
import TermsandConditionModal from '../../components/TermsandConditionModal/TermsandConditionModal';
import { Colors, Fonts, ScreenNames } from '../../global';
import { SIZE_16 } from '../../global/typography';

const SearchbytagquicklinkScreen = ({ navigation }) => {
    return (
        <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
            <View style={{ marginTop: 0 }}>
                <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
                    <Text style={styles.fontTitle}>People</Text>
                </View>

                <FlatList data={quickLinkData}
                    horizontal={true}
                    style={{ marginHorizontal: 10 }}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <QuickLink data={quickLinkData} item={item} index={index} onpress={() => navigation.navigate(ScreenNames.POSTADVERTISE_SCREEN)} />
                    )} />

            </View>
            <View style={{ backgroundColor: Colors.WHITE }} >
                <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
                    <Text style={styles.fontTitle}>Company</Text>
                </View>


                <FlatList data={quickLinkData}
                    horizontal={true}
                    style={{ marginHorizontal: 10 }}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <QuickLink data={quickLinkData} item={item} index={index}/>
                    )} />
            </View>
            {/* <LikesModal /> */}
            {/* <VariantModal /> */}
            {/* <CartModal /> */}
            {/* <SelectAddress /> */}
            {/* <ReportModal /> */}
            {/* <TermsandConditionModal /> */}
            {/* <CatalogueFilterModal /> */}
            {/* <BlockedMemberModal /> */}
            {/* <FollowingMemberModal /> */}
            {/* <FollowerMemberModal /> */}
        </View>
    )
}

export default SearchbytagquicklinkScreen

const styles = StyleSheet.create({
    fontTitle: {
        fontSize: 18,
        fontFamily: Fonts.REGULAR,
        color: Colors.JUNGLE_BLACK
    }
})
