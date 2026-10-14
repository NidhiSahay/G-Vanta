import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Svg, { Path, Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

interface GlowingMarkerProps {
  size?: number;
  pulse?: boolean;
}

export const GlowingMarker: React.FC<GlowingMarkerProps> = ({ size = 38, pulse = true }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    if (!pulse) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1.35,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0.2,
            duration: 1500,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0.6,
            duration: 1500,
            useNativeDriver: true,
          }),
        ]),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [pulse, scaleAnim, opacityAnim]);

  const height = (size * 68) / 56;

  return (
    <View style={styles.container}>
      {/* Outer Glowing Aura */}
      <Animated.View
        style={[
          styles.glowAura,
          {
            width: size * 1.5,
            height: size * 1.5,
            borderRadius: (size * 1.5) / 2,
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          },
        ]}
      />

      {/* Pin SVG */}
      <Svg width={size} height={height} viewBox="0 0 56 68" fill="none">
        <Defs>
          <LinearGradient id="markerPinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#1E40AF" />
            <Stop offset="30%" stopColor="#2563EB" />
            <Stop offset="70%" stopColor="#00B4D8" />
            <Stop offset="100%" stopColor="#38BDF8" />
          </LinearGradient>
        </Defs>
        <Path
          d="M28 2C13.64 2 2 13.64 2 28C2 44.5 24.2 64.1 25.9 65.6C27.1 66.7 28.9 66.7 30.1 65.6C31.8 64.1 54 44.5 54 28C54 13.64 42.36 2 28 2Z"
          fill="url(#markerPinGrad)"
        />
        <Circle cx="28" cy="27" r="8.5" fill="#FFFFFF" />
      </Svg>

      {/* Base contact dot on the road */}
      <View style={[styles.groundDot, { width: size * 0.4, height: size * 0.15 }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowAura: {
    position: 'absolute',
    backgroundColor: '#00D2FF',
    bottom: 4,
  },
  groundDot: {
    backgroundColor: 'rgba(0, 210, 255, 0.5)',
    borderRadius: 8,
    marginTop: -2,
  },
});
