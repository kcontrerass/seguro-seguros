import Link from "next/link";
import Image from "next/image";
import { link } from "fs";

const services = [
    {
        title: "Seguros de Vida y Salud",
        description: "Vida, gastos médicos, accidentes personales.",
        image: "https://images.unsplash.com/photo-1543269664-56d93c1b41a6?q=80&w=2670&auto=format&fit=crop",
        link: "productos/vida-y-salud"
    },
    {
        title: "Seguros Patrimoniales",
        description: "Vehículos, motocicletas, incendio, transporte, responsabilidad civil.",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2573&auto=format&fit=crop",
        link: "productos/patrimoniales",
        colSpan: true, // Make this one wider if we want grid variety, or keep standard
    },
    {
        title: "Seguros Diversos",
        description: "Fianzas, aviación, embarcaciones, maquinaria, etc.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2670&auto=format&fit=crop",
        link: "productos/diversos",
    },
    {
        title: "Seguros Especializados",
        description: "Seguros masivos y saldos deudores, microseguros, desempleo, agropecuario.",
        image: "https://images.unsplash.com/photo-1543269664-56d93c1b41a6?q=80&w=2670&auto=format&fit=crop",
        link: "productos/especializados",
    },
];

export default function ServicesGrid() {
    return (
        <section id="products" className=" bg-[#0E1015]">
            <div className=" mx-auto ">
                <div className="text-center mb-16 pt-20">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4 tracking-wide uppercase">
                        Nuestros Productos y Servicios
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Protección para cada necesidad, con asesoría experta.
                    </p>
                    <div className="w-16 h-1 bg-primary mx-auto mt-6"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    {services.map((service, index) => (
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
