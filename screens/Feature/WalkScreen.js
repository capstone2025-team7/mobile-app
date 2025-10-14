import React, { useMemo } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Vibration,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../styles/colors';
import TopNav from '../../components/TopNav';
import FooterNav from '../../components/FooterNav';

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
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: '#FAEBD7' }]}>
      {/* 상단 TopNav */}
      <View style={styles.topNavWrapper}>
        <TopNav />
      </View>

      {/* 버튼 및 카드 그리드 */}
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onPressWeeklyCard}
          style={styles.weekCard}
        >
          <Text style={styles.weekTitle}>이번 주</Text>
          <Text style={styles.weekSub}>
            {walkDays}일 간 {walkKm}km 산책
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onPressStart}
          style={[styles.startBtn, { backgroundColor: ORANGE }]}
        >
          <Icon name="walk" size={38} color="#fff" style={styles.startIcon} />
          <Text style={styles.startBtnText}>산책 시작</Text>
        </TouchableOpacity>
      </View>

      {/* 하단 FooterNav */}
      <View style={styles.bottomNavWrapper}>
        <FooterNav />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },

  topNavWrapper: {
    marginTop: 100,
  },

  bottomNavWrapper: {
    marginBottom: 100,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 36,
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
    flexDirection: 'row',
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
