/* eslint-disable react/react-in-jsx-scope */
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {Animated, Dimensions, Modal, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LoginScreen, RegisterScreen} from 'Screens/Auth';

const Stack = createStackNavigator();

const windowHeight = Dimensions.get('window').height;
const StackNavigatorAuth = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);
  const fadeAnim = useRef(new Animated.Value(windowHeight)).current;

  useImperativeHandle(ref, () => {
    return {show: () => handleShow(), close: () => handleClose()};
  });

  const handleShow = () => {
    setShow(true);
    fadeUp();
  };

  const handleClose = () => {
    fadeDown();
    setShow(false);
  };

  const fadeUp = () => {
    Animated.timing(fadeAnim, {
      duration: 200,
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const fadeDown = () => {
    Animated.timing(fadeAnim, {
      duration: 200,
      toValue: windowHeight,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Modal visible={show} animationType="slide">
      <Animated.View
        style={[
          {flex: 1},
          {
            transform: [{translateY: fadeAnim}],
          },
        ]}>
        <SafeAreaView style={{flex: 1}}>
          <Stack.Group>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Group>
        </SafeAreaView>
      </Animated.View>
    </Modal>
  );
});

export default StackNavigatorAuth;
