import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GvantaLogo } from '../components/GvantaLogo';
import { GlowingMarker } from '../components/GlowingMarker';

interface SplashScreenProps {
  onContinue: () => void;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const SplashScreen: React.FC<SplashScreenProps> = ({ onContinue }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={onContinue}
      style={styles.container}
    >
      <ImageBackground
        source={require('../../assets/splash_bg.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Soft upper ambient glow to ensure logo readability */}
        <LinearGradient
          colors={[
            'rgba(255, 255, 255, 0.92)',
            'rgba(255, 255, 255, 0.85)',
            'rgba(255, 255, 255, 0.4)',
            'transparent',
          ]}
          locations={[0, 0.28, 0.42, 0.55]}
          style={styles.topGradient}
        />

        {/* Dynamic Island / Status Bar Mock */}
        <View style={styles.statusBar}>
          <Text style={styles.statusTime}>9:41</Text>
          <View style={styles.dynamicIsland} />
          <View style={styles.statusIcons}>
            <View style={styles.signalIcon}>
              <View style={[styles.signalBar, { height: 4 }]} />
              <View style={[styles.signalBar, { height: 6 }]} />
              <View style={[styles.signalBar, { height: 8 }]} />
              <View style={[styles.signalBar, { height: 10 }]} />
            </View>
            <View style={styles.wifiDot} />
            <View style={styles.batteryIcon}>
              <View style={styles.batteryFill} />
            </View>
          </View>
        </View>

        {/* GVANTA Brand Logo */}
        <View style={styles.brandContainer}>
          <GvantaLogo
            size={74}
            showText={true}
            textColor="#0F172A"
            subtitleColor="#334155"
          />
        </View>

        {/* Glowing Road Markers along the highway curve */}
        <View style={[styles.markersContainer, { pointerEvents: 'none' as any }]}>
          {/* Top-left curve marker */}
          <View style={styles.marker1}>
            <GlowingMarker size={34} />
          </View>

          {/* Middle curve marker */}
          <View style={styles.marker2}>
            <GlowingMarker size={42} />
          </View>

          {/* Foreground lower-right curve marker */}
          <View style={styles.marker3}>
            <GlowingMarker size={52} />
          </View>
        </View>

        {/* Bottom Dark Gradient for readability */}
        <LinearGradient
          colors={[
            'transparent',
            'rgba(0, 0, 0, 0.35)',
            'rgba(0, 0, 0, 0.75)',
            'rgba(0, 0, 0, 0.92)',
          ]}
          locations={[0, 0.3, 0.65, 1]}
          style={styles.bottomGradient}
        >
          <View style={styles.bottomContent}>
            <Text style={styles.headlineText}>
              Smarter location alerts{'\n'}for your everyday life.
            </Text>

            {/* Slider / Carousel Dots */}
            <View style={styles.dotsContainer}>
              <View style={styles.activePillDot} />
              <View style={styles.inactiveDot} />
              <View style={styles.inactiveDot} />
              <View style={styles.inactiveDot} />
            </View>

            {/* Tap to continue prompt */}
            <Text style={styles.tapPrompt}>Tap anywhere to continue</Text>

            {/* Home indicator bar */}
            <View style={styles.homeIndicator} />
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    zIndex: 1,
  },
  statusBar: {
    position: 'absolute',
    top: Platform.OS === 'web' ? 12 : 14,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  statusTime: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    fontFamily: 'System',
  },
  dynamicIsland: {
    width: 90,
    height: 24,
    borderRadius: 14,
    backgroundColor: '#000000',
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  signalIcon: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 1.5,
    height: 10,
  },
  signalBar: {
    width: 2.5,
    backgroundColor: '#0F172A',
    borderRadius: 0.5,
  },
  wifiDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0F172A',
  },
  batteryIcon: {
    width: 20,
    height: 11,
    borderWidth: 1.5,
    borderColor: '#0F172A',
    borderRadius: 3.5,
    padding: 1,
    justifyContent: 'center',
  },
  batteryFill: {
    width: 12,
    height: 6,
    backgroundColor: '#0F172A',
    borderRadius: 1.5,
  },
  brandContainer: {
    position: 'absolute',
    top: '12%',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 5,
  },
  markersContainer: {
    ...StyleSheet.absoluteFill,
    zIndex: 3,
  },
  marker1: {
    position: 'absolute',
    top: '44%',
    left: '23%',
  },
  marker2: {
    position: 'absolute',
    top: '50%',
    left: '42%',
  },
  marker3: {
    position: 'absolute',
    top: '56%',
    right: '25%',
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 80,
    paddingBottom: 24,
    paddingHorizontal: 24,
    zIndex: 6,
  },
  bottomContent: {
    alignItems: 'center',
  },
  headlineText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 28,
    letterSpacing: 0.2,
    marginBottom: 20,
    fontFamily: 'System',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  },
  activePillDot: {
    width: 28,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
  inactiveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
  },
  tapPrompt: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.65)',
    fontWeight: '500',
    marginBottom: 16,
  },
  homeIndicator: {
    width: 120,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
    opacity: 0.8,
  },
});
