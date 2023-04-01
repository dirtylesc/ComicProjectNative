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
    if (!userInfo) {
      mainNavigation.navigate('Auth');
    }
  };

  const renderNickname = () => {
    let content = 'RandomName';
    if (userInfo.nickname) {
      content = userInfo.nickname;
    }

    return <Text style={styles.text}>{content}</Text>;
  };

  const renderAvatar = () => {
    let content = (
      <FontAwesomeIcon icon={faUser} size={26} style={styles.icon} />
    );

    if (userInfo.avatar) {
      content = (
        <Image source={{uri: userInfo.avatar}} style={styles.userAvatar} />
      );
    }

    return content;
  };

  return (
    <SafeAreaView style={styles.centeredView}>
      <TouchableWithoutFeedback onPress={handleUserClicked}>
        <View style={styles.touchView}>
          {renderNickname()}
          <View style={[styles.userView, styles.userAvatar]}>
            {renderAvatar()}
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
