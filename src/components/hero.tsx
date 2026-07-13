"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

const heroCopy = {
  title: "DECÍDETE A LLEGAR MÁS LEJOS",
};

const particles = [
  { cx: 18, cy: 24, r: 2.2, delay: 0 },
  { cx: 34, cy: 14, r: 1.6, delay: 0.32 },
  { cx: 52, cy: 24, r: 2.8, delay: 0.18 },
  { cx: 76, cy: 18, r: 1.8, delay: 0.46 },
  { cx: 86, cy: 42, r: 2.4, delay: 0.1 },
  { cx: 66, cy: 58, r: 1.7, delay: 0.56 },
  { cx: 42, cy: 72, r: 2.5, delay: 0.24 },
  { cx: 18, cy: 64, r: 1.6, delay: 0.68 },
  { cx: 28, cy: 44, r: 3.1, delay: 0.4 },
  { cx: 58, cy: 42, r: 1.4, delay: 0.78 },
] as const;

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const shouldAnimate = !reduceMotion;
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.82], [1, 0.82]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 42]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -28]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.74, 1], [1, 1, 0]);

  return (
    <section
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#04215e] text-white"
      ref={containerRef}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={
          reduceMotion
            ? undefined
            : {
                opacity: backgroundOpacity,
                scale: backgroundScale,
              }
        }
      >
        <Image
          src="/images/home-hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[58%_center]"
        />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-[#04215e]/32" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(4,33,94,0.94)_0%,rgba(4,33,94,0.84)_40%,rgba(4,33,94,0.52)_68%,rgba(4,33,94,0.74)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(4,33,94,0.94)_0%,rgba(4,33,94,0.86)_46%,rgba(4,33,94,0.64)_100%)] sm:hidden" />

      <motion.svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[-18vw] bottom-0 z-0 h-[58svh] w-[136vw] sm:hidden"
        viewBox="0 0 136 58"
        preserveAspectRatio="none"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <circle cx="32" cy="36" fill="#244aa8" opacity="0.82" r="9" />
        <circle cx="86" cy="22" fill="#244aa8" opacity="0.9" r="12" />
        <circle cx="124" cy="36" fill="#244aa8" opacity="0.84" r="10" />
        <path
          d="M20 54 H118"
          fill="none"
          stroke="#ffffff"
          strokeWidth="0.7"
        />
      </motion.svg>

      <motion.div
        className="group/portrait pointer-events-auto absolute bottom-0 right-[calc(-28vw+40px)] z-10 h-[82svh] w-[140vw] max-w-[55rem] sm:right-[calc(-15vw+40px)] sm:h-[124dvh] sm:w-[84vw] sm:max-w-[78rem] lg:right-[calc(-5vw+40px)] lg:h-[132dvh] lg:w-[76vw] lg:max-w-[86rem]"
        style={
          reduceMotion
            ? undefined
            : {
                y: portraitY,
                scale: portraitScale,
              }
        }
      >
        <motion.svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-[4%_0_7%_18%] z-0 opacity-70 transition duration-500 group-hover/portrait:scale-110 group-hover/portrait:opacity-100"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {particles.map((particle) => (
            <motion.circle
              cx={particle.cx}
              cy={particle.cy}
              fill="#ffffff"
              initial={reduceMotion ? false : { opacity: 0.18, scale: 0.86 }}
              animate={
                reduceMotion
                  ? undefined
                  : {
                      opacity: [0.2, 0.62, 0.2],
                      scale: [0.86, 1.18, 0.86],
                    }
              }
              key={`${particle.cx}-${particle.cy}`}
              r={particle.r}
              transition={{
                duration: 2.8,
                delay: particle.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
          <motion.path
            d="M10 70 C28 38 48 30 82 16"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.22"
            strokeWidth="0.7"
            strokeDasharray="2 6"
            initial={reduceMotion ? false : { pathLength: 0.2, opacity: 0.18 }}
            animate={
              reduceMotion
                ? undefined
                : { pathLength: [0.2, 1, 0.2], opacity: [0.18, 0.36, 0.18] }
            }
            transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.svg>

        <div className="absolute inset-0 z-10 origin-bottom transition-transform duration-500 ease-out group-hover/portrait:scale-[1.035]">
          <Image
            src="/images/foto-hero.webp"
            alt="Estudiante de UNIVAMEX sonriendo con carpeta"
            fill
            priority
            sizes="(min-width: 1024px) 76vw, (min-width: 640px) 84vw, 140vw"
            className="object-contain object-bottom"
          />
        </div>
      </motion.div>

      <div className="pointer-events-none relative z-20 flex min-h-[100svh] w-full items-start justify-center px-4 pb-16 pt-[9.75rem] sm:items-center sm:justify-start sm:px-8 sm:pb-20 sm:pt-28 lg:px-10">
        <motion.div
          className="pointer-events-auto mx-auto max-w-[22rem] text-center sm:mx-0 sm:ml-[30px] sm:max-w-[45vw] sm:text-left lg:max-w-[40rem]"
          initial={shouldAnimate ? { opacity: 0, y: 28 } : false}
          animate={{ opacity: 1, y: 0 }}
          style={
            reduceMotion
              ? undefined
              : {
                  opacity: contentOpacity,
                  y: contentY,
                }
          }
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.h1
            className="mx-auto max-w-[12ch] text-[clamp(2.15rem,9.6vw,3.35rem)] font-semibold uppercase leading-[0.96] tracking-normal text-balance [font-family:var(--font-hero)] sm:mx-0 sm:max-w-[11ch] sm:text-[clamp(3.35rem,4.65vw,5.25rem)]"
            initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.68, ease: "easeOut" }}
          >
            {heroCopy.title}
          </motion.h1>
        </motion.div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-16 bg-white [clip-path:polygon(0_72%,100%_36%,100%_100%,0_100%)] sm:h-20"
      />
    </section>
  );
}
