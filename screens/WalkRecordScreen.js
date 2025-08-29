// screens/WalkRecordScreen.js
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
import colors from '../styles/colors';

export default function WalkRecordScreen({ navigation, route }) {
  // 데모 데이터 (실데이터로 교체 가능)
  const monthLabel = useMemo(() => '2025년 8월', []);
  const weekly = useMemo(() => ({
    totalKm: 13.1,
    runCount: 4,
    avgPace: "5'49\"",
    totalTime: '1:16:26',
  }), []);

  // 단순 막대차트용 (일자/거리)
  const chartData = useMemo(() => ([
    { day: 3,  km: 3.2 },
    { day: 10, km: 0.0 },
    { day: 12, km: 2.4 },
    { day: 17, km: 0.8 },
    { day: 24, km: 6.7 },
  ]), []);

  // 최근 활동 리스트 (썸네일 없이)
  const recent = useMemo(() => ([
    { id: '1', title: '어제',   desc: '목요일 아침 러닝', km: 15.02, pace: "5'57\"", time: '1:29:24' },
    { id: '2', title: '3일 전', desc: '저강도 러닝',     km: 3.20, pace: "6'02\"", time: '19:41' },
  ]), []);

  const ORANGE = colors?.primary || colors?.orange || '#FF7A00';
  const IVORY  = colors?.ivory || colors?.background || '#F8F5E6';

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: IVORY }]}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* 상단 월 선택 라인 */}
        <View style={styles.monthRow}>
          <Text style={styles.monthText}>{monthLabel}</Text>
          <Icon name="chevron-down" size={18} color="#111" />
        </View>

        {/* 요약 카드 */}
        <View style={styles.summaryCard}>
          <View style={styles.kmRow}>
            <Text style={styles.kmBig}>{weekly.totalKm}</Text>
            <View style={{ marginLeft: 6 }}>
              <Text style={styles.kmUnit}>킬로미터</Text>
            </View>
          </View>

          <View style={styles.metricsRow}>
            <Metric label="러닝" value={weekly.runCount} />
            <Divider />
            <Metric label="평균 페이스" value={weekly.avgPace} />
            <Divider />
            <Metric label="시간" value={weekly.totalTime} />
          </View>

          {/* 가벼운 막대 차트 (라이브러리 없이 View로) */}
          <BarChart data={chartData} accent={ORANGE} />
        </View>

        {/* 최근 활동 */}
        <Text style={styles.sectionTitle}>최근 활동</Text>
        <View style={{ gap: 12 }}>
          {recent.map(item => (
            <Pressable
              key={item.id}
              style={styles.activityCard}
              android_ripple={{ color: 'rgba(0,0,0,0.06)' }}
              // ✅ 상세 화면으로 이동 (activity 데이터를 함께 전달)
              onPress={() => navigation.navigate('WalkDetail', { activity: item })}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.activityTitle}>{item.title}</Text>
                  <Text style={styles.activityDesc}>{item.desc}</Text>
                </View>
                <Icon name="chevron-forward" size={18} color="#9CA3AF" />
              </View>

              <View style={styles.activityMetaRow}>
                <MetaBlock label="Km" value={item.km} />
                <MetaBlock label="평균 페이스" value={item.pace} />
                <MetaBlock label="시간" value={item.time} />
              </View>
            </Pressable>
          ))}
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

/* ----- Sub Components ----- */
function Metric({ label, value }) {
  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={styles.metricValue}>{String(value)}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

function Divider() {
  return <View style={styles.metricDivider} />;
}

function MetaBlock({ label, value }) {
  return (
    <View style={{ alignItems: 'flex-start' }}>
      <Text style={styles.metaValue}>{String(value)}</Text>
      <Text style={styles.metaLabel}>{label}</Text>
    </View>
  );
}

function BarChart({ data, accent }) {
  if (!data?.length) return null;

  const maxKm = Math.max(...data.map(d => d.km), 1);
  return (
    <View style={styles.chartWrap}>
      <View style={styles.chartAxis}>
        {/* y축 간단 눈금 (0, 중간, 최대 근사) */}
        <Text style={styles.axisTick}>0</Text>
        <Text style={styles.axisTick}>{(maxKm / 2).toFixed(1)}</Text>
        <Text style={styles.axisTick}>{maxKm.toFixed(1)}km</Text>
      </View>

      <View style={styles.chartBars}>
        {data.map((d, idx) => {
          const h = Math.max((d.km / maxKm) * 100, 2); // 최소 표시 높이
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

/* ----- Styles ----- */
const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: {
    paddingTop: 8,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },

  /* 상단 월 선택 */
  monthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    marginBottom: 8,
    marginLeft: 4,
  },
  monthText: { fontSize: 16, fontWeight: '700', color: '#111' },

  /* 요약 카드 */
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
    marginBottom: 16,
  },
  kmRow: { flexDirection: 'row', alignItems: 'flex-end' },
  kmBig: { fontSize: 56, fontWeight: '900', color: '#111', lineHeight: 60 },
  kmUnit: { fontSize: 12, color: '#6B7280', marginBottom: 8 },

  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 10,
  },
  metricValue: { fontSize: 16, fontWeight: '800', color: '#111' },
  metricLabel: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  metricDivider: {
    width: 1,
    backgroundColor: 'rgba(0,0,0,0.08)',
    marginHorizontal: 4,
  },

  /* 간단 차트 */
  chartWrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 8,
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
    gap: 10,
    paddingHorizontal: 6,
    paddingBottom: 2,
  },
  barCol: { alignItems: 'center', justifyContent: 'flex-end', flex: 1 },
  bar: {
    width: '60%',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  barLabel: { marginTop: 6, fontSize: 11, color: '#6B7280' },

  /* 최근 활동 */
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111',
    marginBottom: 10,
    marginTop: 6,
  },
  activityCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  activityTitle: { fontSize: 15, fontWeight: '800', color: '#111' },
  activityDesc: { fontSize: 12, color: '#6B7280', marginTop: 4 },
  activityMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  metaValue: { fontSize: 16, fontWeight: '800', color: '#111' },
  metaLabel: { fontSize: 11, color: '#6B7280', marginTop: 2 },
});
