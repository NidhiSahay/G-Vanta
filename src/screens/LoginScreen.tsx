import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { GvantaLogo } from '../components/GvantaLogo';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

interface LoginScreenProps {
  onNavigateToOtp: (phone: string) => void;
  onNavigateToSignUp: () => void;
  initialEmptyState?: boolean;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onNavigateToOtp,
  onNavigateToSignUp,
  initialEmptyState = false,
}) => {
  const { sendOtp } = useAuth();
  const { showToast } = useToast();

  const [phoneNumber, setPhoneNumber] = useState(initialEmptyState ? '' : '98765 43210');
  const [errorMessage, setErrorMessage] = useState(
    initialEmptyState ? 'Please enter your mobile number.' : ''
  );
  const [isFocused, setIsFocused] = useState(false);

  const handlePhoneChange = (text: string) => {
    setPhoneNumber(text);
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const handleSendOtp = async () => {
    const cleaned = phoneNumber.replace(/\s+/g, '');

    if (!cleaned) {
      setErrorMessage('Please enter your mobile number.');
      return;
    }

    if (cleaned.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    setErrorMessage('');
    const res = await sendOtp(cleaned);

    if (res.success) {
      // Trigger the exact Success Toast from Screenshot 1 & 2
      showToast('otp_sent', {
        title: 'OTP sent successfully',
        description: `We have sent a 6-digit code to +91 ${phoneNumber || '98765 43210'}.`,
      });
      onNavigateToOtp(phoneNumber || '98765 43210');
    } else {
      setErrorMessage(res.error || 'Failed to send OTP.');
    }
  };

  const hasError = !!errorMessage;
  const isButtonDisabled = !phoneNumber.trim();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Status Bar Mock */}
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

        {/* Top GVANTA Logo */}
        <View style={styles.logoSection}>
          <GvantaLogo size={68} showText={true} />
        </View>

        {/* Welcome Section */}
        <View style={styles.headerSection}>
          <Text style={styles.welcomeTitle}>Welcome Back</Text>
          <Text style={styles.welcomeSubtitle}>
            Enter your mobile number to continue
          </Text>
        </View>

        {/* Form Container */}
        <View style={styles.formContainer}>
          {/* Phone Input Box */}
          <View
            style={[
              styles.inputContainer,
              hasError && styles.inputErrorBorder,
              isFocused && !hasError && styles.inputFocusedBorder,
            ]}
          >
            {/* Country Flag & Code */}
            <View style={styles.countryPicker}>
              {/* Indian Flag SVG */}
              <View style={styles.flagIcon}>
                <Svg width={22} height={16} viewBox="0 0 22 16" fill="none">
                  {/* Saffron */}
                  <Rect width={22} height={5.33} fill="#FF9933" rx={1} />
                  {/* White */}
                  <Rect y={5.33} width={22} height={5.33} fill="#FFFFFF" />
                  {/* Green */}
                  <Rect y={10.66} width={22} height={5.34} fill="#138808" rx={1} />
                  {/* Ashoka Chakra */}
                  <Circle cx={11} cy={8} r={2.2} stroke="#000080" strokeWidth={0.6} />
                  <Circle cx={11} cy={8} r={0.7} fill="#000080" />
                </Svg>
              </View>

              <Text style={styles.countryCodeText}>+91</Text>
              <View style={styles.verticalDivider} />
            </View>

            {/* Mobile Number Input */}
            <TextInput
              style={styles.textInput}
              placeholder="98765 43210"
              placeholderTextColor="#94A3B8"
              value={phoneNumber}
              onChangeText={handlePhoneChange}
              keyboardType="phone-pad"
              maxLength={13}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </View>

          {/* Error / Validation Message below input (Screenshot 5) */}
          {hasError && (
            <View style={styles.errorRow}>
              <View style={styles.errorIconWrap}>
                <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
                  <Circle cx={9} cy={9} r={8.5} fill="#EF4444" />
                  <Path
                    d="M9 5V10"
                    stroke="#FFFFFF"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                  />
                  <Circle cx={9} cy={13} r={1} fill="#FFFFFF" />
                </Svg>
              </View>
              <Text style={styles.errorMessageText}>{errorMessage}</Text>
            </View>
          )}

          {/* Action Button: Send OTP */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleSendOtp}
            style={[
              styles.sendOtpButton,
              isButtonDisabled ? styles.buttonDisabled : styles.buttonActive,
            ]}
          >
            <Text style={styles.sendOtpButtonText}>Send OTP</Text>
          </TouchableOpacity>

          {/* Sign Up Link */}
          <View style={styles.signUpRow}>
            <Text style={styles.noAccountText}>Don't have an account? </Text>
            <TouchableOpacity onPress={onNavigateToSignUp}>
              <Text style={styles.signUpLinkText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer Disclaimer */}
        <View style={styles.footerSection}>
          <Text style={styles.footerNotice}>By continuing, you agree to our</Text>
          <View style={styles.footerLinksRow}>
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  'Terms & Conditions',
                  'By using G-Vanta location alerts, you agree to adhere to standard location data usage policies.'
                )
              }
            >
              <Text style={styles.footerLink}>Terms & Conditions</Text>
            </TouchableOpacity>
            <Text style={styles.footerNotice}> and </Text>
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  'Privacy Policy',
                  'G-Vanta protects your location data with enterprise-grade encryption.'
                )
              }
            >
              <Text style={styles.footerLink}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Home Indicator */}
        <View style={styles.homeIndicatorWrap}>
          <View style={styles.homeIndicator} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 28,
    paddingTop: Platform.OS === 'web' ? 12 : 14,
    paddingBottom: 24,
    justifyContent: 'space-between',
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
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
  logoSection: {
    alignItems: 'center',
    marginBottom: 44,
  },
  headerSection: {
    alignItems: 'flex-start',
    marginBottom: 24,
    paddingHorizontal: 2,
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0A2540',
    letterSpacing: -0.3,
    marginBottom: 6,
    fontFamily: 'System',
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '400',
    letterSpacing: -0.1,
    fontFamily: 'System',
  },
  formContainer: {
    width: '100%',
    marginBottom: 28,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    height: 54,
    paddingHorizontal: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  inputFocusedBorder: {
    borderColor: '#3B82F6',
  },
  inputErrorBorder: {
    borderColor: '#EF4444',
    borderWidth: 1.5,
  },
  countryPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
  },
  flagIcon: {
    marginRight: 8,
    borderRadius: 2,
    overflow: 'hidden',
  },
  countryCodeText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginRight: 12,
    fontFamily: 'System',
  },
  verticalDivider: {
    width: 1,
    height: 26,
    backgroundColor: '#E2E8F0',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#0F172A',
    paddingLeft: 12,
    height: '100%',
    fontFamily: 'System',
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 4,
  },
  errorIconWrap: {
    marginRight: 6,
  },
  errorMessageText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#EF4444',
    fontFamily: 'System',
  },
  sendOtpButton: {
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonActive: {
    backgroundColor: '#2563EB',
  },
  buttonDisabled: {
    backgroundColor: '#C7D4FE',
    shadowOpacity: 0,
    elevation: 0,
  },
  sendOtpButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
    fontFamily: 'System',
  },
  signUpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  noAccountText: {
    fontSize: 14,
    color: '#475569',
    fontFamily: 'System',
  },
  signUpLinkText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2563EB',
    fontFamily: 'System',
  },
  footerSection: {
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: 24,
    paddingBottom: 16,
  },
  footerNotice: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 18,
    fontFamily: 'System',
  },
  footerLinksRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  footerLink: {
    fontSize: 12,
    fontWeight: '700',
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
