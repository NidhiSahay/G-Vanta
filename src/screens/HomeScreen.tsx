import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
} from 'react-native';
import Svg, { Path, Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import {
  Bell,
  Home as HomeIcon,
  GitBranch,
  Clock,
  User,
  ChevronRight,
  Plus,
} from 'lucide-react-native';

interface HomeScreenProps {
  userName?: string;
  onCreateAlert?: () => void;
  onNavigateToNotifications?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  userName = 'Santhosh',
  onCreateAlert,
  onNavigateToNotifications,
}) => {
  const [activeTab, setActiveTab] = useState<'home' | 'automations' | 'history' | 'profile'>('home');

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

        {/* Top Header Bar */}
        <View style={styles.topHeaderBar}>
          <Text style={styles.brandTitle}>GVANTA</Text>

          <View style={styles.headerRightGroup}>
            <TouchableOpacity
              style={styles.bellButton}
              onPress={onNavigateToNotifications}
              activeOpacity={0.7}
            >
              <Bell color="#1D4ED8" size={24} strokeWidth={2.2} />
              <View style={styles.bellBadge} />
            </TouchableOpacity>

            {/* Santhosh Profile Avatar */}
            <View style={styles.avatarBorder}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
                }}
                style={styles.avatarImage}
              />
            </View>
          </View>
        </View>

        {/* Greeting Banner with Artistic Mountain Silhouette */}
        <View style={styles.greetingContainer}>
          <View style={styles.greetingTextWrap}>
            <Text style={styles.greetingTime}>Good morning,</Text>
            <Text style={styles.greetingName}>
              {userName} 👋
            </Text>
          </View>

          {/* Artistic Sunrise Mountain Silhouette SVG */}
          <View style={styles.mountainSvgWrap}>
            <Svg width={140} height={70} viewBox="0 0 140 70" fill="none">
              <Defs>
                <LinearGradient id="mountGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
                  <Stop offset="0%" stopColor="#93C5FD" stopOpacity="0.7" />
                  <Stop offset="100%" stopColor="#E0F2FE" stopOpacity="0.2" />
                </LinearGradient>
                <LinearGradient id="mountGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                  <Stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
                  <Stop offset="100%" stopColor="#BAE6FD" stopOpacity="0.3" />
                </LinearGradient>
                <LinearGradient id="mountGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
                  <Stop offset="0%" stopColor="#34D399" stopOpacity="0.9" />
                  <Stop offset="100%" stopColor="#A7F3D0" stopOpacity="0.4" />
                </LinearGradient>
              </Defs>
              {/* Sun sparkles */}
              <Circle cx="85" cy="18" r="4" fill="#FBBF24" opacity="0.6" />
              <Circle cx="125" cy="24" r="3" fill="#F59E0B" opacity="0.5" />
              {/* Back Mountain */}
              <Path d="M40 70L80 15L120 70Z" fill="url(#mountGrad1)" />
              {/* Mid Mountain */}
              <Path d="M10 70L55 28L100 70Z" fill="url(#mountGrad2)" />
              {/* Foreground Hill */}
              <Path d="M50 70L95 38L140 70Z" fill="url(#mountGrad3)" />
            </Svg>
          </View>
        </View>

        {/* Hero Action Card: "Create Location Alert" */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onCreateAlert}
          style={styles.heroAlertCard}
        >
          {/* White icon pill */}
          <View style={styles.heroPlusBox}>
            <Plus color="#2563EB" size={24} strokeWidth={3} />
          </View>

          <View style={styles.heroContentWrap}>
            <Text style={styles.heroTitle}>Create Location Alert</Text>
            <Text style={styles.heroSubtitle}>
              Get notified when you reach or leave a place
            </Text>
          </View>

          <ChevronRight color="#FFFFFF" size={24} strokeWidth={2.5} />
        </TouchableOpacity>

        {/* Empty State Card */}
        <View style={styles.emptyStateCard}>
          {/* Soft Circular Map Pin Graphic */}
          <View style={styles.pinCircleContainer}>
            <Svg width={110} height={110} viewBox="0 0 110 110" fill="none">
              <Circle cx="55" cy="55" r="54" fill="#EEF2FF" />
              <Circle cx="55" cy="55" r="42" fill="#E0E7FF" opacity="0.6" />
              {/* Modern Blue Location Pin */}
              <Path
                d="M55 28C45.6 28 38 35.6 38 45C38 57 52.8 71.2 53.9 72.3C54.5 72.8 55.5 72.8 56.1 72.3C57.2 71.2 72 57 72 45C72 35.6 64.4 28 55 28Z"
                fill="#2563EB"
              />
              <Circle cx="55" cy="44" r="5.5" fill="#FFFFFF" />
            </Svg>
          </View>

          <Text style={styles.emptyHeadline}>No active automations yet</Text>
          <Text style={styles.emptySubhead}>Where should GVANTA remind you?</Text>

          {/* Action button: Create Your First Alert */}
          <TouchableOpacity
            style={styles.firstAlertButton}
            onPress={onCreateAlert}
            activeOpacity={0.85}
          >
            <View style={styles.firstAlertPlusIcon}>
              <Plus color="#FFFFFF" size={14} strokeWidth={3} />
            </View>
            <Text style={styles.firstAlertButtonText}>Create Your First Alert</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Tab Bar (Screenshot 8) */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setActiveTab('home')}
        >
          <HomeIcon
            color={activeTab === 'home' ? '#2563EB' : '#64748B'}
            size={22}
            strokeWidth={activeTab === 'home' ? 2.5 : 2}
          />
          <Text
            style={[
              styles.tabLabel,
              activeTab === 'home' ? styles.tabLabelActive : styles.tabLabelInactive,
            ]}
          >
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setActiveTab('automations')}
        >
          <GitBranch
            color={activeTab === 'automations' ? '#2563EB' : '#64748B'}
            size={22}
            strokeWidth={activeTab === 'automations' ? 2.5 : 2}
          />
          <Text
            style={[
              styles.tabLabel,
              activeTab === 'automations'
                ? styles.tabLabelActive
                : styles.tabLabelInactive,
            ]}
          >
            Automations
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setActiveTab('history')}
        >
          <Clock
            color={activeTab === 'history' ? '#2563EB' : '#64748B'}
            size={22}
            strokeWidth={activeTab === 'history' ? 2.5 : 2}
          />
          <Text
            style={[
              styles.tabLabel,
              activeTab === 'history' ? styles.tabLabelActive : styles.tabLabelInactive,
            ]}
          >
            History
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setActiveTab('profile')}
        >
          <User
            color={activeTab === 'profile' ? '#2563EB' : '#64748B'}
            size={22}
            strokeWidth={activeTab === 'profile' ? 2.5 : 2}
          />
          <Text
            style={[
              styles.tabLabel,
              activeTab === 'profile' ? styles.tabLabelActive : styles.tabLabelInactive,
            ]}
          >
            Profile
          </Text>
        </TouchableOpacity>
      </View>

      {/* Home Indicator */}
      <View style={styles.homeIndicatorWrap}>
        <View style={styles.homeIndicator} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFCFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'web' ? 12 : 14,
    paddingBottom: 90,
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
  topHeaderBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  brandTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#0A2540',
    letterSpacing: 0.5,
    fontFamily: 'System',
  },
  headerRightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  bellButton: {
    position: 'relative',
    padding: 4,
  },
  bellBadge: {
    position: 'absolute',
    top: 3,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  avatarBorder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#DBEAFE',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  greetingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
    overflow: 'hidden',
  },
  greetingTextWrap: {
    zIndex: 2,
  },
  greetingTime: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
    marginBottom: 4,
    fontFamily: 'System',
  },
  greetingName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.2,
    fontFamily: 'System',
  },
  mountainSvgWrap: {
    position: 'absolute',
    right: -10,
    bottom: -8,
    zIndex: 1,
  },
  heroAlertCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563EB',
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 18,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 20,
  },
  heroPlusBox: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  heroContentWrap: {
    flex: 1,
  },
  heroTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 3,
    fontFamily: 'System',
  },
  heroSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: 16,
    fontFamily: 'System',
  },
  emptyStateCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingVertical: 32,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  pinCircleContainer: {
    marginBottom: 20,
  },
  emptyHeadline: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 6,
    fontFamily: 'System',
  },
  emptySubhead: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 26,
    fontFamily: 'System',
  },
  firstAlertButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  firstAlertPlusIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  firstAlertButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2563EB',
    fontFamily: 'System',
  },
  bottomTabBar: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    height: 64,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 4,
    fontFamily: 'System',
  },
  tabLabelActive: {
    color: '#2563EB',
    fontWeight: '700',
  },
  tabLabelInactive: {
    color: '#64748B',
    fontWeight: '500',
  },
  homeIndicatorWrap: {
    position: 'absolute',
    bottom: 2,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  homeIndicator: {
    width: 120,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#CBD5E1',
  },
});
