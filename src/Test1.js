6598081// // // import React from "react";
// // // import { StyleSheet, Text, View, SafeAreaView, SectionList, StatusBar } from "react-native";

// // // const DATA = [
// // //   {
// // //     title: "Main dishes",
// // //     data: ["Pizza", "Burger", "Risotto"]
// // //   },
// // //   {
// // //     title: "Sides",
// // //     data: ["French Fries", "Onion Rings", "Fried Shrimps"]
// // //   },
// // //   {
// // //     title: "Drinks",
// // //     data: ["Water", "Coke", "Beer"]
// // //   },
// // //   {
// // //     title: "Desserts",
// // //     data: ["Cheese Cake", "Ice Cream"]
// // //   }
// // // ];

// // // const Item = ({ title }) => (
// // //   <View style={styles.item}>
// // //     <Text style={styles.title}>{title}</Text>
// // //   </View>
// // // );

// // // const Test1 = () => (
// // //   <SafeAreaView style={styles.container}>
// // //     <SectionList
// // //     // stickySectionHeadersEnabled
// // //     stickyHeaderIndices={[0]}
// // //       sections={DATA}
// // //       keyExtractor={(item, index) => item + index}
// // //       renderItem={({ item }) => <Item title={item} />}
// // //       renderSectionHeader={({ section: { title } }) => (
// // //         <Text style={styles.header}>{title}</Text>
// // //       )}
// // //     />
// // //   </SafeAreaView>
// // // );

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     paddingTop: StatusBar.currentHeight,
// // //     marginHorizontal: 16
// // //   },
// // //   item: {
// // //     backgroundColor: "#f9c2ff",
// // //     padding: 20,
// // //     marginVertical: 8
// // //   },
// // //   header: {
// // //     fontSize: 32,
// // //     backgroundColor: "#fff"
// // //   },
// // //   title: {
// // //     fontSize: 24
// // //   }
// // // });

// // // export default Test1;


// // import React from 'react'
// // import { View, StyleSheet, ListRenderItem } from 'react-native'
// // import { Tabs } from 'react-native-collapsible-tab-view'
// // // import { useAnimatedRef } from 'react-native-reanimated'

// // const HEADER_HEIGHT = 250

// // const Header = () => {
// //   return <View style={styles.header} />
// // }

// // const Test1 = () => {

// //   const renderItem = (({ index }) => {
// //     return (
// //       <View style={[styles.box, index % 2 === 0 ? styles.boxB : styles.boxA]} >
// //         </View>
// //     )
// //   })

// //   return (
// //     <Tabs.Container
// //       HeaderComponent={Header}
// //       headerHeight={HEADER_HEIGHT} // optional
// //     >
// //       <Tabs.Tab name="A">
// //         <Tabs.FlatList
// //           data={[0, 1, 2, 3, 4]}
// //           renderItem={renderItem}
// //           keyExtractor={(v) => v + ''}
// //         />
// //       </Tabs.Tab>
// //       <Tabs.Tab name="B">
// //         <Tabs.ScrollView>
// //           <View style={[styles.box, styles.boxA]} />
// //           <View style={[styles.box, styles.boxB]} />
// //         </Tabs.ScrollView>
// //       </Tabs.Tab>
// //     </Tabs.Container>
// //   )
// // }

// // const styles = StyleSheet.create({
// //   box: {
// //     height: 250,
// //     width: '100%',
// //   },
// //   boxA: {
// //     backgroundColor: 'white',
// //   },
// //   boxB: {
// //     backgroundColor: '#D8D8D8',
// //   },
// //   header: {
// //     height: HEADER_HEIGHT,
// //     width: '100%',
// //     backgroundColor: '#2196f3',
// //   },
// // })

// // export default Test1


// // import { Tabs } from 'react-native-collapsible-tab-view'

// // const Example = () => {
// //    return (
// //      <Tabs.Container HeaderComponent={MyHeader}>
// //        <Tabs.Tab name="A">
// //          <ScreenA />
// //        </Tabs.Tab>
// //        <Tabs.Tab name="B">
// //          <ScreenB />
// //        </Tabs.Tab>
// //      </Tabs.Container>
// //    )
// // }

// // const cond = 10
// // const cond1 = 20
// // function condition(cond, cond1) {
// //     // if else  are only return true and false
// //     if (cond == cond1) {
// //         alert("working")     // whenever the value same to this value the they give true
// //     }


// // }

// // let show = condition(cond, cond1)


// import React from "react";
// import { ScrollView, StyleSheet, View, TouchableOpacity, Text, ToastAndroid } from "react-native";
// import YouTubePlayer from "react-native-youtube-sdk";

// // export default class Test1 extends React.Component {

// const Test1 = () =>{


//  const youTubePlayer = React.useRef(null);
//     return (
//       <View style={styles.container}>
//         <ScrollView>
//           <YouTubePlayer
//             ref={youTubePlayer}
//             videoId="o7j1TWM8Rck"
//             autoPlay={true}
//             fullscreen={false}
//             showFullScreenButton={true}
//             showSeekBar={true}
//             showPlayPauseButton={true}
//             startTime={5}
//             style={{ width: "100%", height: 200 }}
//             onReady={e => console.log("onReady", e.type)}
//             onError={e => console.log("onError", e.error)}
//             onChangeState={e => console.log("onChangeState", e.state)}
//             onChangeFullscreen={e => console.log("onChangeFullscreen", e.isFullscreen)}
//           />
//           <View>
//             {/* <TouchableOpacity style={styles.button} onPress={() => this.youTubePlayer.loadVideo("QdgRNIAdLi4", 0)}>
//               <Text style={{ color: "#ffffff" }}>loadVideo</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.button} onPress={() => this.youTubePlayer.seekTo(10)}>
//               <Text style={{ color: "#ffffff" }}>SeekTo(10)</Text>
//             </TouchableOpacity> */}
//             <TouchableOpacity style={styles.button} onPress={() => youTubePlayer.current.play()}>
//               <Text style={{ color: "#ffffff" }}>Play</Text>
//             </TouchableOpacity>
//             {/* <TouchableOpacity style={styles.button} onPress={() => this.youTubePlayer.pause()}>
//               <Text style={{ color: "#ffffff" }}>Pause</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.button}
//               onPress={async () => {
//                 const currentTime = await this.youTubePlayer.getCurrentTime();
//                 ToastAndroid.show(String(currentTime), ToastAndroid.SHORT);
//               }}
//             >
//               <Text style={{ color: "#ffffff" }}>getCurrentTime</Text>
//             </TouchableOpacity> */}
//             {/* <TouchableOpacity
//               style={styles.button}
//               onPress={async () => {
//                 const duration = await this.youTubePlayer.getVideoDuration();
//                 ToastAndroid.show(String(duration), ToastAndroid.SHORT);
//               }}
//             >
//               <Text style={{ color: "#ffffff" }}>getVideoDuration</Text>
//             </TouchableOpacity> */}
//           </View>
//         </ScrollView>
//       </View>
//     );

// }
// export default Test1;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   button: {
//     backgroundColor: "red",
//     margin: 12,
//     padding: 12,
//     borderRadius: 4,
//   },
// });




// import React from 'react'
// import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import { globalStyles } from './global/globalStyles'

// const Test1 = () => {

//   const firstData =[

//     { 
//       "productId":1,
//       "value1":1
//     },
//     { 
//       "productId":2,
//       "value1":2
//     },
//     { 
//       "productId":3,
//       "value1":3
//     },

//   ]

//   const [condtion, setCondtion] = React.useState()

//   const [productData, setproductData] = React.useState()


//   const addProduct = () => {

//     let a = firstData.map(e => e.productId)
//    setproductData([...productData,{"value1":1}])
//   }

//   const removeProduct = (id) => {
//     // setproductData(...productData,{"value1":1})
//     let a = firstData.filter(e => e.productId != id)
//     setproductData(a);
//    }
//   return (
//     <View>
//       <Text>Test part</Text>

//         {/* <Text style={{fontSize:22,backgroundColor:"yellow",color:"#000000",fontWeight:"bold"}}>First If , if else , if elseif else , switch case </Text> */}
//        {/* <Text>


//        </Text> */}

//    {/* <FlatList data={firstData}  renderItem={({item,data}) => {
//       //  <TouchableOpacity>
//         return <Text>{item.productId}</Text>
//       //  </TouchableOpacity>
//    }}/> */}

//      {/* {firstData.map(e => {
//     <Text>{e.productId}</Text>
//      })} */}

//      <FlatLis




//         <View style={{alignSelf:"center"}}>{condtion ? "product add" : "product remove"}</View>
//   <View style={{marginTop:60}}> 

//        <TouchableOpacity style={globalStyles.button} onPress={() => addProduct()} >
//          <Text style={globalStyles.buttonText}>click to add prouduct in array</Text>
//        </TouchableOpacity>


//        <TouchableOpacity style={globalStyles.button} onPress={() => removeProduct()}>
//          <Text  style={globalStyles.buttonText}>click to remove product  in array</Text>
//        </TouchableOpacity>
//   </View>


//     </View>
//   )
// }

// export default Test1

// const styles = StyleSheet.create({



// })


// import React, { useState } from "react";
// import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";

// const DATA = [
//   {
//     id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
//     title: "First Item",
//   },
//   {
//     id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
//     title: "Second Item",
//   },
//   {
//     id: "58694a0f-3da1-471f-bd96-145571e29d72",
//     title: "Third Item",
//   },
// ];

// const Item = ({ item, onPress, backgroundColor, textColor }) => (
//   <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
//     <Text style={[styles.title, textColor]}>{item.title}</Text>
//   </TouchableOpacity>
// );

// const Test1 = () => {
//   const [selectedId, setSelectedId] = useState(null);

//   const renderItem = ({ item }) => {
//     const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
//     const color = item.id === selectedId ? 'white' : 'black';

//     return (
//       <Item
//         item={item}
//         onPress={() => setSelectedId(item.id)}
//         backgroundColor={{ backgroundColor }}
//         textColor={{ color }}
//       />
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <FlatList
//         data={DATA}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//         extraData={selectedId}
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: StatusBar.currentHeight || 0,
//   },
//   item: {
//     padding: 20,
//     marginVertical: 8,
//     marginHorizontal: 16,
//   },
//   title: {
//     fontSize: 32,
//   },
// });

// export default Test1;



// import React from 'react'
// import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

// const Test1 = () => {

//   const [Texts, setTexts] = React.useState()

//   const conditions = () => {
//     if (Texts > 0 && Texts <= 10 ) {
//       if (Texts >= 5) {
//         alert("in conditon is true")
//       } else {
//         alert("in conditon is false")
//       }
//       // alert("the conditon true")
//     } else {
//       alert("the conditon is false")
//     }
//   }
//   return (
//     <View style={{flex:1}}>
//       <View style={{flex:1}}>

//       <Text style={{fontSize:20,marginLeft:20,marginTop:20}}>condition :</Text>
//       </View>

//       <TextInput
//        onChangeText={text => setTexts(text)}
//        keyboardType="phone-pad"
//        style={{height:50 ,width:"90%",borderRadius:5,padding:5,borderWidth:2,borderColor:"black",marginHorizontal:20,marginBottom:20}}></TextInput>

//       <TouchableOpacity 
//       onPress={conditions}
//       style={{height:30,width:"90%",
//       backgroundColor:"#bababa",borderRadius:5,
//       alignItems:"center",justifyContent:"center",
//       marginHorizontal:20,marginBottom:20}}>
//         <Text style={{fontSize:17}}>ok</Text>
//       </TouchableOpacity>
//     </View>
//   )
// }

// export default Test1

// const styles = StyleSheet.create({})




// import React from 'react'
// import { StyleSheet, Text, View,FlatList, TouchableOpacity, Modal,ScrollView } from 'react-native'
// import { SCREEN_HEIGHT, SCREEN_WIDTH } from './global/constants'
// import TestPart2 from './TestPart2'

// const Test1 = () => {

//   //variable

//   const Data = [
//     {
//       key:0,
//       Name :"first dishes"
//     },
//     {
//       key:1,
//       Name :"secand dishes"
//     },    {
//       key:2,
//       Name :"third dishes"
//     },    {
//       key:3,
//       Name :"fourth dishes"
//     },    {
//       key:4,
//       Name :"fifth dishes"
//     },
//     {
//       key:5,
//       Name :"sixth dishes"
//     },    {
//       key:6,
//       Name :"seven dishes"
//     },
//   ]







//   //state

//    const [datar, setDatar] = React.useState(Data)
//    const [visiableModal, setVisiableModal] = React.useState(false)
//    const [curentIndex, setCurentIndex] = React.useState()
//    const [edit, setEdit] = React.useState(null)
//    const flatlistRef = React.useRef();





//   const _toggle = () => {setVisiableModal(!visiableModal)



//   // const scroll = React.useRef()
//  //render Item

// //  const getItemLayout =  (data, index) => (
// //    {length: 161, offset: 161 * index, index}
// //   )

//   // console.warn(datar);

//   // const onclickItem = (item,index) => {
//   //   setCurentIndex(index)
//   //  const ArrayData = Data.map((e,index) => {
//   //    if (item.key == e.key ) {
//   //      return {
//   //        ...e,
//   //        selected:true
//   //      }
//   //    }
//   //    else{
//   //     return {
//   //       ...e,
//   //       selected:false
//   //     }
//   //    }
//   //   })
//   //   setDatar(ArrayData)
//   // }




//     const onPressFunction = (index) => {
//       flatlistRef.current.scrollToIndex({animated : true ,index:  index});
//       setEdit(index)
//       _toggle()
//     };

//   return (
//     <View style={{flex:1}} >
//     <View style={{flex:1}}>


//       <FlatList 
//       // getItemLayout={getItemLayout}
//       data={datar} 
//       keyExtractor={(item) => item.key}
//       ref={flatlistRef}
//       renderItem={({item,index}) => (
//         // <TouchableOpacity onPress={() => onclickItem(item,index)}>

//         <TestPart2 item={item} index={index} edit={edit} setEdit={setEdit}/>
//         // </TouchableOpacity>
//         )}/>

//         </View>


//    <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",marginBottom:20}}> 

//       <TouchableOpacity 
//       onPress={_toggle}
//       style={{backgroundColor:"#198CFF",height:50,width:100,borderRadius:40,alignItems:"center",justifyContent:"center"}}> 
//         <Text style={{fontSize:18}}>Menu</Text>
//       </TouchableOpacity>


//       {/* <TouchableOpacity 
//       onPress={_toggle}
//       style={{backgroundColor:"#198CFF",height:50,width:100,borderRadius:40,alignItems:"center",justifyContent:"center"}}> 
//         <Text style={{fontSize:18}}>click</Text>
//       </TouchableOpacity> */}
//     </View>
//     <Modal 
//       animationType={'fade'}
//       visible={visiableModal}
//       // onRequestClose={toggleModal}
//       transparent={true}
//     >
//       <View style={{backgroundColor:"#00000030",flex:1,alignItems:"center",flexDirection:"column-reverse",paddingBottom:70}}> 
//         <View style={{height:200,width:200,backgroundColor:"white",borderRadius:2}}>
//        <FlatList data={Data} 
//        showsVerticalScrollIndicator={false}
//        renderItem={({item,index}) => (
//          <TouchableOpacity
//          onPress={() => onPressFunction(index)}
//           style={{paddingVertical:8,borderBottomWidth:1,alignItems:"center",borderBottomColor:"#bababa55"}}>
//            <Text style={{fontSize:16}}>
//              {item.Name}
//            </Text>
//           </TouchableOpacity>
//        )}/>
//         </View>
//       </View>
//     </Modal>
//    </View>


//   )
// }

// export default Test1

// const styles = StyleSheet.create({
//   BannerCantainer:{
//     backgroundColor:"white",
//     borderBottomWidth:1,
//     borderTopWidth:1,
//     height:50,
//     width:"100%",
//     flexDirection:"row",
//     alignItems:"center"
//     ,justifyContent:"space-between",
//     paddingHorizontal:20
//         // alignItems:"center"
//   }
// })



import React from 'react'
import { Easing, Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { interpolate } from 'react-native-reanimated';
import Cross from "../src/assets/svg/x-circle.svg";
// import Svg, { G, Path } from 'react-native-svg';
const Test1 = () => {

    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 100,
            duration: 9000,
            // useNativeDriver: true
        }).start();
    };


    const interpolation = fadeAnim.interpolate({
        inputRange: [0, 50, 100],
        outputRange: [2, 52, 61]
    })

    // my place 
    let Width = Dimensions.get("screen").width
    let Height = Dimensions.get("screen").height
    let size = Width - 32
    let strokeWidth1 = 4
    const radius = (size - strokeWidth1) / 2
    const curcumtance = radius * 2 * Math.PI


    const progress = new Animated.Value(1);

    const ValueStart = () => {
        Animated.timing(progress, {
            toValue: 100,
            duration: 1200,
            // easing,
        })
    }


    const valueline = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 7]
    })
    // }

    // const fun2 = () => {
    //     const valueline2 = progress.interpolate({
    //         inputRange: [0, 1],
    //         outputRange: [0, 3]
    //     })
    // }


    // console.warn("screen width", curcumtance)

    // import Svg from "react-native-svg"


    ///
    //     alert("success") :
    //     alert("fail"))

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>


            <Animated.View

                style={{
                    height: 150,
                    width: 150,

                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 100,
                    // borderWidth: 3,
                    // transform: [
                    //     {
                    //         scale: { valueline }
                    //     }
                    // ]
                    borderTopWidth: valueline,
                    borderRightWidth: valueline,
                    borderLeftWidth: 5,
                    borderBottomWidth: 5,
                    // marginLeft: interpolation
                    // borderColor: interpolation
                    // opacity: interpolation
                }}>
                {/* <Text style={{ fontSize: 25, fontWeight: "bold" }}>X</Text> */}
            </Animated.View>
            <TouchableOpacity onPress={ValueStart}>
                <Text>clik here</Text>

            </TouchableOpacity>


        </View>
    )
}

export default Test1

const styles = StyleSheet.create({
    circle: {

    }
})




// const uploadBusinessProfilee = async () => {

//     // var imageData = new FormData();
//     // let path = res.uri;
//     // imageData.append('fileData', { uri: businessProfile.uri, type: businessProfile.type, name: path.slice(path.lastIndexOf('/'), path.length) });
//     // // await axios.post(`${Server.BASE_URL}/users/${userId}/businessProfile`, imageData)

//     // let url = res.uri;
//     // const split = url.split('/');
//     // const name = split.pop();
//     // const inbox = split.pop();
//     // const realPath = `${RNFS.TemporaryDirectoryPath}${inbox}/${name}`;

//     // let uploadUrl = `${Server.BASE_URL}/users/${userId}/businessProfile`

//     // RNFS.uploadFiles({
//     //     // fileData
//     //     // timeout: 1000,
//     //     toUrl: uploadUrl,     //Add a Post Uri
//     //     files: [{

//     //         name,
//     //         filename: name,
//     //         filepath: realPath,
//     //     }],
//     //     method: 'POST',
//     //     headers: {
//     //         'Accept': 'application/json',
//     //     },
//     //     fields: {
//     //         'title': "sdasfadf"
//     //     },

//     //     begin: uploadBegin,
//     //     // beginCallback: uploadBegin, // Don't ask me, only way I made it work as of 1.5.1
//     //     // progressCallback: uploadProgress,
//     //     progress: uploadProgress
//     // })
//     //     .then((response) => {
//     //         console.warn("tyty");
//     //         console.log(response, "<<< Response");
//     //         if (response.statusCode == 200) { //You might not be getting a statusCode at all. Check
//     //             console.warn('FILES UPLOADED!');
//     //         } else {
//     //             console.warn('SERVER ERROR');
//     //         }
//     //     })

//     //     .catch((err) => {
//     //         if (err.description) {
//     //             switch (err.description) {
//     //                 case "cancelled":
//     //                     console.log("Upload cancelled");
//     //                     break;
//     //                 case "empty":
//     //                     console.log("Empty file");
//     //                 default:
//     //                 //Unknown
//     //             }
//     //         } else {
//     //             //Weird
//     //         }
//     //         console.log(err);
//     //     });




//     ////////////////////====================/////////////////////////




//     // let url = 'file://whatever/com.bla.bla/file.ext'; //The url you received from the DocumentPicker

//     // I STRONGLY RECOMMEND ADDING A SMALL SETTIMEOUT before uploading the url you just got.
//     // let path = res.uri;
//     // let url = res.uri;


//     // try {


//     //     const writeExtStoPer = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
//     //     const readExtStoPer = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
//     //     // setTimeout(async () => {

//     //     const res = await DocumentPicker.pick({
//     //         type: [DocumentPicker.types.allFiles],
//     //     });





//     //     var imageData = new FormData();

//     //     let path = res.uri;

//     //     imageData.append('fileData',
//     //         {
//     //             uri: res.uri,
//     //             type: res.type,
//     //             name: res.name,
//     //             // path.length) 
//     //         })

//     //     const response = await axios.post(`${Server.BASE_URL}/users/${userId}/businessProfile`, imageData)

//     //     console.warn(response.data);


//     // const name = split.pop();
//     // const inbox = split.pop();
//     // const realPath = `${RNFS.TemporaryDirectoryPath}${inbox}/${name}`;
//     // let uploadUrl = `${Server.BASE_URL}/users/${userId}/businessProfile`



//     // console.warn("split", split);
//     // console.warn("name", name);
//     // console.warn("inbox", inbox);
//     // console.warn("realPath", realPath);



//     // const uploadBegin = (response) => {
//     //     const jobId = response.jobId;
//     //     console.log('UPLOAD HAS BEGUN! JobId: ' + jobId);
//     // };

//     // const uploadProgress = (response) => {
//     //     const percentage = Math.floor(
//     //         (response.totalBytesSent / response.totalBytesExpectedToSend) * 100
//     //     );
//     //     console.log('UPLOAD IS ' + percentage + '% DONE!');
//     // };

//     // // const FileName = res.uri.replace("file://", "")


//     // // console.warn("fileName", FileName);

//     // RNFS.uploadFiles({
//     //     toUrl: uploadUrl,
//     //     files: [
//     //         {
//     //             name,
//     //             filename: name,
//     //             filepath: realPath,
//     //         },
//     //     ],
//     //     method: 'POST',
//     //     headers: {
//     //         'Accept': 'application/json',
//     //         'Authorization': 'Bearer ' + this._sessionToken,
//     //         'Connection': 'close'
//     //     },
//     //     // fields: fields,
//     //     begin: uploadBegin,
//     //     beginCallback: uploadBegin, // Don't ask me, only way I made it work as of 1.5.1
//     //     progressCallback: uploadProgress,
//     //     progress: uploadProgress,
//     // })
//     //     .then((response) => {
//     //         console.log(response, '<<< Response');
//     //         if (response.statusCode == 200) {
//     //             //You might not be getting a statusCode at all. Check
//     //             console.log('FILES UPLOADED!');
//     //         } else {
//     //             console.log('SERVER ERROR');
//     //         }
//     //     })
//     //     .catch((err) => {
//     //         if (err.description) {
//     //             switch (err.description) {
//     //                 case 'cancelled':
//     //                     console.log('Upload cancelled');
//     //                     break;
//     //                 case 'empty':
//     //                     console.log('Empty file');
//     //                 default:
//     //                 //Unknown
//     //             }
//     //         } else {
//     //             //Weird
//     //         }
//     //         console.log(err);
//     //     });
//     // } catch (error) {
//     //     // Alert.alert("e===>", error.message)
//     //     console.warn("eee", error.message);
//     // }
// }





