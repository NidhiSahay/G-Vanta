import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { ConfettiCheckmark } from '../components/ConfettiCheckmark';

interface AccountCreatedScreenProps {
  onContinue: () => void;
}

export const AccountCreatedScreen: React.FC<AccountCreatedScreenProps> = ({ onContinue }) => {
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

        {/* Confetti Checkmark Celebration Graphic */}
        <View style={styles.graphicSection}>
          <ConfettiCheckmark size={180} />
        </View>

        {/* Welcome Section */}
        <View style={styles.headerSection}>
          <Text style={styles.headingTitle}>Welcome to GVANTA!</Text>
          <Text style={styles.headingSubtitle}>
            Your account has been{'\n'}created successfully.
          </Text>
        </View>

        {/* Info Checkbox Card */}
        <View style={styles.infoCard}>
          {/* Row 1: Mobile number verified */}
          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                <Circle cx="12" cy="12" r="11" fill="#10B981" />
                {/* Shield shape */}
                <Path
                  d="M12 5L17 7.5V12C17 15.5 14.5 18 12 19C9.5 18 7 15.5 7 12V7.5L12 5Z"
                  stroke="#FFFFFF"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </View>
            <Text style={styles.infoText}>Your mobile number is verified</Text>
          </View>

          {/* Row 2: Account is ready */}
          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                <Circle cx="12" cy="12" r="11" fill="#10B981" />
                <Path
                  d="M8 12L10.5 14.5L16 9"
                  stroke="#FFFFFF"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </View>
            <Text style={styles.infoText}>Your account is ready</Text>
          </View>

          {/* Row 3: Let's set up a few things */}
          <View style={[styles.infoRow, { marginBottom: 0 }]}>
            <View style={styles.iconContainer}>
              <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                <Circle cx="12" cy="12" r="11" fill="#10B981" />
                <Path
                  d="M8 12L10.5 14.5L16 9"
                  stroke="#FFFFFF"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </View>
            <Text style={styles.infoText}>
              Let's set up a few things to get the best experience
            </Text>
          </View>
        </View>

        {/* Action Button: Continue */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onContinue}
          style={styles.continueButton}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>

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
  graphicSection: {
    alignItems: 'center',
    marginVertical: 18,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 28,
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
    fontSize: 15,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 22,
    fontFamily: 'System',
  },
  infoCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 32,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  iconContainer: {
    marginRight: 14,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#334155',
    fontWeight: '600',
    lineHeight: 20,
    fontFamily: 'System',
  },
  continueButton: {
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
    marginBottom: 16,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
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
