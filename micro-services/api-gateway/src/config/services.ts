export const SERVICE_CONFIG = {
  AUTH: { url: process.env.AUTH_SERVICE_URL || 'http://localhost:8086/api/auth' },
  CLIENT: { url: process.env.CLIENT_SERVICE_URL || 'http://localhost:8085/api/clientes' },
  FLIGHTS: { url: process.env.FLIGHT_SERVICE_URL || 'http://localhost:8083/api' },
  EMPLOYEE: { url: process.env.RESERVATION_SERVICE_URL || 'http://localhost:8087/api/funcionarios' },
  RESERVATION: { url: process.env.RESERVATION_SERVICE_URL || 'http://localhost:8089/api/reservation' }
};