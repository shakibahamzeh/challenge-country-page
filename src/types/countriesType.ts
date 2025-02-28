// types/countriesType.ts
export interface Header {
  id: number;
  title: string;
}

export interface Country {
  flags: { svg: string };
  name: { common: string };
  population: number;
  region: string;
  subregion: string;
  unMember: boolean;
  independent: boolean;
  area: number;
  cca3: string;
}

export interface TableProps {
  countries: Country[];
  isPending: boolean;
  page: number;
  headers: Header[];
}

export interface SearchInputProps {
  search: string;
  setSearch: (value: string) => void;
}

export interface Currency {
  name: string;
  symbol: string;
}