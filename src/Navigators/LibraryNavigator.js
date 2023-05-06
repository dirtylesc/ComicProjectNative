/* eslint-disable react/react-in-jsx-scope */
import {useState} from 'react';
import {StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {colors} from 'res/colors';
import {ReadingListScreen, ReadingScreen} from 'Screens/Library';

const Tab = createMaterialTopTabNavigator();
function LibraryNavigator() {
  const [currentScreen, setCurrentScreen] = useState('Reading');

  return (
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

export default LibraryNavigator;
