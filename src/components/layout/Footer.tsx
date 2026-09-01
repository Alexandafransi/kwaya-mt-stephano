"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ui } from "@/i18n/ui";
import { useSiteData } from "@/site/SiteDataProvider";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/ui/SocialIcons";

export function Footer() {
  const { lang } = useLanguage();
  const { site } = useSiteData();
  const year = new Date().getFullYear();

  const quickLinks = [
    { href: "/kuhusu-sisi/historia", label: ui.navHistory[lang] },
    { href: "/kuhusu-sisi/kalenda", label: ui.navCalendar[lang] },
    { href: "/nyimbo", label: ui.navSongs[lang] },
    { href: "/habari-na-matukio", label: ui.navNews[lang] },
    { href: "/gallery", label: ui.navGallery[lang] },
  ];

  return (
    <footer className="grain-overlay mt-auto bg-ink text-cream/80">
      <div className="rule-gold" />
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 py-16 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <Image src={site.logo} alt={site.name[lang]} width={52} height={52} className="rounded-full ring-2 ring-brand-gold/50" />
            <div>
              <p className="font-serif-display text-xl font-bold text-cream">{site.name[lang]}</p>
              <p className="text-sm text-cream/60">
                {site.parish[lang]} &middot; {site.diocese[lang]}
              </p>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/60">
            {site.tagline[lang]} &mdash; {ui.since[lang]} {site.founded}.
          </p>
          <div className="mt-5 flex gap-3">
            {[
              { Icon: FacebookIcon, href: site.social.facebook },
              { Icon: InstagramIcon, href: site.social.instagram },
              { Icon: YoutubeIcon, href: site.social.youtube },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-cream/15 p-2 transition hover:border-brand-gold hover:text-brand-gold"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-brand-gold">
            {ui.quickLinks[lang]}
          </p>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-cream">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-brand-gold">
            {ui.navContact[lang]}
          </p>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-brand-gold" />
              <span>{site.poBox}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="shrink-0 text-brand-gold" />
              <span>{site.phone}</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="shrink-0 text-brand-gold" />
              <span>{site.email}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10 py-5 text-center text-xs text-cream/40">
        &copy; {year} {site.name[lang]}
      </div>
    </footer>
  );
}
