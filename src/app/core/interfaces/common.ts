export interface Login {
  identifier: string;
  password:   string;
}

export interface User {
  id:           number;
  documentId:   string;
  salutation:   string;
  firstName:    string;
  lastName:     string;
  telephone:    string;
  email:        string;
  provider:     string;
  confirmed:    boolean;
  blocked:      boolean;
  createdAt:    Date;
  updatedAt:    Date;
  publishedAt:  Date;
  locale:       string | null;
}

export interface RequestError {
  details:  Object;
  message:  string;
  name:     string;
  status:   number;
}
