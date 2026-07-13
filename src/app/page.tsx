import { Hero } from "@/components/hero";
import { ProgramLevelsBento } from "@/components/program-levels-bento";
import { StickyStorytelling } from "@/components/sticky-storytelling";
import { VirtualTour } from "@/components/virtual-tour";

type HomeProps = {
  searchParams: Promise<{
    vista?: string;
  }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const { vista } = await searchParams;

  return (
    <main className="home-main">
      <Hero />
      <ProgramLevelsBento />
      <StickyStorytelling />
      <section
        className="bg-[#f8fafc] px-5 py-16 sm:px-8 lg:px-10"
        id="recorrido-360"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-bold uppercase text-[#b45309]">
              Campus Ciudad Azteca
            </p>
            <h2 className="mt-3 font-heading text-4xl font-bold leading-tight text-[#071a3d] sm:text-5xl">
              Recorrido virtual 360
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Explora visualmente espacios clave de UNIVAMEX desde el
              navegador. Usa el mouse, el dedo o los controles del visor para
              girar, acercarte y cambiar de vista.
            </p>
          </div>

          <VirtualTour initialSceneId={vista} />
        </div>
      </section>
    </main>
  );
}
