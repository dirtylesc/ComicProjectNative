/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {StyleSheet, Text, View} from 'react-native';
import {colors} from 'res/colors';

function ListItemPopup({title, children}) {
  return (
    <View style={styles.centeredView}>
      {title && <Text style={styles.title}>{title}</Text>}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    paddingTop: 25,
  },
  title: {
    fontSize: 17,
    letterSpacing: 0.6,
    fontWeight: '500',
    color: colors.large,
  },
});

export default ListItemPopup;
