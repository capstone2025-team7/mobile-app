import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import colors from '../../styles/colors';
import TopNav from '../../components/TopNav';
import FooterNav from '../../components/FooterNav';

const ClubInfoScreen = ({ route }) => {
  const { club } = route.params;

  const handleApply = (choice) => {
    if (choice === 'yes') {
      alert('신청 완료!');
    } else {
      alert('신청 취소');
    }
  };

  return (
    <View style={styles.container}>
      <TopNav />

      {/* ScrollView로 감싸서 스크롤 및 여백 확보 */}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.clubName}>{club.name}</Text>
          <Text style={styles.clubDesc}>{club.description}</Text>
        </View>

        <Text style={styles.applyText}>신청하시겠습니까?</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.applyButton, { backgroundColor: '#F8CFE0' }]}
            onPress={() => handleApply('yes')}
          >
            <Text style={styles.applyButtonText}>예</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.applyButton, { backgroundColor: '#DCE2FF' }]}
            onPress={() => handleApply('no')}
          >
            <Text style={styles.applyButtonText}>아니요</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <FooterNav />
    </View>
  );
};

export default ClubInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAEBD7',
    justifyContent: 'space-between',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 100, // 🔹 TopNav와의 간격 확보
    paddingBottom: 200, // 🔹 FooterNav와 겹치지 않게 여백 확보
  },
  card: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 16,
    elevation: 3,
    padding: 16,
    alignItems: 'center',
    marginBottom: 30,
    minHeight: 450,
  },
  clubName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 8,
  },
  clubDesc: {
    fontSize: 14,
    color: colors.textDark,
    textAlign: 'center',
  },
  applyText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
    color: colors.textDark,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  applyButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 6,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});
