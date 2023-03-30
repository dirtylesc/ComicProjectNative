/* eslint-disable react/react-in-jsx-scope */
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {IconViewItem} from '.';

function MenuItem({title, onPress, bgColor, ...props}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.centeredView}>
        <IconViewItem bgColor={bgColor}>
          <FontAwesomeIcon {...props} />
        </IconViewItem>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  text: {
    fontSize: 10,
    letterSpacing: 0.6,
    fontWeight: '300',
    textTransform: 'uppercase',
    lineHeight: 20,
  },
});

export default MenuItem;
