"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { WhatsAppButton } from "@/components/whatsapp-button";

const heroCopy = {
  title: "Decídete a llegar más lejos",
  description:
    "Programas de bachillerato, licenciatura y posgrado con acompañamiento claro para iniciar tu proceso en UNIVAMEX.",
};

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const shouldAnimate = !reduceMotion;
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const mobileImageScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.18]);
  const imageFilter = useTransform(
    scrollYProgress,
    [0, 0.62, 1],
    ["blur(0px)", "blur(1.5px)", "blur(8px)"],
  );
  const imageOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 0.9, 0.46]);
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.58, 0.92],
    [1, 1, 0],
  );

  return (
    <div ref={containerRef}>
      <section className="relative isolate h-[190svh] bg-[#061533] text-white sm:hidden">
        <div className="sticky top-0 h-[100svh] overflow-hidden bg-[#061533]">
          <div className="pt-20">
            <motion.div
              className="relative h-[64vw] min-h-[13.5rem] max-h-[22rem] w-full overflow-hidden"
              style={
                reduceMotion
                  ? undefined
                  : {
                      filter: imageFilter,
                      opacity: imageOpacity,
                      scale: mobileImageScale,
                    }
              }
            >
              <Image
                src="/images/home-hero.jpg"
                alt="Estudiantes caminando frente a instalaciones universitarias"
                fill
                priority
                sizes="100vw"
                className="object-cover object-[72%_center]"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#061533] via-[#061533]/80 to-transparent" />
            </motion.div>
          </div>

          <div className="relative min-h-[calc(100svh-5rem-64vw)] overflow-hidden bg-[#061533] px-5 pb-24 pt-7">
            <motion.div
              initial={shouldAnimate ? { y: 24, opacity: 0 } : false}
              animate={{ y: 0, opacity: 1 }}
              style={
                reduceMotion
                  ? undefined
                  : {
                      opacity: contentOpacity,
                    }
              }
              transition={{ duration: 0.62, ease: "easeOut" }}
            >
              <motion.h1
                className="max-w-[19rem] font-heading text-[2.05rem] font-normal leading-[1.05] tracking-normal text-balance"
                initial={shouldAnimate ? { y: 18, opacity: 0 } : false}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.08, duration: 0.58, ease: "easeOut" }}
              >
                {heroCopy.title}
              </motion.h1>
              <motion.p
                className="mt-5 max-w-[18.5rem] text-[0.86rem] leading-[1.55] text-white/88"
                initial={shouldAnimate ? { y: 14, opacity: 0 } : false}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.16, duration: 0.52 }}
              >
                {heroCopy.description}
              </motion.p>

              <motion.div
                className="mt-7 flex flex-col items-start gap-3"
                initial={shouldAnimate ? { y: 14, opacity: 0 } : false}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.24, duration: 0.52 }}
              >
                <WhatsAppButton
                  className="min-h-10 px-4 py-2.5"
                  source="Hero"
                />
                <Link
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-white/35 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:border-[#E7A928] hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E7A928]"
                  href="/oferta-academica"
                >
                  Ver oferta académica
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </motion.div>
            </motion.div>
          </div>

          <div
            aria-hidden="true"
            className="hero-concave absolute inset-x-0 -bottom-px z-10 h-16 scale-x-110 bg-[#061533]"
          />
        </div>
      </section>

      <section
        className="relative isolate hidden bg-[#061533] text-white sm:block sm:h-[190dvh]"
      >
      <div className="sticky top-0 h-[100svh] overflow-hidden sm:h-[100dvh]">
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={
            reduceMotion
              ? undefined
              : {
                  filter: imageFilter,
                  opacity: imageOpacity,
                  scale: imageScale,
                }
          }
        >
          <Image
            src="/images/home-hero.jpg"
            alt="Estudiantes caminando frente a instalaciones universitarias"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,21,51,0.98)_0%,rgba(6,21,51,0.87)_35%,rgba(6,21,51,0.48)_68%,rgba(6,21,51,0.24)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_42%,rgba(30,64,175,0.3),transparent_38%)]" />

        <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-7xl items-center px-5 pb-20 pt-24 sm:min-h-[100dvh] sm:px-8 sm:pb-28 sm:pt-28 lg:px-10">
          <motion.div
            className="max-w-3xl"
            initial={shouldAnimate ? { y: 30, opacity: 0 } : false}
            animate={{ y: 0, opacity: 1 }}
            style={
              reduceMotion ? undefined : { opacity: contentOpacity }
            }
            transition={{ duration: 0.72, ease: "easeOut" }}
          >
            <motion.h1
              className="max-w-[19rem] font-heading text-[2.05rem] font-normal leading-[1.05] tracking-normal text-balance sm:max-w-3xl sm:text-5xl lg:text-7xl"
              initial={shouldAnimate ? { y: 20, opacity: 0 } : false}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.12, duration: 0.68, ease: "easeOut" }}
            >
              {heroCopy.title}
            </motion.h1>
            <motion.p
              className="mt-5 max-w-[18.5rem] text-[0.86rem] leading-[1.55] text-white/88 sm:mt-6 sm:max-w-xl sm:text-base sm:leading-7"
              initial={shouldAnimate ? { y: 18, opacity: 0 } : false}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.22, duration: 0.58 }}
            >
              {heroCopy.description}
            </motion.p>

            <motion.div
              className="mt-7 flex flex-col items-start gap-3 sm:mt-9 sm:flex-row"
              initial={shouldAnimate ? { y: 18, opacity: 0 } : false}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.58 }}
            >
              <WhatsAppButton className="min-h-10 px-4 py-2.5" source="Hero" />
              <Link
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-white/35 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:border-[#E7A928] hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E7A928] sm:min-h-11 sm:px-5 sm:py-3"
                href="/oferta-academica"
              >
                Ver oferta académica
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <div
          aria-hidden="true"
          className="hero-concave absolute inset-x-0 -bottom-px z-10 h-24 scale-x-110 bg-[#061533] sm:h-28"
        />
      </div>
      </section>
    </div>
  );
}
