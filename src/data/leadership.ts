import type { Bilingual } from "@/i18n/types";

export type CommitteeMember = {
  name: string;
  role: Bilingual;
};

export type Committee = {
  slug: string;
  name: Bilingual;
  description: Bilingual;
  members: CommitteeMember[];
};

// Placeholder member names/roles — swap in the real committee rosters when available.
export const committees: Committee[] = [
  {
    slug: "utendaji",
    name: { sw: "Kamati ya Utendaji", en: "Executive Committee" },
    description: {
      sw: "Kamati inayosimamia shughuli za kila siku za kwaya na kutekeleza maamuzi ya Halmashauri Kuu.",
      en: "Oversees the choir's day-to-day activities and carries out decisions of the Main Council.",
    },
    members: [
      { name: "Anold Mushi", role: { sw: "Mwenyekiti", en: "Chairperson" } },
      { name: "Grace Kileo", role: { sw: "Makamu Mwenyekiti", en: "Vice Chairperson" } },
      { name: "Baraka Ndosi", role: { sw: "Katibu", en: "Secretary" } },
      { name: "Consolata Mbwana", role: { sw: "Mtunza Fedha", en: "Treasurer" } },
    ],
  },
  {
    slug: "halmashauri",
    name: { sw: "Halmashauri", en: "Council" },
    description: {
      sw: "Chombo cha juu cha maamuzi kinachoongoza dira, sera na mipango ya muda mrefu ya kwaya.",
      en: "The choir's senior decision-making body, guiding vision, policy, and long-term planning.",
    },
    members: [
      { name: "Fr. Method Komba", role: { sw: "Mchungaji wa Kiroho", en: "Spiritual Director" } },
      { name: "Anold Mushi", role: { sw: "Mwenyekiti", en: "Chairperson" } },
      { name: "Edina Lyimo", role: { sw: "Mjumbe", en: "Member" } },
      { name: "Method Shayo", role: { sw: "Mjumbe", en: "Member" } },
    ],
  },
  {
    slug: "fedha",
    name: {
      sw: "Kamati ya Fedha, Uchumi na Mipango",
      en: "Finance, Economy & Planning Committee",
    },
    description: {
      sw: "Inasimamia mapato, matumizi, miradi ya kiuchumi na mipango ya maendeleo ya kwaya.",
      en: "Manages income, expenditure, income-generating projects, and the choir's development plans.",
    },
    members: [
      { name: "Consolata Mbwana", role: { sw: "Mwenyekiti", en: "Chairperson" } },
      { name: "Ombeni Massawe", role: { sw: "Katibu", en: "Secretary" } },
      { name: "Rehema Kessy", role: { sw: "Mjumbe", en: "Member" } },
    ],
  },
  {
    slug: "maadili",
    name: { sw: "Kamati ya Maadili", en: "Ethics Committee" },
    description: {
      sw: "Inalinda nidhamu, maadili mema na utu wema miongoni mwa wanakwaya.",
      en: "Safeguards discipline, good conduct, and moral integrity among choir members.",
    },
    members: [
      { name: "Method Shayo", role: { sw: "Mwenyekiti", en: "Chairperson" } },
      { name: "Fausta Mrema", role: { sw: "Mjumbe", en: "Member" } },
    ],
  },
  {
    slug: "muziki",
    name: {
      sw: "Kamati ya Muziki na Litrujia",
      en: "Music & Liturgy Committee",
    },
    description: {
      sw: "Inapanga nyimbo, mazoezi na huduma ya muziki kulingana na kalenda ya kiliturujia.",
      en: "Plans songs, rehearsals, and musical ministry in line with the liturgical calendar.",
    },
    members: [
      { name: "Edina Lyimo", role: { sw: "Kiongozi wa Muziki", en: "Music Director" } },
      { name: "Baraka Ndosi", role: { sw: "Msaidizi wa Muziki", en: "Assistant Music Director" } },
      { name: "Grace Kileo", role: { sw: "Mjumbe", en: "Member" } },
    ],
  },
  {
    slug: "mavazi",
    name: { sw: "Kamati ya Mavazi", en: "Attire Committee" },
    description: {
      sw: "Inashughulikia sare za kwaya, ununuzi na utunzaji wa mavazi ya matukio maalum.",
      en: "Handles choir uniforms, procurement, and the upkeep of attire for special occasions.",
    },
    members: [
      { name: "Rehema Kessy", role: { sw: "Mwenyekiti", en: "Chairperson" } },
      { name: "Fausta Mrema", role: { sw: "Mjumbe", en: "Member" } },
    ],
  },
];

export function getCommittee(slug: string) {
  return committees.find((c) => c.slug === slug);
}
