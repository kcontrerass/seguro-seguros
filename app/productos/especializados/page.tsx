import Link from "next/link";
import Image from "next/image";

const products = [
    {
        title: "Seguro de Aviación",
        description: "Cobertura completa para aeronaves (casco y responsabilidad civil), hangares y operaciones aéreas.",
        image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=2574&auto=format&fit=crop" // Airplane
    },
    {
        title: "Casco Marítimo",
        description: "Protección para embarcaciones comerciales y de placer, cubriendo daños al casco, maquinaria y responsabilidad civil marítima.",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2689&auto=format&fit=crop" // Ship
    },
    {
        title: "Fianzas / Seguros de Caución",
        description: "Garantías contractuales para licitaciones, cumplimiento, anticipos y buena calidad de obra ante beneficiarios públicos o privados.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2670&auto=format&fit=crop" // Contract/Legal
    },
    {
        title: "Todo Riesgo Construcción",
        description: "Cobertura amplia para proyectos de ingeniería y construcción, protegiendo obras civiles, maquinaria y daños a terceros durante la ejecución.",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2689&auto=format&fit=crop" // Construction Crane
    }
];

export default function Especializados() {
    return (
        <main className="min-h-screen bg-[#121212]">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                {/* Background Texture/Image */}
                <div className="absolute inset-0">
                    <Image
                        src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=2574&auto=format&fit=crop" // Industrial
                        alt="Seguros Especializados Background"
                        fill
                        className="object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/60" />
                </div>

                <div className="relative z-10 text-center px-4 pt-20">
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 uppercase tracking-wider">
                        SEGUROS ESPECIALIZADOS
                    </h1>
                    <div className="w-20 h-1 bg-[#C5A065] mx-auto mb-6" />
                    <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-lg">
                        Soluciones para riesgos complejos. Coberturas a la medida para sectores industriales, marítimos, aéreos y de construcción.
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
