// API Configuration for ArqGene Platform
export const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl && envUrl.trim() !== '') {
    let cleaned = envUrl.trim().replace(/\/+$/, '');
    if (!/^https?:\/\//i.test(cleaned)) {
      cleaned = `https://${cleaned}`;
    }
    return cleaned;
  }
  return 'https://api.arqgene.com';
};

