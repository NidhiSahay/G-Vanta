export type AppEnvironment = 'dev' | 'qa' | 'main';

export interface AppConfig {
  env: AppEnvironment;
  appName: string;
  apiUrl: string;
  enableDebugLogs: boolean;
  mockOtp: boolean;
  isDev: boolean;
  isQA: boolean;
  isMain: boolean;
}

// Read EXPO_PUBLIC environment variables, defaulting strictly to 'dev'
const rawEnv = (process.env.EXPO_PUBLIC_APP_ENV || 'dev').toLowerCase() as AppEnvironment;
const currentEnv: AppEnvironment = ['dev', 'qa', 'main'].includes(rawEnv) ? rawEnv : 'dev';

const DEFAULT_CONFIGS: Record<AppEnvironment, Omit<AppConfig, 'env' | 'isDev' | 'isQA' | 'isMain'>> = {
  dev: {
    appName: 'G-Vanta (Dev)',
    apiUrl: 'https://dev-api.gvanta.com/v1',
    enableDebugLogs: true,
    mockOtp: true,
  },
  qa: {
    appName: 'G-Vanta (QA)',
    apiUrl: 'https://qa-api.gvanta.com/v1',
    enableDebugLogs: true,
    mockOtp: true,
  },
  main: {
    appName: 'G-Vanta',
    apiUrl: 'https://api.gvanta.com/v1',
    enableDebugLogs: false,
    mockOtp: false,
  },
};

const base = DEFAULT_CONFIGS[currentEnv];

export const ENV: AppConfig = {
  env: currentEnv,
  appName: process.env.EXPO_PUBLIC_APP_NAME || base.appName,
  apiUrl: process.env.EXPO_PUBLIC_API_URL || base.apiUrl,
  enableDebugLogs:
    process.env.EXPO_PUBLIC_ENABLE_DEBUG_LOGS !== undefined
      ? process.env.EXPO_PUBLIC_ENABLE_DEBUG_LOGS === 'true'
      : base.enableDebugLogs,
  mockOtp:
    process.env.EXPO_PUBLIC_MOCK_OTP !== undefined
      ? process.env.EXPO_PUBLIC_MOCK_OTP === 'true'
      : base.mockOtp,
  isDev: currentEnv === 'dev',
  isQA: currentEnv === 'qa',
  isMain: currentEnv === 'main',
};
