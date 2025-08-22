// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OnboardingScreen from './components/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import SignupScreen2 from './screens/SignupScreen2';
import SignupScreen3 from './screens/SignupScreen3';
import SignupComplete from './screens/SignupComplete';

// ✅ 홈 화면 추가
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="SignupScreen2" component={SignupScreen2} />
        <Stack.Screen name="SignupScreen3" component={SignupScreen3} />
        <Stack.Screen name="SignupComplete" component={SignupComplete} />

        {/* ✅ 홈 등록 */}
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
