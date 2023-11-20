export interface Street {
  id: number;
  prefix: Prefix;
  name: string;
  cityId: number;
  city: string;
  nameWithPrefix: string;
}

export interface Prefix {
  id: number;
  name: string;
  shortName: string;
}
