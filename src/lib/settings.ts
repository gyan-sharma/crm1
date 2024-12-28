import db from './db';

interface Settings {
  autoSeedEnabled: boolean;
}

const SETTINGS_KEY = 'app_settings';

export async function getSettings(): Promise<Settings> {
  const settings = localStorage.getItem(SETTINGS_KEY);
  return settings ? JSON.parse(settings) : { autoSeedEnabled: false }; // Default to false
}

export async function updateSettings(settings: Partial<Settings>): Promise<Settings> {
  const current = await getSettings();
  const updated = { ...current, ...settings };
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
  return updated;
}