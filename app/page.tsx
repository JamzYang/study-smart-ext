import React from 'react';

export default function SettingsPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">StudySmart Settings</h1>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold">AI Model Settings</h2>
          <p className="text-gray-500">Configure your AI provider and API keys here.</p>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold">Prompt Management</h2>
          <p className="text-gray-500">Create and manage your custom prompts.</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Export Platforms</h2>
          <p className="text-gray-500">Connect to Anki, RemNote, etc.</p>
        </div>
      </div>
    </div>
  );
} 