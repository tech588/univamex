import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
      )}
    >
      <h2 className="font-heading text-[1.75rem] font-semibold leading-[1.04] tracking-normal text-[#04215e] sm:text-4xl sm:leading-[0.98] lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-base leading-6 text-slate-600 sm:mt-4 sm:text-lg sm:leading-8">{description}</p>
      ) : null}
    </div>
  );
}



