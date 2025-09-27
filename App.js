import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OnboardingScreen from './components/OnboardingScreen';
import LoginScreen from './screens/Login/LoginScreen';
import SignupScreen1 from './screens/Register/SignupScreen';
import SignupScreen2 from './screens/Register/SignupScreen2';
import SignupScreen3 from './screens/Register/SignupScreen3';
import SignupScreen4 from './screens/Register/SignupScreen4';
import SignupScreen5 from './screens/Register/SignupComplete';
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
import WidgetScreen from './screens/WidgetScreen';
import MyPage from './screens/MyPage';
import EditProfileScreen from './screens/EditProfileScreen';
import FeatureScreen from './screens/Feature/FeatureScreen';
import WalkScreen from './screens/Feature/WalkScreen';
import WalkDetailScreen from './screens/Feature/WalkDetailScreen';
import WalkRecordScreen from './screens/Feature/WalkRecordScreen';
import MedicineScreen from './screens/Feature/MedicineScreen';
import MedicineNewScreen from './screens/Feature/MedicineNewScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup1" component={SignupScreen1} />
        <Stack.Screen name="Signup2" component={SignupScreen2} />
        <Stack.Screen name="Signup3" component={SignupScreen3} />
        <Stack.Screen name="Signup4" component={SignupScreen4} />
        <Stack.Screen name="Signup5" component={SignupScreen5} />
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
        <Stack.Screen name="MyPage" component={MyPage} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="Walk" component={WalkScreen} />
        <Stack.Screen name="WalkDetail" component={WalkDetailScreen} />
        <Stack.Screen name="WalkRecord" component={WalkRecordScreen} />
        <Stack.Screen name="Medicine" component={MedicineScreen} />
        <Stack.Screen name="NewMedicine" component={MedicineNewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}