/* eslint-disable react/react-in-jsx-scope */
import {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from 'react-native';
import {colors} from 'res/colors';

const AlertConfirmCustom = forwardRef(
  ({title, cancelText, submitText, onPressCancel, onPressSubmit}, ref) => {
    const [show, setShow] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;

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
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    };

    const fadeDown = () => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    };

    return (
      <Modal animationType="none" transparent visible={show}>
        <Animated.View
          style={[
            styles.bgModal,
            {
              opacity: fadeAnim.interpolate({
                inputRange: [0, 100],
                outputRange: [1, 0],
              }),
            },
          ]}>
          <Animated.View
            style={[
              styles.modalView,
              {
                transform: [{scale: fadeAnim}],
                opacity: fadeAnim.interpolate({
                  inputRange: [0, 100],
                  outputRange: [1, 0],
                }),
              },
            ]}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.btnBox}>
              <TouchableOpacity onPress={onPressCancel}>
                <View style={[styles.btn, styles.btnCancel]}>
                  <Text style={[styles.text, styles.cancelText]}>
                    {cancelText}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={onPressSubmit}>
                <View style={[styles.btn, styles.btnSubmit]}>
                  <Text style={[styles.text, styles.submitText]}>
                    {submitText}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </Animated.View>
      </Modal>
    );
  },
);

const styles = StyleSheet.create({
  bgModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalView: {
    position: 'absolute',
    top: '39.5%',
    left: '5%',
    width: '90%',
    height: '19%',
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  title: {
    fontWeight: '500',
    fontSize: 22,
    paddingVertical: 25,
    paddingHorizontal: 70,
    textAlign: 'center',
    letterSpacing: 0.6,
  },
  btnBox: {
    flex: 1,
    flexDirection: 'row',
  },
  btn: {
    borderTopColor: colors.border,
    borderTopWidth: 0.7,
    flexBasis: 'auto',
    paddingHorizontal: 69,
    paddingVertical: 15,
  },
  btnCancel: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 20,
  },
  btnSubmit: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 20,
  },
  text: {
    fontSize: 17,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  cancelText: {
    color: colors.medium,
  },
  submitText: {
    color: colors.white,
  },
});

export default AlertConfirmCustom;
