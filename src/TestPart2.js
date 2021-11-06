import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const TestPart2 = ({ item, index, scroll, edit, setEdit }) => {
  const [bannner, setBannner] = React.useState(-1)





  React.useEffect(() => {
    // if (edit != null) {
    if (bannner == index) {
      // setBannner(-1)
      setBannner(index)

    } else {
      // setBannner(-1)

      setBannner(edit)

    }


    // }
  }, [edit])
  const Data1 = [
    {
      key: 1,
      Name: "first"
    },
    {
      key: 2,
      Name: "secand"
    }, {
      key: 3,
      Name: "third"
    }, {
      key: 4,
      Name: "fourth"
    }, {
      key: 5,
      Name: "fifth"
    },

  ]
  return (
    <View>

      <View style={styles.BannerCantainer}>
        <Text style={{ fontSize: 19 }}>{item.Name}</Text>

        <TouchableOpacity onPress={() => {
          bannner == index ?

            setBannner(-1)
            :
            setBannner(index)
        }}>
          <View style={{ backgroundColor: "black", height: 15, width: 15, borderRadius: 100 }}>

          </View>
        </TouchableOpacity>
      </View>
      {
        index == bannner ?
          <FlatList data={Data1} renderItem={({ item, index }) => (
            <View style={styles.BannerCantainer}>
              <Text style={{ fontSize: 19 }}>{item.key}</Text>
            </View>
          )} />
          :
          null
      }
    </View>
  )
}

export default React.memo(TestPart2)

const styles = StyleSheet.create({
  BannerCantainer: {
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderTopWidth: 2,
    height: 50,
    width: "100%",
    flexDirection: "row",
    alignItems: "center"
    , justifyContent: "space-between",
    paddingHorizontal: 20
    // alignItems:"center"
  }
})
