import RightSvg from "../../assets/svg/check1.svg"
import React, { useRef } from "react";
import { Animated, Text, View, StyleSheet, Button, Easing } from "react-native";
import { Colors, Fonts } from "../../global";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../global/constants";

const CustomToastAlert = ({ showAlert, setShowAlert }) => {
  // fadeAnim will be used as the value for opacity. Initial Value: 0

  console.log(showAlert);
  const fadeAnim = useRef(new Animated.Value(0)).current;


  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
    }).start(() => {
      fadeOut()
      setShowAlert(false)
    });
    // fadeOut()
    // fadeOut()
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000
    }).start();
  };


  React.useEffect(() => {
    showAlert == true ?
      fadeIn()

      :
      null

  }, [showAlert])
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>

      <View style={styles.container}>
        <Animated.View
          style={[
            styles.fadingContainer,
            {
              opacity: fadeAnim // Bind opacity to animated value
            }
          ]}
        >
          <View style={{ flexDirection: "row", alignItems: "center", borderRadius: 100, paddingHorizontal: 20, backgroundColor: Colors.JUNGLE_BLACK, justifyContent: "space-between", height: 50 }}>
            <Text style={{ fontSize: 16, fontFamily: Fonts.SEMIBOLD, color: Colors.WHITE, marginRight: 10 }}>Your Order has placed Successfully</Text>
            <RightSvg />
          </View>
        </Animated.View>
        {/* <View style={styles.buttonRow}>
          <Button title="Fade In" onPress={fadeIn} />
          <Button title="Fade Out" onPress={fadeOut} />
        </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center"
    position: "absolute",
    bottom: SCREEN_HEIGHT / 5 - 40,
    left: SCREEN_WIDTH / 3 - 105,
    // alignContent:"center",
    // alignItems:"center"
    // justifyContent:"center",
    // backgroundColor:Colors.WHITE
  },
  fadingContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,

    // backgroundColor: "powderblue"
  },
  fadingText: {
    fontSize: 28,
    textAlign: "center",
    margin: 10
  },
  buttonRow: {
    flexDirection: "row",
    marginVertical: 16
  }
});

export default CustomToastAlert;