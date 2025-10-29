// export default function Header({ onReportClick }) {
//   return (
//     <header className="bg-primary text-white shadow-lg">
//       <div className="container mx-auto px-4 py-4">
//         <div className="flex justify-between items-center">
//           <div>
//             <h1 className="text-2xl font-bold text-blue-500">Smart Road</h1>
//             <p className="text-blue-200 text-sm">Port Harcourt Traffic Information</p>
//           </div>
          
//           <div className="flex space-x-4">
//             <button 
//               onClick={onReportClick}
//               className="btn-primary bg-red-600 hover:bg-red-700"
//             >
//               Report Incident
//             </button>
//             <button className="btn-secondary">
//               Settings
//             </button>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

import { useState } from 'react';
import VoiceSettings from './VoiceSettings';

export default function Header({ onReportClick }) {
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);

  return (
    <>
      <header className="bg-primary text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-blue-500">Smart Road</h1>
              <p className="text-blue-300 font-bold text-blue-400">Port Harcourt Traffic Information</p>
            </div>
            
            <div className="flex space-x-4">
              <button 
                onClick={() => setShowVoiceSettings(true)}
                className="btn-primary bg-green-600 hover:bg-green-700 flex items-center space-x-2"
              >
                <span>🔊</span>
                <span>Voice Alerts</span>
              </button>
              <button 
                onClick={onReportClick}
                className="btn-primary bg-red-600 hover:bg-red-700"
              >
                Report Incident
              </button>
              <button className="btn-secondary">
                Settings
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Voice Settings Modal */}
      {showVoiceSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Voice Alerts Settings</h2>
                <button
                  onClick={() => setShowVoiceSettings(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              <VoiceSettings />
            </div>
          </div>
        </div>
      )}
    </>
  );
}