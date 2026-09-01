"use client";

import { ShoppingBag } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ui } from "@/i18n/ui";
import { useList } from "@/lib/useResource";
import { adaptShopItem, shopItemsResource } from "@/lib/resources";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

export default function ShopPage() {
  const { lang } = useLanguage();
  const { data: shopItems } = useList(shopItemsResource.key, adaptShopItem);
  return (
    <div>
      <PageHero
        eyebrow={ui.navProjects[lang]}
        title={ui.navShop[lang]}
        subtitle={
          lang === "sw"
            ? "Bidhaa hizi zinapatikana kwa kuwasiliana nasi moja kwa moja."
            : "These items are available by contacting us directly."
        }
      />
      <Section>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shopItems.map((item, i) => (
            <Reveal key={item.name.en} delay={i * 0.05}>
              <Card className="flex h-full flex-col">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-brand-gold/15 text-brand-orange-dark">
                  <ShoppingBag size={20} />
                </div>
                <h2 className="font-serif-display text-lg font-bold text-content">
                  {item.name[lang]}
                </h2>
                <p className="mt-2 flex-1 text-sm text-content-soft/70">{item.description[lang]}</p>
                <p className="mt-4 text-lg font-bold text-brand-orange-dark">{item.price}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>
    </div>
  );
}
