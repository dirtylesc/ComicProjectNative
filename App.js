import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useFonts} from 'expo-font';

import MainScreen from 'Screens/MainScreen';
import {AuthScreen, LoginScreen, RegisterScreen} from 'Screens/Auth';
import {SettingScreen} from 'Screens/Profile';
import {
  ComicDetailScreen,
  ReviewDetailsScreen,
  ReviewScreen,
} from 'Screens/Featured';
import {colors} from 'res/colors';

const Stack = createStackNavigator();

function App() {
  const [fontsLoaded] = useFonts({
    'NunitoSans-Regular': require('Assets/Fonts/NunitoSans-Regular.ttf'),
    'Northern-Army': require('Assets/Fonts/Northern-Army.otf'),
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
    <NavigationContainer onLayout={onLayoutRootView}>
      <Stack.Navigator
        initialRouteName="Profile"
        screenOptions={() => ({
          headerShown: false,
          cardStyle: styles.cardLayout,
        })}>
        <Stack.Group>
          <Stack.Screen name="Main" component={MainScreen} />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen
            name="Auth"
            component={AuthScreen}
            options={{presentation: 'modal'}}
          />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen
            name="Setting"
            component={SettingScreen}
            options={{
              headerShown: true,
              title: 'Settings',
              headerTitleAlign: 'center',
              headerStyle: {
                borderBottomWidth: 0.5,
              },
            }}
          />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen component={ComicDetailScreen} name="ComicDetail" />
          <Stack.Screen
            component={ReviewScreen}
            name="Review"
            options={{
              headerShown: true,
              headerTitleAlign: 'center',
              headerTitle: 'Details',
              headerStyle: {
                backgroundColor: colors.main,
              },
            }}
          />
          <Stack.Screen
            component={ReviewDetailsScreen}
            name="ReviewDetails"
            options={{
              headerShown: true,
              headerTitleAlign: 'center',
              headerTitle: 'Details',
              headerStyle: {
                backgroundColor: colors.main,
              },
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
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
