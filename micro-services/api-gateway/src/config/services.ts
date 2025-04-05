export const SERVICE_CONFIG = {
  AUTH: { url: process.env.AUTH_SERVICE_URL || 'http://auth-service:8086/api/auth' },
  CLIENT: { url: process.env.CLIENT_SERVICE_URL || 'http://localhost:3002' },
  FLIGHTS: { url: process.env.FLIGHT_SERVICE_URL || 'http://flight-service:8083/api/flight' },
  EMPLOYEE: { url: process.env.EMPLOYEE_SERVICE_URL || 'http://employee-service:8087/api/auth' },
};