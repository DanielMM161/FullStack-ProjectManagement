export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginGoogleAuth {
  token: string;  
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
