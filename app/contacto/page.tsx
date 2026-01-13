import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

export default function Contacto() {
    return (
        <main className="min-h-screen bg-[#0E1015]">

            {/* HERO */}
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/contactohome.png"
                        alt="Contacto"
                        fill
                        className="object-cover "
                    />
                    <div className="absolute inset-0 hero-overlay" />
                    <div className="absolute inset-0 bg-black/40 clip-diagonal" />
                </div>

                <div className="relative z-10 text-center px-6 pt-28">
                    <h1 className="text-5xl md:text-[55px] font-heading font-bold text-white uppercase tracking-widest mb-4">
                        CONTACTO
                    </h1>
                    <div className="w-20 h-[3px] bg-[#C5A065] mx-auto mb-6" />
                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-40">
                        Elige la forma más conveniente de comunicarte con SESE<br />
                        Corredores de Seguros y recibe asesoría personalizada.
                    </p>
                </div>
            </section>

            {/* STRIP DE CONTACTO */}
            <div className=" mx-auto relative z-20 pb-12 w-full -mt-20 mb-30 px-20">
                <div className="flex flex-col xl:flex-row items-end gap-8">
                    {/* Stylized Logo S */}
                    <span className="text-[30px]  font-heading relative font-[400]  -top-10 text-primary">NUESTROS <br />
                        CANALES DIRECTOS</span>

                    {/* Features Bar */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden shadow-2xl">
                        {/* Phone */}
                        <div className="flex p-13 items-center gap-4 p-6 border-b md:border-b-0 md:border-r border-white/10 group hover:bg-white/5 transition-colors">

                            <p className="text-[15px] font-medium text-white/90 leading-tight">
                                <strong>Teléfono</strong>
                                <br />
                                <br />

                                +502 4811 9511
                            </p>
                        </div>

                        {/* Email */}
                        <div className="flex items-center gap-4 p-6 border-b md:border-b-0 md:border-r border-white/10 group hover:bg-white/5 transition-colors">

                            <p className="text-[15px] font-medium text-white/90 leading-tight break-all">
                                <strong>Correo</strong>
                                <br />
                                <br />
                                info@sesecorredores.com
                            </p>
                        </div>

                        {/* Location */}
                        <div className="flex items-center gap-4 p-6 border-b md:border-b-0 md:border-r border-white/10 group hover:bg-white/5 transition-colors">

                            <p className="text-[15px] font-medium text-white/90 leading-tight">
                                <strong>Ubicación</strong>
                                <br />
                                <br />
                                Vía 4 1-00 zona 4 Campus Tecnológico, Edificio TEC II Nivel 5 Oficina 504, Ciudad Guatemala
                            </p>
                        </div>

                        {/* WhatsApp */}
                        <Link href="#" className="flex items-center gap-4 p-6 bg-primary hover:bg-[#b08d55] transition-colors group cursor-pointer justify-center md:justify-start">

                            <MessageCircle className="w-10 h-10 text-white fill-white" />
                            <p className="text-[15px] font-bold text-white leading-tight">
                                Escríbenos ahora
                            </p>
                        </Link>
                    </div>
                </div>
            </div>

            {/* FORM + HORARIO */}
            <section className="pb-28 px-6 bg-gradient-to-b from-[#0E1015] to-black">
                <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                    {/* FORM */}
                    <div className="bg-primary rounded-2xl p-10 md:p-14 shadow-2xl relative">
                        <form className="space-y-6">
                            <Input label="Nombre Completo *" placeholder="Nombre" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input label="Teléfono *" placeholder="0000" />
                                <Input label="Correo electrónico *" placeholder="Correo" />
                            </div>
                            <Input label="Tipo de seguro de interés *" placeholder="Seguro" />
                            <Textarea label="Mensaje" />

                            <button className="border border-white text-white font-semibold py-3 px-14 rounded-full uppercase tracking-[0.3em] hover:bg-black hover:text-[#C5A065] transition-all">
                                Enviar
                            </button>

                            <p className="text-[14px] text-[#E6C046]">
                                * Tus datos están seguros con nosotros.<br />
                                No compartimos tu información con terceros.
                            </p>
                        </form>
                    </div>

                    {/* HORARIO */}
                    <div className="pt-16 space-y-14 ">
                        <div className=" pl-6">
                            <span className="text-white uppercase tracking-widest text-sm">
                                Contáctanos
                            </span>
                            <h2 className="text-[45px] font-heading font-bold text-primary mt-2">
                                Horario de atención
                            </h2>
                            <p className="text-gray-300 text-[25px]  mt-4">
                                Queremos estar disponibles cuando más lo necesites.
                            </p>
                        </div>

                        <div className="pl-6 space-y-4">
                            <p className="text-white">
                                <span className="text-primary font-bold text-[25px]">
                                    Lunes a Viernes:  <span className="text-[25px] font-light text-white">
                                        9:00 am – 6:00 pm
                                    </span>
                                </span>

                            </p>

                            <p className="text-white text-[25px] flex items-center gap-3">

                                Atención personalizada con cita previa
                            </p>
                        </div>
                    </div>

                </div>
            </section>
        </main>
    );
}

/* COMPONENTES AUXILIARES */

function StripItem({ title, icon, text }: any) {
    return (
        <div className="py-10 px-8 hover:bg-white/5 transition-colors">
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">
                {title}
            </h3>
            <div className="flex items-start gap-3 text-gray-300">
                <div className="p-2 bg-black/30 rounded-full text-[#C5A065]">
                    {icon}
                </div>
                <span className="text-sm leading-snug">{text}</span>
            </div>
        </div>
    );
}

function Input({ label, placeholder }: any) {
    return (
        <div>
            <label className="block text-white font-bold text-sm mb-2 uppercase">
                {label}
            </label>
            <input
                placeholder={placeholder}
                className="w-full bg-white/30 border border-black/10 rounded-md px-4 py-4 text-black placeholder-black/40 focus:outline-none focus:bg-white/50"
            />
        </div>
    );
}

function Textarea({ label }: any) {
    return (
        <div>
            <label className="block text-white font-bold text-sm mb-2 uppercase">
                {label}
            </label>
            <textarea
                rows={4}
                placeholder="Escribe aquí tu mensaje"
                className="w-full bg-white/30 border border-black/10 rounded-md px-4 py-4 text-black placeholder-black/40 resize-none focus:outline-none focus:bg-white/50"
            />
        </div>
    );
}
