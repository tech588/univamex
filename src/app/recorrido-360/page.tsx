import { redirect } from "next/navigation";

type RecorridoPageProps = {
  searchParams: Promise<{
    vista?: string;
  }>;
};

export default async function Recorrido360Page({
  searchParams,
}: RecorridoPageProps) {
  const { vista } = await searchParams;
  const target =
    vista === "canchas"
      ? "/campus?vista=canchas#recorrido-360"
      : "/campus#recorrido-360";

  redirect(target);
}
