import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FooterNav from '../components/FooterNav';
import BackNav from '../components/BackNav';
import colors from '../styles/colors';

const { width } = Dimensions.get('window');
const BUTTON_MARGIN = 16;
const BUTTON_WIDTH = width * 0.8;
const BUTTON_HEIGHT = 120;

const MyClubScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <FooterNav />

      <View style={styles.buttonColumn}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AdmittedClub')}
        >
          <Text style={styles.buttonText}>신청한 동호회 목록</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('JoinedClub')}
        >
          <Text style={styles.buttonText}>가입한 동호회 목록</Text>
        </TouchableOpacity>
      </View>

      <BackNav />
    </View>
  );
};

export default MyClubScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAEBD7',
    alignItems: 'center',
    paddingTop: 100,
    paddingBottom: 100,
  },
  buttonColumn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    backgroundColor: colors.inputBg,
    borderRadius: 16,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: BUTTON_MARGIN,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
  },
});
