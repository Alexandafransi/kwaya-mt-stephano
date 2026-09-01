import type { Bilingual } from "@/i18n/types";

export const site = {
  shortName: "SSK",
  name: {
    sw: "Kwaya ya Mt. Stefano Shahidi",
    en: "St. Stefano the Martyr Choir",
  } satisfies Bilingual,
  parish: {
    sw: "Parokia ya Kipawa",
    en: "Kipawa Parish",
  } satisfies Bilingual,
  diocese: {
    sw: "Jimbo Kuu la Dar es Salaam",
    en: "Archdiocese of Dar es Salaam",
  } satisfies Bilingual,
  tagline: {
    sw: "Tunaimba kwa Utukufu wa Mungu",
    en: "Singing for the Glory of God",
  } satisfies Bilingual,
  founded: 1975,
  poBox: "S.L.P 77326, Dar es Salaam, Tanzania",
  // Placeholder contact details — replace with the choir's real details.
  phone: "+255 700 000 000",
  email: "info@kwayastefanoshahidi.or.tz",
  whatsapp: "+255 700 000 000",
  social: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
    whatsapp: "https://wa.me/255700000000",
  },
  logo: "/images/logo.jpg",
  choirPhoto: "/images/choir-photo.jpg",
  registrationFormPdf: "/documents/fomu-ya-usajili-mwanakwaya.pdf",
};
