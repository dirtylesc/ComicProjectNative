/* eslint-disable react/react-in-jsx-scope */
import {StyleSheet} from 'react-native';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {colors} from 'res/colors';
import ComicExploreScreen from './Explore/ComicExploreScreen';

const Tab = createMaterialTopTabNavigator();

function ExploreScreen() {
  return (
    <Tab.Navigator
      initialRouteName="Comic"
      tabBarPosition="top"
      sceneContainerStyle={{
        backgroundColor: colors.main,
      }}
      screenOptions={() => ({
        tabBarStyle: styles.tabBarStyle,
        tabBarItemStyle: {
          width: 'auto',
          borderColor: '#666666',
          paddingBottom: 0,
        },
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarActiveTintColor: '#262626',
        tabBarIndicatorStyle: {
          backgroundColor: 'black',
          marginLeft: 5,
        },
      })}>
      <Tab.Screen
        name="ComicExplore"
        component={ComicExploreScreen}
        options={{tabBarLabel: 'Comic'}}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: colors.main,
    marginTop: 35,
    paddingHorizontal: 5,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
  tabBarLabelStyle: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});

export default ExploreScreen;
