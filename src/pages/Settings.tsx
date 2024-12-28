import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import { toast } from 'sonner';
import SettingToggle from '../components/settings/SettingToggle';
import { getSettings, updateSettings } from '../lib/settings';

export default function Settings() {
  const [settings, setSettings] = useState({ autoSeedEnabled: true });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const currentSettings = await getSettings();
      setSettings(currentSettings);
    } catch (error) {
      console.error('Error loading settings:', error);
      toast.error('Failed to load settings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleAutoSeed = async (value: boolean) => {
    try {
      const updated = await updateSettings({ autoSeedEnabled: value });
      setSettings(updated);
      toast.success('Settings updated successfully');
    } catch (error) {
      console.error('Error updating settings:', error);
      toast.error('Failed to update settings');
    }
  };

  if (isLoading) {
    return <div>Loading settings...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="mt-2 text-sm text-gray-700">
          Manage application settings and preferences.
        </p>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-6">
            <SettingToggle
              label="Auto-seed Opportunities"
              description="Automatically generate sample opportunities when the dashboard loads"
              value={settings.autoSeedEnabled}
              onChange={handleToggleAutoSeed}
            />
          </div>
        </div>
      </div>
    </div>
  );
}