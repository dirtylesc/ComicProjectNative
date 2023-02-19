/* eslint-disable react/self-closing-comp */
/* eslint-disable react/react-in-jsx-scope */
import styled from 'styled-components';

import {
  Animated,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faGlobe, faHeart, faAngleDown} from '@fortawesome/free-solid-svg-icons';

import Search from '../Components/Search';

const Heading = styled(View)`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 40px 15px;
`;

const ModalLanguage = ({visible, setModalVisible}) => {
  return (
    <Modal
      animationType="none"
      transparent
      visible={visible}
      onRequestClose={() => {
        setModalVisible(!visible);
      }}>
      <View style={styles.bgModal}>
        <View style={styles.modalLanguage}>
          <Pressable
            style={styles.closeModalBtn}
            onPress={() => setModalVisible(!visible)}>
            <View style={styles.closeModalView}>
              <FontAwesomeIcon icon={faAngleDown} size={24} color={'#666666'} />
            </View>
          </Pressable>
          <Text style={{fontWeight: 'bold', fontSize: 20, paddingVertical: 10}}>
            Preference
          </Text>
          <TouchableWithoutFeedback onPress={() => console.log('123')}>
            <View style={styles.touchableView}>
              <FontAwesomeIcon icon={faHeart} />
              <Text style={styles.touchableContent}>Reading Preferences</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => console.log('234')}>
            <View style={styles.touchableView}>
              <FontAwesomeIcon icon={faGlobe} />
              <Text style={styles.touchableContent}>Content Language</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </Modal>
  );
};

function FeaturedScreen() {
  const [visible, setVisible] = useState(false);
  return (
    <View>
      <Heading>
        <Search placeholder="Search for stories" />
        <TouchableOpacity onPress={setVisible()}>
          <FontAwesomeIcon icon={faGlobe} size={20} />
        </TouchableOpacity>
        <ModalLanguage visible={visible} setModalVisible={setVisible()} />
      </Heading>
    </View>
  );
}

const styles = StyleSheet.create({
  bgModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalLanguage: {
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
  touchableView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  touchableContent: {
    fontSize: 16,
    letterSpacing: 0.6,
    paddingLeft: 15,
  },
  closeModalBtn: {
    alignItems: 'center',
  },
  closeModalView: {
    alignItems: 'center',
    backgroundColor: '#d9d9d9',
    paddingHorizontal: 25,
    borderRadius: 50,
  },
});

export default FeaturedScreen;
