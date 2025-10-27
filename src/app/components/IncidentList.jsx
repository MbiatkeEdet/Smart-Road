// import { useState } from 'react';

// export default function IncidentList({ incidents, selectedIncident, onIncidentClick }) {
//   const [filter, setFilter] = useState('all');

//   const filteredIncidents = incidents.filter(incident => 
//     filter === 'all' || incident.type === filter
//   );

//   const getIncidentIcon = (type) => {
//     switch (type) {
//       case 'accident': return '🚗💥';
//       case 'road_works': return '🚧';
//       case 'flooding': return '🌊';
//       case 'traffic_jam': return '🚦';
//       case 'police_checkpoint': return '👮';
//       default: return '⚠️';
//     }
//   };

//   const getSeverityBadge = (severity) => {
//     const colors = {
//       high: 'bg-red-100 text-red-800',
//       medium: 'bg-yellow-100 text-yellow-800',
//       low: 'bg-green-100 text-green-800'
//     };
//     return `px-2 py-1 rounded-full text-xs font-medium ${colors[severity]}`;
//   };

//   return (
//     <div className="card">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold">Traffic Incidents</h2>
//         <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
//           {filteredIncidents.length}
//         </span>
//       </div>

//       {/* Filter Buttons */}
//       <div className="flex flex-wrap gap-2 mb-4">
//         {['all', 'accident', 'road_works', 'flooding', 'traffic_jam', 'police_checkpoint'].map(type => (
//           <button
//             key={type}
//             onClick={() => setFilter(type)}
//             className={`px-3 py-1 rounded-full text-sm font-medium transition ${
//               filter === type 
//                 ? 'bg-blue-600 text-white' 
//                 : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//             }`}
//           >
//             {type.replace('_', ' ')}
//           </button>
//         ))}
//       </div>

//       {/* Incident List */}
//       <div className="space-y-3 max-h-96 overflow-y-auto">
//         {filteredIncidents.map(incident => (
//           <div
//             key={incident.id}
//             onClick={() => onIncidentClick(incident)}
//             className={`p-3 border rounded-lg cursor-pointer transition ${
//               selectedIncident?.id === incident.id
//                 ? 'border-blue-500 bg-blue-50'
//                 : 'border-gray-200 hover:border-gray-300'
//             }`}
//           >
//             <div className="flex items-start justify-between">
//               <div className="flex items-center space-x-2">
//                 <span className="text-lg">{getIncidentIcon(incident.type)}</span>
//                 <div>
//                   <h3 className="font-semibold text-sm">{incident.title}</h3>
//                   <p className="text-gray-600 text-xs">{incident.description}</p>
//                 </div>
//               </div>
//               <span className={getSeverityBadge(incident.severity)}>
//                 {incident.severity}
//               </span>
//             </div>
//             <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
//               <span>{new Date(incident.timestamp).toLocaleTimeString()}</span>
//               {incident.verified && (
//                 <span className="text-green-600 font-medium">✓ Verified</span>
//               )}
//             </div>
//           </div>
//         ))}
        
//         {filteredIncidents.length === 0 && (
//           <div className="text-center py-8 text-gray-500">
//             No incidents to show
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { useState } from 'react';

export default function IncidentList({ incidents, selectedIncident, onIncidentClick, alertedIncidents }) {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('severity');

  const filteredIncidents = incidents.filter(incident => 
    filter === 'all' || incident.type === filter
  );

  // Sort incidents
  const sortedIncidents = [...filteredIncidents].sort((a, b) => {
    switch (sortBy) {
      case 'severity':
        const severityOrder = { high: 3, medium: 2, low: 1 };
        return severityOrder[b.severity] - severityOrder[a.severity];
      case 'time':
        return new Date(b.timestamp) - new Date(a.timestamp);
      case 'distance':
        // This would require actual distance calculation
        return 0;
      default:
        return 0;
    }
  });

  const getIncidentIcon = (type) => {
    switch (type) {
      case 'accident': return '🚗💥';
      case 'road_works': return '🚧';
      case 'flooding': return '🌊';
      case 'traffic_jam': return '🚦';
      case 'police_checkpoint': return '👮';
      case 'road_closure': return '🚫';
      default: return '⚠️';
    }
  };

  const getSeverityBadge = (severity) => {
    const colors = {
      high: 'bg-red-100 text-red-800 border-red-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      low: 'bg-green-100 text-green-800 border-green-200'
    };
    return `px-2 py-1 rounded-full text-xs font-medium border ${colors[severity]}`;
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const incidentTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - incidentTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const getTypeColor = (type) => {
    const colors = {
      accident: 'bg-red-50 border-red-200',
      road_works: 'bg-orange-50 border-orange-200',
      flooding: 'bg-blue-50 border-blue-200',
      traffic_jam: 'bg-yellow-50 border-yellow-200',
      police_checkpoint: 'bg-purple-50 border-purple-200',
      road_closure: 'bg-gray-50 border-gray-200'
    };
    return colors[type] || 'bg-gray-50 border-gray-200';
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Traffic Incidents</h2>
        <span className={`px-2 py-1 rounded-full text-sm font-medium ${
          alertedIncidents?.size > 0 
            ? 'bg-red-100 text-red-800 animate-pulse' 
            : 'bg-blue-100 text-blue-800'
        }`}>
          {sortedIncidents.length}
        </span>
      </div>

      {/* Controls */}
      <div className="space-y-3 mb-4">
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-1">
          <button
            onClick={() => setFilter('all')}
            className={`px-2 py-1 rounded-full text-xs font-medium transition ${
              filter === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All
          </button>
          {['accident', 'road_works', 'flooding', 'traffic_jam', 'police_checkpoint'].map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-2 py-1 rounded-full text-xs font-medium transition ${
                filter === type 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {type.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-600">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="severity">Severity</option>
            <option value="time">Recent</option>
            <option value="distance">Distance</option>
          </select>
        </div>
      </div>

      {/* Incident List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {sortedIncidents.map(incident => {
          const isAlerted = alertedIncidents?.has(incident.id);
          const isSelected = selectedIncident?.id === incident.id;
          
          return (
            <div
              key={incident.id}
              onClick={() => onIncidentClick(incident)}
              className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
              } ${
                getTypeColor(incident.type)
              } ${
                isAlerted ? 'ring-2 ring-red-300 bg-red-50 border-red-300' : ''
              }`}
            >
              {/* Alert Indicator */}
              {isAlerted && (
                <div className="flex items-center space-x-1 mb-2 p-1 bg-red-100 rounded">
                  <span className="text-red-600 text-xs">🔊</span>
                  <span className="text-red-700 text-xs font-semibold">VOICE ALERT ACTIVE</span>
                </div>
              )}

              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-2 flex-1">
                  <span className="text-lg mt-0.5">{getIncidentIcon(incident.type)}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-gray-900 leading-tight">
                      {incident.title}
                    </h3>
                    <p className="text-gray-600 text-xs mt-1 leading-relaxed">
                      {incident.description}
                    </p>
                  </div>
                </div>
                <span className={getSeverityBadge(incident.severity)}>
                  {incident.severity}
                </span>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center mt-2 text-xs">
                <div className="flex items-center space-x-2 text-gray-500">
                  <span>{getTimeAgo(incident.timestamp)}</span>
                  {incident.verified && (
                    <span className="text-green-600 font-medium flex items-center space-x-1">
                      <span>✓</span>
                      <span>Verified</span>
                    </span>
                  )}
                </div>
                
                {/* Quick Actions */}
                <div className="flex space-x-1">
                  {isAlerted && (
                    <button 
                      className="text-red-600 hover:text-red-800 p-1 rounded"
                      title="This incident has active voice alerts"
                    >
                      🔊
                    </button>
                  )}
                  <button 
                    className="text-gray-400 hover:text-gray-600 p-1 rounded"
                    title="View details"
                  >
                    👁️
                  </button>
                </div>
              </div>

              {/* Voice Alert Preview */}
              {isAlerted && (
                <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-xs">
                  <div className="flex items-center space-x-1 text-red-700">
                    <span>🎤</span>
                    <span className="font-medium">Voice Alert:</span>
                  </div>
                  <p className="text-red-600 mt-1 italic">
                    "Alert ahead! {incident.type === 'flooding' ? 'Road dey flood small' : 'Problem dey'} for {incident.title.split(' on ')[1] || incident.title.split(' at ')[1] || 'this area'}. Drive sharp!"
                  </p>
                </div>
              )}
            </div>
          );
        })}
        
        {sortedIncidents.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">🛣️</div>
            <p className="text-sm">No incidents to show</p>
            <p className="text-xs mt-1">Clear roads ahead!</p>
          </div>
        )}
      </div>

      {/* Summary Footer */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-xs text-gray-600">
          <span>
            {alertedIncidents?.size > 0 ? (
              <span className="text-red-600 font-semibold">
                {alertedIncidents.size} active alert(s)
              </span>
            ) : (
              'No active alerts'
            )}
          </span>
          <span>
            {incidents.filter(i => i.verified).length} verified
          </span>
        </div>
      </div>
    </div>
  );
}