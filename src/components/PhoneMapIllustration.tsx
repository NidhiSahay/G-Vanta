import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Rect, Path, Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

interface PhoneMapIllustrationProps {
  size?: number;
}

export const PhoneMapIllustration: React.FC<PhoneMapIllustrationProps> = ({ size = 180 }) => {
  const width = size;
  const height = (size * 170) / 180;

  return (
    <View style={styles.container}>
      <Svg width={width} height={height} viewBox="0 0 180 170" fill="none">
        <Defs>
          {/* Sky / Cloud Gradient */}
          <LinearGradient id="cloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.8" />
            <Stop offset="100%" stopColor="#F0F9FF" stopOpacity="0.2" />
          </LinearGradient>

          {/* Plant Leaves Gradient */}
          <LinearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#86EFAC" />
            <Stop offset="100%" stopColor="#4ADE80" />
          </LinearGradient>

          {/* Phone Screen Gradient */}
          <LinearGradient id="screenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#F8FAFC" />
            <Stop offset="100%" stopColor="#EFF6FF" />
          </LinearGradient>

          {/* Map Pin Gradient */}
          <LinearGradient id="pinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#2563EB" />
            <Stop offset="100%" stopColor="#00B4D8" />
          </LinearGradient>
        </Defs>

        {/* Soft clouds in background */}
        <Path
          d="M30 65C30 54 39 45 50 45C52 45 54 45.4 56 46.2C60 38 68 32 78 32C90 32 100 40 102 51C106 50 110 52 113 55C118 60 117 68 112 72C110 74 60 74 30 65Z"
          fill="url(#cloudGrad)"
        />

        {/* Left Green Leaves */}
        <Path
          d="M24 105C24 88 38 72 54 75C54 95 40 112 24 105Z"
          fill="url(#leafGrad)"
          opacity="0.85"
        />
        <Path
          d="M38 118C34 105 44 92 56 94C56 108 46 122 38 118Z"
          fill="#BBF7D0"
        />

        {/* Right Green Leaves */}
        <Path
          d="M156 105C156 88 142 72 126 75C126 95 140 112 156 105Z"
          fill="url(#leafGrad)"
          opacity="0.85"
        />
        <Path
          d="M142 118C146 105 136 92 124 94C124 108 134 122 142 118Z"
          fill="#BBF7D0"
        />

        {/* Smartphone Body */}
        <Rect
          x="52"
          y="20"
          width="76"
          height="136"
          rx="18"
          fill="#FFFFFF"
          stroke="#93C5FD"
          strokeWidth="3.5"
        />

        {/* Phone Speaker Notch */}
        <Rect x="77" y="27" width="26" height="4" rx="2" fill="#CBD5E1" />

        {/* Phone Screen with Map Grid */}
        <Rect x="58" y="37" width="64" height="110" rx="12" fill="url(#screenGrad)" />

        {/* Map Grid Road Lines */}
        <Path
          d="M58 70L80 62L102 74L122 66"
          stroke="#DBEAFE"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <Path
          d="M80 37V147"
          stroke="#E0E7FF"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <Path
          d="M62 105L80 112L105 102L122 110"
          stroke="#DBEAFE"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* Glowing aura behind pin */}
        <Circle cx="90" cy="82" r="26" fill="#38BDF8" opacity="0.2" />

        {/* Map Pin on Phone Screen */}
        <Path
          d="M90 62C81.7 62 75 68.7 75 77C75 87.5 88 98.8 89 99.7C89.6 100.2 90.4 100.2 91 99.7C92 98.8 105 87.5 105 77C105 68.7 98.3 62 90 62Z"
          fill="url(#pinGrad)"
        />
        <Circle cx="90" cy="76" r="5" fill="#FFFFFF" />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
