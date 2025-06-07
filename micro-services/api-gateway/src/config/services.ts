export const SERVICE_CONFIG = {
  AUTH: { 
    url: process.env.AUTH_SERVICE_URL || 'http://localhost:8086/api/auth' 
  },
  CLIENT: { 
    url: process.env.CLIENT_SERVICE_URL || 'http://localhost:8085/api/clientes' 
  },
  FLIGHTS: { 
    url: process.env.FLIGHT_SERVICE_URL || 'http://localhost:8083/api' 
  },
  AIRPORTS: { 
    url: `${process.env.FLIGHT_SERVICE_URL || 'http://localhost:8083/api'}/aeroportos` 
  },
  EMPLOYEE: { 
    url: process.env.EMPLOYEE_SERVICE_URL || 'http://localhost:8087/api/funcionarios' 
  },
  RESERVATION: { 
    url: process.env.RESERVATION_SERVICE_URL || 'http://localhost:8084/api/reservas' 
  },
  RESERVATION_VIEW: { 
    url: `${process.env.RESERVATION_SERVICE_URL || 'http://localhost:8084/api/reservas'}/view` 
  }
};