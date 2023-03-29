/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {StyleSheet, View} from 'react-native';

function HorizontalMenu({type, children}) {
  return (
    <View style={[styles.centredView, {flexDirection: type}]}>{children}</View>
  );
}

const styles = StyleSheet.create({
  centredView: {
    padding: 5,
    flex: 1,
    // justifyContent: 'space-between',
  },
});

export default HorizontalMenu;
