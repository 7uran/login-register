import { getCookie } from 'cookies-next';

export function useAuth() {
    const token = getCookie('token');

    return {
        isAuthenticated: !!token,
    };
}
