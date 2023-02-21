/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';

import {useFonts} from 'expo-font';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {ExploreScreen, LibraryScreen, ProfileScreen} from './src/Screens';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faChessKing,
  faBookmark,
  faChartBar,
  faUser,
} from '@fortawesome/free-regular-svg-icons';

import {TopBarNavigator} from './src/Navigators';
import FeaturedHeader from './src/Components/FeaturedHeader';

const Tab = createBottomTabNavigator();

function App() {
  const [fontsLoaded] = useFonts({
    'NunitoSans-Regular': require('./src/Assets/Fonts/NunitoSans-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await Tab.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer onLayout={onLayoutRootView}>
        <SafeAreaView style={{flex: 1}}>
          <Tab.Navigator
            initialRouteName="Featured"
            sceneContainerStyle={{
              backgroundColor: '#F1F4F9',
            }}
            screenOptions={({route}) => ({
              // eslint-disable-next-line react/no-unstable-nested-components
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
                );
              },
              tabBarActiveTintColor: 'black',
              tabBarLabelStyle: styles.tabBar,
              tabBarStyle: {
                paddingTop: 5,
              },
            })}>
            <Tab.Screen name="Library" component={LibraryScreen} />
            <Tab.Screen
              name="Featured"
              component={TopBarNavigator}
              options={{
                header: () => <FeaturedHeader />,
              }}
            />
            <Tab.Screen name="Explore" component={ExploreScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
          </Tab.Navigator>
        </SafeAreaView>
      </NavigationContainer>
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

export default App;
