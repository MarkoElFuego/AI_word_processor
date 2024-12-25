// src/services/auth.ts

export const getAuthToken = () => {
    return localStorage.getItem('token');
  };
  
  export const setAuthToken = (token: string) => {
    localStorage.setItem('token', token);
  };
  
  // Mock login za testiranje
  export const login = async (username: string, password: string) => {
    const response = await fetch('/api/auth/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
  
    if (!response.ok) {
      throw new Error('Login failed');
    }
  
    const data = await response.json();
    setAuthToken(data.token);
    return data.token;
  };