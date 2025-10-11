// screens/WalkDetailScreen.js
import React, { useMemo } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../styles/colors';

export default function WalkDetailScreen({ route }) {
  const { activity } = route.params || {};
  const ORANGE = colors?.primary || colors?.orange || '#FF7A00';
  const IVORY  = colors?.ivory || colors?.background || '#F8F5E6';

  //격려 메시지 배열 (프론트엔드 랜덤)
  const messages = [
    '오늘도 저속노화 성공🙌',
    '대단하십니다! 응원합니다 💪🔥',
    '오늘도 꾸준히! 멋져요 👏',
    '작은 걸음이 큰 변화를 만듭니다 🚶‍♂️',
    '당신의 노력이 빛나고 있어요 ✨',
    '꾸준함이 힘입니다! 파이팅 🙌',
    '이 기세로 목표까지 화이팅 🏃‍♀️',
    '매일매일 꾸준히! 계속 화이팅 🔥',
  ];
  const randomMessage = useMemo(() => {
    const idx = Math.floor(Math.random() * messages.length);
    return messages[idx];
  }, []);

  if (!activity) {
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: '#FAEBD7' }]}>
        <View style={styles.container}>
          <Text style={styles.errorText}>활동 데이터가 없습니다.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: IVORY }]}>
      <View style={styles.container}>
        {/* 제목 */}
        <Text style={styles.title}>{activity.title}</Text>
        <Text style={styles.desc}>{activity.desc}</Text>

        {/* 🔹 히어로 숫자(거리) */}
        <View style={styles.heroWrap} accessible accessibilityLabel={`거리 ${activity.km}킬로미터`}>
          <Text style={styles.heroNumber}>{activity.km}</Text>
          <Text style={styles.heroUnit}>km</Text>
          <Text style={styles.heroCaption}>총 거리</Text>
        </View>

        {/* 🔹 통계 칩(평균 페이스 / 시간) */}
        <View style={styles.pillsRow}>
          <StatPill
            icon="speedometer-outline"
            color={ORANGE}
            label="평균 페이스"
            value={activity.pace}
          />
          <StatPill
            icon="time-outline"
            color={ORANGE}
            label="시간"
            value={activity.time}
          />
        </View>

        {/* 격려 메시지 */}
        <View style={styles.messageBox}>
          <Text style={styles.messageText}>{randomMessage}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

/* -------- Sub Components -------- */
function StatPill({ icon, color, label, value }) {
  return (
    <View style={styles.pill}>
      <View style={styles.pillIconWrap}>
        <Icon name={icon} size={22} color={color} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.pillValue}>{value}</Text>
        <Text style={styles.pillLabel}>{label}</Text>
      </View>
    </View>
  );
}

/* -------- Styles -------- */
const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 120, // 기존 200 → 상단 여백 조금 줄여서 밸런스
    paddingHorizontal: 20,
  },
  errorText: { fontSize: 16, color: '#666' },

  title: { fontSize: 36, fontWeight: '800', color: '#111', marginBottom: 6, textAlign: 'center' },
  desc: { fontSize: 26, color: '#555', marginBottom: 24, textAlign: 'center' },

  /* 히어로 숫자 */
  heroWrap: { alignItems: 'center', marginBottom: 16 },
  heroNumber: { fontSize: 84, fontWeight: '900', color: '#111', lineHeight: 72 },
  heroUnit: { fontSize: 30, color: '#6B7280', marginTop: -6 },
  heroCaption: { fontSize: 23, color: '#9CA3AF', marginTop: 6 },

  /* 통계 pill */
  pillsRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    marginTop: 8,
    marginBottom: 16,
  },
  pill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  pillIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,149,0,0.12)', // 오렌지 라이트
  },
  pillValue: { fontSize: 26, fontWeight: '900', color: '#111' }, // 큼직하게
  pillLabel: { fontSize: 20, color: '#6B7280', marginTop: 2 },

  /* 격려 메시지 */
  messageBox: {
    marginTop: 12,
    padding: 16,
    backgroundColor: '#fff8e6',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,122,0,0.3)',
  },
  messageText: { fontSize: 26, fontWeight: '700', color: '#FF7A00', textAlign: 'center' },
});
