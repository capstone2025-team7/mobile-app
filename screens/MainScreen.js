import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FooterNav from '../components/FooterNav';
import colors from '../styles/colors';

const { width } = Dimensions.get('window');
const BUTTON_MARGIN = 16;
const BUTTON_SIZE = (width - BUTTON_MARGIN * 3) / 2;

const MainScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <FooterNav />
      
      <View style={styles.buttonGrid}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Club')}
        >
          <Text style={styles.buttonText}>동호회</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Notification')}
        >
          <Text style={styles.buttonText}>알림</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Feature')}
        >
          <Text style={styles.buttonText}>부가기능</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Widget')}
        >
          <Text style={styles.buttonText}>위젯</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAEBD7',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 100,
    paddingBottom: 200,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 20,
  },
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    backgroundColor: colors.inputBg,
    borderRadius: 16,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: BUTTON_MARGIN,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
  },
});