import Image from "next/image";

export default function Blog() {
    return (
        <main className="min-h-screen bg-[#0E1015] text-white">
            {/* HER SECCION */}
            <section className="relative h-[80vh] flex items-center overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop" // Business meeting
                    alt="Entender tu seguro"
                    fill
                    className="object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0E1015]" />

                <div className="relative z-10 container mx-auto px-6 md:px-12">
                    <div >
                        <h1 className="text-4xl md:text-[55px] font-heading font-bold mb-6 leading-tight">
                            PORQUE ENTENDER TU SEGURO <br />
                            <span className="text-[#C5A065]">NO DEBERÍA SER COMPLICADO.</span>
                        </h1>
                        <div className="w-20 h-1 bg-[#C5A065] mb-8" />
                        <p className="text-xl md:text-2xl text-gray-200 font-light leading-relaxed max-w-3xl">
                            En SESE creemos que un cliente informado toma mejores decisiones.
                            Aquí te explicamos los seguros de forma simple y práctica.
                        </p>
                    </div>
                </div>
            </section>

            {/* CONTENIDO EDUCATIVO */}
            <section className="py-24 px-6 bg-[#0E1015]">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20">

                        {/* COLUMNA 1 */}
                        <div className="space-y-16">
                            {/* Valor del bien */}
                            <div>
                                <h3 className="text-lg  mb-6 text-white  pl-4">
                                    Cuando aseguras un bien, es clave saber cómo será indemnizado en caso de siniestro:
                                </h3>
                                <ul className="space-y-4 text-gray-300 leading-relaxed text-lg list-disc pl-6">
                                    <li>
                                        <strong className="text-white">Valor real:</strong> considera la depreciación del bien por
                                        uso y antigüedad.
                                    </li>
                                    <li>
                                        <strong className="text-white">Valor de reposición:</strong> cubre el costo de reemplazar
                                        el bien por uno nuevo o equivalente en el mercado.
                                    </li>
                                </ul>
                            </div>

                            {/* Deducible */}
                            <div>
                                <h3 className="text-3xl font-heading font-bold text-center text-white mb-4">Deducible</h3>
                                <p className="text-white text-lg mb-6">
                                    El deducible es la parte del siniestro que asumes tú como asegurado.
                                </p>
                                <ul className="space-y-2 text-gray-300 text-lg list-disc pl-6">
                                    <li>A mayor deducible, menor prima.</li>
                                    <li>A menor deducible, mayor respaldo en un evento.</li>
                                </ul>
                                <p className="text-white-400 mt-6 ">
                                    El deducible debe ajustarse a tu capacidad real de pago, no solo al precio de la póliza.
                                </p>
                            </div>
                        </div>

                        {/* COLUMNA 2 */}
                        <div className="space-y-16">
                            {/* Importancia */}
                            <div>
                                <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">
                                    ¿POR QUÉ ES IMPORTANTE?
                                </h3>
                                <p className="text-gray-300 text-lg leading-relaxed">
                                    Porque elegir mal puede hacer que recibas menos de lo que
                                    necesitas para recuperar tu patrimonio.
                                </p>
                            </div>

                            {/* Coaseguro */}
                            <div className="mt-42">
                                <h3 className="text-3xl font-heading font-bold text-white mb-4 text-center">Coaseguro</h3>
                                <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                                    El coaseguro es el porcentaje del gasto que compartes con la aseguradora después del deducible.
                                </p>
                                <p className="text-gray-300 text-lg">
                                    Ejemplo simple:<br></br>
                                    Si tu póliza tiene un coaseguro del 10%, la aseguradora cubre el 90% del gasto y tú el 10%.
                                </p>
                                <p className="text-gray-300 text-lg leading-relaxed">
                                    Entender este punto evita sorpresas en gastos médicos o siniestros grandes.
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* Footer Text */}
                    <div className="mt-32 text-left  mx-auto">
                        <h2 className="text-[35px] md:text-3xl font-bold text-white ¿">
                            En SESE Corredores de Seguros no solo vendemos pólizas.
                        </h2>
                        <p className="text-[35px] text-white text-balance">
                            Te acompañamos antes, durante y después, con asesoría profesional, objetiva y cercana.
                            Si después de leer tienes dudas o quieres revisar tu cobertura actual, nuestros asesores están listos para ayudarte.
                        </p>
                    </div>
                </div>
            </section>
        </main >
    );
}
