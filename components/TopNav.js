// TopNav.js
import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '../styles/colors';
import { globalStyles } from '../styles/global';

const MENU_ITEMS = [
  { label: '동호회', screen: 'Club' },
  { label: '부가기능', screen: 'Features' },
  { label: '알림', screen: 'Notifications' },
];

const TopNav = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  // 화면 크기에 따라 높이 비율 적용
  const screenHeight = Dimensions.get('window').height;
  const NAV_HEIGHT = Math.max(100, screenHeight * 0.15); // 최소 100, 최대 화면 비율 15%

  return (
    <>
      {/* TopNav 고정 영역 */}
      <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.innerContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Main')}>
            <Image
              source={require('../assets/logo.png')}
              style={globalStyles.logo}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <View style={styles.menuRow}>
            {MENU_ITEMS.map(item => (
              <TouchableOpacity
                key={item.screen}
                style={styles.menuButton}
                onPress={() => navigation.navigate(item.screen)}
                activeOpacity={0.85}
              >
                <Text style={styles.menuText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </SafeAreaView>

      {/* 콘텐츠 겹치지 않도록 투명 padding */}
      <View style={{ height: NAV_HEIGHT }} />
    </>
  );
};

export default TopNav;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.background,
    zIndex: 100,
  },
  innerContainer: {
    alignItems: 'center',
    paddingBottom: 12,
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 10,
  },
  menuButton: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 10,
    backgroundColor: colors.primary,
    borderRadius: 8,
    alignItems: 'center',
  },
  menuText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
  },
});
