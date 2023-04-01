/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {colors} from 'res/colors';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

import Button from 'Components/Button';
import Twitter from 'res/icons/i-twitter.svg';
import Mail from 'res/icons/i-mail.svg';

function AuthScreen({navigation}) {
  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.centeredView}>
      <ImageBackground
        source={require('res/images/bgLogin.jpg')}
        style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={handleBack}>
          <View style={styles.onBackIcon}>
            <FontAwesomeIcon icon={faArrowLeft} size={20} />
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.bgImage}>
          <View style={styles.logoView}>
            <Image
              source={require('res/images/webnovel.png')}
              style={{width: 38, height: 32}}
            />
            <Text style={styles.logoText}>DIRTYLESC</Text>
          </View>
          <View style={styles.boxLoginView}>
            <View>
              <Button
                leftIcon={
                  <Image
                    source={require('res/images/icons8-google-48.png')}
                    style={{width: 22, height: 22}}
                  />
                }
                title="Continue With Google"
                bgColor="#fff"
                color="#000000"
                borderColor={colors.border}
                // onPress={() => handleSignIn}
              />
              <Button
                leftIcon={
                  <Image
                    source={require('res/images/facebook.png')}
                    style={{
                      width: 22,
                      height: 22,
                      backgroundColor: colors.primary,
                    }}
                  />
                }
                title="Continue With Facebook"
                bgColor={colors.primary}
                color="#ffffff"
                borderColor={colors.primary}
              />
            </View>
            <View style={styles.smallBoxLoginView}>
              <Button
                leftIcon={<Twitter width={20} height={20} />}
                bgColor="#55acee"
                borderColor="#55acee"
              />
              <Button
                leftIcon={<Mail width={22} height={22} />}
                bgColor={colors.bg_grey}
                borderColor={colors.bg_grey}
                onPress={() => navigation.navigate('Login')}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Register');
            }}>
            <Text style={styles.newAccText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    marginHorizontal: 35,
  },
  onBackIcon: {
    position: 'absolute',
    top: 35,
    left: 25,
    padding: 5,
    zIndex: 1,
  },
  logoView: {
    marginVertical: 90,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30,
  },
  logoText: {
    fontSize: 30,
    letterSpacing: 0.6,
    marginTop: 10,
    color: colors.primary,
  },
  boxLoginView: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 20,
  },
  smallBoxLoginView: {
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  newAccText: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: '600',
    fontSize: 10,
    color: colors.primary,
    marginTop: 20,
  },
});

export default AuthScreen;
