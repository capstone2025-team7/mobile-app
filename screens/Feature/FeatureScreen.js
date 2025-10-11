import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Vibration,
} from 'react-native';
import colors from '../../styles/colors';
import TopNav from '../../components/TopNav';
import FooterNav from '../../components/FooterNav';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const FeatureScreen = ({ navigation }) => {
  const ORANGE = colors?.primary || colors?.orange || '#FF7A00';
  const IVORY = colors?.ivory || colors?.background || '#FAEBD7';

  const onPressWalk = () => {
    Vibration?.vibrate?.(10);
    navigation.navigate('Walk'); 
  };

  const onPressMedicine = () => {
    Vibration?.vibrate?.(10);
    navigation.navigate('Medicine');
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: '#FAEBD7' }]}>
      {/* 상단 FooterNav → 약간 아래로 */}
      <View style={styles.topNavWrapper}>
        <TopNav />
      </View>

      <View style={styles.container}>
        <View style={styles.grid}>
          {/* 산책 버튼 */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPressWalk}
            style={[styles.bigButton, { backgroundColor: ORANGE }]}
          >
            <View style={styles.bigButtonInner}>
              <Ionicons name="walk" size={54} style={styles.icon} />
              <Text style={styles.bigButtonText}>산책</Text>
              <Text style={styles.bigButtonSub}>코스·기록·함께 걷기</Text>
            </View>
          </TouchableOpacity>

          {/* 약 버튼 */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPressMedicine}
            style={[styles.bigButton, { backgroundColor: ORANGE }]}
          >
            <View style={styles.bigButtonInner}>
              <MaterialCommunityIcons name="pill" size={54} style={styles.icon} />
              <Text style={styles.bigButtonText}>약</Text>
              <Text style={styles.bigButtonSub}>복용 알림·기록·재고</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomNavWrapper}>
        <FooterNav />
      </View>
    </SafeAreaView>
  );
};

export default FeatureScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1 },

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
  },
  grid: {
    width: '100%',
    gap: 20,
    alignItems: 'center',
    marginBottom: 50,
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
    color: '#111',
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
