import { useState, useEffect } from 'react';
// import voiceService from '../../services/VoiceService';
import voiceService from '../services/VoiceService';

export default function VoiceSettings() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [volume, setVolume] = useState(80);
  const [rate, setRate] = useState(0.9);
  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    setIsEnabled(voiceService.isEnabled);
  }, []);

  const handleToggle = (enabled) => {
    setIsEnabled(enabled);
    if (enabled) {
      voiceService.enable();
    } else {
      voiceService.disable();
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    voiceService.setVolume(newVolume / 100);
  };

  const handleRateChange = (newRate) => {
    setRate(newRate);
    voiceService.setRate(newRate);
  };

  const handleTestVoice = async () => {
    setIsTesting(true);
    await voiceService.testVoice();
    setIsTesting(false);
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Voice Alerts Settings</h3>
      
      <div className="space-y-4">
        {/* Enable/Disable Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Voice Alerts</span>
          <button
            onClick={() => handleToggle(!isEnabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isEnabled ? 'bg-green-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Volume Control */}
        <div>
          <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
            <span>Volume</span>
            <span>{volume}%</span>
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => handleVolumeChange(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Speech Rate */}
        <div>
          <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
            <span>Speech Speed</span>
            <span>{rate.toFixed(1)}x</span>
          </label>
          <input
            type="range"
            min="0.5"
            max="1.5"
            step="0.1"
            value={rate}
            onChange={(e) => handleRateChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Test Button */}
        <button
          onClick={handleTestVoice}
          disabled={isTesting || !isEnabled}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isTesting ? 'Testing Voice...' : 'Test Voice Alert'}
        </button>

        <div className="text-xs text-gray-500 mt-2">
          <p>✓ Pidgin English alerts</p>
          <p>✓ Real-time incident warnings</p>
          <p>✓ Adjustable volume and speed</p>
        </div>
      </div>
    </div>
  );
}