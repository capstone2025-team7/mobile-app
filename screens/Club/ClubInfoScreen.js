import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import BackNav from '../../components/FooterNav';
import FooterNav from '../../components/TopNav';
import colors from '../../styles/colors';

const ClubInfoScreen = ({ route }) => {
  const { club } = route.params;

  // 신청 로직 추가
  const handleApply = (choice) => {
    if (choice === 'yes') {
      alert('신청 완료!');
    } else {
      alert('신청 취소');
    }
  };

  return (
    <View style={styles.container}>
      <FooterNav />

      <View style={styles.content}>
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
      </View>

      <BackNav />
    </View>
  );
};

export default ClubInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAEBD7',
    justifyContent: 'space-between',
    paddingTop: 100,
    paddingBottom: 200,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 16,
    elevation: 3,
    padding: 16,
    alignItems: 'center',
    marginBottom: 30,
  },
  clubImage: {
    width: 80,
    height: 80,
    backgroundColor: 'black', // 임시 placeholder 색상
    borderRadius: 8,
    marginBottom: 12,
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