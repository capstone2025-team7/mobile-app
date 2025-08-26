// screens/SignupScreen3.js
import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import colors from '../../styles/colors';
import g from '../../styles/global';

const DAYS = ['월요일','화요일','수요일','목요일','금요일','토요일','일요일'];

export default function RegisterScreen3({ navigation, route }) {
  const prev = route?.params ?? {};
  const [selected, setSelected] = useState([]);

  const toggleDay = (day) => {
    setSelected((cur) =>
      cur.includes(day) ? cur.filter((v) => v !== day) : [...cur, day]
    );
  };

  const canNext = useMemo(() => selected.length > 0, [selected]);

  return (
    <SafeAreaView style={[styles.container, g?.screen]}>
      {/* 상단 로고 */}
      <Image source={require('../../assets/logo.png')} style={styles.logo} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* 타이틀 */}
        <Text style={styles.label}>가능한 요일을 선택해주세요</Text>

        {/* 요일 선택 */}
        <View style={styles.grid}>
          {DAYS.map((day) => {
            const active = selected.includes(day);
            return (
              <TouchableOpacity
                key={day}
                onPress={() => toggleDay(day)}
                style={[
                  styles.chip,
                  active && {
                    backgroundColor: colors?.primary || '#f48d48',
                    borderColor: colors?.primary || '#f48d48',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.chipText,
                    active && { color: '#fff', fontWeight: '800' },
                  ]}
                >
                  {day}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* 도움말 */}
        <Text style={styles.help}>선택을 마쳤다면 아래 버튼을 눌러주세요.</Text>
      </ScrollView>

      {/* 하단 네비게이션 */}
      <View style={styles.footerNav}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.navBtn, styles.navGhost]}
        >
          <Text style={styles.navIcon}>←</Text>
          <Text style={styles.navText}>뒤로</Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={!canNext}
          onPress={() =>
            navigation.navigate('Register4', {
              ...prev,
              days: selected,
            })
          }
          style={[
            styles.navBtn,
            {
              backgroundColor: canNext
                ? (colors?.primary || '#f48d48')
                : (colors?.border || '#dcdcdc'),
            },
          ]}
        >
          <Text style={[styles.navText, { color: '#fff' }]}>다음</Text>
          <Text style={[styles.navIcon, { color: '#fff' }]}>→</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const CHIP_H = 56;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.background || '#FAF0DC',
    paddingHorizontal: 20,
    paddingTop: 36,
  },
  logo: {
    alignSelf: 'center',
    width: 160,
    height: 48,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  content: {
    paddingTop: 10,
    paddingBottom: 28,
  },
  label: {
    fontSize: 24,
    fontWeight: '700',
    color: colors?.textDark || '#222',
    marginTop: 18,
    marginBottom: 18,
    textAlign: 'center',
  },
  grid: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    rowGap: 14,
    marginBottom: 18,
  },
  chip: {
    width: '80%',
    height: CHIP_H,
    backgroundColor: colors?.inputBg || '#F2F4F7',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors?.border || '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipText: {
    fontSize: 20,
    color: colors?.textDark || '#111',
    fontWeight: '700',
  },
  help: {
    marginTop: 4,
    fontSize: 14,
    color: colors?.muted || '#667085',
    textAlign: 'center',
  },
  footerNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    paddingBottom: 24,
    marginTop: 8,
  },
  navBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 14,
  },
  navGhost: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors?.border || '#E5E7EB',
  },
  navText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors?.textDark || '#111',
  },
  navIcon: {
    fontSize: 20,
    fontWeight: '800',
    color: colors?.textDark || '#111',
  },
});
