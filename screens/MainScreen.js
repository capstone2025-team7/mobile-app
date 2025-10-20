// MainScreen.js
import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../styles/colors';
import g from '../styles/global';
import TopNav from '../components/TopNav';
import FooterNav from '../components/FooterNav';

export default function MainScreen({ navigation, route }) {
  const userName = route?.params?.name ?? 'DOBGO 회원';

  const todayInfo = useMemo(() => {
    const now = new Date();
    const d = now.getDate();
    const weekday = ['일','월','화','수','목','금','토'][now.getDay()];
    return { day: d, weekday };
  }, []);

  const todaySchedule = useMemo(() => ({
    title:'게이트볼',
    time:'13:00 ~ 15:00',
    index:1
  }), []);

  const features = [
    { icon:'people-outline', label:'동호회', nav:'Club' },
    { icon:'chatbubbles-outline', label:'알림', nav:'Notifications' },
    { icon:'construct-outline', label:'부가기능', nav:'Features' },
  ];

  // TopNav/FooterNav 높이 상수 (TopNav는 SafeArea 포함)
  const TOPNAV_HEIGHT = 120;
  const FOOTERNAV_HEIGHT = 80;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      
      {/* TopNav */}
      <TopNav />

      <ScrollView
        contentContainerStyle={{
          paddingTop: TOPNAV_HEIGHT,
          paddingBottom: FOOTERNAV_HEIGHT + 20, // FooterNav + 버튼 여유 공간
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* 알림 배너 */}
          <TouchableOpacity
            style={styles.banner}
            activeOpacity={0.85}
            onPress={()=>navigation.navigate('Notifications')}
          >
            <View style={{ flexDirection:'row', alignItems:'center' }}>
              <Icon name="megaphone-outline" size={22}/>
              <Text style={styles.bannerTitle}> 새로운 알림</Text>
            </View>
            <Text style={styles.bannerText} numberOfLines={2}></Text>
          </TouchableOpacity>

          {/* 기능 카드 */}
          <View style={styles.grid}>
            {features.map((f,i)=>(
              <FeatureCard key={i} icon={f.icon} label={f.label} onPress={()=>navigation.navigate(f.nav)}/>
            ))}

            {/* 오늘 일정 */}
            <TouchableOpacity
              style={[styles.card, styles.scheduleCard]}
              activeOpacity={0.9}
              onPress={()=>navigation.navigate('Calendar')}
            >
              <View style={styles.scheduleHeader}>
                <View style={styles.calendarBadge}>
                  <Text style={styles.calendarDay}>{todayInfo.day}</Text>
                  <Text style={styles.calendarWeek}>{todayInfo.weekday}요일</Text>
                </View>
                <Icon name="calendar-outline" size={22} color={colors.orange}/>
              </View>
              <View>
                <Text style={styles.scheduleTitle}>
                  {todaySchedule.index}. {todaySchedule.title}
                </Text>
                <Text style={styles.scheduleTime}>{todaySchedule.time}</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* 하단 버튼 */}
          <View style={styles.bottomArea}>
            <TouchableOpacity
              style={[g.mainButton, styles.ctaBtn]}
              onPress={()=>navigation.navigate('Walk')}
              activeOpacity={0.9}
            >
              <Icon name="barbell-outline" size={18} color="#fff"/>
              <Text style={[g.mainButtonText,{marginLeft:8}]}>오늘의 운동 시작하기</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[g.mainButton, styles.mypageBtn]}
              onPress={()=>navigation.navigate('MyPage')}
              activeOpacity={0.9}
            >
              <MaterialIcons name="person-outline" size={18} color="#fff"/>
              <Text style={[g.mainButtonText,{marginLeft:8}]}>마이페이지</Text>
            </TouchableOpacity>

            {/* 임의로 추가한 약속페이지 버튼 */}
          <TouchableOpacity
            style={[g.mainButton, styles.appointmentBtn]}
            onPress={() => navigation.navigate('AppointmentScreen')}
            activeOpacity={0.9}
          >
            <Icon name="calendar-outline" size={18} color="#fff" />
            <Text style={[g.mainButtonText, { marginLeft: 8 }]}>오늘의 약속 확인</Text>
          </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* FooterNav */}
      <FooterNav />
    </SafeAreaView>
  );
}

function FeatureCard({ icon, label, onPress }) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={onPress}>
      <View style={styles.cardIconWrap}>
        <Icon name={icon} size={28} color={colors.orange}/>
      </View>
      <Text style={styles.cardText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: { flex:1, backgroundColor:'#FAEBD7' },

  container: { flex:1, paddingHorizontal:20 },

  banner: {
    backgroundColor:'#fff',
    borderRadius:18,
    padding:15,
    elevation:3,
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.04)',
    marginBottom:25,
  },
  bannerTitle: { fontSize:15, fontWeight:'700' },
  bannerText: { fontSize:13.5, color:'#4B5563', lineHeight:19, marginTop:6 },

  grid: { flexDirection:'row', flexWrap:'wrap', justifyContent:'space-between', rowGap:14 },

  card: {
    width:'48%',
    backgroundColor:'#fff',
    borderRadius:18,
    paddingVertical:18,
    paddingHorizontal:16,
    alignItems:'flex-start',
    shadowColor:'#000',
    shadowOpacity:0.08,
    shadowRadius:8,
    shadowOffset:{ width:0, height:2 },
    elevation:3,
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.04)',
  },
  cardIconWrap: {
    width:40,
    height:40,
    borderRadius:12,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'rgba(255,149,0,0.12)',
    marginBottom:10,
  },
  cardText: { fontSize:16, fontWeight:'700', color:'#111' },

  scheduleCard: { paddingBottom:16 },
  scheduleHeader: { 
    flexDirection:'row', 
    justifyContent:'space-between', 
    alignItems:'center', 
    width:'100%' 
  },
  calendarBadge: { 
    paddingVertical:6, 
    paddingHorizontal:8, 
    backgroundColor:'rgba(0,0,0,0.04)', 
    borderRadius:10, 
    alignItems:'center' 
  },
  calendarDay: { 
    fontSize:16, 
    fontWeight:'800', 
    lineHeight:18 
  },

  appointmentBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: 'orange',
   },
  calendarWeek: { 
    fontSize:12, 
    color:'#6B7280', 
    marginTop:2 
  },
  scheduleTitle: { 
    fontSize:15, 
    fontWeight:'700', 
    color:'#111' 
  },
  scheduleTime: { 
    fontSize:13, 
    color:'#6B7280', 
    marginTop:4 
  },
  bottomArea: { flexShrink:0, paddingTop: 25, },
  ctaBtn: { 
    flexDirection:'row', 
    alignItems:'center', 
    justifyContent:'center', 
    paddingVertical:14, 
    borderRadius:14, 
    marginBottom:12, 
    backgroundColor:'#FFB100' 
  },
  mypageBtn: { 
    flexDirection:'row', 
    alignItems:'center', 
    justifyContent:'center', 
    paddingVertical:14, 
    borderRadius:14, 
    backgroundColor:'#FFB100' 
  },
});
