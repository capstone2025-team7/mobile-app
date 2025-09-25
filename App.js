// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OnboardingScreen from './components/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import SignupScreen2 from './screens/SignupScreen2';
import SignupScreen3 from './screens/SignupScreen3';
import SignupScreen4 from './screens/SignupScreen4';
import SignupComplete from './screens/SignupComplete';

import MyPage from './screens/MyPage';
import EditProfileScreen from './screens/EditProfileScreen';
import WithdrawalScreen from './screens/WithdrawalScreen';

import HomeScreen from './screens/HomeScreen';
import SubScreen from './screens/SubScreen';

import WalkScreen from './screens/WalkScreen';
import MedicineScreen from './screens/MedicineScreen';
import WalkRecordScreen from './screens/WalkRecordScreen';
import WalkDetailScreen from './screens/WalkDetailScreen';
import MedicineNewScreen from './screens/MedicineNewScreen';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
        {/* 온보딩/가입/로그인 */}
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="SignupScreen2" component={SignupScreen2} />
        <Stack.Screen name="SignupScreen3" component={SignupScreen3} />
        <Stack.Screen name="SignupScreen4" component={SignupScreen4} />
        <Stack.Screen name="SignupComplete" component={SignupComplete} />


        <Stack.Screen name="MyPage" component={MyPage} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="Withdrawal" component={WithdrawalScreen} />



        {/* 홈 & 서브 */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SubScreen" component={SubScreen} />

        {/* 부가기능 하위 */}
        <Stack.Screen name="WalkScreen" component={WalkScreen} />
        <Stack.Screen name="MedicineScreen" component={MedicineScreen} />
        <Stack.Screen name="WalkRecord" component={WalkRecordScreen} />
        <Stack.Screen name="WalkDetail" component={WalkDetailScreen} />
        <Stack.Screen name="MedicineNew" component={MedicineNewScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
