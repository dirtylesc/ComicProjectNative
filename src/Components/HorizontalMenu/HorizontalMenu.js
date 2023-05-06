/* eslint-disable react/react-in-jsx-scope */
import {StyleSheet, View} from 'react-native';

function HorizontalMenu({type, style, children}) {
  return (
    <View style={[styles.centredView, style, {flexDirection: type}]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  centredView: {
    flex: 1,
  },
});

export default HorizontalMenu;
