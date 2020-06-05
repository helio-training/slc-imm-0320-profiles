// Returns Token/False if token exists
export const isLoggedIn = () => {
    const token = localStorage.getItem('auth');
    return token;
}

export const logout = () => {
    return localStorage.removeItem('auth');
}

// Stores the Auth Token in LocalStorage
export const setToken = (token) => {
    localStorage.setItem('auth', token);
}
