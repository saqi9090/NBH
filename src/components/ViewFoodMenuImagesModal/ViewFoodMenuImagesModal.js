import React from 'react';
import { Modal, FlatList, Text, View, Image, Platform, TouchableOpacity } from 'react-native';

//third party imports
import { useSafeAreaInsets } from 'react-native-safe-area-context';

//styles
import { styles } from './ViewFoodMenuImagesModalStyle';

//global
import { Constants, Server } from '../../global';

//svgs
import WhiteCrossSvg from '../../assets/svg/closecopy';

const ViewFoodMenuImagesModal = ({
  visible = true,
  otherImageNames = [],
  hideModal = () => { },
  index = 0,
  route
}) => {

  const [pageNumber, setPageNumber] = React.useState(index + 1);

  const insets = useSafeAreaInsets();

  const handleOnRequestClose = () => {
    if (Platform.OS === 'android') {
      hideModal();
    }
  };

  const onShow = () => {
    setTimeout(() => {
      ref?.current?.scrollToIndex({ animated: true, index: index, viewPosition: 0.5, });
      setPageNumber(index + 1);
    }, 100);
  };

  const ref = React.useRef();

  const renderItem = ({ item }) => renderImage(item, route);

  const onMomentumScrollEnd = ({ nativeEvent }) => {
    const i = nativeEvent.contentOffset.x / Constants.SCREEN_WIDTH;
    setPageNumber(i + 1)
  };

  return (
    <Modal
      onShow={onShow}
      animationType={'fade'}
      transparent={true}
      visible={visible}
      onRequestClose={handleOnRequestClose}
    >
      <View style={styles.container}>
        <FlatList
          onMomentumScrollEnd={onMomentumScrollEnd}
          ref={ref}
          data={otherImageNames}
          horizontal={true}
          pagingEnabled={true}
          renderItem={renderItem}
          keyExtractor={(item) => item.toString()}
        />
        <View style={styles.row}>
          <Text style={styles.pageNumber}>{Math.round(pageNumber)}/{otherImageNames.length}</Text>
        </View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={hideModal}
          style={styles.closeCon}>
          <WhiteCrossSvg />
        </TouchableOpacity>
      </View>
    </Modal >
  );
};

const renderImage = (e, route) => {
  return (
    <View style={styles.imageCon}>
      {/* {console.warn(e)} */}
      <Image
        resizeMode='contain'
        source={{ uri: e }}
        style={styles.image}
      />
    </View>
  );

};

export default ViewFoodMenuImagesModal;
