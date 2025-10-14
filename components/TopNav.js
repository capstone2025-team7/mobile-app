import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/global';
import { useNavigation } from '@react-navigation/native';

const TopNav = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.replace('Main')}>
        <Image
          source={require('../assets/logo.png')}
          style={globalStyles.logo}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <View style={styles.menuRow}>
        <TouchableOpacity
          style={[globalStyles.button, styles.menuButton]}
          onPress={() => navigation.navigate('Club')}
        >
          <Text style={styles.menuText}>동호회</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[globalStyles.button, styles.menuButton]}
          onPress={() => navigation.navigate('Features')}
        >
          <Text style={styles.menuText}>부가기능</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[globalStyles.button, styles.menuButton]}
          onPress={() => navigation.navigate('Notifications')}
        >
          <Text style={styles.menuText}>알림</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TopNav;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAEBD7',
    alignItems: 'center',
  },
  menuRow: {
    flexDirection: 'row',
    marginTop: 5,
    width: '100%',
    paddingHorizontal: 10,
  },
  menuButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: '#F9B233',
    borderRadius: 8,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
  },
  backButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    padding: 12,
    backgroundColor: '#F9B233',
    borderRadius: 8,
    alignItems: 'center',
  },
  backText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});