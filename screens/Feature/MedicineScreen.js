// screens/MedicineScreen.js
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Vibration,
} from 'react-native';
import colors from '../../styles/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TopNav from '../../components/TopNav';
import FooterNav from '../../components/FooterNav';

export default function MedicineScreen({ navigation }) {
  const ORANGE = colors?.primary || colors?.orange || '#FF7A00';
  const IVORY = colors?.ivory || colors?.background || '#F8F5E6';

  const onPressNew = () => {
    Vibration?.vibrate?.(10);
    // 등록 화면으로 이동 (나중에 연결)
    navigation.navigate('MedicineNew');
  };

  const onPressManage = () => {
    Vibration?.vibrate?.(10);
    // 관리 화면으로 이동 (나중에 연결)
    navigation.navigate('MedicineManage');
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: IVORY }]}>
      <View style={styles.topNavWrapper}>
        <TopNav />
      </View>
      <View style={styles.container}>
        <View style={styles.grid}>
          {/* 상단 버튼: 신규 등록 (카메라 아이콘) */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPressNew}
            style={[styles.bigButton, { backgroundColor: ORANGE }]}
            accessibilityRole="button"
            accessibilityLabel="약 신규 등록"
          >
            <View style={styles.bigButtonInner}>
              <MaterialCommunityIcons name="camera-outline" size={54} style={styles.icon} />
              <Text style={styles.bigButtonText}>신규 등록</Text>
              <Text style={styles.bigButtonSub}>약 사진 스캔 · 정보 입력</Text>
            </View>
          </TouchableOpacity>

          {/* 하단 버튼: 약 관리 */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPressManage}
            style={[styles.bigButton, { backgroundColor: ORANGE }]}
            accessibilityRole="button"
            accessibilityLabel="약 관리"
          >
            <View style={styles.bigButtonInner}>
              <MaterialCommunityIcons name="clipboard-list-outline" size={54} style={styles.icon} />
              <Text style={styles.bigButtonText}>약 관리</Text>
              <Text style={styles.bigButtonSub}>복용 체크 · 재고 확인</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomNavWrapper}>
        <FooterNav />
      </View>
    </SafeAreaView>
  );
}

/* ---- Styles ---- */
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
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom:50,
  },
  grid: {
    width: '100%',
    gap: 20,
    alignItems: 'center',
  },
  bigButton: {
    width: '92%',
    height: 160,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
  bigButtonInner: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  icon: {
    marginBottom: 10,
    color: '#111', // 검정
  },
  bigButtonText: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111',
  },
  bigButtonSub: {
    marginTop: 6,
    fontSize: 15,
    color: 'rgba(0,0,0,0.7)',
  },
});
