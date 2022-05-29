export default {
    get(key, defaultValue) {
        const value = window.localStorage.getItem(key);
        
        return value ? JSON.parse(value) : defaultValue;
    },
    set(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value));
    }
};