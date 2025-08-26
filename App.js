import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OnboardingScreen from './components/OnboardingScreen';
import LoginScreen from './screens/Login/LoginScreen';
import RegisterScreen1 from './screens/Register/RegisterScreen1';
import RegisterScreen2 from './screens/Register/RegisterScreen2';
import RegisterScreen3 from './screens/Register/RegisterScreen3';
import RegisterScreen4 from './screens/Register/RegisterScreen4';
import MainScreen from './screens/MainScreen';
import ClubScreen from './screens/Club/ClubScreen';
import MyClubScreen from './screens/Club/MyClubScreen';
import AdmittedClubScreen from './screens/Club/AdmittedClubScreen';
import JoinedClubScreen from './screens/Club/JoinedClubScreen';
import JoinedClubMainScreen from './screens/Club/JoinedClubMainScreen';
import JoinedClubInfoScreen from './screens/Club/JoinedClubInfoScreen';
import ClubMemberScreen from './screens/Club/ClubMemberScreen';
import BulletinBoardScreen from './screens/Club/BulletinBoardScreen';
import SearchClubScreen from './screens/Club/SearchClubScreen';
import ClubInsideScreen from './screens/Club/ClubInsideScreen';
import ClubOutsideScreen from './screens/Club/ClubOutsideScreen';
import ClubInfoScreen from './screens/Club/ClubInfoScreen';
import CalendarScreen from './screens/CalendarScreen';
import SuggestionScreen from './screens/Club/SuggestionScreen';
import NotificationScreen from './screens/NotificationScreen';
import FeatureScreen from './screens/FeatureScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register1" component={RegisterScreen1} options={{ headerShown: false }} />
        <Stack.Screen name="Register2" component={RegisterScreen2} options={{ headerShown: false }} />
        <Stack.Screen name="Register3" component={RegisterScreen3} options={{ headerShown: false }} />
        <Stack.Screen name="Register4" component={RegisterScreen4} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Club" component={ClubScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MyClub" component={MyClubScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AdmittedClub" component={AdmittedClubScreen} options={{ headerShown: false }} />
        <Stack.Screen name="JoinedClub" component={JoinedClubScreen} options={{ headerShown: false }} />
        <Stack.Screen name="JoinedClubMain" component={JoinedClubMainScreen} options={{ headerShown: false }} />
        <Stack.Screen name="JoinedClubInfo" component={JoinedClubInfoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SearchClub" component={SearchClubScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ClubInside" component={ClubInsideScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ClubOutside" component={ClubOutsideScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ClubInfo" component={ClubInfoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ClubMember" component={ClubMemberScreen} options={{ headerShown: false }} />
        <Stack.Screen name="BulletinBoard" component={BulletinBoardScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Calendar" component={CalendarScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Suggestion" component={SuggestionScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Notifications" component={NotificationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Features" component={FeatureScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}