import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, BarChart3, Globe, Heart } from "lucide-react";

export default function Hero({ data }: { data: any }) {
    // The section itself is the data passed from parent
    const mainBlocks = data?.blocks || [];

    // Extract background image from group attributes
    const backgroundImage = data?.attributes?.style?.background?.backgroundImage?.url ||
        "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop";

    // Extract heading and paragraph
    const headingBlock = mainBlocks.find((b: any) => b.type === "core/heading");
    const paragraphBlock = mainBlocks.find((b: any) => b.type === "core/paragraph");

    const title = headingBlock?.content || "Tu aliado estratégico en protección patrimonial y bienestar humano";
    const description = paragraphBlock?.content || "Asesoría independiente y personalizada para personas, PYMES y empresas en Guatemala";

    // Extract buttons
    const buttonsGroup = mainBlocks.find((b: any) => b.type === "core/group" && b.blocks?.some((sb: any) => sb.type === "core/buttons"));
    const buttonsBlock = buttonsGroup?.blocks?.find((sb: any) => sb.type === "core/buttons");
    const buttons = buttonsBlock?.buttons || [];

    // Extract features from columns
    const columnsBlock = mainBlocks.find((b: any) => b.type === "core/columns");
    const featureColumns = columnsBlock?.columns?.slice(1) || []; // Skip the first logo column

    // Extract logo from the first column
    const logoBlock = columnsBlock?.columns?.[0]?.blocks?.find((b: any) => b.type === "core/image");
    const logoUrl = logoBlock?.url || "/logohome.svg";

    const features = featureColumns.map((col: any) => {
        const textBlock = col.blocks?.find((b: any) => b.type === "core/paragraph");
        const imgBlock = col.blocks?.find((b: any) => b.type === "core/image");

        // Map back to Lucide icons for now to maintain UI consistency, or use the image URL
        let icon = ShieldCheck;
        const text = textBlock?.content || "";

        if (text.includes("Asesoría")) icon = BarChart3;
        if (text.includes("Cobertura")) icon = Globe;
        if (text.includes("Atención")) icon = Heart;

        return {
            icon,
            text,
            imgUrl: imgBlock?.url
        };
    });

    return (
        <section className="relative w-full  flex flex-col justify-center bg-black overflow-hidden">
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
            <div className="container mx-auto px-6 md:px-16 lg:px-24 relative z-10 pt-40 md:pt-50 flex-grow  flex flex-col justify-center min-h-[600px] md:min-h-[80vh]">
                <div className="max-w-4xl">
                    <h1
                        className="text-3xl md:text-5xl lg:text-5xl font-bold text-white leading-[1.1] max-w-4xl mb-6 font-heading"
                        dangerouslySetInnerHTML={{
                            __html: title
                                .replace(/ en /i, ' en <br /> ')
                                .replace(/(protección patrimonial)/i, '<span class="text-gold-gradient">$1</span> <br />')
                                .replace(/y (bienestar humano)/i, ' <span class="text-gold-gradient">$1</span>')
                        }}
                    />

                    {/* Gold Underline */}
                    <div className="w-24 h-1.5 bg-gold-gradient mb-8 rounded-full"></div>

                    <p className="text-lg md:text-2xl text-white font-sans max-w-2xl leading-relaxed mb-10 drop-shadow-md">
                        {description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5">
                        {buttons.length > 0 ? (
                            buttons.map((btn: any, idx: number) => (
                                <Link
                                    key={idx}
                                    href={btn.url || "#"}
                                    target={btn.linkTarget}
                                    rel={btn.rel}
                                    className={`px-8 py-4 ${idx === 0
                                        ? "bg-primary border border-primary text-black font-bold hover:bg-primary/90 shadow-primary/20"
                                        : "bg-black/40 backdrop-blur-sm border border-white/30 text-white font-medium hover:bg-white hover:text-black"
                                        } transition-all duration-300 text-center rounded-lg shadow-lg`}
                                >
                                    {btn.text}
                                </Link>
                            ))
                        ) : (
                            <>
                                <Link
                                    href="/contacto"
                                    className="px-8 py-4 bg-primary border border-primary text-black font-bold hover:bg-primary/90 transition-all duration-300 text-center rounded-lg shadow-lg shadow-primary/20"
                                >
                                    Solicita tu cotización
                                </Link>
                                <Link
                                    href="#productos"
                                    className="px-8 py-4 bg-black/40 backdrop-blur-sm border border-white/30 text-white font-medium hover:bg-white hover:text-black transition-all duration-300 text-center rounded-lg shadow-lg"
                                >
                                    Conoce nuestros productos
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom Features Strip & Logo */}
            <div className="container mx-auto px-6 md:px-16 lg:pl-24 relative z-20 pb-12 w-full">
                <div className="flex flex-col lg:flex-row items-end gap-8 mt-20 ">
                    {/* Stylized Logo S */}
                    <Image src={logoUrl} className="w-16 h-16 md:w-20 hidden lg:block  md:h-20 lg:mr-12" alt="Logo" width={60} height={60} />

                    {/* Features Bar */}
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden w-full">
                        {features.map((feature: any, index: number) => (
                            <div
                                key={index}
                                className={`
                        flex items-center gap-4 p-6
                        border-b lg:border-b-0 lg:border-r border-white/20 last:border-0
                        group hover:bg-white/5 transition-colors
                        `}
                            >
                                <div className="bg-white/10 p-2 rounded-full shrink-0">
                                    {feature.imgUrl ? (
                                        <Image src={feature.imgUrl} alt="" width={20} height={20} className="w-5 h-5" />
                                    ) : (
                                        <feature.icon className="w-5 h-5 text-primary" />
                                    )}
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

