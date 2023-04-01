/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {colors} from 'res/colors';

function VerticalMenuItem({
  title = '',
  text = '',
  onPress,
  leftIcon = null,
  rightIcon = null,
  style,
  ...props
}) {
  const renderIcon = (position = 'left') => {
    if (position === 'left' && leftIcon) {
      return <FontAwesomeIcon icon={leftIcon} {...props} />;
    } else if (position === 'right' && rightIcon) {
      return (
        <FontAwesomeIcon icon={rightIcon} {...props} style={styles.rightIcon} />
      );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.centeredView, style]}>
        {renderIcon('left')}
        <View style={{marginLeft: 20}}>
          <Text style={styles.title}>{title}</Text>
          {text && (
            <Text style={styles.text} numberOfLines={1}>
              {text}
            </Text>
          )}
        </View>
        {renderIcon('right')}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  title: {
    fontSize: 18,
    letterSpacing: 0.6,
    fontWeight: '400',
    lineHeight: 20,
    color: colors.large,
  },
  text: {
    fontSize: 14,
    letterSpacing: 0.6,
    fontWeight: '400',
    color: colors.medium,
  },
  rightIcon: {
    position: 'absolute',
    right: 15,
  },
});

export default VerticalMenuItem;
