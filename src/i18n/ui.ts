import type { Bilingual } from "./types";

export const ui = {
  // Nav — top level
  navHome: { sw: "Mwanzo", en: "Home" },
  navAbout: { sw: "Kuhusu Sisi", en: "About Us" },
  navConstitution: { sw: "Katiba na Kanuni", en: "Constitution & Rules" },
  navAlbum: { sw: "Album", en: "Album" },
  navProjects: { sw: "Miradi", en: "Projects" },
  navNews: { sw: "Habari & Matukio", en: "News & Events" },
  navHomilies: { sw: "Homilia za Dominika", en: "Sunday Homilies" },
  navSongs: { sw: "Nyimbo za Kanisa", en: "Church Songs" },
  navContact: { sw: "Mawasiliano", en: "Contact" },
  navGallery: { sw: "Gallery", en: "Gallery" },
  navResources: { sw: "Rasilimali", en: "Resources" },

  // Nav — About Us sub-items
  navIntro: { sw: "Utangulizi", en: "Introduction" },
  navHistory: { sw: "Historia", en: "History" },
  navVisionMission: { sw: "Dira & Dhamira", en: "Vision & Mission" },
  navCalendar: { sw: "Kalenda ya Matukio", en: "Calendar of Events" },
  navLeadership: { sw: "Uongozi", en: "Leadership" },
  navMembers: { sw: "Wanakwaya", en: "Choir Members" },

  // Nav — Leadership committees
  navCommitteeExecutive: { sw: "Kamati ya Utendaji", en: "Executive Committee" },
  navCommitteeCouncil: { sw: "Halmashauri", en: "Council" },
  navCommitteeFinance: {
    sw: "Kamati ya Fedha, Uchumi na Mipango",
    en: "Finance, Economy & Planning Committee",
  },
  navCommitteeEthics: { sw: "Kamati ya Maadili", en: "Ethics Committee" },
  navCommitteeMusic: {
    sw: "Kamati ya Muziki na Litrujia",
    en: "Music & Liturgy Committee",
  },
  navCommitteeAttire: { sw: "Kamati ya Mavazi", en: "Attire Committee" },

  // Nav — Projects sub-items
  navShop: { sw: "Duka", en: "Shop" },
  navInstrument: { sw: "Kinanda", en: "Instrument Fund" },

  // Common actions / labels
  readMore: { sw: "Soma Zaidi", en: "Read More" },
  viewAll: { sw: "Angalia Vyote", en: "View All" },
  backTo: { sw: "Rudi", en: "Back" },
  comingSoon: { sw: "Inakuja Hivi Karibuni", en: "Coming Soon" },
  listView: { sw: "Orodha", en: "List" },
  monthView: { sw: "Kalenda", en: "Calendar" },
  contactUs: { sw: "Wasiliana Nasi", en: "Contact Us" },
  ourMinistry: { sw: "Huduma Yetu", en: "Our Ministry" },
  since: { sw: "Tangu", en: "Since" },
  address: { sw: "Anwani", en: "Address" },
  phone: { sw: "Simu", en: "Phone" },
  email: { sw: "Barua Pepe", en: "Email" },
  followUs: { sw: "Tufuate", en: "Follow Us" },
  quickLinks: { sw: "Viungo vya Haraka", en: "Quick Links" },
  latestNews: { sw: "Habari Mpya", en: "Latest News" },
  upcomingEvents: { sw: "Matukio Yajayo", en: "Upcoming Events" },
  ourLeadership: { sw: "Uongozi Wetu", en: "Our Leadership" },
  sendMessage: { sw: "Tuma Ujumbe", en: "Send Message" },
  yourName: { sw: "Jina Lako", en: "Your Name" },
  yourEmail: { sw: "Barua Pepe Yako", en: "Your Email" },
  yourMessage: { sw: "Ujumbe Wako", en: "Your Message" },
  members: { sw: "Wanachama", en: "Members" },
  role: { sw: "Wadhifa", en: "Role" },
  founded: { sw: "Ilianzishwa", en: "Founded" },
  watchOnYoutube: { sw: "Tazama YouTube", en: "Watch on YouTube" },
  lyrics: { sw: "Maneno ya Wimbo", en: "Lyrics" },
  photos: { sw: "Picha", en: "Photos" },
  videos: { sw: "Video", en: "Videos" },
  registrationForm: { sw: "Fomu ya Usajili wa Mwanakwaya", en: "Choir Member Registration Form" },
  registrationFormDesc: {
    sw: "Unataka kujiunga na kwaya? Pakua na jaza fomu ya usajili kisha uiwasilishe kwa viongozi wa kwaya.",
    en: "Want to join the choir? Download and fill out the registration form, then submit it to the choir's leaders.",
  },
  viewForm: { sw: "Angalia Fomu", en: "View Form" },
  downloadForm: { sw: "Pakua Fomu", en: "Download Form" },

  // Homepage: stat badges + join-us band
  yearsOfService: { sw: "Miaka ya Huduma", en: "Years of Service" },
  songsLabel: { sw: "Nyimbo", en: "Songs" },
  joinChoir: { sw: "Jiunge na Kwaya", en: "Join the Choir" },
  joinChoirDesc: {
    sw: "Je, unapenda kuimba na kuitumikia Kanisa kwa karama ya muziki? Pakua fomu ya usajili, ijaze, kisha uiwasilishe kwa viongozi wetu kuanza safari yako nasi.",
    en: "Do you love to sing and serve the Church through the gift of music? Download the registration form, fill it out, and submit it to our leaders to begin your journey with us.",
  },
  startJourney: { sw: "Anza Safari Yako", en: "Start Your Journey" },

  downloadSong: { sw: "Pakua Wimbo", en: "Download Song" },
} satisfies Record<string, Bilingual>;

export type UIKey = keyof typeof ui;
