// screens/Club/AppointmentScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, ScrollView } from 'react-native';
import TopNav from '../../components/TopNav';
import FooterNav from '../../components/FooterNav';
import colors from '../../styles/colors'; // 돕고 색상 import

const participantsSample = [
  { id: '1', name: '홍길동', arrived: false },
  { id: '2', name: '김철수', arrived: true },
  { id: '3', name: '이영희', arrived: false },
];

export default function AppointmentScreen() {
  const [participants, setParticipants] = useState(participantsSample);
  const [userArrived, setUserArrived] = useState(false);

  const handleArrive = () => {
    if (userArrived) return;
    setUserArrived(true);
    setParticipants(prev =>
      prev.map(p => (p.id === '1' ? { ...p, arrived: true } : p)) // 예시: 본인 id '1'
    );
    Alert.alert('도착 완료', '본인의 도착이 표시되었습니다.');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <TopNav />

      <View style={styles.spacer} /> {/* 상단 여백 확보 */}

      {/* 약속 정보 */}
      <View style={styles.card}>
        <Text style={styles.title}>약속 정보</Text>
        <Text style={styles.info}>장소: 한강공원 체육시설</Text>
        <Text style={styles.info}>시간: 10월 22일 오후 3시</Text>
      </View>

      {/* 참여 동호인 */}
      <View style={styles.card}>
        <Text style={styles.title}>참여 동호인</Text>
        <FlatList
          data={participants}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.participant}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={[styles.status, item.arrived ? styles.arrived : styles.notArrived]}>
                {item.arrived ? '도착' : '미도착'}
              </Text>
            </View>
          )}
        />
      </View>

      {/* 도착 완료 버튼 */}
      <TouchableOpacity
        style={[styles.button, userArrived && styles.buttonDisabled]}
        onPress={handleArrive}
        disabled={userArrived}
      >
        <Text style={styles.buttonText}>{userArrived ? '도착 완료' : '도착 완료 표시'}</Text>
      </TouchableOpacity>
      <FooterNav />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background, // 돕고 기본 배경
    padding: 16,
    justifyContent: 'flex-start', // 하단으로 배치
  },
  spacer: {
    flex: 0.5, // 상단 여백 확보
  },
  card: {
    backgroundColor: 'white', // 카드도 돕고 배경으로 통일
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  title: {
    fontSize: 23,
    fontWeight: '600',
    marginBottom: 8,
    color: colors.orange,
  },
  info: {
    fontSize: 21,
    marginBottom: 4,
    color: '#333',
  },
  participant: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  name: {
    fontSize: 21,
    color: '#111',
  },
  status: {
    fontSize: 21,
    fontWeight: '600',
  },
  arrived: {
    color: 'green',
  },
  notArrived: {
    color: 'gray',
  },
  button: {
    backgroundColor: colors.orange,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 21,
    fontWeight: '700',
  },
});
