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
import BulletinDetailScreen from './screens/Club/BulletinDetailScreen';
import ActivitySelectScreen from './screens/Club/ClubSearch/ActivitySelectScreen';
import DaySelectScreen from './screens/Club/ClubSearch/DaySelectScreen';
import ClubListScreen from './screens/Club/ClubSearch/ClubListScreen';
import ClubInfoScreen from './screens/Club/ClubInfoScreen';
import CalendarScreen from './screens/CalendarScreen';
import SuggestionScreen from './screens/Club/SuggestionScreen';
import NotificationScreen from './screens/NotificationScreen';
import FeatureScreen from './screens/FeatureScreen';
import WidgetScreen from './screens/WidgetScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register1" component={RegisterScreen1} />
        <Stack.Screen name="Register2" component={RegisterScreen2} />
        <Stack.Screen name="Register3" component={RegisterScreen3} />
        <Stack.Screen name="Register4" component={RegisterScreen4} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Club" component={ClubScreen} />
        <Stack.Screen name="MyClub" component={MyClubScreen} />
        <Stack.Screen name="AdmittedClub" component={AdmittedClubScreen} />
        <Stack.Screen name="JoinedClub" component={JoinedClubScreen} />
        <Stack.Screen name="JoinedClubMain" component={JoinedClubMainScreen} />
        <Stack.Screen name="JoinedClubInfo" component={JoinedClubInfoScreen} />
        <Stack.Screen name="ActivitySelect" component={ActivitySelectScreen} />
        <Stack.Screen name="DaySelect" component={DaySelectScreen} />
        <Stack.Screen name="ClubList" component={ClubListScreen} />
        <Stack.Screen name="ClubInfo" component={ClubInfoScreen} />
        <Stack.Screen name="ClubMember" component={ClubMemberScreen} />
        <Stack.Screen name="BulletinBoard" component={BulletinBoardScreen} />
        <Stack.Screen name="BulletinDetail" component={BulletinDetailScreen} />
        <Stack.Screen name="Calendar" component={CalendarScreen} />
        <Stack.Screen name="Suggestion" component={SuggestionScreen} />
        <Stack.Screen name="Notifications" component={NotificationScreen} />
        <Stack.Screen name="Features" component={FeatureScreen} />
        <Stack.Screen name="Widget" component={WidgetScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
