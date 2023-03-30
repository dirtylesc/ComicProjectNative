/* eslint-disable react/self-closing-comp */
/* eslint-disable react/react-in-jsx-scope */
import styled from 'styled-components';

import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useRef, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faGlobe, faHeart} from '@fortawesome/free-solid-svg-icons';

import Search from '../Components/Search';
import BottomPopup from '../Components/BottomPopup';
import ItemBottomPopup from '../Components/ItemBottomPopup';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NovelScreen from './NovelScreen';
import ComicScreen from './ComicScreen';
import NewNovelScreen from './NewNovelScreen';

const Heading = styled(View)`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 60px 40px 20px 15px;
`;

function FeaturedScreen() {
  const popupRef = useRef();

  const openPopup = () => {
    popupRef.current.show();
  };

  return (
    <View style={styles.centeredView}>
      <Heading>
        <Search width="95%" placeholder="Search for stories" />
        <TouchableOpacity onPress={openPopup} style={styles.languageTouch}>
          <FontAwesomeIcon icon={faGlobe} size={20} />
        </TouchableOpacity>
        <BottomPopup ref={popupRef} title="Preferences">
          <ItemBottomPopup
            icon={faHeart}
            text="Reading Preferences"
            onPress={() => console.log(123)}
          />
          <ItemBottomPopup
            icon={faGlobe}
            text="Content Language"
            onPress={() => console.log(234)}
          />
        </BottomPopup>
      </Heading>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {},
  languageTouch: {flex: 1, marginLeft: '5%'},
});

export default FeaturedScreen;
