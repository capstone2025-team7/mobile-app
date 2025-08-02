import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../styles/colors';

const FooterNav = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
        <Text style={styles.buttonText}>← 뒤로</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Onboarding')} style={styles.button}>
        <Text style={styles.buttonText}>🏠 홈으로</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FooterNav;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 100,
  },
  button: {
    backgroundColor: colors.inputBg,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
  },
});
