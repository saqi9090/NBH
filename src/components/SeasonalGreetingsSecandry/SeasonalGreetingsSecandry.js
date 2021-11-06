import React from 'react'
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, Platform, ImageBackground, } from 'react-native'
import RNFetchBlob from 'rn-fetch-blob'
import { Colors, Constants, Fonts, Server } from '../../global'
import { SCREEN_WIDTH } from '../../global/constants'
import { keyworddata } from '../DummyData/DummyDataScreen'
// import Share from 'react-native-share';
import Share from 'react-native-share';
import { connect } from 'react-redux'
import LocationSvg from "../../assets/svg/location123.svg";
import EmailSvg from "../../assets/svg/Mail1234.svg";
import CallSvg from "../../assets/svg/phone-call1234.svg";
import WebsiteSvg from "../../assets/svg/Website.svg";
import { captureRef } from 'react-native-view-shot'
import RNFS from 'react-native-fs';

const SeasonalGreetingsSecandry = ({ item, greetingId, userId, email, phNo, name, userDetails }) => {
  const viewRef = React.useRef(null);

  const onShare = async () => {
    try {
      captureRef(viewRef, {
        format: "jpg",
        quality: 0.8
      }).then(
        uri => {
          RNFS.readFile(uri, 'base64')
            .then(async base64Data => {
              var base64Data = `data:image/png;base64,` + base64Data;
              // here's base64 encoded image
              await Share.open({
                url: base64Data, title: "NBH",
              });
              // remove the file from storage
              // return fs.unlink(imagePath);
            });
        },
        error => console.error("Oops, snapshot failed", error)
      );

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>


      <TouchableOpacity
        onPress={onShare}
        style={{ marginVertical: 25, marginHorizontal: 10 }}>
        {
          <View style={[styles.imageBox]} collapsable={false} ref={viewRef}>
            <ImageBackground source={{ uri: `${Server.BASE_URL}/seasonalGreetings/${greetingId}/${item}/otherImages` }} style={{ height: "100%", width: "100%" }} >


              <View style={{ flex: 1 }}>

                <View style={{ position: "absolute", bottom: 0 }}>

                  <View style={{ paddingHorizontal: 50 }}>
                    <View style={{
                      width: SCREEN_WIDTH - 140,
                      paddingHorizontal: 20,
                      flexDirection: "row", alignItems: "center", justifyContent: "center", borderTopLeftRadius: 10, borderTopRightRadius: 10
                      , borderWidth: 1, borderColor: Colors.BLACK, backgroundColor: "red",
                    }}>
                      <WebsiteSvg />
                      <Text style={[styles.font1, { color: Colors.WHITE }]} >
                        {userDetails?.website}
                      </Text>
                    </View>
                  </View>

                  <View style={{ backgroundColor: "blue", paddingVertical: 5 }}>


                    <View style={{ flexDirection: "row", alignItems: "center", width: SCREEN_WIDTH - 80, justifyContent: "center", paddingLeft: 45 }}>
                      <Text style={[styles.font1, { color: Colors.WHITE }]} >Company :-</Text>

                      <Text style={[styles.font1, { color: Colors.WHITE }]} >{userDetails?.businessName} </Text>
                    </View>

                  </View>
                  <View style={{
                    flex: 1,
                    width: SCREEN_WIDTH - 40,
                    flexDirection: "row", alignItems: "center",
                    padding: 10,
                    borderWidth: 1, borderColor: "white", backgroundColor: Colors.PRIMARY,
                    borderRadius: 7
                  }}>
                    {/* <LocationSvg />
                    <Text style={[styles.font1, { color: Colors.WHITE }]} >{userDetails?.officeBuilding}, {userDetails?.officeFlatNo}, {userDetails?.officeFloor}, {userDetails?.officeLandmark}, {userDetails?.officeCity}, {userDetails?.officePincode}</Text> */}
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <CallSvg />
                      <Text style={styles.font1}>{phNo}</Text>
                    </View>
                    <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
                      <EmailSvg />
                      <View style={{ flex: 1 }}>

                        <Text style={styles.font1}>{userDetails?.email}</Text>
                      </View>
                    </View>
                  </View>
                </View>

              </View>
            </ImageBackground>
          </View>
        }
      </TouchableOpacity>
    </View >
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

export default connect(mapStateToProps, mapDispatchToProps)(SeasonalGreetingsSecandry);


// export default SeasonalGreetingsSecandry;

const styles = StyleSheet.create({
  imageBox: { height: Constants.SCREEN_WIDTH - 40, width: Constants.SCREEN_WIDTH - 40, },
  font1: { fontSize: 14, fontFamily: Fonts.BOLD, color: Colors.JUNGLE_BLACK, marginLeft: 4, marginRight: 7 },
  font2: { fontSize: 16, fontFamily: Fonts.BOLD, color: "#00000090" },
  font3: { fontSize: 13, fontFamily: Fonts.BOLD, color: "#00000090" },
  font4: { fontSize: 12, fontFamily: Fonts.REGULAR, color: Colors.JUNGLE_BLACK },



})
