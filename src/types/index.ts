export type ScreenName =
  | 'splash'
  | 'login'
  | 'login_empty_error'
  | 'signup'
  | 'otp'
  | 'account_created'
  | 'location_permission'
  | 'notification_permission'
  | 'home'
  | 'toast_showcase';

export interface UserProfile {
  name?: string;
  phone?: string;
  email?: string;
}

export type ToastType =
  | 'network_error'
  | 'server_error'
  | 'otp_sent'
  | 'account_created';
