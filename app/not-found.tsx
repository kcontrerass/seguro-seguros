import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-[#0E1015] flex items-center justify-center px-6 text-center">
            <div className="max-w-xl">
                {/* Icon */}
                <div className="flex justify-center mb-8">
                    <div className="bg-white/5 p-6 rounded-full border border-white/10">
                        <AlertTriangle className="w-16 h-16 text-[#C5A065]" />
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-6xl md:text-8xl font-heading font-bold text-white mb-4">
                    404
                </h1>
                <h2 className="text-2xl md:text-3xl font-medium text-white mb-6">
                    Página no encontrada
                </h2>

                {/* Divider */}
                <div className="w-20 h-1 bg-[#C5A065] mx-auto mb-8" />

                {/* Message */}
                <p className="text-gray-300 text-lg mb-12 leading-relaxed">
                    Lo sentimos, la página que estás buscando no existe o ha sido movida.
                    Por favor, verifica la URL o regresa al inicio.
                </p>

                {/* Button */}
                <Link
                    href="/"
                    className="inline-flex items-center justify-center px-10 py-4 bg-[#C5A065] text-black font-bold text-lg rounded-full hover:bg-white hover:text-black transition-all duration-300 shadow-lg shadow-[#C5A065]/20"
                >
                    Volver al Inicio
                </Link>
            </div>
        </main>
    );
}
