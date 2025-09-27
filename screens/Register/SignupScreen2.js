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
import colors from '../../styles/colors'
import g from '../../styles/global'

const HOBBIES = [
  '배드민턴', '탁구', '테니스', '조깅',
  '수영', '게이트볼', '등산', '요리', '애완동물', '그외',
];

export default function SignupScreen2({ navigation, route }) {
  const prevData = route?.params ?? {};
  const [selected, setSelected] = useState([]);

  const toggleItem = (label) => {
    setSelected((cur) =>
      cur.includes(label) ? cur.filter((v) => v !== label) : [...cur, label]
    );
  };

  const canNext = useMemo(() => true, [selected]);

  return (
    <SafeAreaView style={[styles.container, g?.screen]}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>선호하는 취미를 선택하세요.</Text>

        <View style={styles.grid}>
          {HOBBIES.map((label) => {
            const active = selected.includes(label);
            return (
              <TouchableOpacity
                key={label}
                onPress={() => toggleItem(label)}
                style={[
                  styles.chip,
                  active && { backgroundColor: colors?.primary || '#f48d48', borderColor: colors?.primary || '#f48d48' },
                ]}
              >
                <Text style={[styles.chipText, active && { color: '#fff', fontWeight: '800' }]}>{label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.help}>전부 선택했었다면 아래 버튼을 눌러주세요.</Text>

        <TouchableOpacity
          disabled={!canNext}
          onPress={() =>
            navigation.navigate('Signup3', {
              ...prevData,
              hobbies: selected,
            })
          }
          style={[
            styles.nextBtn,
            { backgroundColor: canNext ? colors?.accent || '#E9D5FF' : colors?.border || '#e5e7eb' },
          ]}
        >
          <Text style={[styles.nextBtnText, { color: colors?.textDark || '#333' }]}>
            다음으로 넘어가기
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const CHIP_H = 48;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors?.background || '#FAF0DC', paddingHorizontal: 16 },
  logo: { alignSelf: 'center', width: 140, height: 42, resizeMode: 'contain', marginTop: 4 },
  content: { paddingTop: 10, paddingBottom: 28, alignItems: 'center' },
  title: {
    fontSize: 30, fontWeight: '800', color: colors?.textDark || '#222',
    backgroundColor: '#fff', paddingVertical: 12, paddingHorizontal: 20,
    borderRadius: 16, marginTop: 8, marginBottom: 16, borderWidth: 1,
    borderColor: colors?.border || '#e5e7eb',
    shadowColor: '#000', shadowOpacity: 0.08, shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4, elevation: 2,
  },
  grid: { width: '100%', flexDirection: 'row', flexWrap: 'wrap', columnGap: 14, rowGap: 14, justifyContent: 'center', marginTop: 6, marginBottom: 18 },
  chip: { minWidth: 120, height: CHIP_H, paddingHorizontal: 14, backgroundColor: colors?.inputBg || '#F2F4F7',
    borderRadius: 12, borderWidth: 1, borderColor: colors?.border || '#E5E7EB', alignItems: 'center', justifyContent: 'center' },
  chipText: { fontSize: 30, color: colors?.textDark || '#111', fontWeight: '700' },
  help: { marginTop: 2, marginBottom: 12, fontSize: 14, color: colors?.muted || '#667085' },
  nextBtn: { alignSelf: 'stretch', marginTop: 4, height: 54, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  nextBtnText: { fontSize: 18, fontWeight: '800' },
});
