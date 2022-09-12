const config = {
  prefix: 'SWARM',
  accessToken: 'ACCESS_TOKEN',
  refreshToken: 'REFRESH_TOKEN',
} as const;

/**
 * Saving data to localStorage.
 */
const saveToLocalStorage = (name: string, value: unknown) => {
  if (typeof window === 'undefined' || !window.localStorage) return;
  localStorage.setItem(`${config.prefix}:${name}`, JSON.stringify(value));
};

/**
 * Load data from localStorage.
 */
const loadFromLocalStorage = (name: string) => {
  if (typeof window === 'undefined' || !window.localStorage) return null;
  const serialized = localStorage.getItem(`${config.prefix}:${name}`);
  if (serialized === null) return null;
  return JSON.parse(serialized) as string;
};

/**
 * Remove data from localStorage.
 */
const removeFromLocalStorage = (name: string) => {
  if (typeof window === 'undefined' || !window.localStorage) return;
  localStorage.removeItem(`${config.prefix}:${name}`);
};

export const saveAccessToken = (accessToken: string) => saveToLocalStorage(config.accessToken, accessToken);
export const loadAccessToken = () => loadFromLocalStorage(config.accessToken);
export const clearAccessToken = () => removeFromLocalStorage(config.accessToken);

export const saveRefreshToken = (refeshToken: string) => saveToLocalStorage(config.refreshToken, refeshToken);
export const loadRefreshToken = () => loadFromLocalStorage(config.refreshToken);
export const clearRefreshToken = () => removeFromLocalStorage(config.refreshToken);
