/* eslint-disable react/react-in-jsx-scope */
import {useRef} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faGlobe, faHeart} from '@fortawesome/free-solid-svg-icons';

import {Heading} from 'Components';
import Search from 'Components/Search';
import BottomPopup from 'Components/BottomPopup';
import ItemBottomPopup from 'Components/ItemBottomPopup';

function FeaturedHeader({navigation}) {
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

export default FeaturedHeader;
