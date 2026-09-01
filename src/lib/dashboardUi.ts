import type { Bilingual } from "@/i18n/types";

export const dashboardUi = {
  dashboard: { sw: "Dashibodi", en: "Dashboard" },
  contentManagement: { sw: "Usimamizi wa Maudhui", en: "Content Management" },
  settings: { sw: "Mipangilio", en: "Settings" },
  closeDashboard: { sw: "Funga Dashibodi", en: "Close Dashboard" },
  viewSite: { sw: "Angalia Tovuti", en: "View Site" },
  enableLight: { sw: "Washa mwonekano mwepesi", en: "Switch to light mode" },
  enableDark: { sw: "Washa mwonekano wa giza", en: "Switch to dark mode" },

  addNew: { sw: "Ongeza Mpya", en: "Add New" },
  add: { sw: "Ongeza", en: "Add" },
  edit: { sw: "Hariri", en: "Edit" },
  delete: { sw: "Futa", en: "Delete" },
  save: { sw: "Hifadhi", en: "Save" },
  saving: { sw: "Inahifadhi…", en: "Saving…" },
  cancel: { sw: "Ghairi", en: "Cancel" },
  close: { sw: "Funga", en: "Close" },
  loading: { sw: "Inapakia…", en: "Loading…" },
  total: { sw: "jumla", en: "total" },
  noContentYet: {
    sw: 'Hakuna maudhui bado. Bonyeza "Ongeza Mpya" kuanza.',
    en: 'No content yet. Click "Add New" to get started.',
  },
  confirmDelete: {
    sw: 'Futa "%s"? Hatua hii haiwezi kutenduliwa.',
    en: 'Delete "%s"? This action cannot be undone.',
  },
  sessionExpired: {
    sw: "Kikao kimeisha. Tafadhali funga na ufungue dashibodi tena.",
    en: "Your session has expired. Please close and re-open the dashboard.",
  },
  genericError: { sw: "Hitilafu imetokea. Jaribu tena.", en: "Something went wrong. Please try again." },
  saved: { sw: "Imehifadhiwa.", en: "Saved." },
  currentFile: { sw: "Faili la sasa", en: "Current file" },
  liveOnSite: {
    sw: "Maudhui haya yanaonekana moja kwa moja kwenye tovuti.",
    en: "This content appears live on the site.",
  },
  saveChanges: { sw: "Hifadhi Mabadiliko", en: "Save Changes" },
  opening: { sw: "Inafungua…", en: "Opening…" },

  lockTagline: {
    sw: "Ukurasa huu ni kwa viongozi wa kwaya pekee. Weka nenosiri kuendelea.",
    en: "This page is for choir leaders only. Enter the password to continue.",
  },
  wrongPassword: { sw: "Nenosiri si sahihi. Jaribu tena.", en: "Incorrect password. Try again." },
  fungua: { sw: "Fungua Dashibodi", en: "Open Dashboard" },
  protected: { sw: "Imelindwa", en: "Protected" },

  statsRealFooter: {
    sw: "Takwimu zote zinatokana na maudhui halisi kutoka kwenye database (moja kwa moja)",
    en: "All figures come straight from the database (live)",
  },

  kpiMembers: { sw: "Wanakwaya", en: "Members" },
  kpiNewsPublished: { sw: "Habari Zilizochapishwa", en: "News Published" },
  kpiHomiliesPublished: { sw: "Homilia Zilizochapishwa", en: "Homilies Published" },
  kpiUpcomingEvents: { sw: "Matukio Yajayo", en: "Upcoming Events" },
  kpiNext: { sw: "Inayofuata", en: "Next" },
  recentContentTitle: { sw: "Maudhui ya Hivi Karibuni", en: "Recent Content" },
  recentContentSubtitle: {
    sw: "Habari na Homilia zilizochapishwa hivi karibuni",
    en: "Recently published News and Homilies",
  },
  colDate: { sw: "Tarehe", en: "Date" },
  colTitle: { sw: "Kichwa", en: "Title" },
  colType: { sw: "Aina", en: "Type" },
  open: { sw: "Fungua", en: "Open" },
  songsUploadedTitle: { sw: "Nyimbo Zilizopakiwa", en: "Songs Uploaded" },
  songsUploadedSubtitle: { sw: "Video za YouTube zilizowekwa", en: "YouTube videos added" },
  uploaded: { sw: "zimepakiwa", en: "uploaded" },
  outOfSongs: { sw: "kati ya", en: "out of" },
  songsWord: { sw: "nyimbo", en: "songs" },
  leadershipTitle: { sw: "Kamati za Uongozi", en: "Leadership Committees" },
  leadershipSubtitle: { sw: "Muundo wa uongozi wa kwaya", en: "The choir's leadership structure" },
  membersWord: { sw: "wajumbe", en: "members" },
  contentBreakdownTitle: { sw: "Muundo wa Maudhui", en: "Content Breakdown" },
  contentBreakdownSubtitle: { sw: "Idadi ya maudhui kwa eneo", en: "Content count by area" },
  kinandaFundTitle: { sw: "Mfuko wa Kinanda", en: "Kinanda Fund" },
  view: { sw: "Angalia", en: "View" },
  percentFunded: { sw: "imekamilika", en: "funded" },
} satisfies Record<string, Bilingual>;

export function fmt(template: Bilingual, lang: "sw" | "en", value: string): string {
  return template[lang].replace("%s", value);
}
