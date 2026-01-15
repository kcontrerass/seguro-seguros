"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Testimonials() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
        Autoplay({ delay: 5000 }),
    ]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on("select", () => {
            setSelectedIndex(emblaApi.selectedScrollSnap());
        });
    }, [emblaApi]);

    const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
    const scrollNext = () => emblaApi && emblaApi.scrollNext();

    const testimonials = [
        {
            name: "Juan Pérez",
            role: "Gerente de Operaciones, Inversiones ABC",
            quote: "Gracias a SEGURO SEGUROS, nuestra empresa ahora cuenta con cobertura completa y personalizada. La asesoría fue cercana y profesional desde el primer contacto.",
        },
        {
            name: "María Rodríguez",
            role: "Directora RRHH, Tech Solutions",
            quote: "El acompañamiento que brindan es excepcional. Nos ayudaron a estructurar un plan de vida y salud para nuestros colaboradores que realmente funciona.",
        },
        {
            name: "Carlos Méndez",
            role: "Propietario, Constructora Méndez",
            quote: "Excelente servicio en seguros patrimoniales. Gestionaron nuestro reclamo de manera rápida y eficiente, protegiendo nuestra maquinaria.",
        },
        {
            name: "Ana López",
            role: "Emprendedora",
            quote: "Me ayudaron a encontrar el seguro médico perfecto para mi familia. Me siento tranquila sabiendo que estamos protegidos por los mejores.",
        },
    ];

    return (
        <section className="py-24 bg-[#14161C] border-t border-white/5 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="mb-12 text-left relative md:ml-32">
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-2 uppercase">
                        LO QUE DICEN NUESTROS CLIENTES
                    </h2>
                    <h3 className="text-3xl md:text-5xl font-heading font-bold text-primary uppercase">
                        SOBRE NOSOTROS
                    </h3>
                </div>

                <div className="relative w-full md:ml-32">
                    {/* Carousel Viewport */}
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex -ml-4">
                            {testimonials.map((t, i) => (
                                <div key={i} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] min-w-0 pl-4">
                                    <div className="bg-[#1F1F1F] p-8 md:p-10 h-full rounded-md flex flex-col items-start text-left">

                                        <div className="mb-6">
                                            <p className="text-primary font-bold text-lg mb-1">{t.name}</p>
                                            <p className="text-sm text-white/80 font-normal">
                                                {t.role}
                                            </p>
                                        </div>

                                        <p className="text-base md:text-lg text-gray-300 leading-relaxed font-light">
                                            &ldquo;{t.quote}&rdquo;
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
