import Link from "next/link";
import Image from "next/image";

const products = [
    {
        title: "Equipo Electrónico",
        description: "Protección especializada para equipos de cómputo, dispositivos médicos, telecomunicaciones y sistemas electrónicos contra daños físicos o fallas.",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop" // Electronics/Server
    },
    {
        title: "Rotura de Maquinaria",
        description: "Cobertura para maquinaria industrial y equipos fijos contra daños internos accidentales, errores de operación o fallas mecánicas.",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2670&auto=format&fit=crop" // Machinery/Factory
    },
    {
        title: "Dinero y Valores",
        description: "Aseguramos el transporte y custodia de efectivo, cheques y valores dentro de las instalaciones o durante su traslado.",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2670&auto=format&fit=crop" // Vault/Money
    },
    {
        title: "Fidelidad de Empleados",
        description: "Respaldo ante pérdidas económicas causadas por actos deshonestos, fraude o abuso de confianza por parte de empleados.",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop" // Handshake/Business
    }
];

export default function Diversos() {
    return (
        <main className="min-h-screen bg-[#121212]">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                {/* Background Texture/Image */}
                <div className="absolute inset-0">
                    <Image
                        src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2670&auto=format&fit=crop" // Corporate/Office
                        alt="Seguros Diversos Background"
                        fill
                        className="object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/60" />
                </div>

                <div className="relative z-10 text-center px-4 pt-20">
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 uppercase tracking-wider">
                        SEGUROS DIVERSOS
                    </h1>
                    <div className="w-20 h-1 bg-[#C5A065] mx-auto mb-6" />
                    <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-lg">
                        Protección para cada detalle. Coberturas específicas diseñadas para riesgos técnicos, operativos y financieros de tu empresa.
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
