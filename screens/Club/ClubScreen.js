import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '../../styles/colors';
import TopNav from '../../components/TopNav';
import FooterNav from '../../components/FooterNav';

const { width } = Dimensions.get('window');
const BUTTON_MARGIN = 16;
const BUTTON_SIZE = (width - BUTTON_MARGIN * 3) / 2;

const ClubScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  // Nav 높이를 고려한 동적 padding
  const TOP_NAV_HEIGHT = 120;    // TopNav 실제 높이 + 여유
  const BOTTOM_NAV_HEIGHT = 70;  // FooterNav 실제 높이 + 여유

  return (
    <View style={styles.container}>
      {/* TopNav */}
      <TopNav />

      {/* ScrollView로 화면 작아도 스크롤 가능 */}
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + TOP_NAV_HEIGHT,
          paddingBottom: insets.bottom + BOTTOM_NAV_HEIGHT,
          alignItems: 'center',
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.buttonGrid}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('MyClub')}
          >
            <Text style={styles.buttonText}>내 동호회</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('ActivitySelect')}
          >
            <Text style={styles.buttonText}>동호회 찾기</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Calendar')}
          >
            <Text style={styles.buttonText}>캘린더</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Suggestion')}
          >
            <Text style={styles.buttonText}>건의함</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* FooterNav */}
      <FooterNav />
    </View>
  );
};

export default ClubScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAEBD7',
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 20,
  },
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    backgroundColor: colors.inputBg,
    borderRadius: 16,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: BUTTON_MARGIN,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
  },
});
