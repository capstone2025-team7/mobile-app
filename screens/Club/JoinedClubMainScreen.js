import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../../styles/colors';
import TopNav from '../../components/TopNav';
import FooterNav from '../../components/FooterNav';

const { width } = Dimensions.get('window');
const BUTTON_MARGIN = 16;
const BUTTON_WIDTH = width * 0.8;
const BUTTON_HEIGHT = 120;

const JoinedClubMainScreen = ({ route }) => {
  const { club } = route.params;
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safe}>
      {/* 상단 고정 네비게이션 */}
      <TopNav />

      {/* 스크롤 가능한 버튼 컬럼 */}
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('BulletinBoard', { club })}
        >
          <Text style={styles.buttonText}>게시판</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('JoinedClubInfo', { club })}
        >
          <Text style={styles.buttonText}>동호회 정보</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ClubMember', { club })}
        >
          <Text style={styles.buttonText}>동호회 멤버</Text>
        </TouchableOpacity>

        {/* 하단 여백 확보 */}
        <View style={{ height: 80 }} />
      </ScrollView>

      {/* 하단 고정 네비게이션 */}
      <FooterNav />
    </SafeAreaView>
  );
};

export default JoinedClubMainScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FAEBD7',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingTop: 100, // TopNav와 간격 확보
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
