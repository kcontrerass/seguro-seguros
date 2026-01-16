"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";

export default function Testimonials({ data }: { data: any }) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
        Autoplay({ delay: 5000 }),
    ]);
    const [, setSelectedIndex] = useState(0);

    const mainBlocks = data?.blocks || [];

    // Extract heading
    const headingBlock = mainBlocks.find((b: any) => b.type === "core/heading");
    const headingContent = headingBlock?.content || "Lo que dicen nuestros clientes sobre nosotros";

    // Split title by some logic or just use as is
    const titleParts = headingContent.split(" sobre nosotros");
    const mainTitle = titleParts[0] || "LO QUE DICEN NUESTROS CLIENTES";
    const subTitle = titleParts.length > 1 ? "SOBRE NOSOTROS" : "";

    // Extract testimonials from columns
    const columnsBlock = mainBlocks.find((b: any) => b.type === "core/columns");
    const columns = columnsBlock?.columns || [];

    const testimonials = columns.map((col: any) => {
        const paragraphs = col.blocks?.filter((b: any) => b.type === "core/paragraph") || [];
        return {
            name: paragraphs[0]?.content || "Cliente",
            role: paragraphs[1]?.content || "",
            quote: paragraphs[2]?.content || "",
        };
    });

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on("select", () => {
            setSelectedIndex(emblaApi.selectedScrollSnap());
        });
    }, [emblaApi]);

    if (testimonials.length === 0) return null;

    return (
        <section className="py-24 bg-[#14161C] border-t border-white/5 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="mb-12 text-left relative md:ml-32">
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-2 uppercase">
                        {mainTitle}
                    </h2>
                    {subTitle && (
                        <h3 className="text-3xl md:text-5xl font-heading font-bold text-primary uppercase">
                            {subTitle}
                        </h3>
                    )}
                </div>

                <div className="relative w-full md:ml-32">
                    {/* Carousel Viewport */}
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex -ml-4">
                            {testimonials.map((t: any, i: number) => (
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
