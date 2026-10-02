// Per-resource adapters between the Django API's flat shape (title_sw,
// title_en, ...) and the frontend's existing `{ sw, en }` Bilingual shape,
// plus the field configs the generic dashboard CRUD UI renders from.

import type { Bilingual } from "@/i18n/types";

export type FieldType = "text" | "textarea" | "number" | "date" | "select" | "boolean" | "image" | "file";

const L = (sw: string, en: string): Bilingual => ({ sw, en });

export type FieldConfig = {
  name: string;
  label: Bilingual;
  type: FieldType;
  bilingual?: boolean; // renders `${name}_sw` + `${name}_en` inputs
  options?: { value: string; label: Bilingual }[];
  required?: boolean;
  help?: Bilingual;
  // Only for number/date/select fields backed by a Django `null=True` column
  // (e.g. an optional FK, or CalendarEvent.date). Left blank, these should
  // be sent as JSON `null`. Everything else (blank=True text fields, and
  // number/date fields WITHOUT null=True) should be omitted when empty
  // instead — an empty string isn't a valid int/date, but `null` isn't
  // accepted either when the column disallows it.
  nullable?: boolean;
  // Override the file input's `accept` attribute (type "image"/"file" only).
  // Defaults to "image/*" for images and unrestricted for plain files.
  accept?: string;
};

export type ResourceConfig = {
  key: string; // API endpoint segment, e.g. "news"
  label: Bilingual;
  lookup: "id" | "slug";
  titleField: string; // field used as the row label in the admin list
  fields: FieldConfig[];
  parent?: { resource: string; field: string; label: Bilingual }; // for nested/filterable children
};

const bi = (raw: Record<string, unknown>, key: string): Bilingual => ({
  sw: (raw[`${key}_sw`] as string) ?? "",
  en: (raw[`${key}_en`] as string) ?? "",
});

// ---------- News ----------
export type NewsItem = {
  id: number;
  slug: string;
  title: Bilingual;
  date: string;
  excerpt: Bilingual;
  body: Bilingual;
};
export const adaptNews = (raw: Record<string, unknown>): NewsItem => ({
  id: raw.id as number,
  slug: raw.slug as string,
  title: bi(raw, "title"),
  date: raw.date as string,
  excerpt: bi(raw, "excerpt"),
  body: bi(raw, "body"),
});
export const newsResource: ResourceConfig = {
  key: "news",
  label: L("Habari", "News"),
  lookup: "slug",
  titleField: "title_sw",
  fields: [
    { name: "slug", label: L("Slug", "Slug"), type: "text", required: true },
    { name: "title", label: L("Kichwa", "Title"), type: "text", bilingual: true, required: true },
    { name: "date", label: L("Tarehe", "Date"), type: "date", required: true },
    { name: "excerpt", label: L("Muhtasari", "Excerpt"), type: "textarea", bilingual: true, required: true },
    { name: "body", label: L("Maudhui", "Body"), type: "textarea", bilingual: true, required: true },
  ],
};

// ---------- Homilies ----------
export type Homily = {
  id: number;
  slug: string;
  title: Bilingual;
  date: string;
  reading: Bilingual;
  summary: Bilingual;
};
export const adaptHomily = (raw: Record<string, unknown>): Homily => ({
  id: raw.id as number,
  slug: raw.slug as string,
  title: bi(raw, "title"),
  date: raw.date as string,
  reading: bi(raw, "reading"),
  summary: bi(raw, "summary"),
});
export const homiliesResource: ResourceConfig = {
  key: "homilies",
  label: L("Homilia", "Homilies"),
  lookup: "slug",
  titleField: "title_sw",
  fields: [
    { name: "slug", label: L("Slug", "Slug"), type: "text", required: true },
    { name: "title", label: L("Kichwa", "Title"), type: "text", bilingual: true, required: true },
    { name: "date", label: L("Tarehe", "Date"), type: "date", required: true },
    { name: "reading", label: L("Somo", "Reading"), type: "text", bilingual: true, required: true },
    { name: "summary", label: L("Muhtasari", "Summary"), type: "textarea", bilingual: true, required: true },
  ],
};

// ---------- Choir members ----------
export type VoicePart = "soprano" | "alto" | "tenor" | "bass";
export type ChoirMember = { id: number; name: string; voicePart: VoicePart; joined: number };
export const adaptMember = (raw: Record<string, unknown>): ChoirMember => ({
  id: raw.id as number,
  name: raw.name as string,
  voicePart: raw.voice_part as VoicePart,
  joined: raw.joined_year as number,
});
export const membersResource: ResourceConfig = {
  key: "members",
  label: L("Wanakwaya", "Members"),
  lookup: "id",
  titleField: "name",
  fields: [
    // Choir summary (shown publicly)
    { name: "name", label: L("Jina Kamili", "Full Name"), type: "text", required: true },
    {
      name: "voice_part",
      label: L("Sauti", "Voice part"),
      type: "select",
      required: true,
      options: [
        { value: "soprano", label: L("Soprano", "Soprano") },
        { value: "alto", label: L("Alto", "Alto") },
        { value: "tenor", label: L("Tenor", "Tenor") },
        { value: "bass", label: L("Bass", "Bass") },
      ],
    },
    { name: "joined_year", label: L("Mwaka wa Kujiunga", "Year Joined"), type: "number", required: true },
    {
      name: "gender",
      label: L("Jinsia", "Gender"),
      type: "select",
      options: [
        { value: "F", label: L("Kike", "Female") },
        { value: "M", label: L("Kiume", "Male") },
      ],
    },

    // A: Taarifa Binafsi — Personal information
    { name: "birth_day", label: L("Tarehe ya Kuzaliwa", "Birth Day"), type: "number", nullable: true, help: L("Siku, mf. 14", "Day, e.g. 14") },
    { name: "birth_month", label: L("Mwezi wa Kuzaliwa", "Birth Month"), type: "number", nullable: true, help: L("1-12", "1-12") },
    { name: "community", label: L("Jumuiya", "Community"), type: "text" },
    { name: "parish", label: L("Parokia", "Parish"), type: "text" },
    { name: "address", label: L("Anwani ya Makazi", "Residential Address"), type: "text" },
    { name: "phone", label: L("Namba ya Simu", "Phone Number"), type: "text" },

    // B: Taarifa za Kiroho — Spiritual information
    { name: "baptized", label: L("Ubatizo", "Baptized"), type: "boolean" },
    { name: "communion", label: L("Komunyo", "Communion"), type: "boolean" },
    { name: "confirmed", label: L("Kipaimara", "Confirmed"), type: "boolean" },
    { name: "married", label: L("Ndoa", "Married"), type: "boolean" },
    {
      name: "spiritual_gift",
      label: L("Huduma ya Kiroho / Karama", "Preferred Ministry / Spiritual Gift"),
      type: "text",
    },

    // C: Taarifa ya Utume wa Kwaya — Choir ministry information
    {
      name: "other_talent",
      label: L("Kipaji/Karama Nyingine", "Other Talent / Gift"),
      type: "text",
      help: L("mf. Mtiribu, Sololist, Mwalimu", "e.g. Choir leader, Soloist, Teacher"),
    },
    { name: "plays_instrument", label: L("Upigaji wa Ala za Muziki", "Plays an Instrument"), type: "boolean" },
    {
      name: "instrument_name",
      label: L("Jina la Ala", "Instrument Name"),
      type: "text",
      help: L("Kama anapiga ala, taja", "If they play one, name it"),
    },

    // D: Masharti na Maazimio — Terms & registration processing
    { name: "agreed_to_constitution", label: L("Amekubali Katiba na Kanuni", "Agreed to Constitution & Rules"), type: "boolean" },
    { name: "registration_date", label: L("Tarehe ya Usajili", "Registration Date"), type: "date", nullable: true },
    { name: "received_by", label: L("Imepokelewa na", "Received By"), type: "text" },
    { name: "received_by_title", label: L("Cheo", "Title/Position"), type: "text" },
    { name: "leader_comments", label: L("Maoni/Maamuzi", "Comments / Decision"), type: "textarea" },
    { name: "processed_date", label: L("Tarehe ya Kushughulikiwa", "Processed Date"), type: "date", nullable: true },
  ],
};

// ---------- Committees + members ----------
export type CommitteeMemberT = { id: number; committee: number; name: string; role: Bilingual; order: number };
export const adaptCommitteeMember = (raw: Record<string, unknown>): CommitteeMemberT => ({
  id: raw.id as number,
  committee: raw.committee as number,
  name: raw.name as string,
  role: bi(raw, "role"),
  order: (raw.order as number) ?? 0,
});
export const committeeMembersResource: ResourceConfig = {
  key: "committee-members",
  label: L("Wajumbe wa Kamati", "Committee Members"),
  lookup: "id",
  titleField: "name",
  parent: { resource: "committees", field: "committee", label: L("Kamati", "Committee") },
  fields: [
    { name: "committee", label: L("Kamati", "Committee"), type: "select", required: true },
    { name: "name", label: L("Jina", "Name"), type: "text", required: true },
    { name: "role", label: L("Wadhifa", "Role"), type: "text", bilingual: true, required: true },
    { name: "order", label: L("Mpangilio", "Order"), type: "number" },
  ],
};

export type Committee = {
  id: number;
  slug: string;
  name: Bilingual;
  description: Bilingual;
  order: number;
  members: { name: string; role: Bilingual }[];
};
export const adaptCommittee = (raw: Record<string, unknown>): Committee => ({
  id: raw.id as number,
  slug: raw.slug as string,
  name: bi(raw, "name"),
  description: bi(raw, "description"),
  order: (raw.order as number) ?? 0,
  members: ((raw.members as Record<string, unknown>[]) ?? []).map((m) => ({
    name: m.name as string,
    role: bi(m, "role"),
  })),
});
export const committeesResource: ResourceConfig = {
  key: "committees",
  label: L("Kamati", "Committees"),
  lookup: "slug",
  titleField: "name_sw",
  fields: [
    { name: "slug", label: L("Slug", "Slug"), type: "text", required: true },
    { name: "name", label: L("Jina", "Name"), type: "text", bilingual: true, required: true },
    { name: "description", label: L("Maelezo", "Description"), type: "textarea", bilingual: true },
    { name: "order", label: L("Mpangilio", "Order"), type: "number" },
  ],
};

// ---------- Songs ----------
export type Song = {
  id: number;
  category: number;
  title: string;
  youtubeId: string | null;
  audioFile: string | null;
  order: number;
};
export const adaptSong = (raw: Record<string, unknown>): Song => ({
  id: raw.id as number,
  category: raw.category as number,
  title: raw.title as string,
  youtubeId: (raw.youtube_id as string) || null,
  audioFile: (raw.audio_file as string) || null,
  order: (raw.order as number) ?? 0,
});
export const songsResource: ResourceConfig = {
  key: "songs",
  label: L("Nyimbo", "Songs"),
  lookup: "id",
  titleField: "title",
  parent: { resource: "song-categories", field: "category", label: L("Kundi", "Category") },
  fields: [
    { name: "category", label: L("Kundi", "Category"), type: "select", required: true },
    { name: "title", label: L("Kichwa cha Wimbo", "Song Title"), type: "text", required: true },
    {
      name: "youtube_id",
      label: L("YouTube ID", "YouTube ID"),
      type: "text",
      help: L(
        "Ikiwepo, wimbo utachezwa kutoka YouTube kwenye tovuti",
        "If set, the song plays from YouTube on the site"
      ),
    },
    {
      name: "audio_file",
      label: L("Faili la Sauti (MP3/M4A)", "Audio File (MP3/M4A)"),
      type: "file",
      accept: "audio/*",
      help: L(
        "Inatumika kama hakuna YouTube ID — watu wataweza kupakua",
        "Used when there's no YouTube ID — visitors can download it"
      ),
    },
    { name: "order", label: L("Mpangilio", "Order"), type: "number" },
  ],
};

export type SongCategory = {
  id: number;
  slug: string;
  name: Bilingual;
  description: Bilingual;
  songs: Song[];
};
export const adaptSongCategory = (raw: Record<string, unknown>): SongCategory => ({
  id: raw.id as number,
  slug: raw.slug as string,
  name: bi(raw, "name"),
  description: bi(raw, "description"),
  songs: ((raw.songs as Record<string, unknown>[]) ?? []).map(adaptSong),
});
export const songCategoriesResource: ResourceConfig = {
  key: "song-categories",
  label: L("Makundi ya Nyimbo", "Song Categories"),
  lookup: "slug",
  titleField: "name_sw",
  fields: [
    { name: "slug", label: L("Slug", "Slug"), type: "text", required: true },
    { name: "name", label: L("Jina", "Name"), type: "text", bilingual: true, required: true },
    { name: "description", label: L("Maelezo", "Description"), type: "textarea", bilingual: true },
    { name: "order", label: L("Mpangilio", "Order"), type: "number" },
  ],
};

// ---------- Shop items ----------
export type ShopItem = { id: number; name: Bilingual; price: string; description: Bilingual; order: number };
export const adaptShopItem = (raw: Record<string, unknown>): ShopItem => ({
  id: raw.id as number,
  name: bi(raw, "name"),
  price: raw.price as string,
  description: bi(raw, "description"),
  order: (raw.order as number) ?? 0,
});
export const shopItemsResource: ResourceConfig = {
  key: "shop-items",
  label: L("Bidhaa (Miradi)", "Shop Items (Projects)"),
  lookup: "id",
  titleField: "name_sw",
  fields: [
    { name: "name", label: L("Jina", "Name"), type: "text", bilingual: true, required: true },
    { name: "price", label: L("Bei", "Price"), type: "text", required: true, help: L("mf. TZS 20,000", "e.g. TZS 20,000") },
    { name: "description", label: L("Maelezo", "Description"), type: "textarea", bilingual: true },
    { name: "order", label: L("Mpangilio", "Order"), type: "number" },
  ],
};

// ---------- Constitution ----------
export type ConstitutionArticle = { id: number; heading: Bilingual; body: Bilingual; order: number };
export const adaptConstitutionArticle = (raw: Record<string, unknown>): ConstitutionArticle => ({
  id: raw.id as number,
  heading: bi(raw, "heading"),
  body: bi(raw, "body"),
  order: (raw.order as number) ?? 0,
});
export const constitutionResource: ResourceConfig = {
  key: "constitution-articles",
  label: L("Katiba na Kanuni", "Constitution & Rules"),
  lookup: "id",
  titleField: "heading_sw",
  fields: [
    { name: "heading", label: L("Kichwa cha Ibara", "Article Heading"), type: "text", bilingual: true, required: true },
    { name: "body", label: L("Maudhui", "Body"), type: "textarea", bilingual: true, required: true },
    { name: "order", label: L("Mpangilio", "Order"), type: "number" },
  ],
};

// ---------- Albums + gallery images ----------
export type GalleryImage = {
  id: number;
  src: string | null;
  caption: Bilingual;
  album: number | null;
  order: number;
};
export const adaptGalleryImage = (raw: Record<string, unknown>): GalleryImage => ({
  id: raw.id as number,
  src: (raw.image as string) || null,
  caption: bi(raw, "caption"),
  album: (raw.album as number) ?? null,
  order: (raw.order as number) ?? 0,
});
export const galleryImagesResource: ResourceConfig = {
  key: "gallery-images",
  label: L("Picha", "Photos"),
  lookup: "id",
  titleField: "caption_sw",
  parent: { resource: "albums", field: "album", label: L("Albamu", "Album") },
  fields: [
    { name: "image", label: L("Picha", "Photo"), type: "image" },
    { name: "caption", label: L("Maelezo", "Caption"), type: "text", bilingual: true },
    { name: "album", label: L("Albamu", "Album"), type: "select", nullable: true },
    { name: "order", label: L("Mpangilio", "Order"), type: "number" },
  ],
};

export type Album = {
  id: number;
  slug: string;
  title: Bilingual;
  description: Bilingual;
  order: number;
  images: GalleryImage[];
};
export const adaptAlbum = (raw: Record<string, unknown>): Album => ({
  id: raw.id as number,
  slug: raw.slug as string,
  title: bi(raw, "title"),
  description: bi(raw, "description"),
  order: (raw.order as number) ?? 0,
  images: ((raw.images as Record<string, unknown>[]) ?? []).map(adaptGalleryImage),
});
export const albumsResource: ResourceConfig = {
  key: "albums",
  label: L("Albamu", "Albums"),
  lookup: "slug",
  titleField: "title_sw",
  fields: [
    { name: "slug", label: L("Slug", "Slug"), type: "text", required: true },
    { name: "title", label: L("Jina", "Name"), type: "text", bilingual: true, required: true },
    { name: "description", label: L("Maelezo", "Description"), type: "textarea", bilingual: true },
    { name: "order", label: L("Mpangilio", "Order"), type: "number" },
  ],
};

// ---------- Calendar events ----------
export type CalendarEventRow = {
  id: number;
  year: number;
  monthIndex: number;
  monthName: Bilingual;
  date: number | null;
  title: Bilingual;
};
export const adaptCalendarEvent = (raw: Record<string, unknown>): CalendarEventRow => ({
  id: raw.id as number,
  year: raw.year as number,
  monthIndex: raw.month_index as number,
  monthName: { sw: raw.month_name_sw as string, en: raw.month_name_en as string },
  date: (raw.date as number) ?? null,
  title: bi(raw, "title"),
});
export const calendarResource: ResourceConfig = {
  key: "calendar-events",
  label: L("Kalenda ya Matukio", "Calendar Events"),
  lookup: "id",
  titleField: "title_sw",
  fields: [
    { name: "year", label: L("Mwaka", "Year"), type: "number", required: true },
    { name: "month_index", label: L("Mwezi (0=Jan)", "Month (0=Jan)"), type: "number", required: true },
    { name: "month_name_sw", label: L("Jina la Mwezi (SW)", "Month Name (SW)"), type: "text", required: true },
    { name: "month_name_en", label: L("Jina la Mwezi (EN)", "Month Name (EN)"), type: "text", required: true },
    {
      name: "date",
      label: L("Tarehe", "Date"),
      type: "number",
      nullable: true,
      help: L("Acha wazi kama halina tarehe maalum", "Leave blank if there's no specific date"),
    },
    { name: "title", label: L("Tukio", "Event"), type: "text", bilingual: true, required: true },
  ],
};

export type CalendarMonth = {
  month: string;
  monthName: Bilingual;
  monthIndex: number;
  events: { date: number | null; title: Bilingual }[];
};

const MONTH_NAMES: Bilingual[] = [
  { sw: "Januari", en: "January" },
  { sw: "Februari", en: "February" },
  { sw: "Machi", en: "March" },
  { sw: "Aprili", en: "April" },
  { sw: "Mei", en: "May" },
  { sw: "Juni", en: "June" },
  { sw: "Julai", en: "July" },
  { sw: "Agosti", en: "August" },
  { sw: "Septemba", en: "September" },
  { sw: "Oktoba", en: "October" },
  { sw: "Novemba", en: "November" },
  { sw: "Desemba", en: "December" },
];

// Always returns all 12 months (even ones with zero events yet) — the
// calendar UI shows a full-year view of month tabs.
export function groupCalendarEvents(rows: CalendarEventRow[]): CalendarMonth[] {
  const months: CalendarMonth[] = MONTH_NAMES.map((monthName, i) => ({
    month: monthName.en,
    monthName,
    monthIndex: i,
    events: [],
  }));
  for (const row of rows) {
    if (row.monthIndex < 0 || row.monthIndex > 11) continue;
    months[row.monthIndex].monthName = row.monthName;
    months[row.monthIndex].events.push({ date: row.date, title: row.title });
  }
  return months;
}

// ---------- Singletons: site settings, about page, kinanda project ----------
export type SiteSettings = {
  shortName: string;
  name: Bilingual;
  parish: Bilingual;
  diocese: Bilingual;
  tagline: Bilingual;
  founded: number;
  poBox: string;
  phone: string;
  email: string;
  whatsapp: string;
  social: { facebook: string; instagram: string; youtube: string; whatsapp: string };
  logo: string;
  choirPhoto: string;
  registrationFormPdf: string;
};
export const adaptSiteSettings = (raw: Record<string, unknown>, fallback: SiteSettings): SiteSettings => ({
  shortName: (raw.short_name as string) || fallback.shortName,
  name: bi(raw, "name"),
  parish: bi(raw, "parish"),
  diocese: bi(raw, "diocese"),
  tagline: bi(raw, "tagline"),
  founded: (raw.founded_year as number) ?? fallback.founded,
  poBox: (raw.po_box as string) ?? fallback.poBox,
  phone: (raw.phone as string) ?? fallback.phone,
  email: (raw.email as string) ?? fallback.email,
  whatsapp: (raw.whatsapp as string) ?? fallback.whatsapp,
  social: {
    facebook: (raw.facebook_url as string) || fallback.social.facebook,
    instagram: (raw.instagram_url as string) || fallback.social.instagram,
    youtube: (raw.youtube_url as string) || fallback.social.youtube,
    whatsapp: fallback.social.whatsapp,
  },
  logo: (raw.logo as string) || fallback.logo,
  choirPhoto: (raw.choir_photo as string) || fallback.choirPhoto,
  registrationFormPdf: (raw.registration_form_pdf as string) || fallback.registrationFormPdf,
});
export const siteSettingsResource: ResourceConfig = {
  key: "site-settings",
  label: L("Mipangilio ya Tovuti", "Site Settings"),
  lookup: "id",
  titleField: "name_sw",
  fields: [
    { name: "short_name", label: L("Jina Fupi", "Short Name"), type: "text", required: true },
    { name: "name", label: L("Jina Kamili", "Full Name"), type: "text", bilingual: true, required: true },
    { name: "parish", label: L("Parokia", "Parish"), type: "text", bilingual: true },
    { name: "diocese", label: L("Jimbo", "Diocese"), type: "text", bilingual: true },
    { name: "tagline", label: L("Kaulimbiu", "Tagline"), type: "text", bilingual: true },
    { name: "founded_year", label: L("Mwaka wa Kuanzishwa", "Year Founded"), type: "number" },
    { name: "po_box", label: L("S.L.P", "P.O. Box"), type: "text" },
    { name: "phone", label: L("Simu", "Phone"), type: "text" },
    { name: "email", label: L("Barua Pepe", "Email"), type: "text" },
    { name: "whatsapp", label: L("WhatsApp", "WhatsApp"), type: "text" },
    { name: "facebook_url", label: L("Facebook URL", "Facebook URL"), type: "text" },
    { name: "instagram_url", label: L("Instagram URL", "Instagram URL"), type: "text" },
    { name: "youtube_url", label: L("YouTube URL", "YouTube URL"), type: "text" },
    { name: "logo", label: L("Nembo (Logo)", "Logo"), type: "image" },
    { name: "choir_photo", label: L("Picha ya Kwaya", "Choir Photo"), type: "image" },
    { name: "registration_form_pdf", label: L("Fomu ya Usajili (PDF)", "Registration Form (PDF)"), type: "file" },
  ],
};

export type AboutPage = {
  intro: Bilingual;
  history: Bilingual;
  vision: Bilingual;
  mission: Bilingual;
};
export const adaptAboutPage = (raw: Record<string, unknown>): AboutPage => ({
  intro: bi(raw, "intro"),
  history: bi(raw, "history"),
  vision: bi(raw, "vision"),
  mission: bi(raw, "mission"),
});
export const aboutPageResource: ResourceConfig = {
  key: "about-page",
  label: L("Kuhusu Sisi", "About Us"),
  lookup: "id",
  titleField: "intro_sw",
  fields: [
    { name: "intro", label: L("Utangulizi", "Introduction"), type: "textarea", bilingual: true },
    { name: "history", label: L("Historia", "History"), type: "textarea", bilingual: true },
    { name: "vision", label: L("Dira", "Vision"), type: "textarea", bilingual: true },
    { name: "mission", label: L("Dhamira", "Mission"), type: "textarea", bilingual: true },
  ],
};

export type KinandaProject = {
  title: Bilingual;
  goalAmount: string;
  raisedAmount: string;
  description: Bilingual;
};
export const adaptKinandaProject = (raw: Record<string, unknown>): KinandaProject => ({
  title: bi(raw, "title"),
  goalAmount: raw.goal_amount as string,
  raisedAmount: raw.raised_amount as string,
  description: bi(raw, "description"),
});
export const kinandaProjectResource: ResourceConfig = {
  key: "kinanda-project",
  label: L("Mradi wa Kinanda", "Kinanda Project"),
  lookup: "id",
  titleField: "title_sw",
  fields: [
    { name: "title", label: L("Jina la Mradi", "Project Name"), type: "text", bilingual: true },
    { name: "goal_amount", label: L("Lengo", "Goal"), type: "text", help: L("mf. TZS 8,000,000", "e.g. TZS 8,000,000") },
    {
      name: "raised_amount",
      label: L("Kiasi Kilichopatikana", "Amount Raised"),
      type: "text",
      help: L("mf. TZS 3,200,000", "e.g. TZS 3,200,000"),
    },
    { name: "description", label: L("Maelezo", "Description"), type: "textarea", bilingual: true },
  ],
};

// Every flat (non-singleton) resource the generic dashboard nav lists.
export const ALL_RESOURCES: ResourceConfig[] = [
  newsResource,
  homiliesResource,
  membersResource,
  committeesResource,
  committeeMembersResource,
  songCategoriesResource,
  songsResource,
  shopItemsResource,
  constitutionResource,
  albumsResource,
  galleryImagesResource,
  calendarResource,
];
