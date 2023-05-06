/* eslint-disable react/react-in-jsx-scope */
import {StyleSheet} from 'react-native';

import {faAngleRight} from '@fortawesome/free-solid-svg-icons';

import {auth} from '../../../firebaseConfig';
import {colors} from 'res/colors';
import {HorizontalMenu, VerticalMenuItem} from 'Components/HorizontalMenu';

function SettingScreen({navigation}) {
  const handleSignOut = () => {
    auth.signOut().then(() => navigation.goBack());
  };

  return (
    <HorizontalMenu type="column">
      <VerticalMenuItem
        style={styles.item}
        title="Notifications"
        rightIcon={faAngleRight}
        color={colors.medium}
        size={20}
      />
      <VerticalMenuItem
        style={styles.item}
        title="Language"
        rightIcon={faAngleRight}
        color={colors.medium}
        size={20}
      />
      {auth.currentUser && (
        <VerticalMenuItem
          style={styles.item}
          title="Sign Out"
          onPress={handleSignOut}
        />
      )}
    </HorizontalMenu>
  );
}

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.bg_grey_light,
  },
});

export default SettingScreen;
