// screens/MedicineNewScreen.js
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Vibration,
  Alert,
} from 'react-native';
import colors from '../../styles/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function MedicineNewScreen({ navigation, route }) {
  const ORANGE = colors?.primary || colors?.orange || '#FF7A00';
  const IVORY  = colors?.ivory || colors?.background || '#F8F5E6';

  const onPressManual = () => {
    Vibration?.vibrate?.(10);
    Alert.alert('직접 등록', '약 이름/용량/복용시간을 직접 입력하는 화면으로 연결할 수 있어요.');
  };  

  const onPressCamera = () => {
    Vibration?.vibrate?.(10);
    Alert.alert('카메라', '카메라로 약을 촬영해 정보를 등록하는 화면으로 연결할 수 있어요.');
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: IVORY }]}>
      <View style={styles.container}>
        <View style={styles.grid}>
          {/* 상단 버튼: 직접 등록 */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPressManual}
            style={[styles.bigButton, { backgroundColor: ORANGE }]}
            accessibilityRole="button"
            accessibilityLabel="약 직접 등록"
          >
            <View style={styles.bigButtonInner}>
              <MaterialCommunityIcons name="pencil" size={54} style={styles.icon} />
              <Text style={styles.bigButtonText}>직접 등록</Text>
              <Text style={styles.bigButtonSub}>약 이름 · 용량 · 복용시간 입력</Text>
            </View>
          </TouchableOpacity>

          {/* 하단 버튼: 카메라 */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPressCamera}
            style={[styles.bigButton, { backgroundColor: ORANGE }]}
            accessibilityRole="button"
            accessibilityLabel="카메라로 등록"
          >
            <View style={styles.bigButtonInner}>
              <MaterialCommunityIcons name="camera-outline" size={54} style={styles.icon} />
              <Text style={styles.bigButtonText}>카메라</Text>
              <Text style={styles.bigButtonSub}>약 사진 촬영 · 자동 인식</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

/* ---- Styles ---- */
const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',  // 화면 중앙 정렬
    alignItems: 'center',
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
    // 그림자
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
    color: '#111', // 아이콘 검정
  },
  bigButtonText: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111', // 텍스트 검정
  },
  bigButtonSub: {
    marginTop: 6,
    fontSize: 15,
    color: 'rgba(0,0,0,0.7)',
    textAlign: 'center',
  },
});
