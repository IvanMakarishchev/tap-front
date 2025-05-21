export interface Login {
  identifier: string;
  password: string;
}

export interface User {
  user: UserResponseData;
}

export interface UserData {
  salutation: string;
  firstname: string;
  lastname: string;
  telephone: string;
  email: string;
  password: string;
}

export interface UserResponseData extends Omit<UserData, 'password'> {
  id: number;
  documentId: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: string | null;
}

export interface RequestError {
  details: Object;
  message: string;
  name: string;
  status: number;
}
