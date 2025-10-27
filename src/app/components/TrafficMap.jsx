// import { useEffect, useRef } from 'react';

// export default function TrafficMap({ incidents, currentLocation, onIncidentClick }) {
//   const mapRef = useRef(null);

//   useEffect(() => {
//     // In a real app, you would integrate with Google Maps or Mapbox
//     // This is a simplified placeholder
//     console.log('Map would be initialized here with:', {
//       incidents,
//       currentLocation
//     });
//   }, [incidents, currentLocation]);

//   const getSeverityColor = (severity) => {
//     switch (severity) {
//       case 'high': return 'bg-red-500';
//       case 'medium': return 'bg-yellow-500';
//       case 'low': return 'bg-green-500';
//       default: return 'bg-gray-500';
//     }
//   };

//   return (
//     <div className="card">
//       <h2 className="text-xl font-semibold mb-4">Live Traffic Map</h2>
      
//       {/* Map Container */}
//       <div 
//         ref={mapRef}
//         className="w-full h-96 bg-gray-200 rounded-lg relative overflow-hidden"
//       >
//         {/* This would be a real map in production */}
//         <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
//           <div className="text-center text-gray-600">
//             <p className="text-lg font-semibold">Port Harcourt Traffic Map</p>
//             <p className="text-sm">Map integration would appear here</p>
//           </div>
//         </div>
        
//         {/* Incident Markers */}
//         {incidents.map(incident => (
//           <div
//             key={incident.id}
//             className={`absolute w-4 h-4 rounded-full border-2 border-white ${getSeverityColor(incident.severity)} cursor-pointer transform -translate-x-2 -translate-y-2`}
//             style={{
//               left: `${((incident.location.lng - 7.0) / 0.1) * 100}%`,
//               top: `${((incident.location.lat - 4.8) / 0.1) * 100}%`
//             }}
//             onClick={() => onIncidentClick(incident)}
//             title={incident.title}
//           />
//         ))}
        
//         {/* Current Location Marker */}
//         {currentLocation && (
//           <div
//             className="absolute w-3 h-3 bg-blue-600 rounded-full border-2 border-white transform -translate-x-1.5 -translate-y-1.5"
//             style={{
//               left: `${((currentLocation.lng - 7.0) / 0.1) * 100}%`,
//               top: `${((currentLocation.lat - 4.8) / 0.1) * 100}%`
//             }}
//             title="Your Location"
//           />
//         )}
//       </div>
      
//       <div className="mt-4 flex flex-wrap gap-4">
//         <div className="flex items-center">
//           <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
//           <span className="text-sm">High Severity</span>
//         </div>
//         <div className="flex items-center">
//           <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
//           <span className="text-sm">Medium Severity</span>
//         </div>
//         <div className="flex items-center">
//           <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
//           <span className="text-sm">Low Severity</span>
//         </div>
//         <div className="flex items-center">
//           <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
//           <span className="text-sm">Your Location</span>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useEffect, useRef } from 'react';

export default function TrafficMap({ incidents, currentLocation, onIncidentClick, alertedIncidents }) {
  const mapRef = useRef(null);

  useEffect(() => {
    // In a real app, you would integrate with Google Maps or Mapbox
    // This is a simplified placeholder
    console.log('Map would be initialized here with:', {
      incidents,
      currentLocation,
      alertedIncidents
    });
  }, [incidents, currentLocation, alertedIncidents]);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getIncidentIcon = (type) => {
    switch (type) {
      case 'accident': return '🚗';
      case 'road_works': return '🚧';
      case 'flooding': return '🌊';
      case 'traffic_jam': return '🚦';
      case 'police_checkpoint': return '👮';
      case 'road_closure': return '🚫';
      default: return '⚠️';
    }
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Live Traffic Map</h2>
        {alertedIncidents && alertedIncidents.size > 0 && (
          <div className="flex items-center space-x-2 bg-red-100 text-red-800 px-3 py-1 rounded-full">
            <span className="text-sm">🔊</span>
            <span className="text-sm font-medium">{alertedIncidents.size} Active Alert(s)</span>
          </div>
        )}
      </div>
      
      {/* Map Container */}
      <div 
        ref={mapRef}
        className="w-full h-96 bg-gray-200 rounded-lg relative overflow-hidden border-2 border-gray-300"
      >
        {/* This would be a real map in production */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100">
          {/* Grid background */}
          <div className="absolute inset-0 opacity-20">
            <div className="grid grid-cols-10 grid-rows-10 h-full">
              {Array.from({ length: 100 }).map((_, i) => (
                <div key={i} className="border border-gray-300"></div>
              ))}
            </div>
          </div>
          
          {/* Major landmarks */}
          <div className="absolute left-1/4 top-1/3 bg-blue-500 text-white text-xs px-2 py-1 rounded">
            City Center
          </div>
          <div className="absolute left-3/4 top-2/3 bg-green-500 text-white text-xs px-2 py-1 rounded">
            Airport
          </div>
          
          {/* Roads */}
          <div className="absolute left-0 top-1/2 w-full h-1 bg-gray-600 transform -translate-y-1/2"></div>
          <div className="absolute left-1/2 top-0 h-full w-1 bg-gray-600 transform -translate-x-1/2"></div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-gray-600 bg-white bg-opacity-80 p-4 rounded-lg">
              <p className="text-lg font-semibold">Port Harcourt Traffic Map</p>
              <p className="text-sm">Map integration would appear here</p>
              <p className="text-xs mt-2">🔊 Voice alerts active for {alertedIncidents?.size || 0} incidents</p>
            </div>
          </div>
        </div>
        
        {/* Incident Markers */}
        {incidents.map(incident => {
          const isAlerted = alertedIncidents?.has(incident.id);
          return (
            <div
              key={incident.id}
              className={`absolute w-8 h-8 rounded-full border-2 border-white cursor-pointer transform -translate-x-4 -translate-y-4 flex items-center justify-center text-sm ${
                getSeverityColor(incident.severity)
              } ${
                isAlerted ? 'animate-pulse ring-2 ring-red-400 shadow-lg' : 'shadow-md'
              }`}
              style={{
                left: `${((incident.location.lng - 7.0) / 0.1) * 100}%`,
                top: `${((incident.location.lat - 4.8) / 0.1) * 100}%`
              }}
              onClick={() => onIncidentClick(incident)}
              title={`${incident.title}${isAlerted ? ' 🔊 ALERT ACTIVE' : ''}`}
            >
              {getIncidentIcon(incident.type)}
              {isAlerted && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
              )}
            </div>
          );
        })}
        
        {/* Current Location Marker */}
        {currentLocation && (
          <div
            className="absolute w-6 h-6 bg-blue-600 rounded-full border-3 border-white shadow-lg transform -translate-x-3 -translate-y-3 flex items-center justify-center"
            style={{
              left: `${((currentLocation.lng - 7.0) / 0.1) * 100}%`,
              top: `${((currentLocation.lat - 4.8) / 0.1) * 100}%`
            }}
            title="Your Location"
          >
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        )}
      </div>
      
      {/* Legend */}
      <div className="mt-4">
        <h3 className="text-sm font-semibold mb-2">Map Legend</h3>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-600 rounded-full border-2 border-white flex items-center justify-center text-xs">📍</div>
            <span className="text-xs">Your Location</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-xs">🚗</div>
            <span className="text-xs">Accident</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-yellow-500 rounded-full border-2 border-white flex items-center justify-center text-xs">🚧</div>
            <span className="text-xs">Road Works</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-xs ring-2 ring-red-400">🌊</div>
            <span className="text-xs">Alert Active</span>
          </div>
        </div>
      </div>

      {/* Severity Indicators */}
      <div className="mt-4 flex flex-wrap gap-4 pt-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
          <span className="text-sm">High Severity</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
          <span className="text-sm">Medium Severity</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span className="text-sm">Low Severity</span>
        </div>
      </div>

      {/* Active Alerts Summary */}
      {alertedIncidents && alertedIncidents.size > 0 && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-red-600">🔊</span>
            <span className="text-sm font-semibold text-red-800">Active Voice Alerts</span>
          </div>
          <p className="text-xs text-red-700">
            You will receive voice alerts for {alertedIncidents.size} incident(s) within your route.
            Drive carefully and follow the instructions.
          </p>
        </div>
      )}
    </div>
  );
}