import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BackNav from '../components/BackNav';
import FooterNav from '../components/FooterNav';
import colors from '../styles/colors';

const FeatureScreen = () => {
  return (
    <View style={styles.container}>
      <FooterNav />

      <View style={styles.content}>
        <Text style={styles.title}>부가기능 화면</Text>
      </View>
      <BackNav />
    </View>
  );
};

export default FeatureScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAEBD7',
    justifyContent: 'space-between',
    paddingTop: 100,
    paddingBottom: 200,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textDark,
  },
});