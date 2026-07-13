import { redirect } from "next/navigation";

type LegacyTourPageProps = {
  params: Promise<{
    id: string;
    slug: string;
  }>;
};

export function generateStaticParams() {
  return [
    { id: "1", slug: "univamex-interior-cd-azteca" },
    { id: "2", slug: "univamex-canchas-cd-azteca" },
  ];
}

export default async function LegacyTourPage({ params }: LegacyTourPageProps) {
  const { id } = await params;
  const vista = id === "2" ? "canchas" : "explanada";

  redirect(`/campus?vista=${vista}#recorrido-360`);
}
