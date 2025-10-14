import React, { useMemo } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../styles/colors';
import TopNav from '../../components/TopNav';
import FooterNav from '../../components/FooterNav';

export default function WalkRecordScreen({ navigation }) {
  const monthLabel = useMemo(() => '2025년 8월', []);
  const weekly = useMemo(() => ({
    totalKm: 13.1,
    totalTime: '2:34:20',
  }), []);

  // 요일별 운동 시간 (단위: 분)
  const chartData = useMemo(() => ([
    { day: '월', mins: 20 },
    { day: '화', mins: 0 },
    { day: '수', mins: 32 },
    { day: '목', mins: 18 },
    { day: '금', mins: 40 },
    { day: '토', mins: 15 },
    { day: '일', mins: 0 },
  ]), []);

  // 최근 활동 (거리, 시간만 표시)
  const recent = useMemo(() => ([
    { id: '1', title: '2025.08.26', km: 3.2, time: '32:10' },
    { id: '2', title: '2025.08.23', km: 2.1, time: '19:45' },
  ]), []);

  const ORANGE = colors?.primary || colors?.orange || '#FF7A00';
  const IVORY = colors?.ivory || colors?.background || '#F8F5E6';

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: '#FAEBD7' }]}>
      <ScrollView contentContainerStyle={styles.container}>
        
      <TopNav />
        {/* 월 선택 */}
        <View style={styles.monthRow}>
          <Text style={styles.monthText}>{monthLabel}</Text>
          <Icon name="chevron-down" size={18} color="#111" />
        </View>

        {/* 요약 카드 */}
        <View style={styles.summaryCard}>
          <View style={styles.kmRow}>
            <Text style={styles.kmBig}>{weekly.totalKm}</Text>
            <Text style={styles.kmUnit}>킬로미터</Text>
          </View>

          <View style={styles.timeRow}>
            <Text style={styles.metricLabel}>총 산책 시간</Text>
            <Text style={styles.metricValue}>{weekly.totalTime}</Text>
          </View>

          <TimeBarChart data={chartData} accent={ORANGE} />
        </View>

        {/* 최근 활동 */}
        <Text style={styles.sectionTitle}>최근 활동</Text>
        <View style={{ gap: 16 }}>
          {recent.map(item => (
            <Pressable
              key={item.id}
              style={styles.activityCard}
              android_ripple={{ color: 'rgba(0,0,0,0.06)' }}
              onPress={() => {}}
            >
              {/* 날짜 */}
              <Text style={styles.activityTitle}>
                <Icon name="calendar-outline" size={18} color="#FF7A00" /> {'  '}
                {item.title}
              </Text>

              {/* 거리 & 시간 */}
              <View style={styles.activityMetaRow}>
                <View style={styles.metaBlock}>
                  <Icon name="walk-outline" size={20} color="#6B7280" />
                  <Text style={styles.metaValue}> {item.km} km</Text>
                  <Text style={styles.metaLabel}>거리</Text>
                </View>

                <View style={styles.metaBlock}>
                  <Icon name="time-outline" size={20} color="#6B7280" />
                  <Text style={styles.metaValue}> {item.time}</Text>
                  <Text style={styles.metaLabel}>시간</Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>

        <View style={{ height: 24 }} />
      <FooterNav />
      </ScrollView>
    </SafeAreaView>
  );
}

function TimeBarChart({ data, accent }) {
  if (!data?.length) return null;

  const maxMin = Math.max(...data.map(d => d.mins), 1);
  return (
    <View style={styles.chartWrap}>
      <View style={styles.chartAxis}>
        <Text style={styles.axisTick}>0</Text>
        <Text style={styles.axisTick}>{Math.ceil(maxMin / 2)}분</Text>
        <Text style={styles.axisTick}>{maxMin}분</Text>
      </View>

      <View style={styles.chartBars}>
        {data.map((d, idx) => {
          const h = Math.max((d.mins / maxMin) * 100, 2);
          return (
            <View key={idx} style={styles.barCol}>
              <View style={[styles.bar, { height: `${h}%`, backgroundColor: accent }]} />
              <Text style={styles.barLabel}>{d.day}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: {
    paddingTop: 8,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },

  monthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
    marginLeft: 4,
  },
  monthText: { fontSize: 18, fontWeight: '700', color: '#111' },

  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
    marginBottom: 16,
  },
  kmRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  kmBig: {
    fontSize: 54,
    fontWeight: '900',
    color: '#111',
    lineHeight: 60,
    marginRight: 8,
  },
  kmUnit: {
    fontSize: 16,
    color: '#555',
    marginBottom: 6,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  metricLabel: { fontSize: 16, color: '#6B7280' },
  metricValue: { fontSize: 20, fontWeight: '700', color: '#111' },

  chartWrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 140,
  },
  chartAxis: {
    width: 44,
    justifyContent: 'space-between',
    height: '100%',
    paddingVertical: 2,
  },
  axisTick: { fontSize: 11, color: '#6B7280' },
  chartBars: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
    paddingHorizontal: 8,
    paddingBottom: 2,
  },
  barCol: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  bar: {
    width: '60%',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  barLabel: {
    marginTop: 6,
    fontSize: 12,
    color: '#444',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111',
    marginBottom: 10,
    marginTop: 6,
  },
  activityCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
    gap: 12,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FF7A00',
    marginBottom: 6,
  },
  activityMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 4,
  },
  metaBlock: {
    alignItems: 'center',
    flex: 1,
    gap: 2,
  },
  metaValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111',
    marginTop: 2,
  },
  metaLabel: {
    fontSize: 13,
    color: '#6B7280',
  },
});
