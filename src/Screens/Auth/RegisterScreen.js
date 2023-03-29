/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {useEffect, useReducer} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faXmark,
  faEyeSlash,
  faEye,
  faCheck,
  faCheckDouble,
} from '@fortawesome/free-solid-svg-icons';

import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../../firebaseConfig';
import {constants} from 'res/constants';
import {colors} from 'res/colors';
import {functions as reducerFunctions} from 'Components/reducer/RegisterReducer';

import Button from 'Components/Button';
import TextInputCustom from 'Components/TextInputCustom';
import TextCustom from 'Components/TextCustom';
import reducer from 'Components/reducer/RegisterReducer';

//Init State
const initState = {
  disabled: true,
  hidePassword: true,
  email: '',
  isInvalidEmail: false,
  password: '',
  isInvalidPassword: false,
};

function RegisterScreen({navigation}) {
  const [state, dispatch] = useReducer(reducer, initState);
  const {
    disabled,
    hidePassword,
    email,
    password,
    isInvalidEmail,
    isInvalidPassword,
  } = state;

  useEffect(() => {
    if (email && password.match(constants.REG_PASSWORD)) {
      dispatch(reducerFunctions.setDisabled(false));
    } else {
      dispatch(reducerFunctions.setDisabled(true));
    }
  }, [email, password]);

  useEffect(() => {
    if (password.match(constants.REG_PASSWORD)) {
      dispatch(reducerFunctions.setIsInvalidPassword(false));
    } else {
      dispatch(reducerFunctions.setIsInvalidPassword(true));
    }
  }, [password]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        Alert.alert('Register Notification', 'Create Account Successful', [
          {text: 'OK', onPress: () => navigation.navigate('Main')},
        ]);
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        ToastAndroid(`${errorCode}: ${errorMessage}`, ToastAndroid.SHORT);
      });
  };

  const handleSubmit = () => {
    dispatch(reducerFunctions.handleSubmit());
    if (!isInvalidEmail && !isInvalidPassword) {
      handleSignUp();
    }
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

  const renderValidPasswordText = () => {
    const color = isInvalidPassword ? colors.bg_grey : colors.quaternary;

    const textRendered = (
      <TextCustom
        text="Must be 6-18 characters long."
        color={color}
        size={13}
        style={{marginLeft: 8}}
      />
    );

    if (isInvalidPassword) {
      return (
        <View style={styles.invalidText}>
          <FontAwesomeIcon icon={faCheck} size={13} color={color} />
          {textRendered}
        </View>
      );
    } else {
      return (
        <View style={styles.invalidText}>
          <FontAwesomeIcon icon={faCheckDouble} size={13} color={color} />
          {textRendered}
        </View>
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
        <Text style={styles.title}>Create Account</Text>
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
              isInvalid={isInvalidEmail}
            />
            {isInvalidEmail && (
              <Text style={[styles.invalidText, styles.invalidEmail]}>
                Invalid Email
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
          {renderValidPasswordText()}
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
          title="Create Account"
          disabled={disabled}
          styles={{marginTop: 50}}
          onPress={handleSubmit}
        />
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
    fontSize: 10,
    fontWeight: '400',
  },
  invalidEmail: {
    color: 'red',
  },
  invalidPasswordText: {},
});

export default RegisterScreen;
