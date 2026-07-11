import Image from "next/image";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  title: string;
  description: string;
  image: string;
  imageClassName?: string;
};

export function PageHero({
  title,
  description,
  image,
  imageClassName,
}: PageHeroProps) {
  return (
    <section className="relative isolate min-h-[21rem] overflow-hidden bg-[#04215e] text-white sm:min-h-[25rem] lg:min-h-[28rem]">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className={cn(
          "object-cover opacity-95 saturate-[1.02]",
          imageClassName,
        )}
      />
      <div className="absolute inset-0 bg-[#04215e]/42" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,33,94,0.96)_0%,rgba(4,33,94,0.84)_42%,rgba(4,33,94,0.48)_72%,rgba(4,33,94,0.72)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,33,94,0.94)_0%,rgba(4,33,94,0.78)_54%,rgba(4,33,94,0.62)_100%)] sm:hidden" />

      <div className="relative z-10 flex min-h-[21rem] items-center px-5 pb-14 pt-12 sm:min-h-[25rem] sm:px-8 sm:pb-16 lg:min-h-[28rem] lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="font-heading text-[clamp(2.45rem,10vw,4.8rem)] font-semibold leading-[0.96] tracking-normal text-balance">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-base font-normal leading-7 text-white/82 sm:text-lg sm:leading-8">
              {description}
            </p>
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
