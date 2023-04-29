/* eslint-disable react/react-in-jsx-scope */
import {useRef, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faEllipsis,
  faFileCircleCheck,
  faGlobe,
  faHeart,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';

import {Heading} from 'Components';
import BottomPopup from 'Components/BottomPopup';
import ItemBottomPopup from 'Components/ItemBottomPopup';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {colors} from 'res/colors';
import {ReadingListScreen, ReadingScreen} from 'Screens/Library';
import TouchIcon from 'Components/TouchIcon';
import ItemRadioPopup from 'Components/ItemRadioPopup';
import ListItemPopup from 'Components/ListItemPopup';

const Tab = createMaterialTopTabNavigator();

const RADIO_POPUP_ITEMS = [
  {
    id: 0,
    title: 'Recent reading',
  },
  {
    id: 1,
    title: 'A to Z',
  },
  {
    id: 2,
    title: 'Time added',
  },
];

function LibraryScreen({navigation}) {
  const [currentScreen, setCurrentScreen] = useState('Reading');
  const [activedRadio, setActivedRadio] = useState(0);

  const popupRef = useRef();

  const openPopup = () => {
    popupRef.current.show();
  };

  const handleNavigateSearch = () => {
    navigation.navigate('Search');
  };

  const handleNavigateHistory = () => {
    navigation.navigate('History');
  };

  const renderSortByItems = () => {
    return RADIO_POPUP_ITEMS.map(item => (
      <ItemRadioPopup
        key={item.id}
        title={item.title}
        onPress={() => {
          setActivedRadio(item.id);
          popupRef.current.close();
        }}
        active={item.id === activedRadio}
      />
    ));
  };

  return (
    <View style={styles.centeredView}>
      <Tab.Navigator
        initialRouteName="Reading"
        tabBarPosition="top"
        screenOptions={() => ({
          tabBarStyle: styles.tabBarStyle,
          tabBarItemStyle: {
            width: 'auto',
            borderColor: '#666666',
            paddingBottom: 12,
          },
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarActiveTintColor: '#262626',
          tabBarIndicatorStyle: {
            backgroundColor: 'black',
            marginLeft: 5,
          },
        })}>
        <Tab.Screen
          name="Reading"
          component={ReadingScreen}
          options={{tabBarLabel: 'Reading'}}
          listeners={{
            tabPress: e => {
              setCurrentScreen('Reading');
            },
          }}
        />
        <Tab.Screen
          name="ReadingList"
          component={ReadingListScreen}
          options={{tabBarLabel: 'Reading List'}}
          listeners={{
            tabPress: e => {
              setCurrentScreen('ReadingList');
            },
          }}
        />
      </Tab.Navigator>
      <TouchIcon
        onPress={handleNavigateSearch}
        hidden={false}
        viewStyle={[styles.icon, styles.searchIcon]}
        icon={faSearch}
        color={colors.medium}
        size={20}
      />
      {currentScreen === 'Reading' && (
        <View>
          <TouchableOpacity
            onPress={openPopup}
            style={[styles.icon, styles.languageIcon]}>
            <FontAwesomeIcon icon={faEllipsis} size={22} />
          </TouchableOpacity>
          <BottomPopup ref={popupRef}>
            <ItemBottomPopup
              icon={faFileCircleCheck}
              text="Viewed"
              onPress={handleNavigateHistory}
            />
            <ListItemPopup title="Sort by">{renderSortByItems()}</ListItemPopup>
            <ListItemPopup title="View mode"></ListItemPopup>
          </BottomPopup>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    flexDirection: 'row',
  },
  tabBarStyle: {
    backgroundColor: colors.main,
    paddingHorizontal: 5,
    elevation: 0,
    shadowOpacity: 0,
  },
  tabBarLabelStyle: {
    fontSize: 17,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  icon: {
    color: '#262626',
    zIndex: 1,
    top: 15,
    marginRight: 30,
  },
});

export default LibraryScreen;
