import { formatDistanceToNow, format, parseISO } from 'date-fns';

export function formatDuration(seconds: number): string {
  if (!seconds || seconds === 0) return '0';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const parts = [];
  if (h) parts.push(`${h}h`);
  if (m) parts.push(`${m}m`);
  if (s && !h) parts.push(`${s}sec`); // show seconds only if under an hour
  return parts.join(' ') || '0';
}

// Converts averageDuration seconds → "14m 22sec" format as shown in Figma
export function formatAvgDuration(seconds: number): string {
  if (!seconds) return '0';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}sec`;
  return `${s}sec`;
}

export function formatRelativeDate(isoString: string): string {
  try {
    return formatDistanceToNow(parseISO(isoString), { addSuffix: true });
  } catch { return '—'; }
}

// For "Last Session" stat card: "2 days ago"
export function formatLastSession(lastSession: string[]): string {
  if (!lastSession || lastSession.length === 0) return '—';
  try {
    return formatDistanceToNow(parseISO(lastSession[0]), { addSuffix: true });
  } catch { return '—'; }
}

// For Recent Calls date group header: "April 29th"
export function formatCallGroupDate(isoString: string): string {
  try {
    return format(parseISO(isoString), 'MMMM do');
  } catch { return ''; }
}

// For call time: "11:00 am"
export function formatCallTime(isoString: string): string {
  try {
    return format(parseISO(isoString), 'h:mm aa').toLowerCase();
  } catch { return ''; }
}

// For feedback history table: "10th May 2026" and "5:00 pm"
export function formatFeedbackDate(isoString: string): string {
  try {
    return format(parseISO(isoString), 'do MMM yyyy');
  } catch { return ''; }
}

export function formatFeedbackTime(isoString: string): string {
  try {
    return format(parseISO(isoString), 'h:mm aa').toLowerCase();
  } catch { return ''; }
}
