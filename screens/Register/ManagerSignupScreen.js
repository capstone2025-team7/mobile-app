import React, { useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
// 경로 확인 필요
import colors from '../../styles/colors'; 
import g from '../../styles/global'; 

export default function ManagerSignupScreen({ navigation }) {
  // 신규 추가: 아이디/비밀번호
  const [accountId, setAccountId] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  // 기존 필드
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [phone, setPhone] = useState('');

  // refs
  const idRef = useRef(null);
  const pwRef = useRef(null);
  const pw2Ref = useRef(null);
  const nameRef = useRef(null);
  const birthRef = useRef(null);
  const phoneRef = useRef(null);

  // --- 입력 핸들러 ---
  const onChangeId = (text) => {
    const cleaned = text.replace(/[^a-zA-Z0-9_]/g, '');
    setAccountId(cleaned);
  };

  const onChangePw = (text) => setPassword(text);
  const onChangePw2 = (text) => setPassword2(text);
  const onChangeName = (text) => setName(text);

  const onEndEditingName = () => {
    // 매니저 가입이므로 특별한 필터링은 적용하지 않습니다.
  };

  const onChangeBirth = (text) => {
    const num = text.replace(/\D/g, '').slice(0, 8);
    let out = num;
    if (num.length > 4) out = num.slice(0, 4) + '-' + num.slice(4);
    if (num.length > 6) out = num.slice(0, 4) + '-' + num.slice(4, 6) + '-' + num.slice(6);
    setBirth(out);
  };

  const onChangePhone = (text) => {
    const num = text.replace(/\D/g, '').slice(0, 11);
    let out = num;
    if (num.length > 3 && num.length <= 7) out = num.slice(0, 3) + '-' + num.slice(3);
    if (num.length > 7) out = num.slice(0, 3) + '-' + num.slice(3, 7) + '-' + num.slice(7);
    setPhone(out);
  };

  // --- 유효성 검사 ---
  const birthDigits = birth.replace(/\D/g, '');
  const phoneDigits = phone.replace(/\D/g, '');

  const isIdValid = useMemo(() => /^[a-zA-Z][a-zA-Z0-9_]{4,19}$/.test(accountId), [accountId]);

  const isPwValid = useMemo(
    () => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\S]{8,20}$/.test(password),
    [password]
  );

  const isPwSame = useMemo(() => password.length > 0 && password === password2, [password, password2]);

  // 매니저는 나이 제한이 없습니다. 8자리 형식만 검사합니다.
  const isBirthValid = useMemo(() => {
    if (birthDigits.length !== 8) return false;
    const birthYear = parseInt(birthDigits.slice(0, 4), 10);
    const birthMonth = parseInt(birthDigits.slice(4, 6), 10) - 1;
    const birthDay = parseInt(birthDigits.slice(6, 8), 10);
    const birthDate = new Date(birthYear, birthMonth, birthDay);
    return !isNaN(birthDate.getTime()); // 유효한 날짜 형식인지 확인
  }, [birthDigits]);

  const isPhoneValid = useMemo(() => phoneDigits.length >= 10 && phoneDigits.length <= 11, [phoneDigits]);

  const isNameValid = useMemo(
    () => name.trim().length > 0,
    [name]
  );

  const canNext = isIdValid && isPwValid && isPwSame && isNameValid && isBirthValid && isPhoneValid;

  const goNext = () => {
    if (!canNext) return;
    // 매니저 전용 다음 단계로 이동합니다.
    navigation.navigate('ManagerSignup2', {
      accountId: accountId.trim(),
      password,
      name: name.trim(),
      birth: birthDigits,
      phone: phoneDigits,
    });
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, g?.screen]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Image 
        source={require('../../assets/logo.png')} 
        style={styles.logo} 
      />
      <Text style={styles.headerTitle}>돕고 매니저 가입</Text>
      

      <View style={styles.form}>
        {/* 이름 */}
        <Text style={styles.label}>이름</Text>
        <TextInput
          ref={nameRef}
          style={[styles.input, !isNameValid && name.length > 0 && styles.inputError]}
          value={name}
          onChangeText={onChangeName}
          onEndEditing={onEndEditingName}
          placeholder="이름을 입력하세요"
          placeholderTextColor={colors?.muted || '#9aa0a6'}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="default"
          returnKeyType="next"
          onSubmitEditing={() => birthRef.current?.focus()}
        />

        {/* 생년월일 */}
        <Text style={styles.label}>생년월일</Text>
        <TextInput
          ref={birthRef}
          style={[styles.input, !isBirthValid && birthDigits.length > 0 && styles.inputError]}
          value={birth}
          onChangeText={onChangeBirth}
          placeholder="예: 1990-01-23"
          placeholderTextColor={colors?.muted || '#9aa0a6'}
          keyboardType="number-pad"
          maxLength={10}
          returnKeyType="next"
          onSubmitEditing={() => phoneRef.current?.focus()}
        />
        {!isBirthValid && birthDigits.length > 0 && (
          <Text style={styles.error}>생년월일 8자리를 YYYY-MM-DD 형식으로 입력해 주세요.</Text>
        )}

        {/* 전화번호 */}
        <Text style={styles.label}>전화번호</Text>
        <TextInput
          ref={phoneRef}
          style={[styles.input, !isPhoneValid && phoneDigits.length > 0 && styles.inputError]}
          value={phone}
          onChangeText={onChangePhone}
          placeholder="예: 010-1234-5678"
          placeholderTextColor={colors?.muted || '#9aa0a6'}
          keyboardType="phone-pad"
          maxLength={13}
          returnKeyType="next"
          onSubmitEditing={() => idRef.current?.focus()}
        />
        {!isPhoneValid && phoneDigits.length > 0 && (
          <Text style={styles.error}>전화번호 10~11자리로 입력해 주세요.</Text>
        )}

        {/* 아이디 */}
        <Text style={styles.label}>아이디</Text>
        <TextInput
          ref={idRef}
          style={[styles.input, accountId.length > 0 && !isIdValid && styles.inputError]}
          value={accountId}
          onChangeText={onChangeId}
          placeholder="영문으로 시작, 5~20자 (영문/숫자/_)"
          placeholderTextColor={colors?.muted || '#9aa0a6'}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="default"
          returnKeyType="next"
          onSubmitEditing={() => pwRef.current?.focus()}
        />
        {accountId.length > 0 && !isIdValid && (
          <Text style={styles.error}>영문으로 시작하는 5~20자(영문/숫자/밑줄)로 입력해 주세요.</Text>
        )}

        {/* 비밀번호 */}
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          ref={pwRef}
          style={[styles.input, password.length > 0 && !isPwValid && styles.inputError]}
          value={password}
          onChangeText={onChangePw}
          placeholder="8~20자, 영문+숫자 조합"
          placeholderTextColor={colors?.muted || '#9aa0a6'}
          autoCapitalize="none"
          secureTextEntry
          returnKeyType="next"
          onSubmitEditing={() => pw2Ref.current?.focus()}
        />
        {password.length > 0 && !isPwValid && (
          <Text style={styles.error}>8~20자이며 영문과 숫자를 모두 포함해야 합니다.</Text>
        )}

        {/* 비밀번호 확인 */}
        <Text style={styles.label}>비밀번호 확인</Text>
        <TextInput
          ref={pw2Ref}
          style={[styles.input, password2.length > 0 && !isPwSame && styles.inputError]}
          value={password2}
          onChangeText={onChangePw2}
          placeholder="비밀번호를 한번 더 입력"
          placeholderTextColor={colors?.muted || '#9aa0a6'}
          autoCapitalize="none"
          secureTextEntry
          returnKeyType="done"
          onSubmitEditing={() => Keyboard.dismiss()}
        />
        {password2.length > 0 && !isPwSame && (
          <Text style={styles.error}>비밀번호가 일치하지 않습니다.</Text>
        )}
      </View>

      <View style={styles.footerNav}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.navBtn, styles.navGhost]}
        >
          <Text style={styles.navIcon}>←</Text>
          <Text style={styles.navText}>뒤로</Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={!canNext}
          onPress={goNext}
          style={[
            styles.navBtn,
            {
              backgroundColor: canNext
                ? colors?.primary || '#f48d48'
                : colors?.border || '#dcdcdc',
            },
          ]}
        >
          <Text style={[styles.navText, { color: '#fff' }]}>다음</Text>
          <Text style={[styles.navIcon, { color: '#fff' }]}>→</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.background || '#FAF0DC',
    paddingHorizontal: 20,
    paddingTop: 36,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors?.textDark || '#222',
    alignSelf: 'center',
    marginBottom: 20,
  },
  logo: {
    alignSelf: 'center',
    width: 160,
    height: 48,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  form: {
    flex: 1,
    paddingTop: 10,
  },
  label: {
    fontSize: 24,
    fontWeight: '700',
    color: colors?.textDark || '#222',
    marginTop: 18,
    marginBottom: 8,
  },
  input: {
    fontSize: 24,
    backgroundColor: colors?.inputBg || '#F2F4F7',
    color: colors?.textDark || '#222',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors?.border || '#E5E7EB',
  },
  inputError: {
    borderColor: colors?.danger || '#ff6b6b',
  },
  error: {
    marginTop: 6,
    fontSize: 14,
    color: colors?.danger || '#ff6b6b',
  },
  footerNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    paddingBottom: 24,
  },
  navBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 14,
  },
  navGhost: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors?.border || '#E5E7EB',
  },
  navText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors?.textDark || '#111',
  },
  navIcon: {
    fontSize: 20,
    fontWeight: '800',
    color: colors?.textDark || '#111',
  },
});