import {StyleSheet} from 'react-native';
import {Colors} from '../../../global/Index';

export const styles = StyleSheet.create({
  ChatBox: {
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.12,
    shadowRadius: 0.8,
    elevation: 10,
  },
});
