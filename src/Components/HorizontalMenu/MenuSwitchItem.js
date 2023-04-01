/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {useState} from 'react';
import {
  StyleSheet,
  Switch,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {colors} from 'res/colors';

function VerticalMenuItem({
  title = '',
  text = '',
  onPress,
  icon = null,
  style,
  ...props
}) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.centeredView, style]}>
        <FontAwesomeIcon icon={icon} {...props} />
        <View style={{marginLeft: 20}}>
          <Text style={styles.title}>{title}</Text>
          {text && (
            <Text style={styles.text} numberOfLines={1}>
              {text}
            </Text>
          )}
        </View>
        <Switch
          style={{flexGrow: 1}}
          trackColor={{false: colors.border, true: colors.primary_light}}
          thumbColor={isEnabled ? colors.large : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
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
