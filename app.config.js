import 'dotenv/config';

const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY;
const FIREBASE_AUTH_DOMAIN = process.env.FIREBASE_AUTH_DOMAIN;
const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID;
const FIREBASE_STORAGE_BUCKET = process.env.FIREBASE_STORAGE_BUCKET;
const FIREBASE_MESSAGING_SENDER_ID = process.env.FIREBASE_MESSAGING_SENDER_ID;
const FIREBASE_APP_ID = process.env.FIREBASE_APP_ID;
const FIREBASE_ANDROID_CLIENT_ID = process.env.FIREBASE_ANDROID_CLIENT_ID;
const FIREBASE_WEB_CLIENT_ID = process.env.FIREBASE_WEB_CLIENT_ID;
const GOOGLE_AUTH_CLIENT_ID = process.env.GOOGLE_AUTH_CLIENT_ID;
const GOOGLE_AUTH_IOS_CLIENT_ID = process.env.GOOGLE_AUTH_IOS_CLIENT_ID;

export default {
  expo: {
    scheme: 'com.subscriptionsManager',
    name: 'SubscriptionsManagerExpo',
    slug: 'SubscriptionsManagerExpo',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    plugins: [
      [
        'expo-image-picker',
        {
          photosPermission: 'The app accesses your photos to let you share them with your friends.',
        },
      ],
    ],
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      bundleIdentifier: 'com.subscriptionsManager',
      googleServicesFile: './GoogleService-Info.plist',
      buildNumber: '1.0.0',
      supportsTablet: true,
    },
    android: {
      package: 'com.subscriptionsManager',
      googleServicesFile: './google-services.json',
      versionCode: 1,
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      permissions: ['android.permission.RECORD_AUDIO'],
    },
    web: {
      bundler: 'metro',
      favicon: './assets/favicon.png',
    },
    extra: {
      FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN,
      FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID,
      FIREBASE_ANDROID_CLIENT_ID,
      FIREBASE_WEB_CLIENT_ID,
      GOOGLE_AUTH_CLIENT_ID,
      GOOGLE_AUTH_IOS_CLIENT_ID,
      eas: {
        projectId: '9314eb26-559e-485c-aecb-d4aec145b3a7',
      },
    },
  },
};
