/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {useEffect, useReducer, useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faXmark,
  faEyeSlash,
  faEye,
} from '@fortawesome/free-solid-svg-icons';

import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../../firebaseConfig';
import {colors} from 'res/colors';
import {functions as reducerFunctions} from 'Components/reducer/RegisterReducer';

import Button from 'Components/Button';
import TextInputCustom from 'Components/TextInputCustom';
import reducer from 'Components/reducer/RegisterReducer';

//Init State
const initState = {
  disabled: true,
  hidePassword: true,
  email: '',
  password: '',
};

function LoginScreen({navigation}) {
  const [isCorrect, setIsCorrect] = useState(true);
  const [state, dispatch] = useReducer(reducer, initState);
  const {disabled, hidePassword, email, password} = state;

  useEffect(() => {
    if (email && password) {
      dispatch(reducerFunctions.setDisabled(false));
    } else {
      dispatch(reducerFunctions.setDisabled(true));
    }
  }, [disabled, email, password]);

  // useEffect(() => {
  //   auth.onAuthStateChanged(user => {
  //     if (user) {
  //       navigation.navigate('Main');
  //     }
  //   });
  // }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleLogin = e => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        Alert.alert('Login Notification', 'Login Account Successful', [
          {text: 'OK', onPress: () => navigation.navigate('Main')},
        ]);
      })
      .catch(error => {
        setIsCorrect(false);
      });
  };

  const renderHidePasswordIcon = () => {
    if (hidePassword) {
      return (
        <Button
          leftIcon={
            <FontAwesomeIcon icon={faEyeSlash} size={20} style={styles.icon} />
          }
          styles={styles.button}
          onPress={() => {
            dispatch(reducerFunctions.handlePassword(false));
          }}
        />
      );
    } else {
      return (
        <Button
          leftIcon={
            <FontAwesomeIcon icon={faEye} size={20} style={styles.icon} />
          }
          styles={styles.button}
          onPress={() => {
            dispatch(reducerFunctions.handlePassword(true));
          }}
        />
      );
    }
  };

  return (
    <View style={styles.centeredView}>
      <View style={styles.onBackView}>
        <TouchableWithoutFeedback onPress={handleBack}>
          <View>
            <FontAwesomeIcon icon={faArrowLeft} size={20} />
          </View>
        </TouchableWithoutFeedback>
        <Text style={styles.title}>Login Account</Text>
      </View>
      <View style={styles.boxView}>
        <View>
          <View>
            <TextInputCustom
              style={{marginTop: 60}}
              onChange={value => dispatch(reducerFunctions.setEmail(value))}
              value={email}
              placeholder="Email"
              autoCapitalize="none"
              autoFocus
              isInvalid={!isCorrect}
            />
            {!isCorrect && (
              <Text style={[styles.invalidText, styles.invalidEmail]}>
                Email and password do not match
              </Text>
            )}
          </View>
          {email && (
            <View style={styles.functionBox}>
              <Button
                leftIcon={
                  <FontAwesomeIcon
                    icon={faXmark}
                    size={20}
                    style={styles.icon}
                  />
                }
                styles={styles.button}
                onPress={() => {
                  dispatch(reducerFunctions.setEmail(''));
                }}
              />
            </View>
          )}
        </View>
        <View>
          <TextInputCustom
            style={{marginTop: 60}}
            onChange={value => dispatch(reducerFunctions.setPassword(value))}
            value={password}
            placeholder="Password"
            secureTextEntry={hidePassword}
          />
          <View style={styles.functionBox}>
            {password && (
              <Button
                leftIcon={
                  <FontAwesomeIcon
                    icon={faXmark}
                    size={20}
                    style={styles.icon}
                  />
                }
                styles={styles.button}
                onPress={() => {
                  dispatch(reducerFunctions.setPassword(''));
                }}
              />
            )}
            {renderHidePasswordIcon()}
          </View>
        </View>
        <Button
          title="Sign In"
          styles={{marginTop: 50}}
          onPress={e => handleLogin(e)}
          disabled={disabled}
        />
        <Text
          style={styles.forgotPassword}
          onPress={() => {
            navigation.navigate('ForgotPassword');
          }}>
          Forgot password?
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    paddingVertical: 90,
    paddingHorizontal: 25,
    backgroundColor: 'white',
  },
  boxView: {
    flex: 1,
  },
  title: {
    fontWeight: '600',
    fontSize: 18,
    textTransform: 'capitalize',
    marginLeft: 20,
  },
  onBackView: {
    position: 'absolute',
    top: 55,
    left: 25,
    padding: 5,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    marginTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 10,
  },
  functionBox: {
    position: 'absolute',
    right: 0,
    bottom: 10,
    flexDirection: 'row',
  },
  button: {
    backgroundColor: 'white',
    borderColor: 'white',
    marginTop: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  icon: {
    marginLeft: 20,
    color: colors.bg_grey,
  },
  invalidText: {
    flexDirection: 'row',
    alignItems: 'center',
    top: 10,
    fontSize: 12,
    fontWeight: '400',
  },
  invalidEmail: {
    color: 'red',
  },
  forgotPassword: {
    textTransform: 'uppercase',
    color: colors.medium,
    fontWeight: '400',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 30,
  },
});

export default LoginScreen;
