import Link from "next/link";
import Image from "next/image";

export default function ServicesGrid({ data }: { data: any }) {
    const mainBlocks = data?.blocks || [];

    // Extract title and description
    const titleBlock = mainBlocks.find((b: any) => b.type === "core/heading");
    const descriptionBlock = mainBlocks.find((b: any) => b.type === "core/paragraph");

    const title = titleBlock?.content || "Nuestros Productos y Servicios";
    const description = descriptionBlock?.content || "Protección para cada necesidad, con asesoría experta.";

    // Extract columns for services
    const columnsBlock = mainBlocks.find((b: any) => b.type === "core/columns");
    const columns = columnsBlock?.columns || [];

    const services = columns.map((col: any) => {
        const imgBlock = col.blocks?.find((b: any) => b.type === "core/image");
        const groupBlock = col.blocks?.find((b: any) => b.type === "core/group");
        const headingBlock = groupBlock?.blocks?.find((b: any) => b.type === "core/heading");
        const paragraphBlock = groupBlock?.blocks?.find((b: any) => b.type === "core/paragraph");
        const buttonsBlock = groupBlock?.blocks?.find((b: any) => b.type === "core/buttons");
        const button = buttonsBlock?.buttons?.[0];

        return {
            title: headingBlock?.content || "",
            description: paragraphBlock?.content || "",
            image: imgBlock?.url || "https://images.unsplash.com/photo-1543269664-56d93c1b41a6?q=80&w=2670&auto=format&fit=crop",
            link: button?.url || "#"
        };
    });

    return (
        <section id="productos" className=" bg-[#0E1015]">
            <div className="mx-auto   ">
                <div className="text-center mb-16 pt-20 px-6">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4 tracking-wide uppercase">
                        {title}
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        {description}
                    </p>
                    <div className="w-16 h-1 bg-primary mx-auto mt-6"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
                    {services.map((service: any, index: number) => (
                        <div
                            key={index}
                            className="group relative h-[400px] overflow-hidden rounded-sm cursor-pointer"
                        >
                            <Image
                                src={service.image}
                                alt={service.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 transition-opacity duration-300" />

                            <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                <h3 className="text-xl font-bold text-white mb-2 font-heading">
                                    {service.title}
                                </h3>
                                <p className="text-sm text-gray-300 mb-6 line-clamp-2">
                                    {service.description}
                                </p>
                                <Link
                                    href={service.link}
                                    className="inline-block px-6 py-2 border border-white/30 text-white text-sm hover:bg-primary hover:border-primary hover:text-black transition-colors duration-300"
                                >
                                    Ver más
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
