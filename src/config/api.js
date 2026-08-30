// API Configuration for ArqGene Platform
export const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl && envUrl.trim() !== '') {
    // Strip trailing slash if present
    return envUrl.replace(/\/+$/, '');
  }
  return 'http://34.58.134.141';
};
