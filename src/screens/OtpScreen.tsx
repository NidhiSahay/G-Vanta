import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { PhoneMapIllustration } from '../components/PhoneMapIllustration';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

interface OtpScreenProps {
  phoneNumber?: string;
  onSuccess: () => void;
  onBackToLogin: () => void;
}

export const OtpScreen: React.FC<OtpScreenProps> = ({
  phoneNumber = '98765 43210',
  onSuccess,
  onBackToLogin,
}) => {
  const { verifyOtp } = useAuth();
  const { showToast } = useToast();

  const [otpDigits, setOtpDigits] = useState(['1', '2', '3', '4', '5', '6']);
  const [errorMessage, setErrorMessage] = useState('');
  const [resendTimer, setResendTimer] = useState(28);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleDigitChange = (value: string, index: number) => {
    setErrorMessage('');
    const newDigits = [...otpDigits];

    if (value === '') {
      newDigits[index] = '';
      setOtpDigits(newDigits);
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
      return;
    }

    const char = value.slice(-1);
    newDigits[index] = char;
    setOtpDigits(newDigits);

    if (char && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const code = otpDigits.join('');
    if (code.length < 6) {
      setErrorMessage('Please enter all 6 digits of the OTP.');
      return;
    }

    const res = await verifyOtp(code);
    if (res.success) {
      showToast('otp_sent', {
        title: 'Verified Successfully!',
        description: 'Welcome to G-Vanta Location Sentinel.',
      });
      onSuccess();
    } else {
      setErrorMessage(res.error || 'Invalid OTP code. Try 123456.');
    }
  };

  const handleResend = () => {
    if (!canResend) return;
    setResendTimer(30);
    setCanResend(false);
    showToast('otp_sent', {
      title: 'OTP sent successfully',
      description: `We have sent a 6-digit code to +91 ${phoneNumber}.`,
    });
  };

  const formattedTimer = `00:${resendTimer < 10 ? `0${resendTimer}` : resendTimer}`;

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

        {/* Map Phone Illustration */}
        <View style={styles.illustrationSection}>
          <PhoneMapIllustration size={190} />
        </View>

        {/* Heading Section */}
        <View style={styles.headerSection}>
          <Text style={styles.headingTitle}>Enter OTP</Text>
          <Text style={styles.headingSubtitle}>
            We have sent a 6-digit code to{'\n'}+91 {phoneNumber}
          </Text>
        </View>

        {/* 6 OTP Boxes (Screenshot 4) */}
        <View style={styles.otpGrid}>
          {otpDigits.map((digit, idx) => (
            <TextInput
              key={idx}
              ref={(ref) => {
                inputRefs.current[idx] = ref;
              }}
              style={[
                styles.otpBox,
                digit !== '' && styles.otpBoxFilled,
                errorMessage ? styles.otpBoxError : null,
              ]}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(val) => handleDigitChange(val, idx)}
              onKeyPress={(e) => handleKeyPress(e, idx)}
              selectTextOnFocus
            />
          ))}
        </View>

        {/* Error message */}
        {!!errorMessage && (
          <Text style={styles.errorText}>{errorMessage}</Text>
        )}

        {/* Resend OTP Timer */}
        <View style={styles.resendRow}>
          {canResend ? (
            <TouchableOpacity onPress={handleResend}>
              <Text style={styles.resendActiveText}>Resend OTP</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.resendTimerText}>
              Resend OTP in <Text style={styles.timerBlue}>{formattedTimer}</Text>
            </Text>
          )}
        </View>

        {/* Action Button: Verify OTP */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleVerify}
          style={styles.verifyButton}
        >
          <Text style={styles.verifyButtonText}>Verify OTP</Text>
        </TouchableOpacity>

        {/* Change mobile number link */}
        <TouchableOpacity
          style={styles.changeNumberRow}
          onPress={onBackToLogin}
          activeOpacity={0.7}
        >
          <Text style={styles.changeNumberText}>Change mobile number</Text>
        </TouchableOpacity>

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
  },
  headingSubtitle: {
    fontSize: 14,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 22,
    fontFamily: 'System',
  },
  otpGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  otpBox: {
    width: 44,
    height: 52,
    borderRadius: 12,
    borderWidth: 1.2,
    borderColor: '#93C5FD',
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#2563EB',
    fontFamily: 'System',
  },
  otpBoxFilled: {
    borderColor: '#3B82F6',
    backgroundColor: '#F8FAFC',
  },
  otpBoxError: {
    borderColor: '#EF4444',
  },
  errorText: {
    fontSize: 13,
    color: '#EF4444',
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 12,
  },
  resendRow: {
    alignItems: 'center',
    marginBottom: 24,
  },
  resendTimerText: {
    fontSize: 14,
    color: '#475569',
    fontWeight: '500',
    fontFamily: 'System',
  },
  timerBlue: {
    fontWeight: '700',
    color: '#2563EB',
  },
  resendActiveText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2563EB',
  },
  verifyButton: {
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
  },
  verifyButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'System',
  },
  changeNumberRow: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 16,
  },
  changeNumberText: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '600',
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
