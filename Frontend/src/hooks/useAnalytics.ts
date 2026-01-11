
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchAPI } from '@/lib/api';
import { useAuth } from './useAuth';

export function useAnalytics() {
    const location = useLocation();
    const { user } = useAuth();

    useEffect(() => {
        // Debounce to avoid double counting strict mode or rapid changes? 
        // For now simple.
        const track = async () => {
            try {
                // We use the admin endpoint we created earlier.
                // ideally this should be a public endpoint.
                await fetchAPI('/admin/analytics/view', {
                    method: 'POST',
                    body: JSON.stringify({
                        path: location.pathname,
                        userId: user?.uid
                    })
                });
            } catch (err) {
                // silent fail
            }
        };

        track();
    }, [location.pathname]); // Removed user dependency to avoid double triggers on load, user ID is mainly for if we have it
}
