// screens/Admin/AdminHome.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../styles/colors';

export default function AdminHome({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* 관리자 기능 섹션 */}
      <View style={styles.content}>
        <Text style={styles.title}>관리자 페이지</Text>

        {/* 1️⃣ 동호회 취미 카테고리 추가 */}
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('CategoryAdd')}
        >
          <Ionicons name="add-circle-outline" size={50} color={colors.primary} />
          <Text style={styles.menuText}>동호회 취미 카테고리 추가</Text>
        </TouchableOpacity>

        {/* 2️⃣ 건의함 확인 */}
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('SuggestionList')} // ✅ 건의함 확인 페이지로 이동
        >
          <Ionicons name="chatbubbles-outline" size={50} color={colors.primary} />
          <Text style={styles.menuText}>건의함 확인</Text>
        </TouchableOpacity>

        {/* 3️⃣ 동아리 회원 강퇴 */}
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('MemberKick')}
        >
          <Ionicons name="person-remove-outline" size={50} color={colors.primary} />
          <Text style={styles.menuText}>동아리 회원 강퇴</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgLight,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 24,
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 14,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  menuText: {
    fontSize: 16,
    color: colors.textDark,
    fontWeight: '500',
    marginLeft: 10,
  },
});
