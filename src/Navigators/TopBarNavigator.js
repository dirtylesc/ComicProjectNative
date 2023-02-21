/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {StyleSheet} from 'react-native';
import {ComicScreen, NovelScreen, NewNovelScreen} from '../Screens';

const Tab = createMaterialTopTabNavigator();

function TopBarNavigator({navigation}) {
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: '#F1F4F9',
      }}
      initialRouteName="Novel"
      tabBarPosition="top"
      screenOptions={({route}) => ({
        tabBarStyle: {
          backgroundColor: '#F1F4F9',
          marginTop: 35,
          paddingHorizontal: 5,
        },
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
          maxWidth: 0.5,
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
  tabBarLabelStyle: {
    fontSize: 12,
    fontWeight: 600,
    textTransform: 'capitalize',
  },
});

export default TopBarNavigator;
