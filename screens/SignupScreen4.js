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
  Alert,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import colors from '../styles/colors';
import g from '../styles/global';
import * as Location from 'expo-location'; // GPS 기반 위치

Geocoder.init('YOUR_GOOGLE_MAPS_API_KEY', { language: 'ko' });

export default function SignupScreen4({ navigation }) {
  const [regionText, setRegionText] = useState('');
  const [markerPos, setMarkerPos] = useState({
    latitude: 37.0,
    longitude: 127.0,
  });
  const [loadingLocation, setLoadingLocation] = useState(true);

  const isValid = regionText.trim().length > 0;

  const goNext = () => {
    if (!isValid) {
      Alert.alert('주소를 선택해주세요.');
      return;
    }
    navigation.navigate('SignupCompleteScreen', {
      region: regionText.trim(),
    });
  };

  const fetchAddress = async (lat, lng) => {
    try {
      const json = await Geocoder.from(lat, lng);
      const components = json.results[0]?.address_components;

      if (components) {
        let district = '';
        let neighborhood = '';

        components.forEach(c => {
          if (c.types.includes('locality')) district = c.long_name; 
          if (c.types.includes('sublocality_level_1')) neighborhood = c.long_name; 
        });

        setRegionText([district, neighborhood].filter(Boolean).join(' '));
      }
    } catch (err) {
      console.warn('주소 변환 실패:', err);
      setRegionText('');
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
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.warn('위치 권한 없음');
          setLoadingLocation(false);
          return;
        }
        let loc = await Location.getCurrentPositionAsync({});
        setMarkerPos({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        });
      } catch (err) {
        console.warn('GPS 위치 불러오기 실패:', err);
      } finally {
        setLoadingLocation(false);
      }
    })();
  }, []);

  return (
    <KeyboardAvoidingView
      style={[styles.container, g?.screen]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      <Text style={styles.label}>사는 지역을 지도에서 선택하세요</Text>

      <MapView
        style={styles.map}
        region={{
          latitude: markerPos.latitude,
          longitude: markerPos.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
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
            {
              backgroundColor: isValid
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
  logo: {
    alignSelf: 'center',
    width: 160,
    height: 48,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  map: {
    width: '100%',
    height: 260,
    borderRadius: 12,
    marginTop: 10,
  },
  form: {
    paddingTop: 20,
  },
  label: {
    fontSize: 22,
    fontWeight: '700',
    color: colors?.textDark || '#222',
    marginTop: 18,
    marginBottom: 8,
  },
  input: {
    fontSize: 20,
    backgroundColor: colors?.inputBg || '#F2F4F7',
    color: colors?.textDark || '#222',
    borderRadius: 12,
    paddingVertical: 12,
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
    paddingVertical: 24,
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
    color: colors?.textDark || 'rgba(17, 17, 17, 1)',
  },
  navIcon: {
    fontSize: 20,
    fontWeight: '800',
    color: colors?.textDark || '#111',
  },
});
