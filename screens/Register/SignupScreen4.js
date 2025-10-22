import React, { useEffect, useState, useRef } from 'react';

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
import { WebView } from 'react-native-webview';
// [복구] expo-location을 다시 사용합니다.
import * as Location from 'expo-location';
import colors from '../../styles/colors';
import g from '../../styles/global';

// [확인 완료]
const KAKAO_REST_API_KEY = '92afdfa00b6f4548b59909e7807bd295';
const KAKAO_JAVASCRIPT_KEY = 'f075933ee1717c117db1fead88b74c84';

// [HTML 생성 함수 - 디버깅 로그 제거]
const getMapHtml = (apiKey) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>Kakao Map</title>
    <style>
        html, body { height: 100%; margin: 0; padding: 0; }
        #map { width: 100%; height: 100%; }
        body { -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }
    </style>
</head>
<body>
<div id="map"></div>
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&libraries=services"></script>
<script>
    // SDK 로드 실패를 대비한 기본 로직
    if (typeof kakao !== 'undefined' && kakao.maps) {
        var mapContainer = document.getElementById('map');
        var mapOption = { 
            center: new kakao.maps.LatLng(37.5665, 126.9780),
            level: 7 
        };
        var map = new kakao.maps.Map(mapContainer, mapOption); 
        var marker = new kakao.maps.Marker({ 
            position: map.getCenter() 
        }); 
        marker.setMap(map);

        kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
            var latlng = mouseEvent.latLng; 
            marker.setPosition(latlng); 
            window.ReactNativeWebView.postMessage(
                JSON.stringify({
                    latitude: latlng.getLat(),
                    longitude: latlng.getLng()
                })
            );
        });
    }

    function setCenter(lat, lng) {
        if (typeof kakao !== 'undefined' && kakao.maps) {
            var moveLatLon = new kakao.maps.LatLng(lat, lng);
            map.panTo(moveLatLon);
            marker.setPosition(moveLatLon);
        }
    }
</script>
</body>
</html>
`;

// --- React Native 코드 ---

export default function SignupScreen4({ navigation }) {
  // [복구] 초기 위치는 서울로 두되, loadingLocation 상태 복구
  const [markerPos, setMarkerPos] = useState({ latitude: 37.5665, longitude: 126.9780 });
  const [regionText, setRegionText] = useState('');
  const [loadingLocation, setLoadingLocation] = useState(true); // [복구] 로딩 상태
  const [fetchingAddress, setFetchingAddress] = useState(false);
  const webViewRef = useRef(null);

  const mapHtml = getMapHtml(KAKAO_JAVASCRIPT_KEY);
  const isValid = regionText.trim().length > 0;

  const goNext = () => {
    if (!isValid) {
      Alert.alert('주소를 선택해주세요.');
      return;
    }
    navigation.navigate('Signup5', { region: regionText.trim() });
  };

  // ✅ 좌표 → 주소 변환
  const fetchAddress = async (lat, lng) => {
    try {
      setFetchingAddress(true);
      const response = await fetch(
          `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}`,
          { headers: { Authorization: `KakaoAK ${KAKAO_REST_API_KEY}` } }
      );
      const json = await response.json();

      if (!response.ok) {
        console.error('카카오 주소 변환 API 에러:', JSON.stringify(json, null, 2));
        setRegionText('주소 변환 서버 오류');
        return;
      }

      if (json.documents && json.documents.length > 0) {
        const addressData = json.documents[0].address;
        if (addressData) {
          const sido = addressData.region_1depth_name;
          const sigungu = addressData.region_2depth_name;
          setRegionText(`${sido} ${sigungu}`);
        } else {
          setRegionText('주소를 찾을 수 없습니다.');
        }
      } else {
        setRegionText('주소 정보 없음 (해외/바다)');
      }
    } catch (err) {
      console.error('카카오 주소 변환 중 네트워크 오류:', err.message);
      setRegionText('네트워크 연결 오류');
    } finally {
      setFetchingAddress(false);
    }
  };

  // [복구] markerPos가 변경되면 주소 변환 실행 (loadingLocation 의존성 복구)
  useEffect(() => {
    // 초기 위치 로딩 중(true)이 아닐 때만 주소 변환 실행
    if (!loadingLocation) {
      fetchAddress(markerPos.latitude, markerPos.longitude);
    }
  }, [markerPos, loadingLocation]);

  // [복구] 현재 위치 가져오기 useEffect 복구
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('위치 권한이 필요합니다.', '초기 위치(서울)로 지도를 표시합니다.');
          // 권한 거부 시, 초기 위치(서울)로 주소 변환 실행
          fetchAddress(markerPos.latitude, markerPos.longitude);
          return;
        }

        const loc = await Location.getCurrentPositionAsync({});
        const currentPos = {
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        };

        // [중요] 현재 위치로 markerPos 상태 업데이트
        setMarkerPos(currentPos);

        // WebView에 현재 위치 주입
        if (webViewRef.current) {
          webViewRef.current.injectJavaScript(
              `setCenter(${currentPos.latitude}, ${currentPos.longitude});`
          );
        }

      } catch (err) {
        console.warn('현재 위치 가져오기 실패:', err.message);
        // 실패 시에도 초기 위치(서울)로 주소 변환 실행
        fetchAddress(markerPos.latitude, markerPos.longitude);
      } finally {
        // [중요] 모든 로직이 끝나면 로딩 상태를 false로 변경
        setLoadingLocation(false);
      }
    })();
  }, []); // 마운트 시 1회 실행

  // [복구] onWebViewLoad 수정 (loadingLocation 의존성 복구)
  const onWebViewLoad = () => {
    if (webViewRef.current && !loadingLocation) {
      // WebView가 로드되었을 때, 이미 expo-location이 가져온
      // 현재 위치(markerPos)로 지도를 이동시킴
      webViewRef.current.injectJavaScript(
          `setCenter(${markerPos.latitude}, ${markerPos.longitude});`
      );
    }
  };

  const handleMessage = (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.latitude && data.longitude) {
        setMarkerPos({ latitude: data.latitude, longitude: data.longitude });
      }
    } catch (e) {
      console.warn('WebView 메시지 처리 실패', e);
    }
  };

  // [복구] 로딩 화면 복구
  if (loadingLocation) {
    return (
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" color={colors.primary || '#f48d48'} />
        </View>
    );
  }

  // 메인 렌더링
  return (
      <KeyboardAvoidingView
          style={[styles.container, g?.screen]}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
        <Text style={styles.label}>사는 지역을 지도에서 선택하세요</Text>

        <View style={styles.mapContainer}>
          <WebView
              ref={webViewRef}
              style={styles.map}
              source={{ html: mapHtml, baseUrl: 'http://localhost' }}
              onMessage={handleMessage}
              onLoad={onWebViewLoad}
              originWhitelist={['*', 'http://localhost', 'https://localhost']}
              javaScriptEnabled={true}
              scrollEnabled={false}
              // [제거] 디버깅용 로그 제거
              // onConsoleMessage={...}
              // onError={...}
              // onHttpError={...}
          />
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>선택된 지역</Text>
          <TextInput
              style={[styles.input, !isValid && regionText.length > 0 && styles.inputError]}
              value={regionText}
              placeholder="지역을 선택하면 자동으로 입력됩니다."
              placeholderTextColor={colors?.muted || '#9aa0a6'}
              returnKeyType="done"
              editable={false}
          />
          {fetchingAddress && (
              <ActivityIndicator
                  size="small"
                  color={colors.primary || '#f48d48'}
                  style={styles.activityIndicator}
              />
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
              disabled={!isValid || fetchingAddress}
              onPress={goNext}
              style={[
                styles.navBtn,
                {
                  backgroundColor: (isValid && !fetchingAddress)
                      ? (colors?.primary || '#f48d48')
                      : (colors?.border || '#dcdcdc')
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

// [스타일 - 기존과 동일]
const styles = StyleSheet.create({
  mapContainer: {
    width: '100%',
    height: 320,
    borderRadius: 12,
    marginTop: 12,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
  activityIndicator: {
    position: 'absolute',
    right: 15,
    top: 105,
  },
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
  form: {
    paddingTop: 28,
  },
  label: {
    fontSize: 22,
    fontWeight: '700',
    color: colors?.dtextDark || '#222',
    marginTop: 18,
    marginBottom: 10,
  },
  input: {
    fontSize: 18,
    backgroundColor: colors?.inputBg || '#F2F4F7',
    color: colors?.textDark || '#222',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: colors?.border || '#E5E7EB',
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
  },
  navIcon: {
    fontSize: 22,
    fontWeight: '800',
  },
});
