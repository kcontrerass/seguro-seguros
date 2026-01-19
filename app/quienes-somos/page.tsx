import Image from "next/image";
import Partners from "../components/home/Partners";
import { getAboutData } from "@/lib/wordpress";

export default async function QuienesSomos() {
    const data = await getAboutData();

    if (!data) {
        return (
            <main className="min-h-screen bg-black text-white flex items-center justify-center">
                <p>Cargando información...</p>
            </main>
        );
    }

    const blocks = data.gutenberg_structure || [];

    // 1. Hero Section
    const heroBlock = blocks.find((b: any) => b.attributes?.metadata?.name === "Seccion Introducción" || (b.type === "core/group" && b.attributes?.style?.background?.backgroundImage));
    const heroTitle = heroBlock?.blocks?.find((b: any) => b.type === "core/heading")?.content || "Quiénes Somos";
    const heroText = heroBlock?.blocks?.filter((b: any) => b.type === "core/paragraph").map((b: any) => b.content).join(" ") || "Somos una firma independiente que se dedica a ofrecer asesoría personalizada en seguros, adaptada a las necesidades de cada cliente.";
    const heroBg = heroBlock?.attributes?.style?.background?.backgroundImage?.url || "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=2000";

    // 2. Intro Text Section (find paragraphs outside the main big groups)
    const introParagraphs = blocks.filter((b: any, i: number) => b.type === "core/paragraph" && i > 0 && i < 4);

    // 3. Mission & Vision (core/columns)
    const missionVisionBlock = blocks.find((b: any) => b.type === "core/columns");
    const missionCol = missionVisionBlock?.columns?.[0];
    const visionCol = missionVisionBlock?.columns?.[1];

    const missionTitle = missionCol?.blocks?.find((b: any) => b.type === "core/heading")?.content || "Nuestra Misión";
    const missionText = missionCol?.blocks?.find((b: any) => b.type === "core/paragraph")?.content || "";

    const visionTitle = visionCol?.blocks?.find((b: any) => b.type === "core/heading")?.content || "Nuestra Visión";
    const visionText = visionCol?.blocks?.find((b: any) => b.type === "core/paragraph")?.content || "";

    // 4. Difference Section
    const differenceBlock = blocks.find((b: any, i: number) => b.type === "core/paragraph" && i > 4 && i < 6);

    // 5. Legal Support Section
    // Finding the second section with background image or by name
    const legalBlock = blocks.find((b: any, i: number) =>
        (b.attributes?.metadata?.name === "Seccion Introducción" && i > 0) ||
        (b.type === "core/group" && b.attributes?.style?.background?.backgroundImage && i > 0)
    );
    const legalTitle = legalBlock?.blocks?.find((b: any) => b.type === "core/heading")?.content || "Respaldo Legal y Supervisión";
    const legalText = legalBlock?.blocks?.find((b: any) => b.type === "core/paragraph")?.content || "";
    const legalBg = legalBlock?.attributes?.style?.background?.backgroundImage?.url || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=2000";

    // 6. Partners Section
    const partnersSection = blocks.find((b: any) => b.attributes?.metadata?.name === "Seccion Aseguradoras" || b.blocks?.some((sb: any) => sb.type === "core/group" && sb.blocks?.some((ssb: any) => ssb.type === "core/image")));

    return (
        <main className="min-h-screen bg-black text-white">
            {/* Hero Section */}
            <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src={heroBg}
                        alt={heroTitle}
                        fill
                        className="object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
                </div>

                <div className="relative z-10 text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4 uppercase tracking-wider">
                        {heroTitle}
                    </h1>
                    <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
                    <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-light">
                        {heroText}
                    </p>
                </div>
            </section>

            {/* Intro Text Section */}
            <section className="py-20 px-6 bg-black">
                <div className="container mx-auto max-w-4xl text-center">
                    {introParagraphs.map((p: any, i: number) => (
                        <p
                            key={i}
                            className={`text-lg md:text-xl text-gray-300 leading-relaxed font-light ${i > 0 ? "mt-8" : ""}`}
                            dangerouslySetInnerHTML={{ __html: p.content }}
                        />
                    ))}
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="py-20 px-6 bg-black">
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-center text-3xl md:text-4xl font-heading font-bold text-primary mb-16 uppercase tracking-wide">
                        Nuestro Compromiso
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        {/* Mision Card */}
                        <div className="bg-primary p-10 md:p-14 rounded-2xl shadow-lg transform hover:scale-[1.02] transition-transform duration-300 flex flex-col items-center text-center">
                            <h3 className="text-2xl font-heading font-bold text-white mb-6">{missionTitle}</h3>
                            <p className="text-white/90 text-lg leading-relaxed">
                                {missionText}
                            </p>
                        </div>

                        {/* Vision Card */}
                        <div className="bg-primary p-10 md:p-14 rounded-2xl shadow-lg transform hover:scale-[1.02] transition-transform duration-300 flex flex-col items-center text-center">
                            <h3 className="text-2xl font-heading font-bold text-white mb-6">{visionTitle}</h3>
                            <p className="text-white/90 text-lg leading-relaxed">
                                {visionText}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Difference Section */}
            {differenceBlock && (
                <section className="py-24 px-6 bg-[#0E1015]">
                    <div className="container mx-auto max-w-4xl text-center">
                        <p
                            className="text-xl md:text-2xl text-white font-medium leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: differenceBlock.content }}
                        />
                    </div>
                </section>
            )}

            {/* Legal Support Section (Parallax-ish) */}
            <section className="relative py-32 px-6 overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src={legalBg}
                        alt={legalTitle}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
                </div>

                <div className="container mx-auto relative z-10 max-w-6xl">
                    <div className="max-w-2xl">
                        <h2
                            className="text-3xl md:text-5xl font-heading font-bold text-primary mb-6"
                            dangerouslySetInnerHTML={{ __html: legalTitle }}
                        />
                        <p
                            className="text-lg md:text-xl text-white leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: legalText }}
                        />
                    </div>
                </div>
            </section>

            {/* Partners Footer Strip */}
            <Partners data={partnersSection} />
        </main>
    );
}
