import React from 'react';
import { Modal, Platform, Text, TouchableOpacity, View } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import Ar1_1 from '../../assets/svg/aspectRatio/ar1_1';
import Ar1_2 from '../../assets/svg/aspectRatio/ar1_2';
import Ar2_1 from '../../assets/svg/aspectRatio/ar2_1';
import { styles } from './ModalSelectPostSizeStyle';
import CancelSvg from "../../assets/svg/crossSmall.svg";
const ModalSelectPostSize = ({ toggleAspectRatioModal, setImageRatioIndex, _toggleUploadImage, isAspectRatioModal }) => {
    let insets = useSafeArea();
    return (
        <Modal
            transparent={true}
            onRequestClose={toggleAspectRatioModal}
            visible={isAspectRatioModal}
            statusBarTranslucent={true}
        >
            <View style={styles.parentContainer}>
                <View style={{
                    ...styles.aspectRadiocontainer,
                    paddingBottom: Platform.OS === 'ios' ? insets.bottom : 20
                }}>
                    <View style={styles.header}>

                        <View style={styles.headerFirstChild}>
                            <Text style={styles.headerText}>Select Aspect Ratio</Text>
                        </View>

                        <TouchableOpacity
                            onPress={toggleAspectRatioModal}
                            style={styles.headerSecondChild}>
                            <CancelSvg />
                        </TouchableOpacity>

                    </View>

                    <View style={styles.selectRatioContainer}>
                        <TouchableOpacity
                            style={styles.aspectRatioItems}
                            onPress={() => {
                                toggleAspectRatioModal();
                                setImageRatioIndex(0);
                                _toggleUploadImage();
                            }}
                        >
                            <Ar1_1 />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.aspectRatioItems}
                            onPress={() => {
                                toggleAspectRatioModal();
                                setImageRatioIndex(1);
                                _toggleUploadImage();
                            }}
                        >
                            <Ar1_2 />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.aspectRatioItems}
                            onPress={() => {
                                toggleAspectRatioModal();
                                setImageRatioIndex(2);
                                _toggleUploadImage();
                            }}
                        >
                            <Ar2_1 />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </Modal>
    )
}
export default ModalSelectPostSize;