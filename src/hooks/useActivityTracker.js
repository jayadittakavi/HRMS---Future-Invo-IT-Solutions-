/**
 * useActivityTracker — Auto-tracks which module the user is currently viewing.
 * Call this at the top of any dashboard/module page component.
 *
 * Usage:
 *   import useActivityTracker from '../hooks/useActivityTracker';
 *   useActivityTracker('Attendance');
 */
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const useActivityTracker = (moduleName) => {
  const { trackModule, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && moduleName) {
      trackModule(moduleName);
    }
  }, [moduleName, isAuthenticated, trackModule]);
};

export default useActivityTracker;
