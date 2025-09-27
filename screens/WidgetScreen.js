import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BackNav from '../components/FooterNav';
import FooterNav from '../components/TopNav';
import colors from '../styles/colors';

const WidgetScreen = () => {
  return (
    <View style={styles.container}>
      <FooterNav />

      <View style={styles.content}>
        <Text style={styles.title}>위젯 화면</Text>
      </View>
      <BackNav />
    </View>
  );
};

export default WidgetScreen;

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