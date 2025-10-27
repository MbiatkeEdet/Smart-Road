import { useState } from 'react';

export default function ReportModal({ onClose, onSubmit, currentLocation }) {
  const [formData, setFormData] = useState({
    type: 'traffic_jam',
    title: '',
    description: '',
    severity: 'medium',
    location: currentLocation || { lat: 4.8156, lng: 7.0498 }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please enter a title');
      return;
    }
    onSubmit(formData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const incidentTypes = [
    { value: 'accident', label: 'Accident', emoji: '🚗💥' },
    { value: 'road_works', label: 'Road Works', emoji: '🚧' },
    { value: 'flooding', label: 'Flooding', emoji: '🌊' },
    { value: 'traffic_jam', label: 'Traffic Jam', emoji: '🚦' },
    { value: 'police_checkpoint', label: 'Police Checkpoint', emoji: '👮' },
    { value: 'road_closure', label: 'Road Closure', emoji: '🚫' },
    { value: 'other', label: 'Other', emoji: '⚠️' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Report Traffic Incident</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Incident Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Incident Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => handleChange('type', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {incidentTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.emoji} {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Brief description of the incident"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Provide more details about the incident..."
                rows="3"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Severity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Severity Level
              </label>
              <div className="flex space-x-2">
                {['low', 'medium', 'high'].map(level => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => handleChange('severity', level)}
                    className={`flex-1 py-2 rounded-lg border transition ${
                      formData.severity === level
                        ? level === 'high' 
                          ? 'bg-red-600 text-white border-red-600'
                          : level === 'medium'
                          ? 'bg-yellow-600 text-white border-yellow-600'
                          : 'bg-green-600 text-white border-green-600'
                        : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                    }`}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Location Info */}
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-800">
                📍 Location: {formData.location.lat.toFixed(4)}, {formData.location.lng.toFixed(4)}
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Using your current location. Drag the map pin to adjust if needed.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 btn-primary bg-green-600 hover:bg-green-700"
              >
                Submit Report
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}