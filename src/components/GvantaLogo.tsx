import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

interface GvantaLogoProps {
  size?: number;
  showText?: boolean;
  textColor?: string;
  subtitleColor?: string;
}

export const GvantaLogo: React.FC<GvantaLogoProps> = ({
  size = 64,
  showText = true,
  textColor = '#0F172A',
  subtitleColor = '#475569',
}) => {
  const pinWidth = size;
  const pinHeight = (size * 68) / 56; // aspect ratio 56:68

  return (
    <View style={styles.container}>
      <View style={{ width: pinWidth, height: pinHeight }}>
        <Svg width={pinWidth} height={pinHeight} viewBox="0 0 56 68" fill="none">
          <Defs>
            <LinearGradient id="gvantaPinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#1D4ED8" />
              <Stop offset="30%" stopColor="#2563EB" />
              <Stop offset="75%" stopColor="#00B4D8" />
              <Stop offset="100%" stopColor="#00E5FF" />
            </LinearGradient>
          </Defs>
          {/* Smooth modern droplet pin */}
          <Path
            d="M28 2C13.64 2 2 13.64 2 28C2 44.5 24.2 64.1 25.9 65.6C27.1 66.7 28.9 66.7 30.1 65.6C31.8 64.1 54 44.5 54 28C54 13.64 42.36 2 28 2Z"
            fill="url(#gvantaPinGrad)"
          />
          {/* Center inner white circle */}
          <Circle cx="28" cy="27" r="9.5" fill="#FFFFFF" />
        </Svg>
      </View>

      {showText && (
        <View style={styles.textContainer}>
          <Text style={[styles.brandTitle, { color: textColor }]}>GVANTA</Text>
          <Text style={[styles.brandSubtitle, { color: subtitleColor }]}>
            Connect. Locate. Automate.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  brandTitle: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: 1.5,
    fontFamily: 'System',
  },
  brandSubtitle: {
    fontSize: 13,
    fontWeight: '500',
    marginTop: 4,
    letterSpacing: 0.3,
  },
});
