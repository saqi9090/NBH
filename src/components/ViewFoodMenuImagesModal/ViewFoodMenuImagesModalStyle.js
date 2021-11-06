import { StyleSheet } from "react-native";
import { Colors, Constants } from "../../global";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000aa',
  },
  imageCon: {
    height: Constants.SCREEN_HEIGHT,
    width: Constants.SCREEN_WIDTH,
  },
  image: {
    height: '100%',
    width: '100%'
  },
  closeCon: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 100,
    backgroundColor: Colors.GRAY_DARK,
    borderRadius: 7,
    top: 50,
    right: 10
  },
  row: {
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 100,
    top: Constants.SCREEN_HEIGHT * 0.9,
    left: Constants.SCREEN_WIDTH * 0.43,
  },
  pageNumber: {
    color: '#fff',
    // zIndex: 100,
    fontSize: 20,
  }
});