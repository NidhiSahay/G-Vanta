import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Path, Rect, G } from 'react-native-svg';

interface ConfettiCheckmarkProps {
  size?: number;
}

export const ConfettiCheckmark: React.FC<ConfettiCheckmarkProps> = ({ size = 180 }) => {
  return (
    <View style={styles.container}>
      <Svg width={size} height={size} viewBox="0 0 180 180" fill="none">
        {/* Confetti Particles Ring */}
        <G>
          {/* Top blue diamond */}
          <Rect x="87" y="16" width="6" height="6" fill="#3B82F6" transform="rotate(45 90 19)" rx={1} />
          {/* Top-right dark blue diamond */}
          <Rect x="123" y="24" width="7" height="7" fill="#2563EB" transform="rotate(45 126.5 27.5)" rx={1} />
          {/* Right cyan circle */}
          <Circle cx="150" cy="50" r="3.5" fill="#06B6D4" />
          {/* Right yellow diamond */}
          <Rect x="156" y="86" width="7" height="7" fill="#FBBF24" transform="rotate(45 159.5 89.5)" rx={1} />
          {/* Bottom-right red diamond */}
          <Rect x="145" y="124" width="8" height="8" fill="#EF4444" transform="rotate(45 149 128)" rx={1} />
          {/* Bottom light blue dot */}
          <Circle cx="120" cy="156" r="3.5" fill="#38BDF8" />
          {/* Bottom green diamond */}
          <Rect x="86" y="156" width="7" height="7" fill="#10B981" transform="rotate(45 89.5 159.5)" rx={1} />
          {/* Bottom-left orange diamond */}
          <Rect x="50" y="146" width="7" height="7" fill="#F97316" transform="rotate(45 53.5 149.5)" rx={1} />
          {/* Left emerald diamond */}
          <Rect x="26" y="118" width="7" height="7" fill="#10B981" transform="rotate(45 29.5 121.5)" rx={1} />
          {/* Top-left blue diamond */}
          <Rect x="30" y="65" width="7" height="7" fill="#3B82F6" transform="rotate(45 33.5 68.5)" rx={1} />
          {/* Top-left cyan circle */}
          <Circle cx="58" cy="28" r="3.5" fill="#0EA5E9" />
          {/* Outer subtle particles */}
          <Circle cx="90" cy="8" r="2" fill="#60A5FA" />
          <Circle cx="166" cy="70" r="2" fill="#34D399" />
          <Circle cx="138" cy="168" r="2.5" fill="#F59E0B" />
          <Circle cx="40" cy="138" r="2" fill="#F87171" />
        </G>

        {/* Outer Soft Green Halo */}
        <Circle cx="90" cy="90" r="54" fill="#ECFDF5" />

        {/* Main Vibrant Green Circle */}
        <Circle cx="90" cy="90" r="44" fill="#10B981" />

        {/* Crisp White Checkmark */}
        <Path
          d="M74 90L85 101L107 79"
          stroke="#FFFFFF"
          strokeWidth="6.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
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
