/* eslint-disable react/react-in-jsx-scope */
import {StyleSheet, View} from 'react-native';

function Menu({children}) {
  return <View style={styles.centredView}>{children}</View>;
}

const styles = StyleSheet.create({
  centredView: {
    padding: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Menu;
