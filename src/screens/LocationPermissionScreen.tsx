import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { PhoneMapIllustration } from '../components/PhoneMapIllustration';

interface LocationPermissionScreenProps {
  onAllow: () => void;
  onSkip: () => void;
}

export const LocationPermissionScreen: React.FC<LocationPermissionScreenProps> = ({
  onAllow,
  onSkip,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Status Bar */}
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

        {/* Map Phone Illustration */}
        <View style={styles.illustrationSection}>
          <PhoneMapIllustration size={185} />
        </View>

        {/* Heading Section */}
        <View style={styles.headerSection}>
          <Text style={styles.headingTitle}>Allow Location Access</Text>
          <Text style={styles.headingSubtitle}>
            GVANTA needs your location to detect when you arrive at or leave places you've selected.
          </Text>
        </View>

        {/* Feature List Card */}
        <View style={styles.infoCard}>
          {/* Item 1: Accurate location alerts */}
          <View style={styles.featureRow}>
            <View style={[styles.featureIconWrap, { backgroundColor: '#DCFCE7' }]}>
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z"
                  stroke="#16A34A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Circle cx="12" cy="9" r="2.5" fill="#16A34A" />
              </Svg>
            </View>
            <Text style={styles.featureTitle}>Accurate location alerts</Text>
          </View>

          {/* Item 2: Works in background */}
          <View style={styles.featureRow}>
            <View style={[styles.featureIconWrap, { backgroundColor: '#DCFCE7' }]}>
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M12 3L19 6.5V12C19 16.5 16 20.2 12 21.5C8 20.2 5 16.5 5 12V6.5L12 3Z"
                  stroke="#16A34A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Circle cx="12" cy="12" r="2" fill="#16A34A" />
              </Svg>
            </View>
            <Text style={styles.featureTitle}>Works in background</Text>
          </View>

          {/* Item 3: Your data stays private */}
          <View style={[styles.featureRow, { marginBottom: 0 }]}>
            <View style={[styles.featureIconWrap, { backgroundColor: '#DBEAFE' }]}>
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M18 8A6 6 0 0 0 6 8C6 15 3 17 3 17H21S18 15 18 8"
                  stroke="#2563EB"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path d="M13.73 21A2 2 0 0 1 10.27 21" stroke="#2563EB" strokeWidth="2" />
              </Svg>
            </View>
            <Text style={styles.featureTitle}>Your data stays private</Text>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.actionSection}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={onAllow}
            style={styles.allowButton}
          >
            <Text style={styles.allowButtonText}>Allow Location Access</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onSkip}
            style={styles.notNowButton}
          >
            <Text style={styles.notNowText}>Not now</Text>
          </TouchableOpacity>
        </View>

        {/* Home Indicator */}
        <View style={styles.homeIndicatorWrap}>
          <View style={styles.homeIndicator} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 26,
    paddingTop: Platform.OS === 'web' ? 12 : 14,
    paddingBottom: 24,
    justifyContent: 'space-between',
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
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
  illustrationSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  headingTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0A2540',
    marginBottom: 8,
    fontFamily: 'System',
    textAlign: 'center',
  },
  headingSubtitle: {
    fontSize: 14,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 21,
    fontFamily: 'System',
  },
  infoCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 28,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    fontFamily: 'System',
  },
  actionSection: {
    width: '100%',
    alignItems: 'center',
  },
  allowButton: {
    width: '100%',
    height: 52,
    borderRadius: 14,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 14,
  },
  allowButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'System',
  },
  notNowButton: {
    paddingVertical: 8,
  },
  notNowText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563EB',
    fontFamily: 'System',
  },
  homeIndicatorWrap: {
    alignItems: 'center',
    paddingTop: 8,
  },
  homeIndicator: {
    width: 120,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#CBD5E1',
  },
});
