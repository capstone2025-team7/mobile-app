import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../styles/colors';
import g from '../styles/global';
import FooterNav from '../components/TopNav';
import BackNav from '../components/FooterNav';

export default function MainScreen({ navigation, route }) {
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
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        
        <FooterNav />

        <TouchableOpacity
          style={styles.banner}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Notifications')}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="megaphone-outline" size={22} />
            <Text style={styles.bannerTitle}> 새로운 알림</Text>
          </View>
          <Text style={styles.bannerText} numberOfLines={2}>
            
          </Text>
        </TouchableOpacity>

        <View style={styles.grid}>
          <FeatureCard icon="people-outline" label="동호회" onPress={() => navigation.navigate('Club')} />
          <FeatureCard icon="chatbubbles-outline" label="알림" onPress={() => navigation.navigate('Notifications')} />
          <FeatureCard icon="construct-outline" label="부가기능" onPress={() => navigation.navigate('Features')} />
          <TouchableOpacity
            style={[styles.card, styles.scheduleCard]}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('Calendar')}
          >
            <View style={styles.scheduleHeader}>
              <View style={styles.calendarBadge}>
                <Text style={styles.calendarDay}>{todayInfo.day}</Text>
                <Text style={styles.calendarWeek}>{todayInfo.weekday}요일</Text>
              </View>
              <Icon name="calendar-outline" size={22} color={colors.orange} />
            </View>
            <View>
              <Text style={styles.scheduleTitle} numberOfLines={1}>
                {todaySchedule.index}. {todaySchedule.title}
              </Text>
              <Text style={styles.scheduleTime}>{todaySchedule.time}</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* 하단 버튼 영역 */}
        <View style={styles.bottomArea}>
          <TouchableOpacity
            style={[g.mainButton, styles.ctaBtn]}
            onPress={() => navigation.navigate('Walk')}
            activeOpacity={0.9}
          >
            <Icon name="barbell-outline" size={18} color="#fff" />
            <Text style={[g.mainButtonText, { marginLeft: 8 }]}>오늘의 운동 시작하기</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[g.mainButton, styles.mypageBtn]}
            onPress={() => navigation.navigate('MyPage')}
            activeOpacity={0.9}
          >
            <MaterialIcons name="person-outline" size={18} color="#fff" />
            <Text style={[g.mainButtonText, { marginLeft: 8 }]}>마이페이지</Text>
          </TouchableOpacity>
        </View>

        <BackNav />
      </View>
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
  safe: { flex: 1, backgroundColor: '#FAEBD7' },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 100,
    justifyContent: 'space-between',
  },

<<<<<<< Updated upstream
  buttonGrid: {
=======
  banner: {
    backgroundColor: '#ffff',
    borderRadius: 18,
    padding: 15,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
  },
  bannerTitle: { 
    fontSize: 15, 
    fontWeight: '700' 
  },
  bannerText: { 
    fontSize: 13.5, 
    color: '#4B5563', 
    lineHeight: 19 
  },

  grid: {
>>>>>>> Stashed changes
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 14,
  },

<<<<<<< Updated upstream
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    backgroundColor: colors.inputBg,
    borderRadius: 16,
    elevation: 3,
    justifyContent: 'center', // 버튼 안에서 세로 중간
    alignItems: 'center',
    marginBottom: BUTTON_MARGIN,
    padding: 8,
  },

  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 6,
  },

  buttonTextBelow: {
    fontSize: 22, // 강조
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 6,
  },

  scheduleTextBelow: {
    fontSize: 14,
    color: colors.textDark,
    textAlign: 'center',
    marginTop: 4,
  },

  dateBox: {
    position: 'absolute',
    top: 8,
    left: 8,
=======
  card: {
    width: '48%',
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream

  dateText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textDark,
=======
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
  scheduleHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' },
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

  bottomArea: {
    marginTop: 16,
    marginBottom: 100,
  },

  ctaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    marginBottom: 12,
  },

  mypageBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: '#FFB100',
>>>>>>> Stashed changes
  },
});
