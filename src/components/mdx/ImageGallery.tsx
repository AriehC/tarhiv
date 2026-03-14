"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
  title?: string;
}

const columnClasses = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
};

function ImageGallery({ images, columns, title }: ImageGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const resolvedColumns =
    columns ?? (images.length <= 2 ? 2 : images.length <= 3 ? 3 : 4);

  const isOpen = lightboxIndex !== null;
  const currentImage = isOpen ? images[lightboxIndex] : null;

  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % images.length : null,
    );
  }, [images.length]);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + images.length) % images.length : null,
    );
  }, [images.length]);

  const close = useCallback(() => setLightboxIndex(null), []);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, close, goNext, goPrev]);

  return (
    <div className="my-8">
      {title && (
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-4 font-heading text-xl font-bold text-text-primary"
        >
          {title}
        </motion.h3>
      )}

      <div className={cn("grid gap-3", columnClasses[resolvedColumns])}>
        {images.map((image, index) => (
          <motion.button
            key={index}
            layoutId={`gallery-image-${index}`}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            onClick={() => setLightboxIndex(index)}
            className={cn(
              "group relative cursor-pointer overflow-hidden rounded-xl",
              "aspect-[4/3] bg-surface-100",
              "ring-surface-200 transition-shadow hover:ring-2 hover:shadow-lg",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
            )}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            {image.caption && (
              <div
                className={cn(
                  "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent",
                  "px-3 pb-2 pt-6",
                  "translate-y-full transition-transform duration-300 group-hover:translate-y-0",
                )}
              >
                <span className="text-sm text-white">{image.caption}</span>
              </div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Lightbox overlay */}
      <AnimatePresence>
        {isOpen && currentImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "fixed inset-0 z-50 flex items-center justify-center",
              "bg-black/90 backdrop-blur-sm",
            )}
            onClick={close}
          >
            {/* Close button */}
            <button
              onClick={close}
              className={cn(
                "absolute top-4 end-4 z-10 rounded-full bg-white/10 p-2",
                "text-white transition-colors hover:bg-white/20",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
              )}
              aria-label="סגור"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Previous button */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                className={cn(
                  "absolute start-4 top-1/2 z-10 -translate-y-1/2 rounded-full",
                  "bg-white/10 p-2 text-white transition-colors hover:bg-white/20",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                )}
                aria-label="תמונה קודמת"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}

            {/* Next button */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                className={cn(
                  "absolute end-4 top-1/2 z-10 -translate-y-1/2 rounded-full",
                  "bg-white/10 p-2 text-white transition-colors hover:bg-white/20",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                )}
                aria-label="תמונה הבאה"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}

            {/* Image */}
            <motion.div
              layoutId={`gallery-image-${lightboxIndex}`}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-[85vh] max-w-[90vw] flex-col items-center"
            >
              <img
                src={currentImage.src}
                alt={currentImage.alt}
                className="max-h-[80vh] max-w-full rounded-lg object-contain"
              />
              {currentImage.caption && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-3 text-center text-sm text-white/80"
                >
                  {currentImage.caption}
                </motion.p>
              )}
              {images.length > 1 && (
                <p className="mt-2 text-xs text-white/50">
                  {lightboxIndex! + 1} / {images.length}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export { ImageGallery, type ImageGalleryProps };
