import { useState } from 'react';

export default function RoutePlanner({ currentLocation }) {
  const [route, setRoute] = useState({
    start: '',
    destination: '',
    avoidTolls: false,
    avoidHighways: false
  });

  const handlePlanRoute = (e) => {
    e.preventDefault();
    // In real app, this would calculate the route
    alert(`Route planning from ${route.start} to ${route.destination} would be calculated here`);
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Plan Your Route</h2>
      
      <form onSubmit={handlePlanRoute} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-blue-700 mb-2">
            Start Location
          </label>
          <input
            type="text"
            value={route.start}
            onChange={(e) => setRoute(prev => ({...prev, start: e.target.value}))}
            placeholder="Enter starting point"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Destination
          </label>
          <input
            type="text"
            value={route.destination}
            onChange={(e) => setRoute(prev => ({...prev, destination: e.target.value}))}
            placeholder="Enter destination"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={route.avoidTolls}
              onChange={(e) => setRoute(prev => ({...prev, avoidTolls: e.target.checked}))}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">Avoid Tolls</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={route.avoidHighways}
              onChange={(e) => setRoute(prev => ({...prev, avoidHighways: e.target.checked}))}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">Avoid Highways</span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full btn-primary"
        >
          Plan Route
        </button>

        {currentLocation && (
          <button
            type="button"
            onClick={() => setRoute(prev => ({...prev, start: 'Current Location'}))}
            className="w-full btn-secondary text-sm"
          >
            Use My Current Location
          </button>
        )}
      </form>
    </div>
  );
}