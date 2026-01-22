import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { getPageData } from "@/lib/wordpress";
import ContactForm from "@/app/components/contacto/ContactForm";

export default async function Contacto() {
    // Parallel fetch for all product categories
    const slugs = ["vida-y-salud", "patrimoniales", "especializados", "diversos"];
    const [contactoData, ...productPagesData] = await Promise.all([
        getPageData("contacto"),
        ...slugs.map(slug => getPageData(slug))
    ]);

    const sections = contactoData?.gutenberg_structure || [];

    // Extract categories and products for the dropdowns
    const categories = slugs.map((slug, index) => {
        const pageData = productPagesData[index];
        const gridSection = pageData?.gutenberg_structure?.[1];
        const columns = gridSection?.blocks?.find((b: any) => b.type === "core/columns")?.columns || [];

        const products = columns.map((col: any) => {
            const titleBlock = col.blocks?.find((b: any) => b.type === "core/paragraph" && !b.content.includes("Desde") && !b.content.includes("Cobertura") && !b.content.includes("resguardo"));
            return titleBlock?.content || "Producto";
        });

        // Map slug to readable title
        const titles: { [key: string]: string } = {
            "vida-y-salud": "Vida y Salud",
            "patrimoniales": "Patrimoniales",
            "especializados": "Especializados",
            "diversos": "Diversos"
        };

        return {
            id: slug,
            title: titles[slug] || slug.replace(/-/g, " "),
            products: products
        };
    });

    // Extract Hero Section
    const heroSection = sections[0];
    const heroBg = heroSection?.attributes?.style?.background?.backgroundImage?.url || "/contactohome.png";
    const heroContentGroup = heroSection?.blocks?.[0];
    const heroTitle = heroContentGroup?.blocks?.find((b: any) => b.type === "core/heading")?.content || "CONTACTO";
    const heroDesc = heroContentGroup?.blocks?.find((b: any) => b.type === "core/paragraph")?.content || "Elige la forma más conveniente de comunicarte con SESE Corredores de Seguros y recibe asesoría personalizada para tus seguros.";

    // Extract Channels Strip (Second Section)
    const channelsSection = sections[1];
    const channelsCols = channelsSection?.blocks?.[0]?.blocks?.find((b: any) => b.type === "core/columns")?.columns || [];

    const rawChannelsTitle = channelsCols[0]?.blocks?.[0]?.content || "Nuestros canales directos";
    const words = rawChannelsTitle.split(' ');
    const channelsTitle = words.length >= 3
        ? `${words[0]} <br /> ${words.slice(1).join(' ')}`
        : rawChannelsTitle;
    const phoneInfo = channelsCols[1]?.blocks?.[1]?.content || "+502 4811 9511";
    const emailInfo = channelsCols[2]?.blocks?.[1]?.content || "info@sesecorredores.com";
    const locationInfo = channelsCols[3]?.blocks?.[1]?.content || "Via 4 1-00 zona 4 Campus Tecnológico, Edificio TEC II, Nivel 5 Oficina 504, Ciudad Guatemala";

    const whatsappBlock = channelsCols[4]?.blocks?.find((b: any) => b.type === "core/image");
    const whatsappIcon = whatsappBlock?.url || "https://segurosegurosbe.aumenta.do/wp-content/uploads/2026/01/whatsapp.svg";
    const whatsappUrl = `https://wa.me/${phoneInfo.replace(/[^0-9]/g, '')}`;
    const whatsappText = channelsCols[4]?.blocks?.find((b: any) => b.type === "core/paragraph")?.content || "Escríbenos ahora";

    // Extract Schedule Section (Third Section)
    const scheduleSection = sections[2];
    const scheduleCols = scheduleSection?.blocks?.find((b: any) => b.type === "core/columns")?.columns || [];
    const scheduleBlocks = scheduleCols[1]?.blocks || [];

    const schedulePreTitle = scheduleBlocks[0]?.content || "Contáctanos";
    const scheduleTitle = scheduleBlocks[1]?.content || "Horario de atención";
    const scheduleDesc = scheduleBlocks[2]?.content || "Queremos estar disponibles cuando más lo necesites.";
    const scheduleLabel = scheduleBlocks[3]?.content || "Lunes a Viernes:";
    const scheduleTime = scheduleBlocks[4]?.content || "9:00 am – 6:00 pm";
    const scheduleNote = scheduleBlocks[5]?.content || "Atención personalizada con cita previa";

    return (
        <main className="min-h-screen bg-[#0E1015]">

            {/* HERO */}
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src={heroBg}
                        alt="Contacto Background"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 hero-overlay" />
                </div>

                <div className="relative z-10 text-center px-6 pt-28">
                    <h1
                        className="text-5xl md:text-[55px] font-heading font-bold text-white uppercase tracking-widest mb-4"
                        dangerouslySetInnerHTML={{ __html: heroTitle }}
                    />
                    <div className="w-20 h-[3px] bg-gold-gradient mx-auto mb-6" />
                    <p
                        className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-40"
                        dangerouslySetInnerHTML={{ __html: heroDesc }}
                    />
                </div>
            </section>

            {/* STRIP DE CONTACTO */}
            <div className="mx-auto relative z-20 pb-12 w-full -mt-20 mb-12 md:mb-32 px-6 md:px-20">
                <div className="flex flex-col xl:flex-row md:items-end items-center gap-8">
                    <span
                        className="text-xl md:text-[30px] font-heading relative font-[400]  -top-10 text-gold-gradient uppercase"
                        dangerouslySetInnerHTML={{ __html: channelsTitle }}
                    />

                    {/* Features Bar */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden shadow-2xl">
                        {/* Phone */}
                        <a
                            href={`tel:${phoneInfo.replace(/[^0-9+]/g, '')}`}
                            className="flex items-center gap-4 p-6 md:p-10 border-b md:border-b-0 md:border-r border-white/10 group hover:bg-white/5 transition-colors"
                        >
                            <p className="text-[15px] font-medium text-white/90 leading-tight">
                                <strong className="uppercase">Teléfono</strong>
                                <br /><br />
                                <span dangerouslySetInnerHTML={{ __html: phoneInfo }} />
                            </p>
                        </a>

                        {/* Email */}
                        <a
                            href={`mailto:${emailInfo}`}
                            className="flex items-center gap-4 p-6 border-b md:border-b-0 md:border-r border-white/10 group hover:bg-white/5 transition-colors"
                        >
                            <p className="text-[15px] font-medium text-white/90 leading-tight break-all">
                                <strong className="uppercase">Correo</strong>
                                <br /><br />
                                <span dangerouslySetInnerHTML={{ __html: emailInfo }} />
                            </p>
                        </a>

                        {/* Location */}
                        <div className="flex items-center gap-4 p-6 border-b md:border-b-0 md:border-r border-white/10 group hover:bg-white/5 transition-colors">
                            <p className="text-[15px] font-medium text-white/90 leading-tight">
                                <strong className="uppercase">Ubicación</strong>
                                <br /><br />
                                <span dangerouslySetInnerHTML={{ __html: locationInfo }} />
                            </p>
                        </div>

                        {/* WhatsApp */}
                        <Link
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-6 bg-primary hover:bg-[#b08d55] transition-colors group cursor-pointer justify-center md:justify-start"
                        >
                            <div className="relative w-10 h-10">
                                <Image
                                    src={whatsappIcon}
                                    alt="WhatsApp"
                                    fill
                                    className="object-contain brightness-0 invert"
                                />
                            </div>
                            <p
                                className="text-[15px] font-bold text-white leading-tight"
                                dangerouslySetInnerHTML={{ __html: whatsappText }}
                            />
                        </Link>
                    </div>
                </div>
            </div>

            {/* FORM + HORARIO */}
            <section className="pb-28 px-6 bg-gradient-to-b from-[#0E1015] to-black">
                <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                    {/* FORM */}
                    <ContactForm categories={categories} />

                    {/* HORARIO */}
                    <div className="pt-16 space-y-10 ">
                        <div className="pl-6">
                            <span
                                className="text-white uppercase tracking-widest text-sm"
                                dangerouslySetInnerHTML={{ __html: schedulePreTitle }}
                            />
                            <p
                                className="text-gray-300 text-lg md:text-[25px] mt-4"
                                dangerouslySetInnerHTML={{ __html: scheduleDesc }}
                            />
                        </div>

                        <div className="pl-6 space-y-6">
                            <h2
                                className="text-3xl md:text-[45px] font-heading font-bold text-gold-gradient mb-6"
                                dangerouslySetInnerHTML={{ __html: scheduleTitle }}
                            />
                            <p className="text-white">
                                <span className="text-gold-gradient font-bold text-lg md:text-[25px]">
                                    <span dangerouslySetInnerHTML={{ __html: scheduleLabel }} />{" "}
                                    <span
                                        className="text-lg md:text-[25px] font-light text-white"
                                        dangerouslySetInnerHTML={{ __html: scheduleTime }}
                                    />
                                </span>
                            </p>

                            <p
                                className="text-white text-lg md:text-[25px] flex items-center gap-3"
                                dangerouslySetInnerHTML={{ __html: scheduleNote }}
                            />
                        </div>
                    </div>

                </div>
            </section>
        </main>
    );
}
