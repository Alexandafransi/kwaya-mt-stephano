export type Lang = "sw" | "en";

export type Bilingual = {
  sw: string;
  en: string;
};

export function t(field: Bilingual, lang: Lang): string {
  return field[lang];
}
