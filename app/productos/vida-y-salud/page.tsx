import Link from "next/link";
import Image from "next/image";
import { getPageData } from "@/lib/wordpress";

export default async function VidaSalud() {
    const data = await getPageData("vida-y-salud");
    const sections = data?.gutenberg_structure || [];

    // Extract Hero Section (First Section)
    const heroSection = sections[0];
    const heroBlocks = heroSection?.blocks || [];
    const heroTitle = heroBlocks.find((b: any) => b.type === "core/heading")?.content || "SEGUROS DE VIDA Y SALUD";
    const heroDesc = heroBlocks.find((b: any) => b.type === "core/paragraph")?.content || "Protegemos lo que más amas. Soluciones integrales para garantizar tu bienestar y el de tu familia en todo momento.";
    const heroBg = heroSection?.attributes?.style?.background?.backgroundImage?.url || "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=2591&auto=format&fit=crop";

    // Extract Products Grid (Second Section)
    const gridSection = sections[1];
    const columnsBlock = gridSection?.blocks?.find((b: any) => b.type === "core/columns");
    const columns = columnsBlock?.columns || [];

    const dynamicProducts = columns.map((col: any) => {
        const imgBlock = col.blocks?.find((b: any) => b.type === "core/image");
        const titleBlock = col.blocks?.find((b: any) => b.type === "core/paragraph" && !b.content.includes("Desde") && !b.content.includes("Cobertura") && !b.content.includes("resguardo"));
        const descBlock = col.blocks?.findLast((b: any) => b.type === "core/paragraph" && b !== titleBlock);
        const listBlock = col.blocks?.find((b: any) => b.type === "core/list");

        return {
            title: titleBlock?.content || "Producto",
            description: descBlock?.content || "",
            image: imgBlock?.url || "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2574&auto=format&fit=crop",
            list: listBlock?.items || []
        };
    });

    return (
        <main className="min-h-screen bg-[#121212]">
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                {/* Background Texture/Image */}
                <div className="absolute inset-0">
                    <Image
                        src={heroBg}
                        alt="Vida y Salud Background"
                        fill
                        className="object-cover opacity-50"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/60" />
                </div>

                <div className="relative z-10 text-center px-4 pt-20">
                    <h1
                        className="text-4xl md:text-7xl font-heading font-bold text-white mb-6 uppercase tracking-wider"
                        dangerouslySetInnerHTML={{ __html: heroTitle }}
                    />
                    <div className="w-20 h-1 bg-[#C5A065] mx-auto mb-6" />
                    <p
                        className="text-lg md:text-2xl text-gray-200 max-w-4xl mx-auto font-light leading-relaxed drop-shadow-lg"
                        dangerouslySetInnerHTML={{ __html: heroDesc }}
                    />
                </div>
            </section>

            {/* Products Grid */}
            <section className="container mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {dynamicProducts.map((product: any, index: number) => (
                        <div key={index} className="bg-[#1E1E1E] rounded-2xl overflow-hidden shadow-2xl hover:shadow-[#C5A065]/20 transition-all duration-500 group border border-white/5 flex flex-col h-full">
                            {/* Image Container */}
                            <div className="relative h-72 w-full overflow-hidden">
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] to-transparent opacity-60" />
                            </div>

                            {/* Content */}
                            <div className="p-10 flex-grow">
                                <h3
                                    className="text-[#C5A065] font-bold text-2xl mb-6 font-heading leading-tight"
                                    dangerouslySetInnerHTML={{ __html: product.title }}
                                />
                                <p
                                    className="text-gray-300 text-base leading-relaxed font-light mb-6"
                                    dangerouslySetInnerHTML={{ __html: product.description }}
                                />
                                {product.list && product.list.length > 0 && (
                                    <ul className="space-y-3">
                                        {product.list.map((item: string, i: number) => (
                                            <li key={i} className="flex items-start text-gray-400 text-sm font-light">
                                                <span className="text-[#C5A065] mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-[#C5A065] flex-shrink-0" />
                                                <span dangerouslySetInnerHTML={{ __html: item }} />
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
