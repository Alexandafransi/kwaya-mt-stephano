import type { Bilingual } from "@/i18n/types";

export type VoicePart = "soprano" | "alto" | "tenor" | "bass";

export type ChoirMember = {
  name: string;
  voicePart: VoicePart;
  joined: number;
};

export const voicePartLabel: Record<VoicePart, Bilingual> = {
  soprano: { sw: "Sauti ya Juu (Soprano)", en: "Soprano" },
  alto: { sw: "Sauti ya Kati (Alto)", en: "Alto" },
  tenor: { sw: "Sauti ya Chini (Tenor)", en: "Tenor" },
  bass: { sw: "Sauti ya Chini Zaidi (Bass)", en: "Bass" },
};

// Placeholder roster — replace with the real membership list.
export const members: ChoirMember[] = [
  { name: "Grace Kileo", voicePart: "soprano", joined: 2016 },
  { name: "Edina Lyimo", voicePart: "soprano", joined: 2014 },
  { name: "Consolata Mbwana", voicePart: "soprano", joined: 2018 },
  { name: "Fausta Mrema", voicePart: "soprano", joined: 2020 },
  { name: "Rehema Kessy", voicePart: "alto", joined: 2015 },
  { name: "Neema Shirima", voicePart: "alto", joined: 2019 },
  { name: "Doroth Massoud", voicePart: "alto", joined: 2021 },
  { name: "Anold Mushi", voicePart: "tenor", joined: 2012 },
  { name: "Baraka Ndosi", voicePart: "tenor", joined: 2017 },
  { name: "Method Shayo", voicePart: "tenor", joined: 2013 },
  { name: "Ombeni Massawe", voicePart: "bass", joined: 2011 },
  { name: "Deogratius Komba", voicePart: "bass", joined: 2016 },
  { name: "Yustin Mwakalinga", voicePart: "bass", joined: 2022 },
];
