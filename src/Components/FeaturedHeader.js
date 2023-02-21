/* eslint-disable react/self-closing-comp */
/* eslint-disable react/react-in-jsx-scope */
import styled from 'styled-components';

import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useRef} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faGlobe, faHeart} from '@fortawesome/free-solid-svg-icons';

import Search from '../Components/Search';
import BottomPopup from '../Components/BottomPopup';
import ItemBottomPopup from '../Components/ItemBottomPopup';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

const Heading = styled(View)`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 15px 30px 0 15px;
`;

function FeaturedScreen() {
  const insets = useSafeAreaInsets();

  const popupRef = useRef();

  const openPopup = () => {
    popupRef.current.show();
  };

  return (
    <SafeAreaView style={{marginBottom: insets.bottom}}>
      <Heading>
        <Search width="100%" placeholder="Search for stories" />
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  languageTouch: {flex: 1, alignItems: 'center'},
});

export default FeaturedScreen;
