/* eslint-disable react/react-in-jsx-scope */
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUser} from '@fortawesome/free-regular-svg-icons';

import {colors} from 'res/colors';
import {auth} from '../../../firebaseConfig';

function ProfileHeader({mainNavigation, userInfo}) {
  const handleUserClicked = () => {
    if (!auth.currentUser) {
      mainNavigation.navigate('Auth');
    }
  };

  const renderDisplayName = () => {
    let content = 'RandomName';
    if (userInfo.nickname) {
      content = userInfo.nickname;
    }

    return <Text style={styles.text}>{content}</Text>;
  };

  return (
    <SafeAreaView style={styles.centeredView}>
      <TouchableWithoutFeedback onPress={handleUserClicked}>
        <View style={styles.touchView}>
          {renderDisplayName()}
          <View style={[styles.userView, styles.userAvatar]}>
            {!auth.currentUser || !userInfo.avatar ? (
              <FontAwesomeIcon icon={faUser} size={26} style={styles.icon} />
            ) : (
              <Image
                source={{uri: userInfo.avatar}}
                style={styles.userAvatar}
              />
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    paddingTop: 15,
    height: 100,
  },
  touchView: {
    flexDirection: 'row',
  },
  userView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bg_grey_light,
    borderWidth: 1,
    borderColor: colors.border,
  },
  userAvatar: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  text: {
    flex: 1,
    fontSize: 28,
    fontWeight: '600',
    letterSpacing: 1,
    color: '#262626',
    paddingBottom: 35,
  },
  icon: {
    color: 'white',
  },
});

export default ProfileHeader;
