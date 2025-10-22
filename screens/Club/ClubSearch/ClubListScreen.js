// ClubListScreen.js
import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import colors from '../../../styles/colors';
import TopNav from '../../../components/TopNav';
import FooterNav from '../../../components/FooterNav';

const { width } = Dimensions.get('window');

const ClubListScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { activities, days } = route.params;

  const clubs = [
    { id: 1, name: '골프 마스터', description: '주 1회 골프 모임', activity: '골프', day: '월' },
    { id: 2, name: '주말 게이트볼', description: '토요일 게이트볼 활동', activity: '게이트볼', day: '토' },
    { id: 3, name: '테니스 동호회 A', description: '수요일 테니스 레슨', activity: '테니스', day: '수' },
    { id: 4, name: '수영 동호회 B', description: '금요일 자유 수영', activity: '수영', day: '금' },
    { id: 5, name: '골프 & 테니스 혼합', description: '수요일 골프 & 테니스 모임', activity: '골프', day: '수' },
  ];

  const filteredClubs = clubs.filter(
    club => activities.includes(club.activity) && days.includes(club.day)
  );

  return (
    <View style={styles.container}>
      <TopNav />
      <ScrollView contentContainerStyle={{ alignItems: 'center', paddingVertical: 20, paddingTop: 100, paddingBottom: 50 }}>
        <Text style={styles.title}>검색 결과 동호회 목록</Text>

        {filteredClubs.length > 0 ? filteredClubs.map(club => (
          <TouchableOpacity key={club.id} style={styles.card} onPress={() => navigation.navigate('ClubInfo', { club })}>
            <View style={styles.clubImage} />
            <Text style={styles.clubName}>{club.name}</Text>
            <Text style={styles.clubDesc}>{club.description}</Text>
          </TouchableOpacity>
        )) : <Text style={styles.noClub}>조건에 맞는 동호회가 없습니다.</Text>}
      </ScrollView>
      <FooterNav />
    </View>
  );
};

export default ClubListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAEBD7' },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 20, textAlign: 'center' },
  card: { width: '90%', backgroundColor: 'white', borderRadius: 16, elevation: 3, padding: 16, alignItems: 'center', marginBottom: 20 },
  clubImage: { width: 80, height: 80, backgroundColor: 'black', borderRadius: 8, marginBottom: 12 },
  clubName: { fontSize: 18, fontWeight: '600', color: colors.textDark, marginBottom: 8 },
  clubDesc: { fontSize: 14, color: colors.textDark, textAlign: 'center' },
  noClub: { fontSize: 16, textAlign: 'center', marginTop: 50 },
});
