/* eslint-disable react/react-in-jsx-scope */
import {StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {NovelScreen, NewNovelScreen, ComicScreen} from 'Screens/Featured';
import {colors} from 'res/colors';

const Tab = createMaterialTopTabNavigator();

function FeaturedScreen({navigation}) {
  return (
    <Tab.Navigator
      initialRouteName="Comic"
      tabBarPosition="top"
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
        name="Novel"
        component={NovelScreen}
        options={{tabBarLabel: 'Novel'}}
      />
      <Tab.Screen
        name="NewNovel"
        component={NewNovelScreen}
        options={{tabBarLabel: 'New Novel'}}
      />
      <Tab.Screen
        name="Comic"
        component={ComicScreen}
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

export default FeaturedScreen;
