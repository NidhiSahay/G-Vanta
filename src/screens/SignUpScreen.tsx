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
import Svg, { Path, Rect } from 'react-native-svg';
import { User, Smartphone, Mail, ChevronLeft } from 'lucide-react-native';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

interface SignUpScreenProps {
  onSuccess: () => void;
  onNavigateToLogin: () => void;
}

export const SignUpScreen: React.FC<SignUpScreenProps> = ({
  onSuccess,
  onNavigateToLogin,
}) => {
  const { signUp } = useAuth();
  const { showToast } = useToast();

  const [fullName, setFullName] = useState('Santhosh Kumar');
  const [phoneNumber, setPhoneNumber] = useState('+91 98765 43210');
  const [email, setEmail] = useState('santhosh@gmail.com');
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async () => {
    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!phoneNumber.trim()) {
      setErrorMessage('Please enter your mobile number.');
      return;
    }
    if (!agreedToTerms) {
      setErrorMessage('Please agree to the Terms & Conditions and Privacy Policy.');
      return;
    }

    const res = await signUp(fullName, phoneNumber, email);
    if (res.success) {
      showToast('account_created', {
        title: 'Your account has been created successfully!',
        description: "Let's set up a few things to get started.",
      });
      onSuccess();
    } else {
      setErrorMessage(res.error || 'Failed to create account.');
    }
  };

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

        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={onNavigateToLogin}
          activeOpacity={0.7}
        >
          <ChevronLeft color="#0A2540" size={28} strokeWidth={2.5} />
        </TouchableOpacity>

        {/* Header Title Section */}
        <View style={styles.headerSection}>
          <Text style={styles.headingTitle}>Create Account</Text>
          <Text style={styles.headingSubtitle}>Join GVANTA to get started</Text>
        </View>

        {/* Input Cards */}
        <View style={styles.formContainer}>
          {/* 1. Full Name Card */}
          <View style={styles.inputCard}>
            <View style={styles.iconWrap}>
              <User color="#475569" size={22} strokeWidth={1.8} />
            </View>
            <View style={styles.inputBody}>
              <Text style={styles.inputMiniLabel}>Full Name</Text>
              <TextInput
                style={styles.textInput}
                value={fullName}
                onChangeText={(t) => {
                  setFullName(t);
                  setErrorMessage('');
                }}
                placeholder="Enter full name"
                placeholderTextColor="#94A3B8"
              />
            </View>
          </View>

          {/* 2. Mobile Number Card */}
          <View style={styles.inputCard}>
            <View style={styles.iconWrap}>
              <Smartphone color="#475569" size={22} strokeWidth={1.8} />
            </View>
            <View style={styles.inputBody}>
              <Text style={styles.inputMiniLabel}>Mobile Number</Text>
              <TextInput
                style={styles.textInput}
                value={phoneNumber}
                onChangeText={(t) => {
                  setPhoneNumber(t);
                  setErrorMessage('');
                }}
                keyboardType="phone-pad"
                placeholder="+91 98765 43210"
                placeholderTextColor="#94A3B8"
              />
            </View>
          </View>

          {/* 3. Email Address Card */}
          <View style={styles.inputCard}>
            <View style={styles.iconWrap}>
              <Mail color="#475569" size={22} strokeWidth={1.8} />
            </View>
            <View style={styles.inputBody}>
              <Text style={styles.inputMiniLabel}>Email Address</Text>
              <TextInput
                style={styles.textInput}
                value={email}
                onChangeText={(t) => {
                  setEmail(t);
                  setErrorMessage('');
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="Enter email address"
                placeholderTextColor="#94A3B8"
              />
            </View>
          </View>

          {/* Terms & Conditions Checkbox Row */}
          <TouchableOpacity
            style={styles.termsRow}
            activeOpacity={0.8}
            onPress={() => setAgreedToTerms(!agreedToTerms)}
          >
            <View style={[styles.checkbox, agreedToTerms && styles.checkboxActive]}>
              {agreedToTerms && (
                <Svg width={14} height={14} viewBox="0 0 14 14" fill="none">
                  <Path
                    d="M3 7L6 10L11 4"
                    stroke="#FFFFFF"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              )}
            </View>
            <Text style={styles.termsText}>
              I agree to the{' '}
              <Text
                style={styles.linkText}
                onPress={() =>
                  Alert.alert(
                    'Terms & Conditions',
                    'By registering, you accept our standard service and data privacy terms.'
                  )
                }
              >
                Terms & Conditions
              </Text>{' '}
              and{' '}
              <Text
                style={styles.linkText}
                onPress={() =>
                  Alert.alert(
                    'Privacy Policy',
                    'Your data stays protected with end-to-end security.'
                  )
                }
              >
                Privacy Policy
              </Text>
            </Text>
          </TouchableOpacity>

          {/* Error display */}
          {!!errorMessage && (
            <Text style={styles.errorText}>{errorMessage}</Text>
          )}

          {/* Create Account Action Button */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleSignUp}
            style={styles.createAccountButton}
          >
            <Text style={styles.createAccountButtonText}>Create Account</Text>
          </TouchableOpacity>

          {/* Already have an account link */}
          <View style={styles.signInRow}>
            <Text style={styles.alreadyText}>Already have an account? </Text>
            <TouchableOpacity onPress={onNavigateToLogin}>
              <Text style={styles.signInLinkText}>Sign In</Text>
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
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'web' ? 12 : 14,
    paddingBottom: 24,
    justifyContent: 'space-between',
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
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
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  headingTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0A2540',
    marginBottom: 6,
    fontFamily: 'System',
  },
  headingSubtitle: {
    fontSize: 14,
    color: '#64748B',
    fontFamily: 'System',
  },
  formContainer: {
    width: '100%',
  },
  inputCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 3,
    elevation: 1,
  },
  iconWrap: {
    marginRight: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBody: {
    flex: 1,
  },
  inputMiniLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
    marginBottom: 2,
    fontFamily: 'System',
  },
  textInput: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    padding: 0,
    fontFamily: 'System',
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1.8,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    backgroundColor: '#FFFFFF',
  },
  checkboxActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  termsText: {
    flex: 1,
    fontSize: 13,
    color: '#475569',
    lineHeight: 18,
    fontFamily: 'System',
  },
  linkText: {
    color: '#2563EB',
    fontWeight: '600',
  },
  errorText: {
    fontSize: 13,
    color: '#EF4444',
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  createAccountButton: {
    height: 52,
    borderRadius: 14,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  createAccountButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'System',
  },
  signInRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  alreadyText: {
    fontSize: 14,
    color: '#475569',
    fontFamily: 'System',
  },
  signInLinkText: {
    fontSize: 14,
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
