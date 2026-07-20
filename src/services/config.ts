export const config = {
  app: { name: 'SHAMS', version: '2.0.0', url: 'https://shamsinfosy-bit.github.io/shams-site' },
  api: {
    youtube: { apiKey: 'YOUR_YOUTUBE_API_KEY', channelId: 'YOUR_CHANNEL_ID' },
    facebook: { appId: 'YOUR_FACEBOOK_APP_ID', pageId: 'YOUR_PAGE_ID' },
    instagram: { appId: 'YOUR_INSTAGRAM_APP_ID', username: 'YOUR_INSTAGRAM_USERNAME' },
    telegram: { botToken: 'YOUR_TELEGRAM_BOT_TOKEN', chatId: 'YOUR_CHAT_ID', channelUsername: 'YOUR_CHANNEL_USERNAME' },
    twitter: { apiKey: 'YOUR_TWITTER_API_KEY', apiSecret: 'YOUR_TWITTER_API_SECRET', bearerToken: 'YOUR_TWITTER_BEARER_TOKEN', username: 'YOUR_TWITTER_USERNAME' },
    tiktok: { accessToken: 'YOUR_TIKTOK_ACCESS_TOKEN', username: 'YOUR_TIKTOK_USERNAME' },
  },
  security: { maxLoginAttempts: 5, lockoutTime: 15 * 60 * 1000, sessionTimeout: 60 * 60 * 1000, rateLimit: { maxRequests: 100, windowMs: 60000 } },
  languages: ['en', 'ar', 'fr', 'ru'] as const,
  defaultLanguage: 'en' as const,
};
