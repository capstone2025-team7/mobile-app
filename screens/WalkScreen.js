import React, { useMemo } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Vibration,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // 👟 아이콘
import colors from '../styles/colors';

export default function WalkScreen({ navigation }) {
  const walkDays = useMemo(() => 4, []);
  const walkKm = useMemo(() => 3.4, []);
  const ORANGE = colors?.primary || colors?.orange || '#FF7A00';
  const IVORY = colors?.ivory || colors?.background || '#F8F5E6';

  const onPressWeeklyCard = () => {
    Vibration?.vibrate?.(10);
    navigation.navigate('WalkRecord');
  };

  const onPressStart = () => {
    Vibration?.vibrate?.(10);
    // TODO: 산책 시작 화면으로 이동
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: IVORY }]}>
      <View style={styles.container}>

        {/* 감성적인 배경 일러스트 (옵션) */}
        {/* <Image
          source={require('../assets/walk_background.png')}
          style={styles.bgImage}
          resizeMode="contain"
        /> */}

        {/* 상단 기록 카드 */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onPressWeeklyCard}
          style={styles.weekCard}
          accessibilityRole="button"
          accessibilityLabel="이번 주 기록 보기"
        >
          <Text style={styles.weekTitle}>이번 주</Text>
          <Text style={styles.weekSub}>
            {walkDays}일 간 {walkKm}km 산책
          </Text>
        </TouchableOpacity>

        {/* 산책 시작 버튼 */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onPressStart}
          style={[styles.startBtn, { backgroundColor: ORANGE }]}
          accessibilityRole="button"
          accessibilityLabel="산책 시작"
        >
          <Icon name="walk" size={38} color="#fff" style={styles.startIcon} />
          <Text style={styles.startBtnText}>산책 시작</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    gap: 36,
  },
  bgImage: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 200,
    opacity: 0.15,
  },
  weekCard: {
    width: '100%',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    paddingVertical: 60,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
  },
  weekTitle: {
    fontSize: 44,
    fontWeight: '900',
    color: '#111',
  },
  weekSub: {
    marginTop: 16,
    fontSize: 32,
    color: '#333',
  },
  startBtn: {
    flexDirection: 'row', // ✅ 아이콘 + 텍스트 나란히
    width: '100%',
    height: 80,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
  startIcon: {
    marginRight: 12,
  },
  startBtnText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
});
