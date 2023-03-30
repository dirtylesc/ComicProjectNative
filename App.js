/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faChessKing,
  faBookmark,
  faChartBar,
  faUser,
} from '@fortawesome/free-regular-svg-icons';
import styled from 'styled-components';

import {colors} from 'res/colors';
import {MainScreen} from 'Screens';
import {AuthScreen, LoginScreen, RegisterScreen} from 'Screens/Auth';
import {SettingScreen} from 'Screens/Profile';

const Tab = createBottomTabNavigator();

const ViewContainer = styled(View)`
  flex: 1;
`;

function App() {
  const [fontsLoaded] = useFonts({
    'NunitoSans-Regular': require('Assets/Fonts/NunitoSans-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await Stack.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ViewContainer>
      <NavigationContainer onLayout={onLayoutRootView} st>
        <Tab.Navigator
          initialRouteName="Featured"
          screenOptions={({route}) => ({
            headerShown: false,
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
          <Tab.Screen name="Featured" component={FeaturedScreen} />
          <Tab.Screen name="Explore" component={ExploreScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </ViewContainer>
  );
}

const styles = StyleSheet.create({
  cardLayout: {
    paddingBottom: 2,
    letterSpacing: 0.5,
    fontSize: 10,
    fontFamily: 'NunitoSans-Regular',
    fontWeight: 400,
  },
});

export default App;
