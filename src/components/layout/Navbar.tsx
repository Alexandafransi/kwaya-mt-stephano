"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ui } from "@/i18n/ui";
import { useSiteData } from "@/site/SiteDataProvider";
import { useList } from "@/lib/useResource";
import { adaptSongCategory, songCategoriesResource } from "@/lib/resources";
import { LanguageToggle } from "./LanguageToggle";
import { ThemeToggle } from "./ThemeToggle";

type NavLink = { href: string; label: string };

function useNavGroups() {
  const { lang } = useLanguage();
  const { data: songCategories } = useList(songCategoriesResource.key, adaptSongCategory);

  const aboutLinks: NavLink[] = [
    { href: "/kuhusu-sisi/utangulizi", label: ui.navIntro[lang] },
    { href: "/kuhusu-sisi/historia", label: ui.navHistory[lang] },
    { href: "/kuhusu-sisi/dira-na-dhamira", label: ui.navVisionMission[lang] },
    { href: "/kuhusu-sisi/kalenda", label: ui.navCalendar[lang] },
    { href: "/kuhusu-sisi/uongozi", label: ui.navLeadership[lang] },
    { href: "/kuhusu-sisi/wanakwaya", label: ui.navMembers[lang] },
  ];

  const songLinks: NavLink[] = songCategories.map((c) => ({
    href: `/nyimbo/${c.slug}`,
    label: c.name[lang],
  }));

  const resourceLinks: NavLink[] = [
    { href: "/katiba-na-kanuni", label: ui.navConstitution[lang] },
    { href: "/album", label: ui.navAlbum[lang] },
    { href: "/miradi", label: ui.navProjects[lang] },
  ];

  return { aboutLinks, songLinks, resourceLinks };
}

function DesktopDropdown({
  label,
  links,
  viewAllHref,
}: {
  label: string;
  links: NavLink[];
  viewAllHref?: string;
}) {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-cream/85 transition hover:text-brand-gold">
        {label}
        <ChevronDown size={14} className={`transition ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-3"
          >
            <div className="grid grid-cols-1 gap-1 rounded-2xl border border-content/10 bg-card p-3 shadow-xl shadow-content/10 sm:grid-cols-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-sm text-content-soft transition hover:bg-surface-alt hover:text-brand-orange-dark"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            {viewAllHref && (
              <Link
                href={viewAllHref}
                className="mt-1 block rounded-2xl border border-content/10 bg-card px-3 py-2 text-center text-sm font-semibold text-brand-orange-dark shadow-xl shadow-content/10"
              >
                {ui.viewAll[lang]}
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navbar() {
  const { lang } = useLanguage();
  const { site } = useSiteData();
  const { aboutLinks, songLinks, resourceLinks } = useNavGroups();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);

  const simpleLinks: NavLink[] = [
    { href: "/habari-na-matukio", label: ui.navNews[lang] },
    { href: "/homilia", label: ui.navHomilies[lang] },
  ];

  const mobileGroups: { label: string; links: NavLink[] }[] = [
    { label: ui.navAbout[lang], links: aboutLinks },
    { label: ui.navSongs[lang], links: songLinks },
    ...simpleLinks.map((l) => ({ label: l.label, links: [] as NavLink[] })),
    { label: ui.navResources[lang], links: resourceLinks },
    { label: ui.navGallery[lang], links: [] },
    { label: ui.navContact[lang], links: [] },
  ];

  const mobileHrefFor = (label: string) => {
    if (label === ui.navGallery[lang]) return "/gallery";
    if (label === ui.navContact[lang]) return "/mawasiliano";
    if (label === ui.navNews[lang]) return "/habari-na-matukio";
    if (label === ui.navHomilies[lang]) return "/homilia";
    return null;
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-brand-gold/15 bg-ink/95 backdrop-blur">
        <div className="mx-auto flex max-w-[100rem] items-center justify-between gap-3 px-5 py-3 sm:px-8">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <Image
              src={site.logo}
              alt={site.name[lang]}
              width={44}
              height={44}
              className="rounded-full ring-2 ring-brand-gold/60"
            />
            <span className="hidden whitespace-nowrap font-serif-display text-lg font-bold text-cream xl:block">
              {site.shortName} <span className="text-brand-gold">&middot;</span>{" "}
              <span className="text-sm font-normal text-cream/70">{site.parish[lang]}</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 xl:flex">
            <Link href="/" className="whitespace-nowrap rounded-full px-2.5 py-2 text-sm font-medium text-cream/85 transition hover:text-brand-gold">
              {ui.navHome[lang]}
            </Link>
            <DesktopDropdown label={ui.navAbout[lang]} links={aboutLinks} />
            <DesktopDropdown label={ui.navSongs[lang]} links={songLinks} viewAllHref="/nyimbo" />
            {simpleLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="whitespace-nowrap rounded-full px-2.5 py-2 text-sm font-medium text-cream/85 transition hover:text-brand-gold"
              >
                {link.label}
              </Link>
            ))}
            <DesktopDropdown label={ui.navResources[lang]} links={resourceLinks} />
            <Link href="/gallery" className="whitespace-nowrap rounded-full px-2.5 py-2 text-sm font-medium text-cream/85 transition hover:text-brand-gold">
              {ui.navGallery[lang]}
            </Link>
          </nav>

          <div className="hidden shrink-0 items-center gap-2 xl:flex">
            <ThemeToggle />
            <LanguageToggle />
            <Link
              href="/mawasiliano"
              className="whitespace-nowrap rounded-full bg-brand-orange px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-orange-dark"
            >
              {ui.navContact[lang]}
            </Link>
          </div>

          <button
            className="flex items-center justify-center rounded-full border border-cream/20 p-2 text-cream xl:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ink xl:hidden"
          >
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-2">
                <Image src={site.logo} alt={site.name[lang]} width={36} height={36} className="rounded-full" />
                <span className="font-serif-display text-cream">{site.shortName}</span>
              </div>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <LanguageToggle />
                <button
                  className="rounded-full border border-cream/20 p-2 text-cream"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>
            </div>
            <div className="max-h-[calc(100vh-80px)] overflow-y-auto px-5 pb-10">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="block border-b border-cream/10 py-4 text-cream"
              >
                {ui.navHome[lang]}
              </Link>
              {mobileGroups.map((group) => {
                const directHref = mobileHrefFor(group.label);
                if (group.links.length === 0) {
                  return (
                    <Link
                      key={group.label}
                      href={directHref ?? "#"}
                      onClick={() => setMobileOpen(false)}
                      className="block border-b border-cream/10 py-4 text-cream"
                    >
                      {group.label}
                    </Link>
                  );
                }
                const isOpen = mobileSection === group.label;
                return (
                  <div key={group.label} className="border-b border-cream/10">
                    <button
                      className="flex w-full items-center justify-between py-4 text-left text-cream"
                      onClick={() => setMobileSection(isOpen ? null : group.label)}
                    >
                      {group.label}
                      <ChevronDown size={16} className={`transition ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-1 pb-4 pl-3">
                            {group.links.map((link) => (
                              <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className="rounded-lg py-2 text-sm text-cream/75"
                              >
                                {link.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
