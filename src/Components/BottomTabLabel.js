import {StyleSheet} from 'react-native';
import {NutinoSansText} from './StyledText.js';

export function BottomTabLabel() {
  // eslint-disable-next-line react/react-in-jsx-scope
  return <NutinoSansText style={styles.text} />;
}

const styles = StyleSheet.create({
  text: {
    color: '#000',
    fontWeight: '700',
    fontStyle: 'italic',
  },
});
