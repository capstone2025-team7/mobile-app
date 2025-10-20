// MedicineManageScroll.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import colors from '../../styles/colors';
import TopNav from '../../components/TopNav';
import FooterNav from '../../components/FooterNav';

export default function MedicineManageScroll() {
  const [medicines, setMedicines] = useState([
    { id: '1', name: '아세트아미노펜', dose: '500mg', time: '08:00' },
    { id: '2', name: '이부프로펜', dose: '200mg', time: '12:00' },
    { id: '3', name: '비타민C', dose: '1000mg', time: '18:00' },
  ]);

  const handlePressItem = (item) => {
    Alert.alert(
      item.name,
      '무엇을 하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        { text: '삭제', style: 'destructive', onPress: () => handleDelete(item.id) },
        { text: '수정', onPress: () => handleEdit(item) },
      ]
    );
  };

  const handleDelete = (id) => {
    setMedicines(prev => prev.filter(m => m.id !== id));
  };

  const handleEdit = (item) => {
    Alert.alert('수정', `${item.name} 정보를 수정하세요`);
  };

  // TopNav와 FooterNav 높이 기준
  const TOPNAV_HEIGHT = 150;
  const FOOTERNAV_HEIGHT = 80;

  return (
    <View style={styles.container}>
      <TopNav />
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: TOPNAV_HEIGHT, paddingBottom: FOOTERNAV_HEIGHT + 20 }
        ]}
      >
        {medicines.length === 0 ? (
          <Text style={styles.emptyText}>등록된 약이 없습니다.</Text>
        ) : (
          medicines.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.item}
              activeOpacity={0.8}
              onPress={() => handlePressItem(item)}
            >
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.info}>{item.dose} | {item.time}</Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
      <FooterNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 16 },
  item: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  name: { fontSize: 16, fontWeight: 'bold', marginBottom: 4, color: colors.textDark },
  info: { fontSize: 14, color: colors.textLight },
  emptyText: { textAlign: 'center', color: colors.textLight, fontSize: 16, marginTop: 50 },
});
