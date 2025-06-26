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

export interface UserAppointments {
  id: number;
  documentId: string;
  salutation: string;
  telephone: string;
  email: string;
  reason: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: null;
  first_name: string;
  last_name: string;
}

export interface userPet {
  id: number,
  petName: string | null,
  petType: string,
  regNumber: string | null,
  chipNumber: string| null,
  user: UserData,
  doctorNotes: string | null,
  userNotes: string | null,
  appointments: UserAppointments | null,
  recommendations: string | null,
  createdAt: Date,
  deletedAt: Date | null
}

export interface PetData {
    petName: string | null,
    petType: string,
    regNumber: string | null,
    chipNumber: string | null,
    userNotes: string | null
}