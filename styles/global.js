import { StyleSheet } from 'react-native';
import colors from './colors';

const g = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
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
    backgroundColor: colors.inputBg,
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textDark,
  },
  mainButton: {
    backgroundColor: '#FFB100',
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

export default g;

export { g as globalStyles };
