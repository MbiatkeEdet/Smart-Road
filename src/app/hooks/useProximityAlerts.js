import { useState, useEffect, useRef } from 'react';
import voiceService from '../services/voiceService';

export default function useProximityAlerts(incidents, currentLocation, enabled = true) {
  const [alertedIncidents, setAlertedIncidents] = useState(new Set());
  const alertCooldown = useRef(new Map());
  const checkInterval = useRef(null);

  // Calculate distance between two coordinates (Haversine formula)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in kilometers
  };

  // Check if incident is within alert distance
  const isWithinAlertDistance = (incident, currentPos, distanceKm = 2) => {
    if (!currentPos || !incident.location) return false;
    
    const distance = calculateDistance(
      currentPos.lat,
      currentPos.lng,
      incident.location.lat,
      incident.location.lng
    );
    
    return distance <= distanceKm;
  };

  // Check if incident is on current route (simplified)
  const isOnCurrentRoute = (incident, currentPos) => {
    // In a real app, this would check against the planned route
    // For now, we'll assume all incidents within 2km are relevant
    return isWithinAlertDistance(incident, currentPos, 2);
  };

  // Check for new incidents to alert
  const checkForAlerts = () => {
    if (!enabled || !currentLocation) return;

    incidents.forEach(incident => {
      const incidentId = incident.id;
      const now = Date.now();
      const lastAlertTime = alertCooldown.current.get(incidentId) || 0;
      const cooldownPeriod = 5 * 60 * 1000; // 5 minutes cooldown

      // Check if we should alert for this incident
      if (
        !alertedIncidents.has(incidentId) &&
        isOnCurrentRoute(incident, currentLocation) &&
        (now - lastAlertTime) > cooldownPeriod
      ) {
        console.log(`Alerting for incident: ${incident.title}`);
        
        // Add location name for voice alert
        const incidentWithLocation = {
          ...incident,
          locationName: incident.title.split(' on ')[1] || incident.title.split(' at ')[1] || 'your route'
        };

        // Trigger voice alert
        voiceService.speakAlert(incidentWithLocation);

        // Update state
        setAlertedIncidents(prev => new Set(prev).add(incidentId));
        alertCooldown.current.set(incidentId, now);
      }
    });
  };

  useEffect(() => {
    if (!enabled) {
      if (checkInterval.current) {
        clearInterval(checkInterval.current);
        checkInterval.current = null;
      }
      return;
    }

    // Check for alerts every 10 seconds
    checkInterval.current = setInterval(checkForAlerts, 10000);

    // Initial check
    checkForAlerts();

    return () => {
      if (checkInterval.current) {
        clearInterval(checkInterval.current);
      }
    };
  }, [incidents, currentLocation, enabled]);

  return {
    alertedIncidents,
    clearAlerts: () => setAlertedIncidents(new Set())
  };
}