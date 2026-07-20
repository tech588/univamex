import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  title: string;
  description: string;
  image: string;
  imageFit?: "cover" | "contain";
  imageClassName?: string;
  eyebrow?: string;
  actions?: ReactNode;
  immersive?: boolean;
};

export function PageHero({
  title,
  description,
  image,
  imageFit = "cover",
  imageClassName,
  eyebrow,
  actions,
  immersive = false,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-[#04215e] text-white",
        immersive
          ? "min-h-[44rem] sm:min-h-[48rem] lg:min-h-[50rem]"
          : "min-h-[26rem] sm:min-h-[30rem] lg:min-h-[34rem]",
      )}
    >
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className={cn(
          imageFit === "contain" ? "object-contain" : "object-cover",
          "opacity-95 saturate-[1.02]",
          imageClassName,
        )}
      />
      <div className="absolute inset-0 bg-[#04215e]/42" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,33,94,0.96)_0%,rgba(4,33,94,0.84)_42%,rgba(4,33,94,0.48)_72%,rgba(4,33,94,0.72)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,33,94,0.94)_0%,rgba(4,33,94,0.78)_54%,rgba(4,33,94,0.62)_100%)] sm:hidden" />

      <div
        className={cn(
          "relative z-10 flex items-center px-5 sm:px-8 lg:px-10",
          immersive
            ? "min-h-[44rem] pb-24 pt-[8.5rem] sm:min-h-[48rem] sm:pb-28 sm:pt-[9rem] lg:min-h-[50rem]"
            : "min-h-[26rem] pb-14 pt-12 sm:min-h-[30rem] sm:pb-16 lg:min-h-[34rem]",
        )}
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-3xl">
            {eyebrow ? (
              <p className="mb-4 text-sm font-bold text-[#e7a928]">{eyebrow}</p>
            ) : null}
            <h1 className={cn(
              "font-semibold leading-[0.96] tracking-[-0.025em] text-balance [font-family:var(--font-hero)]",
              immersive
                ? "max-w-[12ch] text-[clamp(2.55rem,10vw,3.25rem)] sm:text-[clamp(4rem,6.4vw,5.5rem)]"
                : "text-[clamp(2.45rem,10vw,4.8rem)]",
            )}>
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-base font-normal leading-7 text-white/82 sm:text-lg sm:leading-8">
              {description}
            </p>
            {actions}
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 z-20 h-14 bg-[#F8FAFC] [clip-path:polygon(0_72%,100%_36%,100%_100%,0_100%)] sm:h-16"
      />
    </section>
  );
}
