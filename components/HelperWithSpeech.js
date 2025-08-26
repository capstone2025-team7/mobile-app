// components/HelperWithSpeech.js
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';

const DEFAULT_TEXT = '처음 앱을 사용하시나요?';

export default function HelperWithSpeech({
  text,
  source = require('../assets/helper.png'),
  size = 160 * 2.5,
  enterDuration = 700,
  typingSpeed = 60,
  loopScale = 1.06,
  loopTranslate = 6,
  loopDuration = 900,
  align = 'center',
}) {
  const safeText =
    typeof text === 'string' && text.trim().length > 0 ? text : DEFAULT_TEXT;

  const opacity = useRef(new Animated.Value(0)).current;
  const enterY  = useRef(new Animated.Value(20)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const bobY  = useRef(new Animated.Value(0)).current;

  const [typed, setTyped] = useState('');

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: enterDuration, useNativeDriver: true }),
      Animated.timing(enterY,  { toValue: 0, duration: enterDuration, useNativeDriver: true }),
    ]).start();

    const loopAnim = Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(scale, { toValue: loopScale, duration: loopDuration, useNativeDriver: true }),
          Animated.timing(scale, { toValue: 1,        duration: loopDuration, useNativeDriver: true }),
        ]),
        Animated.sequence([
          Animated.timing(bobY,  { toValue: -loopTranslate, duration: loopDuration, useNativeDriver: true }),
          Animated.timing(bobY,  { toValue: 0,               duration: loopDuration, useNativeDriver: true }),
        ]),
      ])
    );
    loopAnim.start();

    let i = 0;
    const id = setInterval(() => {
      // 🔒 slice 기반: undefined 절대 안 붙음
      setTyped(safeText.slice(0, i + 1));
      i += 1;
      if (i >= safeText.length) clearInterval(id);
    }, typingSpeed);

    return () => { clearInterval(id); loopAnim.stop(); };
  }, [enterDuration, loopDuration, loopScale, loopTranslate, safeText, typingSpeed]);

  const alignItems =
    align === 'right' ? 'flex-end' : align === 'left' ? 'flex-start' : 'center';
  const tailStyle =
    align === 'right' ? styles.tailRight :
    align === 'left'  ? styles.tailLeft  :
                        styles.tailCenter;

  return (
    <Animated.View style={[styles.root, { alignItems, opacity, transform: [{ translateY: enterY }] }]}>
      <View style={[styles.bubbleWrap, { alignItems }]}>
        <View style={styles.bubble}>
          <Text style={styles.bubbleText}>{typed}</Text>
          <View style={tailStyle} />
        </View>
      </View>

      <Animated.Image
        source={source}
        resizeMode="contain"
        style={{
          width: size,
          height: size,
          transform: [{ scale }, { translateY: bobY }],
        }}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: { width: '100%' },
  bubbleWrap: { marginBottom: -10, zIndex: 10 },
  bubble: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 18,
    maxWidth: 320,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12, shadowRadius: 3, elevation: 2,
    position: 'relative',
  },
  bubbleText: { fontSize: 22, lineHeight: 24, color: '#333', fontWeight: '600' }, //말풍선
  tailCenter: {
    position: 'absolute', left: '50%', bottom: -8, marginLeft: -8,
    width: 0, height: 0,
    borderLeftWidth: 8, borderRightWidth: 8, borderTopWidth: 8,
    borderLeftColor: 'transparent', borderRightColor: 'transparent', borderTopColor: '#fff',
  },
  tailLeft: {
    position: 'absolute', left: 24, bottom: -8,
    width: 0, height: 0,
    borderLeftWidth: 8, borderRightWidth: 8, borderTopWidth: 8,
    borderLeftColor: 'transparent', borderRightColor: 'transparent', borderTopColor: '#fff',
  },
  tailRight: {
    position: 'absolute', right: 24, bottom: -8,
    width: 0, height: 0,
    borderLeftWidth: 8, borderRightWidth: 8, borderTopWidth: 8,
    borderLeftColor: 'transparent', borderRightColor: 'transparent', borderTopColor: '#fff',
  },
});
