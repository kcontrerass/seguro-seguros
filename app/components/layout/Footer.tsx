import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-black text-white pt-20 pb-20">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">

                {/* Brand & Legal */}
                <div className="space-y-6">
                    <div>
                        <Image
                            src="/logo.svg"
                            alt="Seguro Seguros Logo"
                            width={120}
                            height={120}
                            className="w-42 h-auto mb-4"
                        />

                    </div>

                    <div className="space-y-2 text-sm text-gray-300">
                        <p>SESE Corredores de Seguros</p>
                        <p>Registro CS-218</p>
                        <p className="max-w-xs">
                            Supervisado por la Superintendencia de Bancos de Guatemala
                        </p>
                    </div>

                    <p className="text-xs text-gray-500 pt-8">
                        © 2025 Todos los derechos reservados a Seguros Seguros.
                    </p>
                </div>

                {/* Navigation */}
                <div className="md:pl-20 pt-4">
                    <ul className="space-y-4">
                        <li><Link href="/" className="text-white hover:text-primary transition-colors text-sm">Inicio</Link></li>
                        <li><Link href="#about" className="text-white hover:text-primary transition-colors text-sm">Quiénes Somos</Link></li>
                        <li><Link href="#products" className="text-white hover:text-primary transition-colors text-sm">Productos</Link></li>
                        <li><Link href="#blog" className="text-white hover:text-primary transition-colors text-sm">Blog</Link></li>
                        <li><Link href="#" className="text-white hover:text-primary transition-colors text-sm">Respaldo</Link></li>
                        <li><Link href="#contact" className="text-white hover:text-primary transition-colors text-sm">Contacto</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="pt-4">
                    <ul className="space-y-6">
                        <li className="flex items-start gap-4 text-sm text-gray-300">
                            <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                            <span>+502 4811 9511</span>
                        </li>
                        <li className="flex items-start gap-4 text-sm text-gray-300">
                            <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                            <span>
                                Via 4 1-00 zona 4 Campus Tecnológico, Edificio TEC II, Nivel 5 Oficina 504, Ciudad Guatemala
                            </span>
                        </li>
                        <li className="flex items-start gap-4 text-sm text-gray-300">
                            <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                            <span>info@sesecorredores.com</span>
                        </li>
                    </ul>
                </div>

            </div>
        </footer>
    );
}
