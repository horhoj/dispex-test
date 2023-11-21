export interface Client {
  id: number;
  name: string;
  phone: string;
  email: string;
  bindId: number;
}

export interface AddClientData {
  name: string;
  phone: string;
  email: string;
}
