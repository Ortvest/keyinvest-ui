export interface Country {
  name: { common: string };
  idd?: {
    root: string;
    suffixes: string[];
  };
}
