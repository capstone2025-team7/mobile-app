// screens/SignupComplete.js
import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import colors from '../../styles/colors';
import g from '../../styles/global';

export default function RegisterScreen4({ navigation }) {
  return (
    <SafeAreaView style={[styles.container, g?.screen]}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />

      <View style={styles.content}>
        <Text style={styles.title}>회원가입이 완료되었습니다!</Text>
        <Text style={styles.subtitle}>DOBGO와 함께 시작해보세요 🎉</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={styles.startBtn}
        >
          <Text style={styles.startBtnText}>로그인 하러가기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors?.background || '#FAF0DC', paddingHorizontal: 16 },
  logo: { alignSelf: 'center', width: 140, height: 42, resizeMode: 'contain', marginTop: 40 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 26, fontWeight: '800', marginBottom: 10, color: colors?.textDark || '#222' },
  subtitle: { fontSize: 16, marginBottom: 30, color: colors?.muted || '#555' },
  startBtn: { backgroundColor: colors?.primary || '#f48d48', paddingHorizontal: 24, paddingVertical: 14, borderRadius: 12 },
  startBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
