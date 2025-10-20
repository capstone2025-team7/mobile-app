// screens/Admin/SuggestionList.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  FlatList, 
  TouchableOpacity, 
  StatusBar 
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../styles/colors';
import FooterNav from '../../components/FooterNav';

// 🔹 예시 건의 데이터
const dummySuggestions = [
  { id: '1', userId: 'userA01', content: '운동기구가 고장났어요. 수리 부탁드립니다.' },
  { id: '2', userId: 'fitlife22', content: '요일별 프로그램을 조금 늘려주세요.' },
  { id: '3', userId: 'dongclub7', content: '앱에 다크모드 기능이 있으면 좋겠어요.' },
  { id: '4', userId: 'wellness33', content: '관리자 문의 답변이 너무 느려요 ㅠㅠ' },
];

export default function SuggestionList({ navigation }) {
  const [suggestions, setSuggestions] = useState(dummySuggestions);

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => {
        // 나중에 상세보기 화면 연결 가능
        // navigation.navigate('SuggestionDetail', { suggestion: item });
      }}
    >
      <View style={styles.cardHeader}>
        <Ionicons name="person-circle-outline" size={24} color={colors.primary} />
        <Text style={styles.userId}>{item.userId}</Text>
      </View>
      <Text style={styles.contentText}>{item.content}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* 상단 타이틀 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.title}>건의함 확인</Text>
      </View>

      {/* 건의 목록 */}
      <FlatList
        data={suggestions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
      <FooterNav/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgLight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backBtn: {
    marginRight: 8,
    padding: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textDark,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  userId: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textDark,
    marginLeft: 6,
  },
  contentText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
});
