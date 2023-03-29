/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {useState} from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {colors} from 'res/colors';

function Button({
  leftIcon,
  rightIcon,
  title = '',
  bgColor = colors.primary,
  color = 'white',
  borderColor = colors.primary,
  onPress = () => {},
  disabled = false,
  ...props
}) {
  return (
    <TouchableWithoutFeedback onPress={onPress} disabled={disabled}>
      <View
        style={[
          styles.centeredView,
          {
            backgroundColor: bgColor,
            borderColor: borderColor,
            opacity: disabled ? 0.6 : 1,
          },
          props.styles,
        ]}>
        <View style={styles.leftIcon}>{leftIcon}</View>
        {title && <Text style={[styles.title, {color: color}]}>{title}</Text>}
        <View style={styles.rightIcon}>{rightIcon}</View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 50,
    borderWidth: 1,
    marginTop: 15,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    fontSize: 14,
  },
});

export default Button;
