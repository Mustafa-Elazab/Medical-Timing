import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import type {RootStackParamList} from 'types';

// Screens.
import Splash from 'screens/Splash';
import home from 'screens/home';
import add from 'screens/add';

// Navigators.
// TODO: Add navigators imports here.

// Modals.
// TODO: Add modals imports here.

const Stack = createNativeStackNavigator<RootStackParamList>();

export default React.memo(() => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{headerShown: false}}>
      {/* Screens */}
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Home" component={home} />
      <Stack.Screen name="AddMedical" component={add} />

      {/* Navigators */}
      {/* TODO: Add nested navigators here. */}

      {/* Modals */}
      <Stack.Group
        screenOptions={{
          presentation: 'transparentModal',
        }}>
        {/* TODO: Add modals screens here. */}
      </Stack.Group>
    </Stack.Navigator>
  );
});
