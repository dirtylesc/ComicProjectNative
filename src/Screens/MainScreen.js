/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import {StyleSheet} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faChessKing,
  faBookmark,
  faChartBar,
  faUser,
} from '@fortawesome/free-regular-svg-icons';

import {colors} from 'res/colors';
import {
  ExploreScreen,
  LibraryScreen,
  ProfileScreen,
  FeaturedScreen,
} from 'Screens';
import {FeaturedHeader} from 'Components/Featured';

const Tab = createBottomTabNavigator();

function MainScreen({navigation}) {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}}>
        <Tab.Navigator
          initialRouteName="Featured"
          sceneContainerStyle={{
            backgroundColor: colors.bg_primary,
          }}
          screenOptions={({route}) => ({
            tabBarIcon: ({focused}) => {
              let iconName;
              if (route.name === 'Library') {
                iconName = faBookmark;
              } else if (route.name === 'Featured') {
                iconName = faChessKing;
              } else if (route.name === 'Explore') {
                iconName = faChartBar;
              } else if (route.name === 'Profile') {
                iconName = faUser;
              }
              return (
                <FontAwesomeIcon
                  icon={iconName}
                  size={20}
                  color={focused ? 'black' : '#666666'}
                  swapOpacity
                />
                // <Icon name="user" size={20} />
              );
            },
            tabBarActiveTintColor: 'black',
            tabBarStyle: styles.tabBar,
          })}>
          <Tab.Group>
            <Tab.Screen name="Library" component={LibraryScreen} />
            <Tab.Screen
              name="Featured"
              component={FeaturedScreen}
              options={{
                header: () => <FeaturedHeader navigation={navigation} />,
              }}
            />
            <Tab.Screen name="Explore" component={ExploreScreen} />
            <Tab.Screen
              name="Profile"
              component={ProfileScreen}
              options={() => ({
                header: () => {},
              })}
            />
          </Tab.Group>
        </Tab.Navigator>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    paddingBottom: 2,
    letterSpacing: 0.5,
    fontSize: 10,
    fontFamily: 'NunitoSans-Regular',
    fontWeight: 400,
  },
});

export default MainScreen;
