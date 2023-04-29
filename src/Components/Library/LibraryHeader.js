/* eslint-disable react/react-in-jsx-scope */
import {useRef} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faGlobe, faHeart} from '@fortawesome/free-solid-svg-icons';

import {Heading} from 'Components';
import BottomPopup from 'Components/BottomPopup';
import ItemBottomPopup from 'Components/ItemBottomPopup';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {colors} from 'res/colors';
import {ReadingListScreen, ReadingScreen} from 'Screens/Library';

const Tab = createMaterialTopTabNavigator();

function LibraryHeader({navigation}) {
  const insets = useSafeAreaInsets();

  const popupRef = useRef();

  const openPopup = () => {
    popupRef.current.show();
  };

  return (
    <SafeAreaView style={{marginBottom: insets.bottom}}>
      <Heading>
        {/* <TouchableOpacity onPress={openPopup} style={styles.languageTouch}>
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
        </BottomPopup> */}
      </Heading>
    </SafeAreaView>
  );
}

export default LibraryHeader;
