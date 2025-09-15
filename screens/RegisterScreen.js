import React from 'react';
import { View, Text } from 'react-native';
import FooterNav from '../components/FooterNav';

const RegisterScreen = () => {
  return (
    <View style={{ flex: 1, paddingBottom: 80 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 20 }}>회원가입 화면</Text>
      </View>
    </View>
  );
};

export default RegisterScreen;