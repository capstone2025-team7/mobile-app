// BottomNav.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '../styles/colors';

const FooterNav = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  // 버튼+padding 높이 계산
  const screenHeight = Dimensions.get('window').height;
  const NAV_HEIGHT = Math.max(60, screenHeight * 0.1); // 최소 60, 최대 화면 비율 10%

  return (
    <>
      {/* BottomNav 고정 영역 */}
      <View style={[styles.container, { paddingBottom: insets.bottom + 10 }]}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>뒤로가기</Text>
        </TouchableOpacity>
      </View>

      {/* 콘텐츠 겹치지 않도록 투명 padding */}
      <View style={{ height: NAV_HEIGHT }} />
    </>
  );
};

export default FooterNav;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: 'transparent',
    zIndex: 100,
  },
  button: {
    width: '90%',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: Platform.OS === 'android' ? 8 : 0,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
