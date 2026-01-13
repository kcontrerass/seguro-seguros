import Link from "next/link";
import Image from "next/image";

const products = [
    {
        title: "Seguro Médico (Gastos Médicos)",
        description: "Cobertura integral para ti y tu familia. Incluye consultas, hospitalización, maternidad y atención de emergencias con una amplia red de proveedores.",
        image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=2591&auto=format&fit=crop" // Doctor/Medical
    },
    {
        title: "Seguro de Vida",
        description: "Garantiza el futuro económico de tus seres queridos. Opciones flexibles de protección, ahorro y educación para brindar tranquilidad absoluta.",
        image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2670&auto=format&fit=crop" // Family
    },
    {
        title: "Accidentes Personales",
        description: "Respaldo económico inmediato ante lesiones corporales, muerte accidental o incapacidad ocasionada por accidentes imprevistos.",
        image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2574&auto=format&fit=crop" // Activity
    },
    {
        title: "Plan Dental",
        description: "Cuida tu sonrisa con acceso a tratamientos preventivos y correctivos, limpiezas y procedimientos dentales especializados.",
        image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=2574&auto=format&fit=crop" // Dental (Abstract)
    }
];

export default function VidaSalud() {
    return (
        <main className="min-h-screen bg-[#121212]">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                {/* Background Texture/Image */}
                <div className="absolute inset-0">
                    <Image
                        src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=2591&auto=format&fit=crop" // Wellness/Family/Sunlight
                        alt="Viday Salud Background"
                        fill
                        className="object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/60" />
                </div>

                <div className="relative z-10 text-center px-4 pt-20">
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 uppercase tracking-wider">
                        SEGUROS DE VIDA Y SALUD
                    </h1>
                    <div className="w-20 h-1 bg-[#C5A065] mx-auto mb-6" />
                    <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-lg">
                        Protegemos lo que más amas. Soluciones integrales para garantizar tu bienestar y el de tu familia en todo momento.
                    </p>
                </div>
            </section>

            {/* Products Grid */}
            <section className="container mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product, index) => (
                        <div key={index} className="bg-[#1E1E1E] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow group border border-white/5">
                            {/* Image Container */}
                            <div className="relative h-56 w-full overflow-hidden">
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] to-transparent opacity-60" />
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                <h3 className="text-[#C5A065] font-bold text-xl mb-4 font-heading leading-tight">
                                    {product.title}
                                </h3>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    {product.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
