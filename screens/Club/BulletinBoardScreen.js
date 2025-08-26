import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import BackNav from '../../components/BackNav';
import FooterNav from '../../components/FooterNav';
import colors from '../../styles/colors';

const bulletins = [
    { id: 1, title: 'A월 D주차 일정 투표' },
    { id: 2, title: 'A월 C주차 일정 투표' },
    { id: 3, title: 'A월 B주차 일정 투표' },
    { id: 4, title: 'A월 A주차 일정 투표' },
];

const BulletinBoardScreen = () => {
    return (
        <View style={styles.container}>
            <FooterNav />

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>게시물</Text>

                {bulletins.map((item) => (
                    <View key={item.id} style={styles.bulletinCard}>
                        <Text style={styles.bulletinText}>{item.title}</Text>
                    </View>
                ))}
            </ScrollView>

            <BackNav />
        </View>
    );
};

export default BulletinBoardScreen;

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
  bulletinCard: {
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
  bulletinText: {
    fontSize: 16,
    color: colors.textDark,
  },
});