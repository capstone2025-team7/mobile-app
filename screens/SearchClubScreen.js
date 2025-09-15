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

const SearchClubScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <FooterNav />

      <View style={styles.buttonColumn}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ClubInside')}
        >
          <Text style={styles.buttonText}>실내 동호회 정보</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ClubOutside')}
        >
          <Text style={styles.buttonText}>실외 동호회 정보</Text>
        </TouchableOpacity>
      </View>

      <BackNav />
    </View>
  );
};

export default SearchClubScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 80,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FAEBD7',
    paddingTop: 100,
    paddingBottom: 200,
  },
  buttonColumn: {
    flexDirection: 'column',
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