export interface UserToken {
    userId: string;
    userType: 'CLIENTE' | 'FUNCIONARIO';
    iat: number;
    exp: number;
  }
  
  export interface AuthenticatedRequest extends Request {
    user: {
      id: string;
      type: 'CLIENTE' | 'FUNCIONARIO';
    };
  }