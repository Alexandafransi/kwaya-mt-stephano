"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ui } from "@/i18n/ui";
import { useSiteData } from "@/site/SiteDataProvider";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { FacebookIcon, InstagramIcon, WhatsappIcon, YoutubeIcon } from "@/components/ui/SocialIcons";

export default function ContactPage() {
  const { lang } = useLanguage();
  const { site } = useSiteData();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`${lang === "sw" ? "Ujumbe kutoka" : "Message from"} ${name}`);
    const body = encodeURIComponent(`${message}\n\n${email}`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  const socials = [
    { Icon: FacebookIcon, href: site.social.facebook, label: "Facebook" },
    { Icon: InstagramIcon, href: site.social.instagram, label: "Instagram" },
    { Icon: YoutubeIcon, href: site.social.youtube, label: "YouTube" },
    { Icon: WhatsappIcon, href: site.social.whatsapp, label: "WhatsApp" },
  ];

  return (
    <div>
      <PageHero
        eyebrow={ui.navHome[lang]}
        title={ui.navContact[lang]}
        subtitle={
          lang === "sw"
            ? "Tunafurahi kusikia kutoka kwako. Wasiliana nasi kupitia njia zifuatazo."
            : "We'd love to hear from you. Reach us through any of the channels below."
        }
      />
      <Section containerClassName="grid grid-cols-1 gap-8 lg:grid-cols-5">
        <Reveal className="lg:col-span-2">
          <Card className="h-full">
            <ul className="space-y-5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-brand-orange-dark" />
                <div>
                  <p className="font-semibold text-content">{ui.address[lang]}</p>
                  <p className="text-content-soft/70">{site.poBox}</p>
                  <p className="text-content-soft/70">
                    {site.parish[lang]}, {site.diocese[lang]}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="mt-0.5 shrink-0 text-brand-orange-dark" />
                <div>
                  <p className="font-semibold text-content">{ui.phone[lang]}</p>
                  <p className="text-content-soft/70">{site.phone}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="mt-0.5 shrink-0 text-brand-orange-dark" />
                <div>
                  <p className="font-semibold text-content">{ui.email[lang]}</p>
                  <p className="text-content-soft/70">{site.email}</p>
                </div>
              </li>
            </ul>

            <p className="mb-3 mt-7 text-sm font-semibold uppercase tracking-wide text-brand-orange-dark">
              {ui.followUs[lang]}
            </p>
            <div className="flex gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="rounded-full border border-content/10 p-2.5 text-content-soft/70 transition hover:border-brand-orange hover:text-brand-orange-dark"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>

            <div className="mt-7 overflow-hidden rounded-xl border border-content/10">
              <iframe
                title="map"
                className="h-56 w-full"
                loading="lazy"
                src="https://www.google.com/maps?q=Kipawa+Parish+Dar+es+Salaam&output=embed"
              />
            </div>
          </Card>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-3">
          <Card className="h-full">
            <h2 className="mb-5 font-serif-display text-xl font-bold text-content">
              {ui.sendMessage[lang]}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-content-soft/70">
                  {ui.yourName[lang]}
                </label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-content/15 bg-card px-4 py-2.5 text-sm outline-none focus:border-brand-orange"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-content-soft/70">
                  {ui.yourEmail[lang]}
                </label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-content/15 bg-card px-4 py-2.5 text-sm outline-none focus:border-brand-orange"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-content-soft/70">
                  {ui.yourMessage[lang]}
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-lg border border-content/15 bg-card px-4 py-2.5 text-sm outline-none focus:border-brand-orange"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-orange-dark"
              >
                {ui.sendMessage[lang]} <Send size={16} />
              </button>
            </form>
          </Card>
        </Reveal>
      </Section>
    </div>
  );
}
