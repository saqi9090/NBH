// import React, { Component } from 'react'
// import { Text, StyleSheet, View } from 'react-native'
// import Animated from 'react-native-reanimated';

// export default class AnimationTest extends Component {
//     render() {
//         componentWillMount() {
//             this._animation = new Animated.Value(0);
//           }

//           componentDidMount() {
//             Animated.timing(this._animation, {
//               toValue: 300,
//               duration: 500,
//             }).start()
//         }
//         const animatedStyle = {
//           transform: [
//             {
//               translateY: this._animation
//             },
//             {
//               translateX: this._animation
//             }
//           ]
//         }
//         return (
//       <Animated.View style={[styles.box, animatedStyle]} />
//         )
//     }
// }

// const styles = StyleSheet.create({
//     box:{
//         height:100,
//         width:100,
//         borderRadius:5,
//         backgroundColor:"green"
//     }
// })


//part 2

import React, { useRef } from "react";
import { Animated, Text, View, StyleSheet, Button, SafeAreaView, TouchableOpacity } from "react-native";
import { Easing } from "react-native-reanimated";
// import { Easing } from "react-native-reanimated";

const AnimationTest = () => {

  const Translationanimation = useRef(new Animated.Value(0)).current;
  //   const radsToDegs = rad => rad * 180 / Math.PI;
  const animVal = useRef(new Animated.Value(0)).current;

  const Translationanimation1 = () => {
    Animated.loop(

      Animated.timing(Translationanimation, {
        toValue: 100,
        duration: 9000,
        //   useNativeDriver:false
      })
    ).start()
  }


  // const animationSequence = () => {
  //   Animated.sequence(
  //     createAni
  //   )
  // }

  // Animation loop do same thing again and again



  // Animated.loop(
  //   Animated.timing(
  //     this.animatedRotation,
  //     {
  //       toValue: 1,
  //       duration: 1800,
  //       easing: Easing.linear,
  //     }
  //   )
  // ).start()

  // const returnOwnplace = () => {
  //     Animated.timing(Translationanimation,{
  //         toValue:0,
  //         duration:3000,
  //       //   useNativeDriver:false
  //       }).start()
  // }


  //interpolation in react native

  // const animatedTransition = Animated.spring(animVal,{toValue:1})


  // degree
  const degree = Translationanimation.interpolate({
    inputRange: [0, 100, 200],
    outputRange: ['0deg', '180deg', '-180deg']
  })
  //color

  const interpolatecolor = Translationanimation.interpolate({
    inputRange: [0, 100, 200],
    outputRange: ['red', 'blue', 'blue']
  })

  //width

  const interpolatewidth = Translationanimation.interpolate({
    inputRange: [0, 1],
    outputRange: [10, 20]
    // useNativeDriver:false

  })

  //   console.warn("roation in react native",spin);
  // console.warn("convert into deg", 180 /Math.PI);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

        <Animated.View
          style={{
            transform: [
              // {rotate:degree},
              // {rotateX:degree},
              // {rotateY:degree},
              // {scaleY:interpolatewidth}

              // { scaleY: interpolatewidth }
              { translateX: Translationanimation },
              //   {translateY:Translationanimation}
            ],
            height: 100,
            width: 100,
            backgroundColor: "red", borderRadius: 100,
            //  marginLeft:Translationanimation
          }}
        >
          <View style={{ width: "10%", backgroundColor: "red", height: "100%" }}>

          </View>
          <View style={{ width: "10%", backgroundColor: "red", height: "100%" }}>

          </View>
        </Animated.View>
      </View>
      {/* <View style={styles.buttonRow}> */}

      <TouchableOpacity onPress={Translationanimation1}>
        <Text>click</Text>
      </TouchableOpacity>

      {/* </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  fadingContainer: {
    padding: 20,
    backgroundColor: "powderblue"
  },
  fadingText: {
    fontSize: 28
  },
  buttonRow: {
    flexBasis: 100,
    justifyContent: "space-evenly",
    marginVertical: 16
  }
});

export default AnimationTest;