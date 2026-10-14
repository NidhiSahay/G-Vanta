import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Toast, ToastType } from '../components/Toast';
import { useToast } from '../context/ToastContext';

interface ToastShowcaseScreenProps {
  onBackToApp: () => void;
}

export const ToastShowcaseScreen: React.FC<ToastShowcaseScreenProps> = ({ onBackToApp }) => {
  const { showToast } = useToast();

  const handleTriggerLive = (type: ToastType) => {
    showToast(type);
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header bar */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.pageTitle}>Error & Success Toasts</Text>
          <Text style={styles.pageSubtitle}>Pixel-perfect as per UI design specifications</Text>
        </View>
        <TouchableOpacity style={styles.backButton} onPress={onBackToApp}>
          <Text style={styles.backButtonText}>Back to App</Text>
        </TouchableOpacity>
      </View>

      {/* 1. Network Error */}
      <View style={styles.sectionBlock}>
        <Text style={styles.sectionHeadline}>Network Error</Text>
        <Toast
          type="network_error"
          showHeaderLabel={true}
          headerLabel="Network Error (Login/OTP/Sign Up)"
          title="Unable to connect"
          description="Please check your internet connection and try again."
          onPress={() => handleTriggerLive('network_error')}
        />
        <Text style={styles.captionText}>
          Unable to connect. Please check your internet connection and try again.
        </Text>
        <TouchableOpacity
          style={styles.triggerButton}
          onPress={() => handleTriggerLive('network_error')}
        >
          <Text style={styles.triggerButtonText}>▶ Trigger Live Banner</Text>
        </TouchableOpacity>
      </View>

      {/* 2. Server Error */}
      <View style={styles.sectionBlock}>
        <Text style={styles.sectionHeadline}>Server Error</Text>
        <Toast
          type="server_error"
          showHeaderLabel={true}
          headerLabel="Server Error (General)"
          title="Something went wrong"
          description="Please try again."
          onPress={() => handleTriggerLive('server_error')}
        />
        <Text style={styles.captionText}>Something went wrong. Please try again.</Text>
        <TouchableOpacity
          style={styles.triggerButton}
          onPress={() => handleTriggerLive('server_error')}
        >
          <Text style={styles.triggerButtonText}>▶ Trigger Live Banner</Text>
        </TouchableOpacity>
      </View>

      {/* 3. OTP Sent Successfully */}
      <View style={styles.sectionBlock}>
        <Text style={styles.sectionHeadline}>OTP Sent Successfully</Text>
        <Toast
          type="otp_sent"
          showHeaderLabel={true}
          headerLabel="Success Toast (OTP Sent)"
          title="OTP sent successfully"
          description="We have sent a 6-digit code to +91 98765 43210."
          onPress={() => handleTriggerLive('otp_sent')}
        />
        <Text style={styles.captionText}>Triggered after a successful OTP request.</Text>
        <TouchableOpacity
          style={styles.triggerButton}
          onPress={() => handleTriggerLive('otp_sent')}
        >
          <Text style={styles.triggerButtonText}>▶ Trigger Live Banner</Text>
        </TouchableOpacity>
      </View>

      {/* 4. Account Created Successfully */}
      <View style={styles.sectionBlock}>
        <Text style={styles.sectionHeadline}>Account Created Successfully</Text>
        <Toast
          type="account_created"
          showHeaderLabel={true}
          headerLabel="Success Toast (Account Created)"
          title="Your account has been created successfully!"
          description="Let's set up a few things to get started."
          onPress={() => handleTriggerLive('account_created')}
        />
        <Text style={styles.captionText}>Triggered on successful user account registration.</Text>
        <TouchableOpacity
          style={styles.triggerButton}
          onPress={() => handleTriggerLive('account_created')}
        >
          <Text style={styles.triggerButtonText}>▶ Trigger Live Banner</Text>
        </TouchableOpacity>
      </View>

      {/* Footer Navigation */}
      <TouchableOpacity style={styles.returnButton} onPress={onBackToApp}>
        <Text style={styles.returnButtonText}>Return to Flow</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'web' ? 24 : 50,
    paddingBottom: 40,
    backgroundColor: '#FFFFFF',
    maxWidth: 580,
    alignSelf: 'center',
    width: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    fontFamily: 'System',
  },
  pageSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
    fontFamily: 'System',
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
  },
  backButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2563EB',
  },
  sectionBlock: {
    marginBottom: 28,
  },
  sectionHeadline: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3B82F6',
    marginBottom: 10,
    fontFamily: 'System',
  },
  captionText: {
    fontSize: 13,
    color: '#475569',
    marginTop: 8,
    marginBottom: 8,
    fontFamily: 'System',
  },
  triggerButton: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  triggerButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  returnButton: {
    height: 50,
    backgroundColor: '#2563EB',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  returnButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
