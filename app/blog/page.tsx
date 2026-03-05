import Image from "next/image";
import { getPageData } from "@/lib/wordpress";

export default async function Blog() {
    const data = await getPageData("blog");
    const sections = data?.gutenberg_structure || [];

    // Extract Hero Section (First Section - core/group)
    const heroSection = sections[0];
    const heroBlocks = heroSection?.blocks || [];
    const heroBg = heroSection?.attributes?.style?.background?.backgroundImage?.url || "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop";

    // The hero in the API has 3 paragraphs. We'll combine the first two for the title and the third for the description.
    const heroTitle1 = heroBlocks[0]?.content || "PORQUE ENTENDER TU SEGURO";
    const heroTitle2 = heroBlocks[1]?.content || "NO DEBERÍA SER COMPLICADO.";
    const heroDesc = heroBlocks[2]?.content || "En SESE creemos que un cliente informado toma mejores decisiones. Aquí te explicamos los seguros de forma simple y práctica.";

    // Content sections starting from index 1
    const contentSections = sections.slice(1);

    return (
        <main className="min-h-screen bg-[#0E1015] text-white">
            {/* HER SECCION */}
            <section className="relative h-[80vh] flex items-center overflow-hidden">
                <Image
                    src={heroBg}
                    alt="Entender tu seguro"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0E1015]" />

                <div className="relative z-10 container mx-auto px-6 md:px-12">
                    <div>
                        <h1 className="text-4xl md:text-[55px] font-heading font-bold mb-6 leading-tight uppercase">
                            <span dangerouslySetInnerHTML={{ __html: heroTitle1 }} /> <br />
                            <span className="text-gold-gradient" dangerouslySetInnerHTML={{ __html: heroTitle2 }} />
                        </h1>
                        <div className="w-20 h-1 bg-gold-gradient mb-8" />
                        <p
                            className="text-xl md:text-2xl text-gray-200 font-light leading-relaxed max-w-3xl"
                            dangerouslySetInnerHTML={{ __html: heroDesc }}
                        />
                    </div>
                </div>
            </section>

            {/* CONTENIDO EDUCATIVO */}
            <section className="py-24 px-6 bg-[#0E1015]">
                <div className="container mx-auto max-w-6xl">
                    <div className="space-y-32">
                        {contentSections.map((section: any, sectionIdx: number) => {
                            if (section.type === "core/columns") {
                                return (
                                    <div key={sectionIdx} className="grid grid-cols-1 md:grid-cols-2 gap-20">
                                        {section.columns.map((column: any, colIdx: number) => (
                                            <div key={colIdx} className="space-y-4">
                                                {column.blocks.map((block: any, blockIdx: number) => {
                                                    if (block.type === "core/paragraph") {
                                                        const formattedBlock = (block.content || "")
                                                            .replace("Vitalicio no significa", "👉 Vitalicio no significa");
                                                        const isTitle = block.attributes?.align === "center" || block.content.length < 30;
                                                        const isDeducibleIntro = block.content?.includes("El deducible es la parte del siniestro");
                                                        return (
                                                            <div key={blockIdx}>
                                                                {isTitle ? (
                                                                    <h3
                                                                        className={`font-heading font-bold text-white mb-6 ${block.attributes?.align === "center" ? "text-3xl text-center" : "text-xl uppercase tracking-wider"}`}
                                                                        dangerouslySetInnerHTML={{ __html: formattedBlock }}
                                                                    />
                                                                ) : (
                                                                    <p
                                                                        className="text-gray-300 text-lg leading-relaxed"
                                                                        dangerouslySetInnerHTML={{ __html: formattedBlock }}
                                                                    />
                                                                )}
                                                                {isDeducibleIntro && (
                                                                    <div className="mt-4 overflow-x-auto">
                                                                        <table className="w-full text-sm border-collapse border border-gray-600 text-gray-300">
                                                                            <thead>
                                                                                <tr className="bg-white/10">
                                                                                    <th className="border border-gray-600 px-3 py-2 text-left font-bold text-white">Tipo de póliza</th>
                                                                                    <th className="border border-gray-600 px-3 py-2 text-left font-bold text-white">Forma del deducible</th>
                                                                                    <th className="border border-gray-600 px-3 py-2 text-left font-bold text-white">Momento de aplicación *</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td className="border border-gray-600 px-3 py-2">Automóvil</td>
                                                                                    <td className="border border-gray-600 px-3 py-2">% o monto fijo</td>
                                                                                    <td className="border border-gray-600 px-3 py-2">Por siniestro</td>
                                                                                </tr>
                                                                                <tr className="bg-white/5">
                                                                                    <td className="border border-gray-600 px-3 py-2">Gastos médicos</td>
                                                                                    <td className="border border-gray-600 px-3 py-2">Monto fijo</td>
                                                                                    <td className="border border-gray-600 px-3 py-2">Anual o por evento</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td className="border border-gray-600 px-3 py-2">Incendio</td>
                                                                                    <td className="border border-gray-600 px-3 py-2">% o monto fijo</td>
                                                                                    <td className="border border-gray-600 px-3 py-2">Por siniestro</td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                        <p className="text-xs text-gray-500 mt-2">* El deducible aplica conforme a las condiciones de la póliza y al producto contratado con cada aseguradora.</p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        );
                                                    }
                                                    if (block.type === "core/list") {
                                                        return (
                                                            <ul key={blockIdx} className="space-y-2 text-gray-300 leading-relaxed text-lg list-disc pl-6">
                                                                {block.items.map((item: string, i: number) => {
                                                                    const formattedItem = item
                                                                        .replace("Valor real:", '<span class="font-extrabold text-white">Valor real:</span>')
                                                                        .replace("Valor de reposición:", '<span class="font-extrabold text-white">Valor de reposición:</span>');
                                                                    return <li key={i} dangerouslySetInnerHTML={{ __html: formattedItem }} />;
                                                                })}
                                                            </ul>
                                                        );
                                                    }
                                                    return null;
                                                })}
                                            </div>
                                        ))}
                                    </div>
                                );
                            }

                            if (section.type === "core/paragraph") {
                                console.log(section.content);
                                const formattedContent = (section.content || "")
                                    .replace("Vitalicio no significa", "👉 Vitalicio no significa");
                                return (
                                    <div key={sectionIdx} className=" text-left mx-auto mb-0">
                                        <div
                                            className="text-lg md:text-2xl text-white text-balance  font-light leading-relaxed "
                                            dangerouslySetInnerHTML={{ __html: formattedContent }}
                                        />
                                    </div>
                                );
                            }

                            return null;
                        })}
                    </div>
                </div>
            </section>
        </main >
    );
}
