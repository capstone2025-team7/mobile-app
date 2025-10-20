import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../../../styles/colors';
import TopNav from '../../../components/TopNav';
import FooterNav from '../../../components/FooterNav';

const { width } = Dimensions.get('window');
const BUTTON_MARGIN = 16;
const BUTTON_SIZE = (width - BUTTON_MARGIN * 3) / 2;

const activities = ['골프', '게이트볼', '테니스', '수영'];

const activityImages = {
  골프: require('../../../assets/golf.png'),
  게이트볼: require('../../../assets/gateball.png'),
  테니스: require('../../../assets/tennis.png'),
  수영: require('../../../assets/swimming.png'),
};

const ActivitySelectScreen = () => {
  const navigation = useNavigation();
  const [selectedActivities, setSelectedActivities] = useState([]);

  const handleActivitySelect = (activity) => {
    navigation.navigate('DaySelect', { activities: [activity] });
  };

  return (
    <View style={styles.container}>
      <TopNav />
      <Text style={styles.title}>활동을 선택하세요</Text>
      <View style={styles.buttonGrid}>
        {activities.map((activity) => {
          const isSelected = selectedActivities.includes(activity);
          return (
            <TouchableOpacity
              key={activity}
              style={[styles.button, isSelected && styles.selectedButton]}
              onPress={() => handleActivitySelect(activity)}
            >
              <Image
                source={activityImages[activity]}
                style={styles.activityImage}
              />
              <Text style={[styles.buttonText, isSelected && styles.selectedButtonText]}>
                {activity}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <FooterNav />
    </View>
  );
};

export default ActivitySelectScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAEBD7',
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: 120, // FooterNav 공간 확보
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 30,
    marginBottom: 10,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 30,
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
  selectedButton: {
    backgroundColor: colors.primary,
  },
  activityImage: {
    width: 50,
    height: 50,
    marginBottom: 8,
    resizeMode: 'contain',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
  },
  selectedButtonText: {
    color: '#fff',
  },
});