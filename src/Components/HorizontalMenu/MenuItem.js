/* eslint-disable react/react-in-jsx-scope */
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {IconViewItem} from 'Components';

function MenuItem({title, onPress, bgColor, icon, ...props}) {
  const renderIcon = () => {
    if (icon) {
      return <IconViewItem bgColor={bgColor}>{icon}</IconViewItem>;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.centeredView}>
        {renderIcon()}
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
    fontWeight: '400',
    textTransform: 'uppercase',
    lineHeight: 20,
  },
});

export default MenuItem;
