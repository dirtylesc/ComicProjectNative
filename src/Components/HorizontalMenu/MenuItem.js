/* eslint-disable react/react-in-jsx-scope */
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {IconViewItem} from 'Components';

function MenuItem({
  title,
  fs = 12,
  onPress,
  type = 'column',
  textTransform = 'uppercase',
  bgColor,
  icon,
  style,
}) {
  const renderIcon = () => {
    if (icon) {
      return <IconViewItem bgColor={bgColor}>{icon}</IconViewItem>;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.centeredView, style, {flexDirection: type}]}>
        {renderIcon()}
        <Text
          numberOfLines={2}
          style={[
            styles.text,
            {
              textTransform: textTransform,
              fontSize: fs,
            },
          ]}>
          {title}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    alignItems: 'center',
  },
  text: {
    letterSpacing: 0.6,
    fontWeight: '400',
    lineHeight: 24,
    flexShrink: 1,
  },
});

export default MenuItem;
