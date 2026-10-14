import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  StatusBar,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/context/AuthContext';
import { ToastProvider, useToast } from './src/context/ToastContext';
import { SplashScreen } from './src/screens/SplashScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { SignUpScreen } from './src/screens/SignUpScreen';
import { OtpScreen } from './src/screens/OtpScreen';
import { AccountCreatedScreen } from './src/screens/AccountCreatedScreen';
import { LocationPermissionScreen } from './src/screens/LocationPermissionScreen';
import { NotificationPermissionScreen } from './src/screens/NotificationPermissionScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { ToastShowcaseScreen } from './src/screens/ToastShowcaseScreen';
import { ScreenName } from './src/types';

const MainAppContent: React.FC = () => {
  const { width } = useWindowDimensions();
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('splash');
  const [activePhone, setActivePhone] = useState('98765 43210');
  const [userName, setUserName] = useState('Santhosh');
  const { showToast } = useToast();

  const isDesktop = width > 700;

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onContinue={() => setCurrentScreen('login')} />;

      case 'login':
        return (
          <LoginScreen
            key="login-normal"
            initialEmptyState={false}
            onNavigateToOtp={(phone) => {
              setActivePhone(phone);
              setCurrentScreen('otp');
            }}
            onNavigateToSignUp={() => setCurrentScreen('signup')}
          />
        );

      case 'login_empty_error':
        return (
          <LoginScreen
            key="login-empty"
            initialEmptyState={true}
            onNavigateToOtp={(phone) => {
              setActivePhone(phone);
              setCurrentScreen('otp');
            }}
            onNavigateToSignUp={() => setCurrentScreen('signup')}
          />
        );

      case 'signup':
        return (
          <SignUpScreen
            onSuccess={() => setCurrentScreen('account_created')}
            onNavigateToLogin={() => setCurrentScreen('login')}
          />
        );

      case 'otp':
        return (
          <OtpScreen
            phoneNumber={activePhone}
            onSuccess={() => setCurrentScreen('location_permission')}
            onBackToLogin={() => setCurrentScreen('login')}
          />
        );

      case 'account_created':
        return (
          <AccountCreatedScreen
            onContinue={() => setCurrentScreen('location_permission')}
          />
        );

      case 'location_permission':
        return (
          <LocationPermissionScreen
            onAllow={() => setCurrentScreen('notification_permission')}
            onSkip={() => setCurrentScreen('notification_permission')}
          />
        );

      case 'notification_permission':
        return (
          <NotificationPermissionScreen
            onAllow={() => {
              showToast('otp_sent', {
                title: 'Notifications Enabled',
                description: 'You will receive real-time location alerts.',
              });
              setCurrentScreen('home');
            }}
            onSkip={() => setCurrentScreen('home')}
          />
        );

      case 'home':
        return (
          <HomeScreen
            userName={userName}
            onCreateAlert={() => {
              showToast('otp_sent', {
                title: 'New Alert Creator',
                description: 'Tap on a destination to set up arrival notification.',
              });
            }}
            onNavigateToNotifications={() => setCurrentScreen('toast_showcase')}
          />
        );

      case 'toast_showcase':
        return (
          <ToastShowcaseScreen onBackToApp={() => setCurrentScreen('home')} />
        );

      default:
        return <SplashScreen onContinue={() => setCurrentScreen('login')} />;
    }
  };

  return (
    <View style={styles.rootBackground}>
      {/* Top Demo Bar / Screen Switcher for review */}
      <View style={styles.topControlBar}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.controlsScroll}
        >
          <Text style={styles.controlHeaderTitle}>GVANTA SCREENS:</Text>

          <TouchableOpacity
            style={[
              styles.navTab,
              currentScreen === 'splash' && styles.navTabActive,
            ]}
            onPress={() => setCurrentScreen('splash')}
          >
            <Text
              style={[
                styles.navTabText,
                currentScreen === 'splash' && styles.navTabTextActive,
              ]}
            >
              1. Splash
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.navTab,
              currentScreen === 'login' && styles.navTabActive,
            ]}
            onPress={() => setCurrentScreen('login')}
          >
            <Text
              style={[
                styles.navTabText,
                currentScreen === 'login' && styles.navTabTextActive,
              ]}
            >
              2. Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.navTab,
              currentScreen === 'login_empty_error' && styles.navTabActiveError,
            ]}
            onPress={() => setCurrentScreen('login_empty_error')}
          >
            <Text
              style={[
                styles.navTabText,
                currentScreen === 'login_empty_error' && styles.navTabTextActive,
              ]}
            >
              Login (Empty Error)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.navTab,
              currentScreen === 'signup' && styles.navTabActive,
            ]}
            onPress={() => setCurrentScreen('signup')}
          >
            <Text
              style={[
                styles.navTabText,
                currentScreen === 'signup' && styles.navTabTextActive,
              ]}
            >
              3. Sign Up
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.navTab,
              currentScreen === 'otp' && styles.navTabActive,
            ]}
            onPress={() => setCurrentScreen('otp')}
          >
            <Text
              style={[
                styles.navTabText,
                currentScreen === 'otp' && styles.navTabTextActive,
              ]}
            >
              4. Verify OTP
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.navTab,
              currentScreen === 'account_created' && styles.navTabActive,
            ]}
            onPress={() => setCurrentScreen('account_created')}
          >
            <Text
              style={[
                styles.navTabText,
                currentScreen === 'account_created' && styles.navTabTextActive,
              ]}
            >
              5. Account Created
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.navTab,
              currentScreen === 'location_permission' && styles.navTabActive,
            ]}
            onPress={() => setCurrentScreen('location_permission')}
          >
            <Text
              style={[
                styles.navTabText,
                currentScreen === 'location_permission' && styles.navTabTextActive,
              ]}
            >
              6. Location
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.navTab,
              currentScreen === 'notification_permission' && styles.navTabActive,
            ]}
            onPress={() => setCurrentScreen('notification_permission')}
          >
            <Text
              style={[
                styles.navTabText,
                currentScreen === 'notification_permission' && styles.navTabTextActive,
              ]}
            >
              7. Notifications
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.navTab,
              currentScreen === 'home' && styles.navTabActiveHome,
            ]}
            onPress={() => setCurrentScreen('home')}
          >
            <Text
              style={[
                styles.navTabText,
                currentScreen === 'home' && styles.navTabTextActive,
              ]}
            >
              8. Home Dashboard
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.navTab,
              currentScreen === 'toast_showcase' && styles.navTabActiveToast,
            ]}
            onPress={() => setCurrentScreen('toast_showcase')}
          >
            <Text
              style={[
                styles.navTabText,
                currentScreen === 'toast_showcase' && styles.navTabTextActiveToast,
              ]}
            >
              🔔 Toasts & Alerts
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Screen Presentation Container */}
      <View style={styles.phonePresenterContainer}>
        {isDesktop ? (
          <View style={styles.iphoneDeviceFrame}>
            <View style={styles.iphoneBezel}>
              <View style={styles.screenInner}>{renderActiveScreen()}</View>
            </View>
          </View>
        ) : (
          <View style={styles.mobileFullContainer}>{renderActiveScreen()}</View>
        )}
      </View>
    </View>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <AuthProvider>
        <ToastProvider>
          <MainAppContent />
        </ToastProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  rootBackground: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  topControlBar: {
    backgroundColor: '#1E293B',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
    zIndex: 100,
  },
  controlsScroll: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  controlHeaderTitle: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    marginRight: 6,
    fontFamily: 'System',
  },
  navTab: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#334155',
  },
  navTabActive: {
    backgroundColor: '#2563EB',
  },
  navTabActiveError: {
    backgroundColor: '#DC2626',
  },
  navTabActiveHome: {
    backgroundColor: '#4338CA',
  },
  navTabActiveToast: {
    backgroundColor: '#059669',
  },
  navTabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#CBD5E1',
    fontFamily: 'System',
  },
  navTabTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  navTabTextActiveToast: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  phonePresenterContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Platform.OS === 'web' ? 16 : 0,
  },
  mobileFullContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  iphoneDeviceFrame: {
    width: 390,
    height: 780,
    maxHeight: '92%',
    borderRadius: 50,
    backgroundColor: '#020617',
    padding: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.6,
    shadowRadius: 28,
    elevation: 20,
    borderWidth: 2,
    borderColor: '#334155',
  },
  iphoneBezel: {
    flex: 1,
    borderRadius: 42,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  screenInner: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
