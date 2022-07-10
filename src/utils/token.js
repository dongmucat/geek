import { TOKEN_KEY } from "@/assets/js";

const loadToken = () => window.localStorage.getItem(TOKEN_KEY);
const saveToken = (token) => window.localStorage.setItem(TOKEN_KEY, token);
const clearToken = () => window.localStorage.removeItem(TOKEN_KEY);

export { loadToken, saveToken, clearToken };
