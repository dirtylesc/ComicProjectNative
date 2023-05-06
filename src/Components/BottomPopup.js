/* eslint-disable react/react-in-jsx-scope */
import {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {Animated, Modal, Pressable, StyleSheet, Text, View} from 'react-native';

import {faAngleDown} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {TouchableWithoutFeedback} from 'react-native';

const BottomPopup = forwardRef(({title, children}, ref) => {
  const [show, setShow] = useState(false);
  const fadeAnim = useRef(new Animated.Value(100)).current;

  useImperativeHandle(ref, () => {
    return {show: () => handleShow(), close: () => handleClose()};
  });

  const handleShow = () => {
    setShow(true);
    fadeUp();
  };

  const handleClose = () => {
    fadeDown();
    setTimeout(() => {
      setShow(false);
    }, 300);
  };

  const fadeUp = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const fadeDown = () => {
    Animated.timing(fadeAnim, {
      toValue: 100,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Modal animationType="none" transparent visible={show}>
      <TouchableWithoutFeedback onPress={handleClose}>
        <Animated.View
          style={[
            styles.bgModal,
            {
              opacity: fadeAnim.interpolate({
                inputRange: [0, 100],
                outputRange: [1, 0],
              }),
            },
          ]}
        />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[
          styles.modalView,
          {
            translateY: fadeAnim,
            opacity: fadeAnim.interpolate({
              inputRange: [0, 100],
              outputRange: [1, 0],
            }),
          },
        ]}>
        <Pressable style={styles.closeModalBtn} onPress={handleClose}>
          <View style={styles.closeModalView}>
            <FontAwesomeIcon icon={faAngleDown} size={24} color={'#666666'} />
          </View>
        </Pressable>
        {title && <Text style={styles.title}>{title}</Text>}
        {children}
      </Animated.View>
    </Modal>
  );
});
const styles = StyleSheet.create({
  bgModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  closeModalBtn: {
    alignItems: 'center',
    marginBottom: 10,
  },
  closeModalView: {
    alignItems: 'center',
    backgroundColor: '#d9d9d9',
    paddingHorizontal: 25,
    borderRadius: 50,
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 10,
  },
});

export default BottomPopup;
