import Image from "next/image";
import Partners from "../components/home/Partners";

export default function QuienesSomos() {
    return (
        <main className="min-h-screen bg-black text-white">
            {/* Hero Section */}
            <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=2000" // Meeting/Handshake image
                        alt="Business Meeting"
                        fill
                        className="object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
                </div>

                <div className="relative z-10 text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4 uppercase tracking-wider">
                        Quiénes Somos
                    </h1>
                    <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
                    <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-light">
                        Somos una firma independiente que se dedica a ofrecer asesoría personalizada en seguros, adaptada a las necesidades de cada cliente.
                    </p>
                </div>
            </section>

            {/* Intro Text Section */}
            <section className="py-20 px-6 bg-black">
                <div className="container mx-auto max-w-4xl text-center">
                    <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
                        En <strong className="text-white font-bold">SESE Corredores de Seguros</strong> somos una firma de asesoría independiente especializada en la gestión integral de riesgos. Acompañamos a personas, PYMES y empresas en Guatemala, ayudándoles a tomar decisiones informadas para proteger lo que más valoran.
                    </p>
                    <p className="mt-8 text-lg md:text-xl text-gray-300 leading-relaxed font-light">
                        Nuestro enfoque se basa en la cercanía, la transparencia y la búsqueda de soluciones personalizadas, trabajando siempre con las aseguradoras más sólidas del mercado.
                    </p>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="py-20 px-6 bg-black">
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-center text-3xl md:text-4xl font-heading font-bold text-primary mb-16 uppercase tracking-wide">
                        Nuestro Compromiso
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        {/* Mision Card */}
                        <div className="bg-primary p-10 md:p-14 rounded-2xl shadow-lg transform hover:scale-[1.02] transition-transform duration-300 flex flex-col items-center text-center">
                            <h3 className="text-2xl font-heading font-bold text-white mb-6">Nuestra Misión</h3>
                            <p className="text-white/90 text-lg leading-relaxed">
                                Brindar asesoramiento profesional y personalizado que garantice la protección patrimonial y el bienestar de nuestros clientes, con soluciones claras y rápidas adaptadas a sus necesidades.
                            </p>
                        </div>

                        {/* Vision Card */}
                        <div className="bg-primary p-10 md:p-14 rounded-2xl shadow-lg transform hover:scale-[1.02] transition-transform duration-300 flex flex-col items-center text-center">
                            <h3 className="text-2xl font-heading font-bold text-white mb-6">Nuestra Visión</h3>
                            <p className="text-white/90 text-lg leading-relaxed">
                                Ser la firma líder en seguros en Guatemala, ofreciendo soluciones inmediatas y un respaldo sólido a nuestros clientes, con un servicio excepcional que combine lo mejor de la tecnología con la atención personalizada.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Difference Section */}
            <section className="py-24 px-6 bg-[#0E1015]">
                <div className="container mx-auto max-w-4xl text-center">
                    <p className="text-xl md:text-2xl text-white font-medium leading-relaxed">
                        A diferencia de muchas otras firmas, SESE no tiene vínculos con bancos ni aseguradoras específicas, lo que nos permite ofrecerte una asesoría objetiva y seleccionar las mejores opciones del mercado, adaptadas a tus necesidades.
                    </p>
                </div>
            </section>

            {/* Legal Support Section (Parallax-ish) */}
            <section className="relative py-32 px-6 overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=2000" // Laptop/Office image
                        alt="Office"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
                </div>

                <div className="container mx-auto relative z-10 max-w-6xl">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-6">
                            Respaldo Legal y Supervisión
                        </h2>
                        <p className="text-lg md:text-xl text-white leading-relaxed">
                            <span className="font-bold">SESE Corredores de Seguros</span> está registrado como <span className="text-primary font-bold">CS-218</span> y supervisado por la <span className="font-bold">Superintendencia de Bancos de Guatemala</span>, lo que garantiza que todos nuestros servicios cumplen con los más altos estándares de calidad y transparencia.
                        </p>
                    </div>
                </div>
            </section>

            {/* Partners Footer Strip */}
            <Partners />
        </main>
    );
}
