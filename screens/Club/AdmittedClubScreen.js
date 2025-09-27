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
];

const AdmittedClubScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TopNav />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={true} // 세로 스크롤바 표시
        indicatorStyle="black"             // iOS에서 스크롤바 색상 설정
      >
        {clubs.map((club) => (
          <TouchableOpacity
            key={club.id}
            style={styles.button}
            onPress={() => navigation.navigate('ClubInfo', { club })}
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

export default AdmittedClubScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAEBD7',
    justifyContent: 'space-between',
    paddingTop: 100,
    paddingBottom: 200,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 120,
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