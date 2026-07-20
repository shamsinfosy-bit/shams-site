import { config } from './config';
import { sanitizeInput, rateLimit, detectBot } from './security';

async function apiRequest(url: string, options: RequestInit = {}) {
  const headers = {
    'Content-Type': 'application/json',
    'X-CSRF-Token': localStorage.getItem('csrf_token') || '',
    ...options.headers,
  };
  const response = await fetch(url, { ...options, headers });
  if (!response.ok) throw new Error(`API Error: ${response.status}`);
  return response.json();
}

// YouTube API
export async function getYouTubeVideos(maxResults = 10) {
  const { apiKey, channelId } = config.api.youtube;
  const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxResults}&type=video`;
  return apiRequest(url);
}

// ... باقي الدوال
