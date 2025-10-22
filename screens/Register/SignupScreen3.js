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
import colors from '../../styles/colors'
import g from '../../styles/global';

const DAYS = ['월요일','화요일','수요일','목요일','금요일','토요일','일요일'];
const CHIP_H = 48;

export default function SignupScreen3({ navigation, route }) {
  const prev = route?.params ?? {};
  const [selected, setSelected] = useState([]);

  const toggleDay = (day) => {
    setSelected((cur) =>
      cur.includes(day) ? cur.filter((v) => v !== day) : [...cur, day]
    );
  };

  const canNext = useMemo(() => true, [selected]);

  const goNext = () => {
    navigation.navigate('Signup4', {
      ...prev,
      days: selected,
    });
  };

  return (
    <SafeAreaView style={[styles.container, g?.screen]}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>가능한 요일을 선택해주세요</Text>

        <View style={styles.grid}>
          {DAYS.map((day) => {
            const active = selected.includes(day);
            return (
              <TouchableOpacity
                key={day}
                onPress={() => toggleDay(day)}
                style={[
                  styles.chip,
                  active && { backgroundColor: colors?.primary || '#f48d48', borderColor: colors?.primary || '#f48d48' },
                ]}
              >
                <Text style={[styles.chipText, active && { color: '#fff', fontWeight: '800' }]}>
                  {day}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.help}>전부 선택했었다면 아래 버튼을 눌러주세요.</Text>
      </ScrollView>

      {/* 하단 이전/다음 버튼 */}
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
          onPress={goNext}
          style={[
            styles.navBtn,
            {
              backgroundColor: canNext
                ? colors?.primary || '#f48d48'
                : colors?.border || '#dcdcdc',
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.background || '#FAF0DC',
    paddingHorizontal: 16,
    paddingTop: 100,
  },

  logo: {
    alignSelf: 'center',
    width: 140,
    height: 42,
    resizeMode: 'contain',
    marginTop: 4,
  },

  content: {
    paddingTop: 10,
    paddingBottom: 28,
    alignItems: 'center',
  },

  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors?.textDark || '#222',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
    marginTop: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors?.border || '#e5e7eb',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },

  grid: {
    width: '100%',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 18,
  },

  chip: {
    width: '80%',
    height: CHIP_H,
    backgroundColor: '#F2F4F7',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors?.border || '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  chipText: {
    fontSize: 20,
    color: colors?.textDark || '#111',
    fontWeight: '700',
  },

  help: {
    marginTop: 2,
    marginBottom: 12,
    fontSize: 14,
    color: colors?.muted || '#667085',
  },

  footerNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingTop: 6,
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
