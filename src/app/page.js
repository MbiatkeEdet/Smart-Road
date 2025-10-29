
'use client';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import TrafficMap from './components/TrafficMap';
import IncidentList from './components/IncidentList';
import ReportModal from './components/ReportModal';
import RoutePlanner from './components/RoutePlanner';
import useProximityAlerts from './hooks/useProximityAlerts';
import VoiceSettings from './components/VoiceSettings';

export default function Home() {
  const [incidents, setIncidents] = useState([]);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [voiceAlertsEnabled, setVoiceAlertsEnabled] = useState(true);

  // Mock data with location names for voice alerts
  useEffect(() => {
    const mockIncidents = [
      {
        id: 1,
        type: 'accident',
        title: 'Accident on Aba Road',
        description: 'Multiple vehicle collision near Rumuola Junction',
        location: { lat: 4.8242, lng: 7.0336 },
        severity: 'high',
        timestamp: new Date(),
        verified: true
      },
      {
        id: 2,
        type: 'road_works',
        title: 'Road Works on Ikwerre Road',
        description: 'Road construction between GRA and Elekahia',
        location: { lat: 4.8156, lng: 7.0498 },
        severity: 'medium',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        verified: true
      },
      {
        id: 3,
        type: 'flooding',
        title: 'Flooding at Igwuruta-Ali Road',
        description: 'Heavy flooding after rainfall, avoid area',
        location: { lat: 4.8361, lng: 7.0256 },
        severity: 'high',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        verified: false
      },
      {
        id: 4,
        type: 'police_checkpoint',
        title: 'Police Checkpoint at Rumuokoro',
        description: 'Multiple police checkpoints causing slowdown',
        location: { lat: 4.8300, lng: 7.0200 },
        severity: 'medium',
        timestamp: new Date(Date.now() - 0.5 * 60 * 60 * 1000),
        verified: true
      }
    ];
    setIncidents(mockIncidents);
  }, []);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Error getting location:', error);
          // Default to Port Harcourt center
          setCurrentLocation({ lat: 4.8156, lng: 7.0498 });
        }
      );
    }
  }, []);

  // Initialize proximity alerts
  const { alertedIncidents } = useProximityAlerts(
    incidents, 
    currentLocation, 
    voiceAlertsEnabled
  );

  const handleReportSubmit = (report) => {
    const newIncident = {
      id: incidents.length + 1,
      ...report,
      timestamp: new Date(),
      verified: false
    };
    setIncidents([newIncident, ...incidents]);
    setShowReportModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-300">
      <Header onReportClick={() => setShowReportModal(true)} />
      
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column - Map and Route Planner */}
          <div className="lg:col-span-3 space-y-6">
            <RoutePlanner currentLocation={currentLocation} />
            <TrafficMap 
              incidents={incidents}
              currentLocation={currentLocation}
              onIncidentClick={setSelectedIncident}
              alertedIncidents={alertedIncidents}
            />
          </div>
          
          {/* Right Column - Incident List and Voice Settings */}
          <div className="lg:col-span-1 space-y-6">
            <VoiceSettings />
            <IncidentList 
              incidents={incidents}
              selectedIncident={selectedIncident}
              onIncidentClick={setSelectedIncident}
              alertedIncidents={alertedIncidents}
            />
          </div>
        </div>
      </main>

      {/* Active Alerts Indicator */}
      {alertedIncidents.size > 0 && (
        <div className="fixed bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg animate-pulse">
          <div className="flex items-center space-x-2">
            <span>🔊</span>
            <span>{alertedIncidents.size} Active Alert(s)</span>
          </div>
        </div>
      )}

      {showReportModal && (
        <ReportModal
          onClose={() => setShowReportModal(false)}
          onSubmit={handleReportSubmit}
          currentLocation={currentLocation}
        />
      )}
    </div>
  );
}