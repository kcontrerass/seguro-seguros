import Link from "next/link";
import Image from "next/image";

const products = [
    {
        title: "Seguro de Construcción y Montaje",
        description: "Brinda protección contra daños a la obra, responsabilidad civil y gastos adicionales imprevistos.",
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2670&auto=format&fit=crop" // Construction
    },
    {
        title: "Seguros de Responsabilidad Civil",
        description: "Protege a personas y empresas ante la obligación de reparar daños ocasionados a terceros, ya sea por acción u omisión propia o de alguien por quien se deba responder. Brindando tranquilidad y respaldo legal.",
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2670&auto=format&fit=crop" // Handshake/Business
    },
    {
        title: "Seguro de Automovil",
        description: "Protege tu vehículo ante accidentes, daños, robo y responsabilidad civil. Te brindamos asistencia en carretera, cobertura amplia y respaldo inmediato para que conduzcas con tranquilidad.",
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2670&auto=format&fit=crop" // Car
    },
    {
        title: "Seguro de Incendio",
        description: "Cuidamos tu patrimonio ante riesgos como incendio, explosión, rayo y otros daños a tus bienes. Ideal para hogares, oficinas o negocios que buscan seguridad y estabilidad ante imprevistos.",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2670&auto=format&fit=crop" // Fire/Industrial
    },
    {
        title: "Seguro de Transporte",
        description: "Cubrimos mercancías en tránsito terrestre, marítimo y aéreo contra daños, pérdidas o robos durante su traslado. Una solución integral para proteger tu carga en cada etapa del camino.",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2670&auto=format&fit=crop" // Truck/Transport
    }
];

export default function SegurosPatrimoniales() {
    return (
        <main className="min-h-screen bg-[#121212]">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                {/* Background Texture/Image */}
                <div className="absolute inset-0">
                    <Image
                        src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2670&auto=format&fit=crop" // Dashboard/Driving or Business context
                        alt="Seguros Patrimoniales Background"
                        fill
                        className="object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/60" />
                </div>

                <div className="relative z-10 text-center px-4 pt-20">
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 uppercase tracking-wider">
                        SEGUROS PATRIMONIALES
                    </h1>
                    <div className="w-20 h-1 bg-[#C5A065] mx-auto mb-6" />
                    <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-lg">
                        Los seguros patrimoniales protegen tus bienes más importantes frente a pérdidas, daños o eventos inesperados que podrían afectar tu estabilidad financiera.
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
