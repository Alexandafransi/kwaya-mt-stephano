"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ImageOff, X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ui } from "@/i18n/ui";
import { morePhotosPlaceholderCount } from "@/data/gallery";
import { useList } from "@/lib/useResource";
import { adaptGalleryImage, galleryImagesResource } from "@/lib/resources";
import { Reveal } from "@/components/ui/Reveal";

export function GalleryGrid() {
  const { lang } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { data: allImages } = useList(galleryImagesResource.key, adaptGalleryImage);
  const galleryImages = allImages.filter(
    (img): img is typeof img & { src: string } => img.src !== null
  );

  const showPrev = () =>
    setOpenIndex((i) => (i === null ? null : (i - 1 + galleryImages.length) % galleryImages.length));
  const showNext = () =>
    setOpenIndex((i) => (i === null ? null : (i + 1) % galleryImages.length));

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {galleryImages.map((image, i) => (
          <Reveal key={image.src} delay={i * 0.04}>
            <button
              onClick={() => setOpenIndex(i)}
              className="group relative block aspect-square w-full overflow-hidden rounded-2xl border border-content/10"
            >
              <Image
                src={image.src}
                alt={image.caption[lang]}
                fill
                className="object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
              <p className="absolute bottom-2 left-2 right-2 truncate text-left text-xs font-medium text-cream opacity-0 transition group-hover:opacity-100">
                {image.caption[lang]}
              </p>
            </button>
          </Reveal>
        ))}
        {Array.from({ length: morePhotosPlaceholderCount }).map((_, i) => (
          <Reveal key={`placeholder-${i}`} delay={(galleryImages.length + i) * 0.04}>
            <div className="flex aspect-square w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-content/15 bg-surface-alt/40 text-content-soft/40">
              <ImageOff size={22} />
              <span className="px-3 text-center text-[11px] font-medium uppercase tracking-wide">
                {ui.comingSoon[lang]}
              </span>
            </div>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-6"
            onClick={() => setOpenIndex(null)}
          >
            <button
              className="absolute right-6 top-6 rounded-full border border-cream/20 p-2 text-cream"
              onClick={() => setOpenIndex(null)}
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <button
              className="absolute left-4 rounded-full border border-cream/20 p-2 text-cream sm:left-8"
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              aria-label="Previous"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              className="absolute right-4 rounded-full border border-cream/20 p-2 text-cream sm:right-8"
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              aria-label="Next"
            >
              <ChevronRight size={22} />
            </button>

            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="relative max-h-[80vh] max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryImages[openIndex].src}
                alt={galleryImages[openIndex].caption[lang]}
                width={1000}
                height={1000}
                className="max-h-[75vh] w-auto rounded-xl object-contain"
              />
              <p className="mt-3 text-center text-sm text-cream/70">
                {galleryImages[openIndex].caption[lang]}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
