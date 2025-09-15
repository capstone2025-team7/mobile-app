import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import BackNav from '../components/BackNav';
import FooterNav from '../components/FooterNav';
import colors from '../styles/colors';

const members = [
    { id: 1, name: '김모씨' },
    { id: 2, name: '정모씨' },
    { id: 3, name: '김모양' },
    { id: 4, name: '이모양' },
];

const ClubMemberScreen = () => {
    return (
        <View style={styles.container}>
            <FooterNav />

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>멤버 목록</Text>

                {members.map((item) => (
                    <View key={item.id} style={styles.memberCard}>
                        <Text style={styles.memberText}>{item.name}</Text>
                    </View>
                ))}
            </ScrollView>

            <BackNav />
        </View>
    );
};

export default ClubMemberScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAEBD7',
    justifyContent: 'space-between',
    paddingTop: 100,
    paddingBottom: 200,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 20,
    alignSelf: 'center',
  },
  memberCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  memberText: {
    fontSize: 16,
    color: colors.textDark,
  },
});