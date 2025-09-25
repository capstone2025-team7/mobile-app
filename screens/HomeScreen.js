import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../styles/colors';
import g from '../styles/global';

export default function HomeScreen({ navigation, route }) {
  const userName = route?.params?.name ?? 'DOBGO 회원';

  const todayInfo = useMemo(() => {
    const now = new Date();
    const d = now.getDate();
    const weekday = ['일', '월', '화', '수', '목', '금', '토'][now.getDay()];
    return { day: d, weekday };
  }, []);

  const todaySchedule = useMemo(
    () => ({
      title: '게이트볼',
      time: '13:00 ~ 15:00',
      index: 1,
    }),
    []
  );

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.ivory }]}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* 상단 앱바 */}
        <View style={styles.appBar}>
          <View style={styles.logoWrap}>
            <Icon name="heart" size={18} color={colors.orange} style={{ marginRight: 6 }} />
            <Text style={styles.logoText}>
              <Text style={{ color: '#333' }}>DOB</Text>
              <Text style={{ color: colors.orange }}>GO</Text>
            </Text>
          </View>
        </View>

        {/* 환영 인사 */}
        <View style={styles.greetWrap}>
          <Text style={styles.greetTitle}>안녕하세요, {userName}님 👋</Text>
          <Text style={styles.greetSub}>오늘도 활기찬 하루 보내세요!</Text>
        </View>

        {/* 공지/배너 */}
        <TouchableOpacity
          style={styles.banner}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Community')}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="megaphone-outline" size={22} />
            <Text style={styles.bannerTitle}> 커뮤니티 새 소식</Text>
          </View>
          <Text style={styles.bannerText} numberOfLines={2}>
            이번주 신규 동호회가 열렸어요! 지금 참여하고 친구를 만들어보세요 🙌
          </Text>
        </TouchableOpacity>

        {/* 기능 그리드 */}
        <View style={styles.grid}>
          <FeatureCard
            icon="people-outline"
            label="동호회"
            onPress={() => navigation.navigate('Club')}
          />
          <FeatureCard
            icon="chatbubbles-outline"
            label="커뮤니티"
            onPress={() => navigation.navigate('Community')}
          />
          <FeatureCard
            icon="construct-outline"
            label="부가기능"
            onPress={() => navigation.navigate('SubScreen')}
          />
          <TouchableOpacity
            style={[styles.card, styles.scheduleCard]}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('Schedule')}
          >
            <View style={styles.scheduleHeader}>
              <View style={styles.calendarBadge}>
                <Text style={styles.calendarDay}>{todayInfo.day}</Text>
                <Text style={styles.calendarWeek}>{todayInfo.weekday}요일</Text>
              </View>
              <Icon name="calendar-outline" size={22} color={colors.orange} />
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={styles.scheduleTitle} numberOfLines={1}>
                {todaySchedule.index}. {todaySchedule.title}
              </Text>
              <Text style={styles.scheduleTime}>{todaySchedule.time}</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* 빠른 동작 */}
        <View style={{ marginTop: 16 }}>
          <TouchableOpacity
            style={[g.mainButton, styles.ctaBtn]}
            onPress={() => navigation.navigate('Workout')}
            activeOpacity={0.9}
          >
            <Icon name="barbell-outline" size={18} color="#fff" />
            <Text style={[g.mainButtonText, { marginLeft: 8 }]}>
              오늘의 운동 시작하기
            </Text>
          </TouchableOpacity>
        </View>

        {/* ✅ 하단 마이페이지 버튼 */}
        <View style={{ marginTop: 12 }}>
          <TouchableOpacity
            style={[g.mainButton, styles.mypageBtn]}
            onPress={() => navigation.navigate('MyPage')}
            activeOpacity={0.9}
          >
            <MaterialIcons name="person-outline" size={18} color="#fff" />
            <Text style={[g.mainButtonText, { marginLeft: 8 }]}>마이페이지</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function FeatureCard({ icon, label, onPress }) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={onPress}>
      <View style={styles.cardIconWrap}>
        <Icon name={icon} size={28} color={colors.orange} />
      </View>
      <Text style={styles.cardText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: {
    paddingHorizontal: 20,
    paddingTop: 6,
    backgroundColor: colors.ivory,
  },

  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  logoWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: { fontSize: 22, fontWeight: '800', letterSpacing: 0.2 },

  greetWrap: { marginTop: 6, marginBottom: 14 },
  greetTitle: { fontSize: 20, fontWeight: '700', color: '#222' },
  greetSub: { fontSize: 14, color: '#6B7280', marginTop: 4 },

  banner: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginTop: 6,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
  },
  bannerTitle: { fontSize: 15, fontWeight: '700' },
  bannerText: { marginTop: 8, fontSize: 13.5, color: '#4B5563', lineHeight: 19 },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 14,
  },

  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 16,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
  },
  cardIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,149,0,0.12)',
    marginBottom: 10,
  },
  cardText: { fontSize: 16, fontWeight: '700', color: '#111' },

  scheduleCard: { paddingBottom: 16 },
  scheduleHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  calendarBadge: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: 'rgba(0,0,0,0.04)',
    borderRadius: 10,
    alignItems: 'center',
  },
  calendarDay: { fontSize: 16, fontWeight: '800', lineHeight: 18 },
  calendarWeek: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  scheduleTitle: { fontSize: 15, fontWeight: '700', color: '#111' },
  scheduleTime: { fontSize: 13, color: '#6B7280', marginTop: 4 },

  ctaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 14,
  },

  // ✅ 마이페이지 하단 버튼 스타일
  mypageBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: colors.orange,
  },
});
