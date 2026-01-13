import Link from "next/link";
import { getHeroData } from "@/lib/wordpress";
import Image from "next/image";
import { ShieldCheck, BarChart3, Globe, Heart } from "lucide-react";

export default async function Hero() {
    const data = await getHeroData();

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
                className="absolute inset-0 opacity-60 bg-[url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop')] bg-cover bg-center"
                aria-hidden="true"
            />

            {/* Gradient Overlay - Darker on the left/bottom */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            {/* Main Content */}
            <div className="container mx-auto px-30 relative z-10 pt-20 flex-grow flex flex-col justify-center">
                <div className="max-w-4xl">
                    <h1 className="text-5xl md:text-2xl lg:text-4xl font-bold text-white leading-[1.1] mb-6 font-heading">
                        <span className="block">TU ALIADO ESTRATÉGICO</span>
                        <span className="block text-primary">EN PROTECCIÓN PATRIMONIAL</span>
                        <span className="block text-primary">Y BIENESTAR HUMANO</span>
                    </h1>

                    {/* Gold Underline */}
                    <div className="w-24 h-1.5 bg-primary mb-8 rounded-full"></div>

                    <p className="text-xl md:text-2xl text-white font-sans max-w-2xl leading-relaxed mb-10 drop-shadow-md">
                        Asesoría independiente y personalizada para personas,
                        PYMES y empresas en Guatemala.
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
            <div className="container mx-auto pl-30 relative z-20 pb-12 w-full">
                <div className="flex flex-col md:flex-row items-end gap-8">
                    {/* Stylized Logo S */}
                    <Image src="/logohome.svg" className="w-20 h-20 mr-30" alt="Logo" width={60} height={60} />

                    {/* Features Bar */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className={`
                        flex items-center gap-4 p-6
                        ${index !== features.length - 1 ? "border-b md:border-b-0 md:border-r border-white/20" : ""}
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

