import React from 'react';
import { View, Text } from 'react-native';
import FooterNav from '../components/FooterNav';
import BackNav from '../components/BackNav';

const RegisterScreen = () => {
  return (
    <View style={{ flex: 1, paddingBottom: 80 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 20 }}>부가기능 화면</Text>
      </View>
      <BackNav />
    </View>
  );
};

export default RegisterScreen;