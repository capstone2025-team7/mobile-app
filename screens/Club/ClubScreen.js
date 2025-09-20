import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FooterNav from '../../components/FooterNav';
import BackNav from '../../components/BackNav';
import colors from '../../styles/colors';

const { width } = Dimensions.get('window');
const BUTTON_MARGIN = 16;
const BUTTON_SIZE = (width - BUTTON_MARGIN * 3) / 2;

const ClubScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <FooterNav />
      
      <View style={styles.buttonGrid}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('MyClub')}
        >
          <Text style={styles.buttonText}>내 동호회</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ActivitySelect')}
        >
          <Text style={styles.buttonText}>동호회 찾기</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Calendar')}
        >
          <Text style={styles.buttonText}>캘린더</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Suggestion')}
        >
          <Text style={styles.buttonText}>건의함</Text>
        </TouchableOpacity>
      </View>
      <BackNav />
    </View>
  );
};

export default ClubScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAEBD7',
    justifyContent: 'space-between',
    paddingTop: 100,
    paddingBottom: 200,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 20,
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