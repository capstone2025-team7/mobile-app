// screens/WalkScreen.js
import React, { useMemo } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Vibration,
} from 'react-native';
import colors from '../styles/colors';

export default function WalkScreen({ navigation }) {
  const weeklyKm = useMemo(() => 3.4, []);
  const ORANGE = colors?.primary || colors?.orange || '#FF7A00';
  const IVORY  = colors?.ivory || colors?.background || '#F8F5E6';

  const onPressWeeklyCard = () => {
    Vibration?.vibrate?.(10);
    navigation.navigate('WalkRecord'); // ✅ 기록 화면으로 이동
  };

  const onPressStart = () => {
    Vibration?.vibrate?.(10);
    // TODO: 운동 시작 로직/화면
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: IVORY }]}>
      <View style={styles.container}>
        {/* 상단 네모 카드 (누르면 WalkRecord로 이동) */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onPressWeeklyCard}
          style={styles.weekCard}
          accessibilityRole="button"
          accessibilityLabel="이번 주 기록 보기"
        >
          <Text style={styles.weekTitle}>이번 주</Text>
          <Text style={styles.weekSub}>{weeklyKm} km 뛰었어요</Text>
        </TouchableOpacity>

        {/* 하단 긴 동그란 버튼 */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onPressStart}
          style={[styles.startBtn, { backgroundColor: ORANGE }]}
          accessibilityRole="button"
          accessibilityLabel="운동 시작"
        >
          <Text style={styles.startBtnText}>운동 시작</Text>
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
    gap: 28,
  },
  /* 상단 네모 카드 */
  weekCard: {
    width: '100%',
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    paddingVertical: 50,
    paddingHorizontal: 18,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
  },
  weekTitle: { fontSize: 40, fontWeight: '900', color: '#111' },
  weekSub: { marginTop: 8, fontSize: 30, color: '#333' },

  /* 하단 긴 동그란 버튼 */
  startBtn: {
    width: '100%',
    height: 60,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
  startBtnText: { fontSize: 20, fontWeight: '900', color: '#FFFFFF', letterSpacing: 0.5 },
});
