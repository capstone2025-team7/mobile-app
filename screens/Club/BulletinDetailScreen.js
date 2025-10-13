import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import colors from '../../styles/colors';
import TopNav from '../../components/TopNav';
import FooterNav from '../../components/FooterNav';

const BulletinDetailScreen = ({ route }) => {
  const { title, startTime, endTime, location } = route.params || {}; // location 추가

  const [start] = useState(new Date(startTime));
  const [end] = useState(new Date(endTime));
  const [userVoted, setUserVoted] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [notStarted, setNotStarted] = useState(false);
  const [options, setOptions] = useState([
    { id: 1, name: '참여 가능', votes: 0 },
    { id: 2, name: '참여 불가능', votes: 0 },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setNotStarted(now < start);
      setIsEnded(now > end);
    }, 1000);
    return () => clearInterval(timer);
  }, [start, end]);

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
      <TopNav />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{title}</Text>
        
        {/* 장소 정보 */}
        {location && (
          <Text style={styles.locationText}>장소: {location}</Text>
        )}

        <View style={styles.detailCard}>
          <Text style={styles.description}>이번 주 동아리 모임 참여 여부 투표입니다.</Text>
          <Text style={styles.endTime}>투표 시작: {start.toLocaleString()}</Text>
          <Text style={styles.endTime}>투표 종료: {end.toLocaleString()}</Text>

          <View style={styles.voteSection}>
            {options.map((option) => {
              const percentage = totalVotes === 0 ? 0 : option.votes / totalVotes;
              return (
                <View key={option.id} style={styles.optionContainer}>
                  <TouchableOpacity
                    style={[
                      styles.optionButton,
                      (userVoted || isEnded || notStarted) && styles.optionButtonDisabled,
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

          {notStarted && <Text style={styles.resultText}>투표가 아직 시작되지 않았습니다.</Text>}
          {isEnded && <Text style={styles.resultText}>투표가 종료되었습니다. 최종 결과를 확인하세요!</Text>}
        </View>
      </ScrollView>

      <FooterNav />
    </View>
  );
};

export default BulletinDetailScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.background, 
    justifyContent: 'space-between', 
    paddingTop: 100, 
    paddingBottom: 200 
  },
  content: { 
    paddingHorizontal: 20, 
    paddingTop: 30, 
    paddingBottom: 20, 
    alignItems: 'center' 
  },
  title: { 
    fontSize: 22, 
    fontWeight: '600', 
    color: colors.textDark, 
    marginBottom: 12, 
    alignSelf: 'center' 
  },
  detailCard: { 
    width: '100%', 
    backgroundColor: colors.white, 
    padding: 15, 
    borderRadius: 12, 
    marginBottom: 12, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
    elevation: 3 
  },
  description: { 
    fontSize: 16, 
    color: colors.textDark, 
    marginBottom: 8 
  },
  endTime: { 
    fontSize: 14, 
    color: colors.textLight, 
    marginBottom: 4 
  },
  voteSection: { marginTop: 8 },
  optionContainer: { marginBottom: 14 },
  optionButton: { 
    backgroundColor: colors.inputBg, 
    padding: 12, 
    borderRadius: 10, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  optionButtonDisabled: { opacity: 0.6 },
  optionText: { 
    fontSize: 16, 
    color: colors.textDark 
  },
  progressWrap: { 
    height: 10, 
    backgroundColor: colors.secondary, 
    borderRadius: 6, 
    overflow: 'hidden', 
    marginTop: 8 
  },
  progressInner: { 
    height: '100%', 
    backgroundColor: colors.primary 
  },
  voteCount: { 
    fontSize: 14, 
    marginTop: 6, 
    color: colors.textDark 
  },
  resultText: { 
    marginTop: 16, 
    fontSize: 16, 
    fontWeight: '600', 
    color: 'red', 
    textAlign: 'center' 
  },
  locationText: {
    fontSize: 16,
    color: colors.textDark,
    marginBottom: 12,
    alignSelf: 'center',
  },
});
