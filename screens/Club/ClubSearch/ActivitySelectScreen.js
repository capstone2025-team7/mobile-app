// ActivitySelectScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
  const insets = useSafeAreaInsets();
  const [selectedActivities, setSelectedActivities] = useState([]);

  const toggleActivity = (activity) => {
    setSelectedActivities(prev =>
      prev.includes(activity)
        ? prev.filter(a => a !== activity)
        : [...prev, activity]
    );
  };

  const handleNext = () => {
    if (selectedActivities.length === 0) {
      alert('하나 이상의 활동을 선택해주세요.');
      return;
    }
    navigation.navigate('DaySelect', { activities: selectedActivities });
  };

  return (
    <View style={styles.container}>
      <TopNav />
      <ScrollView
        contentContainerStyle={[styles.scrollContainer, { paddingTop: insets.top + 120, paddingBottom: insets.bottom + 120 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>활동을 선택하세요</Text>
        <View style={styles.buttonGrid}>
          {activities.map(activity => {
            const selected = selectedActivities.includes(activity);
            return (
              <TouchableOpacity
                key={activity}
                style={[styles.button, selected && styles.selectedButton]}
                onPress={() => toggleActivity(activity)}
              >
                <Image source={activityImages[activity]} style={styles.activityImage} />
                <Text style={[styles.buttonText, selected && styles.selectedButtonText]}>{activity}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>다음</Text>
        </TouchableOpacity>
      </ScrollView>
      <FooterNav />
    </View>
  );
};

export default ActivitySelectScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAEBD7' },
  scrollContainer: { alignItems: 'center' },
  title: { fontSize: 22, fontWeight: '700', marginVertical: 20, textAlign: 'center' },
  buttonGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '90%' },
  button: { width: BUTTON_SIZE, height: BUTTON_SIZE, backgroundColor: colors.inputBg, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: BUTTON_MARGIN, elevation: 3 },
  selectedButton: { backgroundColor: colors.primary },
  activityImage: { width: 50, height: 50, marginBottom: 8, resizeMode: 'contain' },
  buttonText: { fontSize: 18, fontWeight: '600', color: colors.textDark },
  selectedButtonText: { color: '#fff' },
  nextButton: { width: '90%', paddingVertical: 14, backgroundColor: colors.primary, borderRadius: 16, alignItems: 'center', marginTop: 20, marginBottom: 40 },
  nextButtonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});
