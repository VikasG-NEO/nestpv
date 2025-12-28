
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const fetchAPI = async (endpoint: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('token');

    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...options.headers,
    };

    try {
        const res = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers,
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || `API Error: ${res.statusText}`);
        }

        // Handle 204 No Content
        if (res.status === 204) return null;

        return res.json();
    } catch (error) {
        console.error(`API Call Failed [${endpoint}]:`, error);
        throw error;
    }
};
