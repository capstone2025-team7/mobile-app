// screens/Manager/BuddyReservation.js
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  Linking, 
  ScrollView 
} from 'react-native';

export default function BuddyReservation({ places }) {
  const handlePress = (url) => {
    Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
  };

  if (!places || places.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>장소 데이터를 불러오는 중입니다...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>버디 예약 페이지</Text>
      {places.map((place) => (
        <View key={place.id} style={styles.card}>
          <View style={styles.titleContainer}>
            <Text style={styles.placeName}>{place.name}</Text>
            <Text style={[styles.placeType, place.type === '유료' ? styles.paid : styles.free]}>
              {place.type}
            </Text>
          </View>
          <TouchableOpacity onPress={() => handlePress(place.link)}>
            <Image source={{ uri: place.image }} style={styles.image} />
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
    padding: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  placeName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  placeType: {
    fontSize: 14,
    fontWeight: '500',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    color: '#fff',
  },
  paid: {
    backgroundColor: '#FF6B6B',
  },
  free: {
    backgroundColor: '#4ECDC4',
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});
