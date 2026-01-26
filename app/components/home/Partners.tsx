"use client"

import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import AutoScroll from "embla-carousel-auto-scroll"

export default function Partners({ data }: { data?: any }) {
    const [emblaRef] = useEmblaCarousel(
        { loop: true, dragFree: true },
        [AutoScroll({ speed: 1, stopOnInteraction: false })]
    )

    const mainBlocks = data?.blocks || [];

    // Extract images from the first group/block that has images
    const imagesGroup = mainBlocks.find((b: any) => b.type === "core/group" && b.blocks?.some((sb: any) => sb.type === "core/image"));
    const imageBlocks = imagesGroup?.blocks?.filter((sb: any) => sb.type === "core/image") || [];

    const partners = imageBlocks.map((img: any) => ({
        src: img.url,
        alt: img.alt || "Aseguradora"
    }));

    // Extract heading
    const headingBlock = mainBlocks.find((b: any) => b.type === "core/heading");
    const headingText = headingBlock?.content || "Trabajamos con las aseguradoras más sólidas de Guatemala e internacionales";

    if (partners.length === 0) return null;

    return (
        <section className="bg-primary py-24 overflow-hidden">
            <div className=" mx-auto px-6">
                {/* Carousel */}
                <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
                    <div className="flex items-center gap-10 md:gap-16">
                        {[...partners, ...partners, ...partners].map((partner, i) => (
                            <div key={i} className="flex-[0_0_auto] min-w-0 opacity-90 hover:opacity-100 transition-opacity">
                                <Image
                                    src={partner.src}
                                    alt={partner.alt}
                                    width={160}
                                    height={160}
                                    className="object-contain grayscale brightness-0 transition mr-10 duration-300 h-10 md:h-12 w-auto"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Text */}
                <div className="text-center mt-16 px-6">
                    <h3 className="text-gold-gradient-2 text-[#E6C046] font-heading tracking-widest text-lg md:text-xl uppercase max-w-4xl mx-auto leading-relaxed">
                        {headingText}
                    </h3>
                </div>
            </div>
        </section>
    )
}
