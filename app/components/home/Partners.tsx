"use client"

import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import AutoScroll from "embla-carousel-auto-scroll"

const partners = [
    { src: "/ficosa.svg", alt: "Aseguradora General" },
    { src: "/elroble.svg", alt: "Privanza" },
    { src: "/mapfre.svg", alt: "El Roble" },
    { src: "/assa1.png", alt: "Universales" },
    { src: "/panamerican1.svg", alt: "Pan American Life" },
    { src: "/uni.svg", alt: "ASSA" },
    { src: "/capa.svg", alt: "BAM" },
]

export default function Partners() {
    const [emblaRef] = useEmblaCarousel(
        { loop: true, dragFree: true },
        [AutoScroll({ speed: 1, stopOnInteraction: false })]
    )

    return (
        <section className="bg-primary py-16 overflow-hidden">
            <div className=" mx-auto px-6">
                {/* Carousel */}
                <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
                    <div className="flex items-center gap-10 md:gap-16">
                        {[...partners, ...partners, ...partners].map((partner, i) => (
                            <div key={i} className="flex-[0_0_auto] min-w-0 opacity-90 hover:opacity-100 transition-opacity">
                                <Image
                                    src={partner.src}
                                    alt={partner.alt}
                                    width={60}
                                    height={60}
                                    className="object-contain grayscale hover:grayscale-0 transition mr-10 duration-300  w-auto"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Text */}
                <div className="text-center mt-16">
                    <h3 className="text-white/90 font-heading tracking-widest text-lg md:text-xl uppercase">
                        Trabajamos con las aseguradoras más sólidas <br className="hidden md:block" />
                        de Guatemala e Internacionales
                    </h3>
                </div>
            </div>
        </section>
    )
}
