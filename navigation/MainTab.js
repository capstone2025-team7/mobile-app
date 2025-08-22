// navigation/MainTab.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Expo:
import { Ionicons } from '@expo/vector-icons';


import HomeScreen from '../screens/HomeScreen';
import CommunityScreen from '../screens/CommunityScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function MainTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarIcon: ({ size, color, focused }) => {
          const m = {
            Home: 'home-outline',
            Community: 'chatbubbles-outline',
            Schedule: 'calendar-outline',
            Profile: 'person-outline',
          };
          return <Ionicons name={m[route.name] || 'ellipse-outline'} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: '홈' }} />
      <Tab.Screen name="Community" component={CommunityScreen} options={{ title: '커뮤니티' }} />
      <Tab.Screen name="Schedule" component={ScheduleScreen} options={{ title: '일정' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: '마이' }} />
    </Tab.Navigator>
  );
}
