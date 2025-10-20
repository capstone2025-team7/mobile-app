import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import * as Location from 'expo-location'; // 위치 권한 및 현재 위치
import colors from '../../styles/colors';

Geocoder.init('YOUR_GOOGLE_MAPS_API_KEY', { language: 'ko' });

export default function SignupScreen4({ navigation }) {
  const [regionText, setRegionText] = useState('');
  const [markerPos, setMarkerPos] = useState({ latitude: 37.0, longitude: 127.0 });
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [fetchingAddress, setFetchingAddress] = useState(false);

  const isValid = regionText.trim().length > 0;

  const goNext = () => {
    if (!isValid) {
      Alert.alert('주소를 선택해주세요.');
      return;
    }
    navigation.navigate('Signup5', {
      region: regionText.trim(),
    });
  };

  const fetchAddress = async (lat, lng) => {
    try {
      setFetchingAddress(true);
      const json = await Geocoder.from(lat, lng);
      const components = json.results[0]?.address_components;

      if (components) {
        let sido = '';
        let sigungu = '';
        let dong = '';

        components.forEach(c => {
          if (c.types.includes('administrative_area_level_1')) sido = c.long_name;
          if (c.types.includes('administrative_area_level_2')) sigungu = c.long_name;
          if (c.types.includes('sublocality_level_1')) dong = c.long_name;
        });

        setRegionText([sido, sigungu, dong].filter(Boolean).join(' '));
      }
    } catch (err) {
      console.warn('주소 변환 실패:', err);
      setRegionText('');
    } finally {
      setFetchingAddress(false);
    }
  };

  useEffect(() => {
    if (!loadingLocation) {
      fetchAddress(markerPos.latitude, markerPos.longitude);
    }
  }, [markerPos]);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('위치 권한이 필요합니다.');
          setLoadingLocation(false);
          return;
        }
        const loc = await Location.getCurrentPositionAsync({});
        setMarkerPos({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        });
      } catch (err) {
        console.warn('현재 위치 가져오기 실패:', err);
      } finally {
        setLoadingLocation(false);
      }
    })();
  }, []);

  if (loadingLocation) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={colors.primary || '#f48d48'} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, g?.screen]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Image source={require('../../assets/logo.png')} style={styles.logo} />

      <Text style={styles.label}>사는 지역을 지도에서 선택하세요</Text>

      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: markerPos.latitude,
          longitude: markerPos.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
        }}
        onPress={(e) => {
          const { latitude, longitude } = e.nativeEvent.coordinate;
          setMarkerPos({ latitude, longitude });
        }}
      >
        <Marker
          coordinate={markerPos}
          draggable
          onDragEnd={(e) => {
            const { latitude, longitude } = e.nativeEvent.coordinate;
            setMarkerPos({ latitude, longitude });
          }}
        />
      </MapView>

      <View style={styles.form}>
        <Text style={styles.label}>선택된 지역</Text>
        <TextInput
          style={[styles.input, !isValid && regionText.length > 0 && styles.inputError]}
          value={regionText}
          onChangeText={setRegionText}
          placeholder="지역을 선택하면 자동으로 입력됩니다."
          placeholderTextColor={colors?.muted || '#9aa0a6'}
          returnKeyType="done"
        />
        {fetchingAddress && <ActivityIndicator size="small" color={colors.primary || '#f48d48'} />}
        {!isValid && regionText.length > 0 && (
          <Text style={styles.error}>지역을 선택해주세요.</Text>
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
          disabled={!isValid}
          onPress={goNext}
          style={[
            styles.navBtn,
            { backgroundColor: isValid ? colors?.primary || '#f48d48' : colors?.border || '#dcdcdc' },
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
  logo: {
    alignSelf: 'center',
    width: 180,
    height: 54,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  map: {
    width: '100%',
    height: 320,
    borderRadius: 12,
    marginTop: 12,
  },
  form: {
    paddingTop: 28,
  },
  label: {
    fontSize: 24,
    fontWeight: '700',
    color: colors?.textDark || '#222',
    marginTop: 18,
    marginBottom: 12,
  },
  input: {
    fontSize: 20,
    backgroundColor: colors?.inputBg || '#F2F4F7',
    color: colors?.textDark || '#222',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 18,
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
    paddingVertical: 28,
  },
  navBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 16,
    borderRadius: 14,
  },
  navGhost: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors?.border || '#E5E7EB',
  },
  navText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors?.textDark || '#111',
  },
  navIcon: {
    fontSize: 22,
    fontWeight: '800',
    color: colors?.textDark || '#111',
  },
});