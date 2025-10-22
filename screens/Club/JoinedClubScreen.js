import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../../styles/colors';
import TopNav from '../../components/TopNav';
import FooterNav from '../../components/FooterNav';

const { width } = Dimensions.get('window');
const BUTTON_MARGIN = 16;
const BUTTON_WIDTH = width * 0.8;
const BUTTON_HEIGHT = 120;

// 더미 데이터
const clubs = [
  { id: '1', name: '농구 동아리', description: '주 2회 체육관에서 활동' },
  { id: '2', name: '독서 모임', description: '매주 토요일 책 토론' },
  { id: '3', name: '개발 스터디', description: 'React Native 프로젝트 진행' },
  { id: '4', name: '음악 밴드', description: '악기 연주와 공연 준비' },
  { id: '5', name: '헬스 동호회', description: '매일 같이 운동' },
  { id: '6', name: '축구 동호회', description: '주 3회 경기' },
  { id: '7', name: '사진 동호회', description: '주말 촬영 모임' },
  { id: '8', name: '요리 모임', description: '매주 새로운 레시피 도전' },
];

const JoinedClubScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TopNav />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={true}
        indicatorStyle="black"
      >
        {clubs.map((club) => (
          <TouchableOpacity
            key={club.id}
            style={styles.button}
            onPress={() => navigation.navigate('JoinedClubMain', { club })}
          >
            <Text style={styles.buttonText}>{club.name}</Text>
            <Text style={styles.descText}>{club.description}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FooterNav />
    </View>
  );
};

export default JoinedClubScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAEBD7',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingTop: 120, // 🔹 TopNav와의 간격 확보
    paddingBottom: 200, // 🔹 FooterNav와 겹치지 않게 여백 확보
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
    padding: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
  },
  descText: {
    fontSize: 14,
    color: colors.textDark,
    marginTop: 8,
  },
});
