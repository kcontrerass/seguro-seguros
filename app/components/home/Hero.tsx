import Link from "next/link";
import { getHeroData } from "@/lib/wordpress";
import Image from "next/image";
import { ShieldCheck, BarChart3, Globe, Heart } from "lucide-react";

export default async function Hero() {
    const data = await getHeroData();

    // Helper to find data in Gutenberg structure
    const findBlockByType = (blocks: any[], type: string): any => {
        for (const block of blocks) {
            if (block.type === type) return block;
            if (block.blocks) {
                const found: any = findBlockByType(block.blocks, type);
                if (found) return found;
            }
            if (block.columns) {
                for (const col of block.columns) {
                    const found: any = findBlockByType(col.blocks, type);
                    if (found) return found;
                }
            }
        }
        return null;
    };

    const headingBlock = data ? findBlockByType(data.gutenberg_structure, "core/heading") : null;
    const paragraphBlock = data ? findBlockByType(data.gutenberg_structure, "core/paragraph") : null;
    const imageBlock = data ? findBlockByType(data.gutenberg_structure, "core/image") : null;
    console.log(data?.gutenberg_structure[1].blocks[2].content);
    const descriptionBanner = data?.gutenberg_structure[1].blocks[2].content;
    const title = headingBlock?.content || "";
    const description = paragraphBlock?.content || "Asesoría independiente y personalizada para personas, PYMES y empresas en Guatemala.";
    const backgroundImage = imageBlock?.url || "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop";

    const features = [
        {
            icon: ShieldCheck,
            text: "Respaldo de las principales aseguradoras.",
        },
        {
            icon: BarChart3,
            text: "Asesoría profesional personalizada.",
        },
        {
            icon: Globe,
            text: "Cobertura integral para cada necesidad.",
        },
        {
            icon: Heart,
            text: "Atención cercana y confiable.",
        },
    ];

    return (
        <section className="relative w-full h-screen min-h-[800px] flex flex-col justify-center bg-black overflow-hidden">
            {/* Background Image Overlay */}
            <div
                className="absolute inset-0 opacity-60 bg-cover bg-center"
                style={{ backgroundImage: `url('${backgroundImage}')` }}
                aria-hidden="true"
            />

            {/* Gradient Overlay - Darker on the left/bottom */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            {/* Main Content */}
            <div className="container mx-auto px-6 md:px-16 lg:px-24 relative z-10 pt-20 flex-grow flex flex-col justify-center">
                <div className="max-w-4xl">
                    <h1 className="text-5xl md:text-2xl lg:text-4xl font-bold text-white leading-[1.1] w-[450px] mb-6 font-heading">
                        {title ? (
                            <div>
                                <span className="block">{title}</span>
                                <span className="block text-primary">
                                    {data?.gutenberg_structure?.[1]?.blocks?.[1]?.content || "EN PROTECCIÓN PATRIMONIAL"}
                                </span>
                            </div>
                        ) : (
                            <>
                                <span className="block">TU ALIADO ESTRATÉGICO</span>
                                <span className="block text-primary">EN PROTECCIÓN PATRIMONIAL</span>
                                <span className="block text-primary">Y BIENESTAR HUMANO</span>
                            </>
                        )}
                    </h1>


                    {/* Gold Underline */}
                    <div className="w-24 h-1.5 bg-primary mb-8 rounded-full"></div>

                    <p className="text-lg md:text-2xl text-white font-sans max-w-2xl leading-relaxed mb-10 drop-shadow-md">
                        {descriptionBanner}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5">
                        <Link
                            href="#contact"
                            className="px-8 py-4 bg-black/40 backdrop-blur-sm border border-white/30 text-white font-medium hover:bg-white hover:text-black transition-all duration-300 text-center rounded-lg shadow-lg"
                        >
                            Solicita tu cotización
                        </Link>
                        <Link
                            href="#products"
                            className="px-8 py-4 bg-primary border border-primary text-black font-bold hover:bg-primary/90 transition-all duration-300 text-center rounded-lg shadow-lg shadow-primary/20"
                        >
                            Conoce nuestros productos
                        </Link>
                    </div>
                </div>
            </div>

            {/* Bottom Features Strip & Logo */}
            <div className="container mx-auto px-6 md:px-16 lg:pl-24 relative z-20 pb-12 w-full">
                <div className="flex flex-col lg:flex-row items-end gap-8 mt-20 ">
                    {/* Stylized Logo S */}
                    <Image src="/logohome.svg" className="w-16 h-16 md:w-20 hidden lg:block  md:h-20 lg:mr-12" alt="Logo" width={60} height={60} />

                    {/* Features Bar */}
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden w-full">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className={`
                        flex items-center gap-4 p-6
                        border-b lg:border-b-0 lg:border-r border-white/20 last:border-0
                        group hover:bg-white/5 transition-colors
                        `}
                            >
                                <div className="bg-white/10 p-2 rounded-full shrink-0">
                                    <feature.icon className="w-5 h-5 text-primary" />
                                </div>
                                <p className="text-[15px] font-medium text-white/90 leading-tight">
                                    {feature.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

