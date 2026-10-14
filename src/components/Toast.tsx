import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path, Circle, Line } from 'react-native-svg';

export type ToastType = 'network_error' | 'server_error' | 'otp_sent' | 'account_created';

export interface ToastConfig {
  type: ToastType;
  title: string;
  description: string;
  headerLabel?: string;
}

export const TOAST_PRESETS: Record<ToastType, ToastConfig> = {
  network_error: {
    type: 'network_error',
    headerLabel: 'Network Error (Login/OTP/Sign Up)',
    title: 'Unable to connect',
    description: 'Please check your internet connection and try again.',
  },
  server_error: {
    type: 'server_error',
    headerLabel: 'Server Error (General)',
    title: 'Something went wrong',
    description: 'Please try again.',
  },
  otp_sent: {
    type: 'otp_sent',
    headerLabel: 'Success Toast (OTP Sent)',
    title: 'OTP sent successfully',
    description: 'We have sent a 6-digit code to +91 98765 43210.',
  },
  account_created: {
    type: 'account_created',
    headerLabel: 'Success Toast (Account Created)',
    title: 'Your account has been created successfully!',
    description: "Let's set up a few things to get started.",
  },
};

interface ToastProps {
  type: ToastType;
  title?: string;
  description?: string;
  headerLabel?: string;
  showHeaderLabel?: boolean;
  onPress?: () => void;
  style?: any;
}

export const Toast: React.FC<ToastProps> = ({
  type,
  title,
  description,
  headerLabel,
  showHeaderLabel = false,
  onPress,
  style,
}) => {
  const preset = TOAST_PRESETS[type];
  const finalTitle = title || preset.title;
  const finalDescription = description || preset.description;
  const finalHeaderLabel = headerLabel || preset.headerLabel;

  const isError = type === 'network_error' || type === 'server_error';
  const isSuccess = type === 'otp_sent' || type === 'account_created';

  return (
    <View style={[styles.wrapper, style]}>
      {showHeaderLabel && finalHeaderLabel && (
        <Text style={styles.headerLabelText}>{finalHeaderLabel}</Text>
      )}

      <TouchableOpacity
        activeOpacity={onPress ? 0.8 : 1}
        onPress={onPress}
        style={[
          styles.container,
          isError ? styles.errorContainer : styles.successContainer,
        ]}
      >
        {/* Left Icon */}
        <View style={styles.iconColumn}>
          {type === 'network_error' && (
            <View style={styles.networkErrorIconWrap}>
              <Svg width={36} height={36} viewBox="0 0 36 36" fill="none">
                <Circle cx="18" cy="18" r="17" fill="#FEE2E2" />
                {/* Slashed wifi icon */}
                <Path
                  d="M10 13C12.3 11.2 15 10.2 18 10.2C21 10.2 23.7 11.2 26 13"
                  stroke="#EF4444"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <Path
                  d="M13 17C14.5 15.8 16.2 15 18 15C19.8 15 21.5 15.8 23 17"
                  stroke="#EF4444"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <Path
                  d="M16 21C16.6 20.4 17.3 20 18 20C18.7 20 19.4 20.4 20 21"
                  stroke="#EF4444"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <Circle cx="18" cy="24.5" r="1.5" fill="#EF4444" />
                {/* Slash */}
                <Line
                  x1="9"
                  y1="9"
                  x2="27"
                  y2="27"
                  stroke="#EF4444"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
              </Svg>
            </View>
          )}

          {type === 'server_error' && (
            <View style={styles.serverErrorIconWrap}>
              <Svg width={36} height={36} viewBox="0 0 36 36" fill="none">
                <Circle cx="18" cy="18" r="17" fill="#EF4444" />
                {/* Exclamation point inside circle */}
                <Path
                  d="M18 10V19"
                  stroke="#FFFFFF"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                />
                <Circle cx="18" cy="24.5" r="1.8" fill="#FFFFFF" />
              </Svg>
            </View>
          )}

          {isSuccess && (
            <View style={styles.successIconWrap}>
              <Svg width={36} height={36} viewBox="0 0 36 36" fill="none">
                <Circle cx="18" cy="18" r="17" fill="#10B981" />
                {/* Checkmark */}
                <Path
                  d="M11.5 18.5L16 23L24.5 13.5"
                  stroke="#FFFFFF"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </View>
          )}
        </View>

        {/* Text Content */}
        <View style={styles.textColumn}>
          <Text
            style={[
              styles.title,
              isError ? styles.errorTitle : styles.successTitle,
            ]}
          >
            {finalTitle}
          </Text>
          <Text style={styles.description}>{finalDescription}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginVertical: 6,
  },
  headerLabelText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'System',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 18,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  errorContainer: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FEE2E2',
  },
  successContainer: {
    backgroundColor: '#ECFDF5',
    borderColor: '#D1FAE5',
  },
  iconColumn: {
    marginRight: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  networkErrorIconWrap: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serverErrorIconWrap: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIconWrap: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textColumn: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 3,
    fontFamily: 'System',
  },
  errorTitle: {
    color: '#DC2626',
  },
  successTitle: {
    color: '#059669',
  },
  description: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 18,
    fontFamily: 'System',
  },
});
