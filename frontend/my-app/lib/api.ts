import { jwtDecode } from "jwt-decode";

const API_BASE_URL = 'http://localhost:8080/api/v1';

// Types
export interface User {
    id: number;
    fullName: string;
    email: string;
    monthlyNetIncome?: number;
    workHoursPerMonth?: number;
}

export interface Transaction {
    id: number;
    amount: number;
    description: string;
    transactionDate: string;
    paymentMethod: string;
    transactionType: 'INCOME' | 'EXPENSE';
    categoryName: string;
    categoryIcon: string;
}

export interface DashboardSummary {
    totalBalance: number;
    monthlyExpenses: number;
    totalDebt: number;
    balanceStatus: string;
    expenseStatus: string;
}

export interface Bill {
    id: number;
    name: string;
    description: string;
    amount: number;
    dueDate: string;
    billType: string;
    paymentMethod: string;
    status: string;
    isPredicted: boolean;
    predictionConfidence?: number;
}

export interface ForecastSummary {
    totalPredicted: number;
    totalPaid: number;
    totalRemaining: number;
    notes: string;
}

class ApiService {
    private token: string | null = null;

    constructor() {
        // Initialize token from localStorage on client side
        if (typeof window !== 'undefined') {
            this.token = localStorage.getItem('token');
        }
    }

    private getToken(): string | null {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('token');
        }
        return this.token;
    }

    private setToken(token: string) {
        this.token = token;
        if (typeof window !== 'undefined') {
            localStorage.setItem('token', token);
        }
    }

    // Decode JWT to get user ID
    private getUserIdFromToken(): number | null {
        const token = this.getToken();
        if (!token) return null;
        
        try {
            const decoded: any = jwtDecode(token);
            return decoded.userId || decoded.id || null;
        } catch (error) {
            console.error("Failed to decode token:", error);
            return null;
        }
    }

    // Get current user ID from token or localStorage
    getCurrentUserId(): number {
        // First try to get from token
        const tokenUserId = this.getUserIdFromToken();
        if (tokenUserId) return tokenUserId;
        
        // Fallback to localStorage
        if (typeof window !== 'undefined') {
            const user = localStorage.getItem('user');
            if (user) {
                try {
                    const userData = JSON.parse(user);
                    return userData.id || 1;
                } catch (e) {
                    return 1;
                }
            }
        }
        
        return 1; // Default fallback for demo
    }

    // Get current user
    getCurrentUser(): User | null {
        if (typeof window !== 'undefined') {
            const user = localStorage.getItem('user');
            if (user) {
                try {
                    return JSON.parse(user);
                } catch (e) {
                    return null;
                }
            }
        }
        return null;
    }

    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };

        const token = this.getToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                ...options,
                headers,
            });

            // Handle 401 Unauthorized
            if (response.status === 401) {
                this.logout();
                if (typeof window !== 'undefined') {
                    window.location.href = '/login';
                }
                throw new Error('Session expired. Please login again.');
            }

            // Check if response is OK
            if (!response.ok) {
                let errorMessage = 'Request failed';
                try {
                    const error = await response.json();
                    errorMessage = error.message || error.error || 'Request failed';
                } catch (e) {
                    errorMessage = `HTTP ${response.status}: ${response.statusText}`;
                }
                throw new Error(errorMessage);
            }

            // Parse JSON safely
            const text = await response.text();
            
            // Handle empty response
            if (!text || text.trim() === '') {
                return {} as T;
            }
            
            try {
                // Fix potential double-quoting issue
                let cleanText = text;
                // Remove extra quotes at the beginning and end if present
                if (cleanText.startsWith('"') && cleanText.endsWith('"') && !cleanText.startsWith('{"') && !cleanText.startsWith('[{')) {
                    cleanText = cleanText.slice(1, -1);
                }
                // Unescape if needed
                cleanText = cleanText.replace(/\\"/g, '"');
                
                return JSON.parse(cleanText) as T;
            } catch (e) {
                console.error('JSON parse error for endpoint:', endpoint);
                console.error('Response text:', text.substring(0, 500));
                throw new Error('Invalid response format from server');
            }
        } catch (error) {
            console.error(`API Error [${endpoint}]:`, error);
            throw error;
        }
    }

    // ============ AUTH APIs ============
    async login(email: string, password: string) {
        const response = await this.request<{ token: string; email: string; fullName: string }>('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });

        if (response.token) {
            this.setToken(response.token);
            
            // Decode token to get user ID
            try {
                const decoded: any = jwtDecode(response.token);
                localStorage.setItem('user', JSON.stringify({
                    email: response.email,
                    fullName: response.fullName,
                    id: decoded.userId || decoded.id || 1,
                }));
            } catch (e) {
                localStorage.setItem('user', JSON.stringify({
                    email: response.email,
                    fullName: response.fullName,
                    id: 1,
                }));
            }
        }

        return response;
    }

    async register(fullName: string, email: string, password: string) {
        const response = await this.request<{ token: string; email: string; fullName: string }>('/auth/register', {
            method: 'POST',
            body: JSON.stringify({ fullName, email, password }),
        });

        // If registration returns a token, store it
        if (response.token) {
            this.setToken(response.token);
            try {
                const decoded: any = jwtDecode(response.token);
                localStorage.setItem('user', JSON.stringify({
                    email: response.email,
                    fullName: response.fullName,
                    id: decoded.userId || decoded.id,
                }));
            } catch (e) {
                localStorage.setItem('user', JSON.stringify({
                    email: response.email,
                    fullName: response.fullName,
                    id: 1,
                }));
            }
        }

        return response;
    }

    async forgotPassword(email: string) {
        return this.request('/auth/forgot-password', {
            method: 'POST',
            body: JSON.stringify({ email }),
        });
    }

    // ============ USER APIs ============
    async getProfile(userId?: number) {
        const id = userId || this.getCurrentUserId();
        return this.request(`/users/profile?userId=${id}`);
    }

    // ============ DASHBOARD APIs ============
    async getDashboardSummary(userId?: number): Promise<DashboardSummary> {
        const id = userId || this.getCurrentUserId();
        return this.request(`/dashboard/summary?userId=${id}`);
    }

    async getDashboardIndicators(userId?: number) {
        const id = userId || this.getCurrentUserId();
        return this.request(`/dashboard/indicators?userId=${id}`);
    }

    // ============ TRANSACTION APIs ============
    async getTransactions(userId?: number): Promise<Transaction[]> {
        const id = userId || this.getCurrentUserId();
        return this.request(`/transactions?userId=${id}`);
    }

    async getRecentTransactions(userId?: number): Promise<Transaction[]> {
        const id = userId || this.getCurrentUserId();
        return this.request(`/transactions/recent?userId=${id}`);
    }

    async createTransaction(userId: number | undefined, data: any) {
        const id = userId || this.getCurrentUserId();
        return this.request(`/transactions?userId=${id}`, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async voiceTransaction(userId: number | undefined, text: string) {
        const id = userId || this.getCurrentUserId();
        return this.request(`/transactions/voice?userId=${id}`, {
            method: 'POST',
            body: JSON.stringify({ text }),
        });
    }

    // ============ CATEGORY APIs ============
    async getCategories() {
        return this.request('/categories');
    }

    async getExpenseCategories() {
        return this.request('/categories/expense');
    }

    async getIncomeCategories() {
        return this.request('/categories/income');
    }

    // ============ ANALYTICS APIs ============
    async getSpendingDistribution(userId?: number) {
        const id = userId || this.getCurrentUserId();
        return this.request(`/analytics/spending-distribution?userId=${id}`);
    }

    async getSpendingTrend(userId?: number) {
        const id = userId || this.getCurrentUserId();
        return this.request(`/analytics/spending-trend?userId=${id}`);
    }

    async getSavingsGoals(userId?: number) {
        const id = userId || this.getCurrentUserId();
        return this.request(`/analytics/savings-goals?userId=${id}`);
    }

    async getInsights(userId?: number) {
        const id = userId || this.getCurrentUserId();
        return this.request(`/analytics/insights?userId=${id}`);
    }

    // ============ BILLS APIs ============
    async getBills(userId?: number): Promise<Bill[]> {
        const id = userId || this.getCurrentUserId();
        return this.request(`/bills?userId=${id}`);
    }

    async markBillAsPaid(billId: number, userId?: number) {
        const id = userId || this.getCurrentUserId();
        return this.request(`/bills/${billId}/status?userId=${id}`, {
            method: 'PATCH',
        });
    }

    // ============ FORECAST APIs ============
    async getForecastSummary(userId?: number): Promise<ForecastSummary> {
        const id = userId || this.getCurrentUserId();
        return this.request(`/forecasts/summary?userId=${id}`);
    }

    async getForecastCalendar(userId?: number) {
        const id = userId || this.getCurrentUserId();
        return this.request(`/forecasts/calendar?userId=${id}`);
    }

    // ============ TOOLS APIs ============
    async calculateTimeValue(userId: number | undefined, itemPrice: number, monthlyNetIncome?: number, workHoursPerMonth?: number) {
        const id = userId || this.getCurrentUserId();
        const body: any = { itemPrice };
        if (monthlyNetIncome) body.monthlyNetIncome = monthlyNetIncome;
        if (workHoursPerMonth) body.workHoursPerMonth = workHoursPerMonth;
        
        return this.request(`/tools/time-value?userId=${id}`, {
            method: 'POST',
            body: JSON.stringify(body),
        });
    }

    async getTimeValueHistory(userId?: number) {
        const id = userId || this.getCurrentUserId();
        return this.request(`/tools/time-value/history?userId=${id}`);
    }

    async getAwarenessTips() {
        return this.request('/tools/awareness-tips');
    }

    async getRandomTip() {
        return this.request('/tools/awareness-tips/random');
    }

    async getTipsByCategory(category: string) {
        return this.request(`/tools/awareness-tips/category/${category}`);
    }

    // ============ HELPER METHODS ============
    logout() {
        this.token = null;
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    }

    isAuthenticated(): boolean {
        const token = this.getToken();
        if (!token) return false;
        
        // Optional: Check if token is expired
        try {
            const decoded: any = jwtDecode(token);
            const exp = decoded.exp;
            if (exp && exp * 1000 < Date.now()) {
                this.logout();
                return false;
            }
        } catch (e) {
            return false;
        }
        
        return true;
    }

    // Helper to test backend connection
    async testConnection(): Promise<boolean> {
        try {
            const response = await fetch(`http://localhost:8080/health`);
            return response.ok;
        } catch {
            return false;
        }
    }
}

export const api = new ApiService();
export default api;