import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
// 경로 수정: RoleSelection이 Register와 같은 서브폴더에 있다고 가정하고 두 단계 위로 이동합니다.
import HelperWithSpeech from '../../components/HelperWithSpeech';
// 로컬 경로를 사용할 경우 'logo.png' 경로도 수정이 필요할 수 있습니다.

export default function RoleSelection({ navigation }) {
    
    const navigateToParticipantSignup = () => {
        // 일반 사용자 (고령층 참가자)는 로그인 페이지로 이동합니다.
        navigation.navigate('Signup1');
    };

    const navigateToManagerSignup = () => {
        // 돕고 매니저 (관리자)는 매니저 상세 가입 페이지로 이동합니다.
        navigation.navigate('ManagerSignupScreen');
    };

    return (
        <View style={styles.container}>
            {/* 로고: 실제 이미지 컴포넌트 사용 */}
            <Image 
                source={require('../../assets/logo.png')} 
                style={styles.topLogo} 
            />
            
            <View style={{ alignItems: 'center', marginTop: 20 }}>
                {/* HelperWithSpeech: '사용 목적이 무엇인가요?' 텍스트 명시적으로 전달 */}
                <HelperWithSpeech 
                    text="사용 목적이 무엇인가요?" 
                    size={160 * 2.5} 
                />
            </View>

            <Text style={styles.title}>사용 목적이 무엇인가요?</Text>

            <View style={styles.buttonGroup}>
                {/* 돕고 매니저 버튼 -> 매니저 가입 페이지로 이동 */}
                <TouchableOpacity style={styles.optionBtn} onPress={navigateToManagerSignup}>
                    <Text style={styles.optionText}>돕고 매니저</Text>
                </TouchableOpacity>

                {/* 일반 사용자 버튼 -> 로그인 화면으로 이동 */}
                <TouchableOpacity style={styles.optionBtn} onPress={navigateToParticipantSignup}>
                    <Text style={styles.optionText}>일반 사용자</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAF0DC',
        alignItems: 'center',
        paddingTop: 100,
        paddingHorizontal: 20,
    },
    topLogo: {
        width: 160,
        height: 48,
        resizeMode: 'contain',
        marginBottom: 8,
    },
    // 이 스타일은 사용되지 않지만 혹시 모를 오류를 방지하기 위해 유지합니다.
    logoPlaceholder: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        height: 48, 
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    buttonGroup: {
        flexDirection: 'row',
        gap: 16,
        justifyContent: 'center',
        marginBottom: 28,
    },
    optionBtn: {
        backgroundColor: '#fff',
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
    },
    optionText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});