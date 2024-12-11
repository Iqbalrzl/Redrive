import axiosInstance from './axios';

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface RegisterData extends LoginCredentials {
    birthdate: string;
    address: string;
    phone: string;
}

export interface MeResponse {
    id: number;
    username: string;
    birthdate: string;
    address: string;
    phone: string;
    reservations: any[]; // You might want to define a more specific type for reservations
}

export async function login(credentials: LoginCredentials): Promise<string> {
    const response = await axiosInstance.post('/api/customer/authenticate', credentials);
    const token = response.data.token;
    localStorage.setItem('jwt', token);
    return token;
}

export async function register(data: RegisterData): Promise<MeResponse> {
    const response = await axiosInstance.post('/api/customer/register', data);
    return response.data;
}

export async function getMe(): Promise<MeResponse | null> {
    const token = localStorage.getItem('jwt');
    if (!token) {
        return null;
    }
    const response = await axiosInstance.get('/api/customer/me');
    return response.data;
}

export function logout() {
    localStorage.removeItem('jwt');
}

export function getToken(): string | null {
    return localStorage.getItem('jwt');
}

export function isLoggedIn(): boolean {
    return !!localStorage.getItem('jwt');
}

