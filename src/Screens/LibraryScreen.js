/* eslint-disable react/react-in-jsx-scope */
import {useRef, useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEllipsis} from '@fortawesome/free-solid-svg-icons';

import {faSearch} from '@fortawesome/free-solid-svg-icons';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {colors} from 'res/colors';
import {ReadingListScreen, ReadingScreen} from 'Screens/Library';
import TouchIcon from 'Components/TouchIcon';

import ListItemPopup from 'Components/ListItemPopup';

const Tab = createMaterialTopTabNavigator();

function LibraryScreen({navigation}) {
  const [currentScreen, setCurrentScreen] = useState('Reading');

  const popupRef = useRef();

  const handleNavigateSearch = () => {
    navigation.navigate('Search');
  };

  const openPopup = () => {
    popupRef.current.show();
  };

  return (
    <View style={styles.centeredView}>
      <Tab.Navigator
        initialRouteName="Reading"
        tabBarPosition="top"
        screenOptions={() => ({
          tabBarStyle: styles.tabBarStyle,
          tabBarItemStyle: styles.tabBarItemStyle,
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
          initialParams={{popupRef: popupRef}}
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
      <View style={styles.funcBox}>
        <TouchIcon
          onPress={handleNavigateSearch}
          hidden={false}
          viewStyle={styles.icon}
          icon={faSearch}
          color={colors.medium}
          size={20}
        />
        {currentScreen === 'Reading' && (
          <TouchableOpacity style={styles.icon} onPress={openPopup}>
            <FontAwesomeIcon
              icon={faEllipsis}
              size={22}
              color={colors.medium}
            />
          </TouchableOpacity>
        )}
      </View>
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
    width: '88%',
    overflow: 'visible',
  },
  tabBarLabelStyle: {
    fontSize: 17,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  tabBarItemStyle: {
    width: 'auto',
    borderColor: '#666666',
    paddingBottom: 12,
  },
  funcBox: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    right: 0,
    top: 15,
  },
  icon: {
    zIndex: 1,
    marginRight: 30,
  },
});

export default LibraryScreen;
