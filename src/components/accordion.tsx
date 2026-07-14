import type { StudyBlock } from "@/types/content";

type AccordionProps = {
  items: StudyBlock[];
};

export function Accordion({ items }: AccordionProps) {
  return (
    <div className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
      {items.map((item, index) => (
        <details
          className="group p-5 open:bg-slate-50"
          key={item.title}
          open={index === 0}
        >
          <summary className="cursor-pointer list-none font-editorial text-lg font-semibold leading-snug text-[#04215e]">
            <span className="flex items-center justify-between gap-4">
              {item.title}
              <span className="text-2xl leading-none text-[#1E40AF] group-open:rotate-45">
                +
              </span>
            </span>
          </summary>
          <ul className="mt-4 grid gap-2 text-sm leading-6 text-slate-700 sm:grid-cols-2">
            {item.items.map((entry) => (
              <li className="rounded-md bg-white px-3 py-2" key={entry}>
                {entry}
              </li>
            ))}
          </ul>
        </details>
      ))}
    </div>
  );
}



