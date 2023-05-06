/* eslint-disable react/react-in-jsx-scope */
import {
  View,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

function ItemRadioPopup({title, onPress, active = false}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.centeredView}>
        <Image
          source={
            active
              ? require('res/images/radio-active.png')
              : require('res/images/radio.png')
          }
          style={styles.button}
        />
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 28,
  },
  title: {
    letterSpacing: 0.6,
    fontSize: 17,
    paddingLeft: 15,
    fontWeight: '400',
  },
  button: {
    width: 21,
    height: 21,
  },
});

export default ItemRadioPopup;
