import { StyleSheet } from 'react-native';
import colors from './colors';

// primary/ivory 등의 키가 없어도 안전하게 동작하도록 폴백
const PRIMARY = colors?.primary || '#FF7A00';
const BG = colors?.background || colors?.ivory || '#F8F5E6';

const g = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: BG,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  input: {
    width: '90%',
    backgroundColor: colors?.inputBg || '#FFFFFF',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
  },

  // 공용 버튼
  button: {
    backgroundColor: PRIMARY,
    paddingVertical: 14,
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF', // 가독성 위해 흰색
  },

  // 홈 등에서 쓰는 메인 CTA 버튼
  mainButton: {
    backgroundColor: PRIMARY,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  mainButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});

// ✅ default + named 둘 다 export (둘 다 쓸 수 있게)
export const globalStyles = g;
export default g;