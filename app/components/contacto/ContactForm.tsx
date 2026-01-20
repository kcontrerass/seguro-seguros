"use client";

import { useState } from "react";

interface Category {
    id: string;
    title: string;
    products: string[];
}

interface ContactFormProps {
    categories: Category[];
}

export default function ContactForm({ categories }: ContactFormProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedProduct, setSelectedProduct] = useState<string>("");

    const currentCategory = categories.find(cat => cat.id === selectedCategory);

    return (
        <div className="bg-primary rounded-2xl p-10 md:p-14 shadow-2xl relative">
            <form className="space-y-6">
                <Input label="Nombre Completo *" placeholder="Nombre" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="Teléfono *" placeholder="0000" />
                    <Input label="Correo electrónico *" placeholder="Correo" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Category Select */}
                    <div>
                        <label className="block text-white font-bold text-sm mb-2 uppercase">
                            Categoría de Interés *
                        </label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => {
                                setSelectedCategory(e.target.value);
                                setSelectedProduct("");
                            }}
                            className="w-full bg-white/30 border border-black/10 rounded-md px-4 py-4 text-black focus:outline-none focus:bg-white/50 appearance-none cursor-pointer"
                        >
                            <option value="" disabled className="text-black/40">Seleccionar Categoría</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id} className="text-black">
                                    {cat.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Product Select (Dependent) */}
                    <div className={`${!selectedCategory ? "opacity-50 pointer-events-none" : ""}`}>
                        <label className="block text-white font-bold text-sm mb-2 uppercase">
                            Seguro Específico *
                        </label>
                        <select
                            value={selectedProduct}
                            onChange={(e) => setSelectedProduct(e.target.value)}
                            disabled={!selectedCategory}
                            className="w-full bg-white/30 border border-black/10 rounded-md px-4 py-4 text-black focus:outline-none focus:bg-white/50 appearance-none cursor-pointer"
                        >
                            <option value="" disabled className="text-black/40">
                                {!selectedCategory ? "Primero elige categoría" : "Seleccionar Seguro"}
                            </option>
                            {currentCategory?.products.map((prod, idx) => (
                                <option key={idx} value={prod} className="text-black">
                                    {prod}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <Textarea label="Mensaje" />

                <button
                    type="submit"
                    className="border border-white text-white font-semibold py-3 px-14 rounded-full uppercase tracking-[0.3em] hover:bg-black hover:text-[#C5A065] transition-all w-full md:w-auto"
                >
                    Enviar
                </button>

                <p className="text-[14px] text-[#E6C046]">
                    * Tus datos están seguros con nosotros.<br />
                    No compartimos tu información con terceros.
                </p>
            </form>
        </div>
    );
}

/* INTERNAL COMPONENTS */

function Input({ label, placeholder }: { label: string; placeholder: string }) {
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

function Textarea({ label }: { label: string }) {
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
