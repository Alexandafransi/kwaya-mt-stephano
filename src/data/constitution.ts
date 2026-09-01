import type { Bilingual } from "@/i18n/types";

export type ConstitutionArticle = {
  heading: Bilingual;
  body: Bilingual;
};

// Placeholder structure reflecting a typical parish-choir constitution —
// replace with the choir's actual adopted constitution text.
export const constitutionArticles: ConstitutionArticle[] = [
  {
    heading: { sw: "Ibara ya 1: Jina na Makazi", en: "Article 1: Name and Domicile" },
    body: {
      sw: "Chombo hiki kitaitwa Kwaya ya Mt. Stefano Shahidi (SSK), kikiwa na makazi yake katika Parokia ya Kipawa, Jimbo Kuu la Dar es Salaam.",
      en: "This body shall be known as the St. Stefano the Martyr Choir (SSK), domiciled at Kipawa Parish, Archdiocese of Dar es Salaam.",
    },
  },
  {
    heading: { sw: "Ibara ya 2: Dhumuni", en: "Article 2: Purpose" },
    body: {
      sw: "Kuimba na kuongoza ibada kwa nyimbo, kukuza vipaji vya muziki miongoni mwa waumini, na kuimarisha imani kupitia huduma ya muziki wa kiliturujia.",
      en: "To lead worship through song, nurture musical talent among the faithful, and strengthen faith through liturgical music ministry.",
    },
  },
  {
    heading: { sw: "Ibara ya 3: Uanachama", en: "Article 3: Membership" },
    body: {
      sw: "Uanachama uko wazi kwa waumini wote wa Parokia ya Kipawa wenye nia ya kutumikia kwa njia ya muziki na wanaozingatia maadili ya Kikristo.",
      en: "Membership is open to all faithful of Kipawa Parish who desire to serve through music and who uphold Christian values.",
    },
  },
  {
    heading: { sw: "Ibara ya 4: Uongozi", en: "Article 4: Leadership" },
    body: {
      sw: "Kwaya inaongozwa na Halmashauri Kuu na kusimamiwa kiutendaji na Kamati ya Utendaji, ikisaidiwa na kamati za idara mbalimbali.",
      en: "The choir is governed by the Main Council and administered day-to-day by the Executive Committee, assisted by various departmental committees.",
    },
  },
  {
    heading: { sw: "Ibara ya 5: Nidhamu na Maadili", en: "Article 5: Discipline and Conduct" },
    body: {
      sw: "Kila mwanakwaya anatakiwa kuzingatia nidhamu, uwajibikaji na maadili mema wakati wote wa huduma na shughuli za kwaya.",
      en: "Every choir member is expected to uphold discipline, accountability, and good conduct at all times during ministry and choir activities.",
    },
  },
];
