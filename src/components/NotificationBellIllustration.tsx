import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Path, Defs, LinearGradient, Stop } from 'react-native-svg';

interface NotificationBellIllustrationProps {
  size?: number;
}

export const NotificationBellIllustration: React.FC<NotificationBellIllustrationProps> = ({
  size = 180,
}) => {
  return (
    <View style={styles.container}>
      <Svg width={size} height={size} viewBox="0 0 180 180" fill="none">
        <Defs>
          {/* Cloud Gradient */}
          <LinearGradient id="bellCloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.8" />
            <Stop offset="100%" stopColor="#F0F9FF" stopOpacity="0.3" />
          </LinearGradient>

          {/* Bell Blue Gradient */}
          <LinearGradient id="bellGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#3B82F6" />
            <Stop offset="100%" stopColor="#2563EB" />
          </LinearGradient>
        </Defs>

        {/* Soft Background Clouds */}
        <Circle cx="90" cy="90" r="70" fill="url(#bellCloudGrad)" />

        {/* Outer Halo */}
        <Circle cx="90" cy="90" r="54" fill="#FFFFFF" fillOpacity="0.8" />

        {/* Bell Body */}
        <Path
          d="M90 44C84 44 80 47 78 52C74 62 70 78 64 88C60 94 62 98 68 98H112C118 98 120 94 116 88C110 78 106 62 102 52C100 47 96 44 90 44Z"
          fill="url(#bellGrad)"
        />

        {/* Bell Clapper */}
        <Circle cx="90" cy="107" r="7" fill="#1D4ED8" />

        {/* Red Alert Notification Badge Dot */}
        <Circle cx="120" cy="50" r="9.5" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2.5" />
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
