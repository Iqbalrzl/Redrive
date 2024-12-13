import axiosInstance from './axios';

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface RegisterData extends LoginCredentials {
    birthdate?: string;
    address?: string;
    phone?: string;
}

export interface MeResponse {
    id: number;
    username: string;
    birthdate?: string;
    address?: string;
    phone?: string;
    reservations?: any[];
}

export interface AdminResponse {
    id: number;
    username: string;
}

export async function login(credentials: LoginCredentials, isAdmin: boolean = false): Promise<[string, boolean]> {
    const endpoint = isAdmin ? '/api/admin/authenticate' : '/api/customer/authenticate';
    const response = await axiosInstance.post(endpoint, credentials);
    const token = response.data.token;
    localStorage.setItem('jwt', token);
    return [token, isAdmin];
}

export async function register(data: RegisterData, isAdmin: boolean = false): Promise<MeResponse> {
    const endpoint = isAdmin ? '/api/admin/register' : '/api/customer/register';
    const response = await axiosInstance.post(endpoint, data);
    return response.data;
}

export async function getMe(): Promise<MeResponse | null> {
    try {
        const response = await axiosInstance.get('/api/customer/me');
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
}

export async function getAdminData(): Promise<AdminResponse | null> {
    try {
        const response = await axiosInstance.get('/api/admin/me');
        return response.data;
    } catch (error) {
        console.error('Error fetching admin data:', error);
        return null;
    }
}

export function logout() {
    localStorage.removeItem('jwt');
}

export function getToken(): string | null {
    return localStorage.getItem('jwt');
}

export async function isLoggedIn(): Promise<MeResponse | AdminResponse | null> {
    const token = getToken();
    if (!token) {
        return null;
    }
    try {
        const adminData = await getAdminData();
        if (adminData) {
            return adminData;
        }
        const userData = await getMe();
        return userData;
    } catch (error) {
        console.error('Error checking login status:', error);
        return null;
    }
}

