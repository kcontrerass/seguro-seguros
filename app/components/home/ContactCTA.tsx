import Link from "next/link";

export default function ContactCTA() {
    return (
        <section id="contact" className="relative py-32 pl-0 md:pl-20 bg-[#0E1015] overflow-hidden">
            {/* Texture/Background Image */}
            <div
                className="absolute inset-0  bg-[url('/contactohome.png')] bg-cover bg-fixed bg-center "
            />

            <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="max-w-2xl">
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
                        CONTÁCTANOS
                    </h2>
                    <p className="text-xl text-gray-300 mb-8 max-w-lg">
                        Protege lo que más valoras con la asesoría correcta. Estamos listos para asesorarte en el seguro que mejor se adapte a ti.
                    </p>
                    <Link
                        href="/contacto" // Update with real contact link or modal trigger
                        className="inline-block px-10 py-4 bg-primary text-black font-bold text-lg rounded-sm hover:bg-white transition-colors duration-300 shadow-[0_0_20px_rgba(197,160,101,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                    >
                        Contáctanos
                    </Link>
                </div>

                {/* Abstract Gold Element placeholder - representing the 'S' or gold texture in the design */}
                <div className="hidden md:block w-64 h-64 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-[100px] absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none"></div>
            </div>
        </section>
    );
}
