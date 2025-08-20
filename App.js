import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import MainScreen from './screens/MainScreen';
import ClubScreen from './screens/ClubScreen';
import MyClubScreen from './screens/MyClubScreen';
import AdmittedClubScreen from './screens/AdmittedClubScreen';
import JoinedClubScreen from './screens/JoinedClubScreen';
import JoinedClubMainScreen from './screens/JoinedClubMainScreen';
import JoinedClubInfoScreen from './screens/JoinedClubInfoScreen';
import ClubMemberScreen from './screens/ClubMemberScreen';
import BulletinBoardScreen from './screens/BulletinBoardScreen';
import SearchClubScreen from './screens/SearchClubScreen';
import ClubInsideScreen from './screens/ClubInsideScreen';
import ClubOutsideScreen from './screens/ClubOutsideScreen';
import ClubInfoScreen from './screens/ClubInfoScreen';
import CalenderScreen from './screens/CalenderScreen';
import SuggestionScreen from './screens/SuggestionScreen';
import NotificationScreen from './screens/NotificationScreen';
import FeatureScreen from './screens/FeatureScreen';
import WidgetScreen from './screens/WidgetScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
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
        <Stack.Screen name="Calender" component={CalenderScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Suggestion" component={SuggestionScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Notification" component={NotificationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Feature" component={FeatureScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Widget" component={WidgetScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}