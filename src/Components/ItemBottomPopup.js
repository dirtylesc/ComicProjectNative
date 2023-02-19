/* eslint-disable react/react-in-jsx-scope */
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';

function ItemBottomPopup({icon, text, onPress}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.itemView}>
        <FontAwesomeIcon icon={icon} />
        <Text style={styles.itemContent}>{text}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  itemView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  itemContent: {
    fontSize: 16,
    letterSpacing: 0.6,
    paddingLeft: 15,
  },
});

export default ItemBottomPopup;
