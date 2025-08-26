// screens/SignupScreen2.js
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import colors from '../../styles/colors';
import g from '../../styles/global';

const HOBBIES = [
  '배드민턴', '탁구', '테니스', '조깅',
  '수영', '게이트볼', '등산', '요리', '애완동물', '그외',
];

export default function RegisterScreen2({ navigation, route }) {
  const prevData = route?.params ?? {};
  const [selected, setSelected] = useState([]);

  const toggleItem = (label) => {
    setSelected((cur) =>
      cur.includes(label) ? cur.filter((v) => v !== label) : [...cur, label]
    );
  };

  const canNext = useMemo(() => selected.length > 0, [selected]);

  return (
    <SafeAreaView style={[styles.container, g?.screen]}>
      {/* 상단 로고 */}
      <Image source={require('../../assets/logo.png')} style={styles.logo} />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* 타이틀 */}
        <Text style={styles.label}>선호하는 취미를 선택하세요</Text>

        {/* 취미 선택 그리드 */}
        <View style={styles.grid}>
          {HOBBIES.map((label) => {
            const active = selected.includes(label);
            return (
              <TouchableOpacity
                key={label}
                onPress={() => toggleItem(label)}
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
                  {label}
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
            navigation.navigate('Register3', {
              ...prevData,
              hobbies: selected,
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 14,
    rowGap: 14,
    justifyContent: 'center',
    marginBottom: 18,
  },
  chip: {
    minWidth: 120,
    height: CHIP_H,
    paddingHorizontal: 16,
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