// src/screens/club/BulletinDetailScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import BackNav from '../../components/BackNav';
import FooterNav from '../../components/FooterNav';
import colors from '../../styles/colors';

const BulletinDetailScreen = ({ route }) => {
  const { id, title, startTime } = route.params || {};

  const [start] = useState(new Date(startTime));
  const [endTime] = useState(new Date(start.getTime() + 6 * 24 * 60 * 60 * 1000));

  const [description] = useState('이번 주 동아리 모임 요일 투표입니다.');
  const [options, setOptions] = useState([
    { id: 1, name: '월', votes: 0 },
    { id: 2, name: '화', votes: 0 },
    { id: 3, name: '수', votes: 0 },
    { id: 4, name: '목', votes: 0 },
    { id: 5, name: '금', votes: 0 },
    { id: 6, name: '토', votes: 0 },
    { id: 7, name: '일', votes: 0 },
  ]);

  const [userVoted, setUserVoted] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [notStarted, setNotStarted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setNotStarted(now < start);
      setIsEnded(now >= endTime);
    }, 1000);

    return () => clearInterval(timer);
  }, [start, endTime]);

  const totalVotes = options.reduce((acc, o) => acc + o.votes, 0);

  const handleVote = (optionId) => {
    if (userVoted || isEnded || notStarted) return;

    setOptions((prev) =>
      prev.map((opt) => (opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt))
    );
    setUserVoted(true);
  };

  return (
    <View style={styles.container}>
      <FooterNav />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.detailCard}>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.endTime}>투표 시작: {start.toLocaleString()}</Text>
          <Text style={styles.endTime}>종료 시간: {endTime.toLocaleString()}</Text>

          <View style={styles.voteSection}>
            {options.map((option) => {
              const percentage = totalVotes === 0 ? 0 : option.votes / totalVotes;
              return (
                <View key={option.id} style={styles.optionContainer}>
                  <TouchableOpacity
                    style={[
                      styles.optionButton,
                      (userVoted || isEnded || notStarted) ? styles.optionButtonDisabled : null,
                    ]}
                    onPress={() => handleVote(option.id)}
                    disabled={userVoted || isEnded || notStarted}
                  >
                    <Text style={styles.optionText}>{option.name}</Text>
                  </TouchableOpacity>

                  <View style={styles.progressWrap}>
                    <View
                      style={[styles.progressInner, { width: `${Math.round(percentage * 100)}%` }]}
                    />
                  </View>

                  <Text style={styles.voteCount}>
                    {option.votes}표 ({Math.round(percentage * 100)}%)
                  </Text>
                </View>
              );
            })}
          </View>

          {notStarted && (
            <Text style={styles.resultText}>투표가 아직 시작되지 않았습니다.</Text>
          )}

          {isEnded && (
            <Text style={styles.resultText}>투표가 종료되었습니다. 최종 결과를 확인하세요!</Text>
          )}
        </View>
      </ScrollView>

      <BackNav />
    </View>
  );
};

export default BulletinDetailScreen;

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
    paddingTop: 30,
    paddingBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 12,
    alignSelf: 'center',
  },
  detailCard: {
    width: '100%',
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
  description: {
    fontSize: 16,
    color: colors.textDark,
    marginBottom: 8,
  },
  endTime: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 4,
  },
  voteSection: {
    marginTop: 8,
  },
  optionContainer: {
    marginBottom: 14,
  },
  optionButton: {
    backgroundColor: colors.inputBg || '#f5f5f5',
    padding: 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionButtonDisabled: {
    opacity: 0.6,
  },
  optionText: {
    fontSize: 16,
    color: colors.textDark,
  },
  progressWrap: {
    height: 10,
    backgroundColor: '#eee',
    borderRadius: 6,
    overflow: 'hidden',
    marginTop: 8,
  },
  progressInner: {
    height: '100%',
    backgroundColor: colors.primary || '#4caf50',
  },
  voteCount: {
    fontSize: 14,
    marginTop: 6,
    color: colors.textDark,
  },
  resultText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '600',
    color: 'red',
    textAlign: 'center',
  },
});
