const API_BASE_URL = "http://localhost:5000";

export const API = {
  auth: {
    register: `${API_BASE_URL}/auth/register`,
    login: `${API_BASE_URL}/auth/login`,
  },
  detections: {
    base: `${API_BASE_URL}/detections`,
    reserve: (detectionId) => `${API_BASE_URL}/detections/${detectionId}/reserve`,
  },
};
