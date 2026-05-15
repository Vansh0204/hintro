const BASE_URL = 'https://mock-backend-hintro.vercel.app';

function headers(userId: string) {
  return { 'x-user-id': userId };
}

export async function getProfile(userId: string) {
  const res = await fetch(`${BASE_URL}/api/auth/profile`, { headers: headers(userId) });
  if (!res.ok) throw new Error('Failed to fetch profile');
  return res.json();
}

export async function getDashboard(userId: string) {
  const res = await fetch(`${BASE_URL}/api/auth/dashboard`, { headers: headers(userId) });
  if (!res.ok) throw new Error('Failed to fetch dashboard');
  return res.json();
}

export async function getCallStats(userId: string) {
  const res = await fetch(`${BASE_URL}/api/call-sessions/stats`, { headers: headers(userId) });
  if (!res.ok) throw new Error('Failed to fetch stats');
  return res.json();
}

export async function getCallHistory(userId: string, limit = 10) {
  const res = await fetch(`${BASE_URL}/api/call-sessions?limit=${limit}`, { headers: headers(userId) });
  if (!res.ok) throw new Error('Failed to fetch call history');
  return res.json();
}
