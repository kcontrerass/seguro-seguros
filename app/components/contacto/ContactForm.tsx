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
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [statusMessage, setStatusMessage] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});

    const currentCategory = categories.find(cat => cat.id === selectedCategory);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === "phone" && !/^[\d\s]*$/.test(value)) return;

        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = "El nombre es obligatorio";
        } else if (formData.name.trim().length < 3) {
            newErrors.name = "El nombre debe tener al menos 3 caracteres";
        }

        if (!formData.email.trim()) {
            newErrors.email = "El correo es obligatorio";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "El formato de correo no es válido";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "El teléfono es obligatorio";
        } else if (!/^\+?[\d\s-]{8,}$/.test(formData.phone)) {
            newErrors.phone = "Ingresa un número de teléfono válido (mínimo 8 dígitos)";
        }

        if (!selectedCategory) {
            newErrors.category = "Selecciona una categoría";
        }

        if (selectedCategory && !selectedProduct) {
            newErrors.product = "Selecciona un seguro específico";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setStatus("loading");

        try {
            const body = {
                nombre: formData.name,
                email: formData.email,
                telefono: formData.phone,
                categoria: currentCategory?.title || "",
                subcategoria: selectedProduct,
                mensaje: formData.message,
            };

            const res = await fetch(
                '/api/contact',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                }
            );

            const data = await res.json();
            console.log(data);
            if (data.success) {
                setStatus("success");
                setStatusMessage("¡Mensaje enviado con éxito!");
                setFormData({ name: "", email: "", phone: "", message: "" });
                setSelectedCategory("");
                setSelectedProduct("");
            } else {
                setStatus("error");
                setStatusMessage(data.data?.message || "Ocurrió un error al enviar el mensaje.");
            }
        } catch (error) {
            console.error(error);
            setStatus("error");
            setStatusMessage("Error de conexión. Por favor intenta de nuevo.");
        }
    };

    return (
        <div className="bg-primary rounded-2xl p-10 md:p-14 shadow-2xl relative">
            <form className="space-y-6" onSubmit={handleSubmit}>
                <Input
                    label="Nombre Completo *"
                    placeholder="Nombre"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    error={errors.name}
                    required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        label="Teléfono *"
                        placeholder="Tel: 1234 5678"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        error={errors.phone}
                        required
                    />
                    <Input
                        label="Correo electrónico *"
                        placeholder="Correo"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        error={errors.email}
                        required
                    />
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
                                if (errors.category) {
                                    setErrors(prev => {
                                        const newErrors = { ...prev };
                                        delete newErrors.category;
                                        return newErrors;
                                    });
                                }
                            }}
                            className={`w-full bg-white/30 border ${errors.category ? "border-red-500" : "border-black/10"} rounded-md px-4 py-4 text-black focus:outline-none focus:bg-white/50 appearance-none cursor-pointer`}
                        >
                            <option value="" disabled className="text-black/40">Seleccionar Categoría</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id} className="text-black">
                                    {cat.title}
                                </option>
                            ))}
                        </select>
                        {errors.category && <p className="text-red-500 text-xs mt-1 font-bold">{errors.category}</p>}
                    </div>

                    {/* Product Select (Dependent) */}
                    <div className={`${!selectedCategory ? "opacity-50 pointer-events-none" : ""}`}>
                        <label className="block text-white font-bold text-sm mb-2 uppercase">
                            Seguro Específico *
                        </label>
                        <select
                            value={selectedProduct}
                            onChange={(e) => {
                                setSelectedProduct(e.target.value);
                                if (errors.product) {
                                    setErrors(prev => {
                                        const newErrors = { ...prev };
                                        delete newErrors.product;
                                        return newErrors;
                                    });
                                }
                            }}
                            disabled={!selectedCategory}
                            className={`w-full bg-white/30 border ${errors.product ? "border-red-500" : "border-black/10"} rounded-md px-4 py-4 text-black focus:outline-none focus:bg-white/50 appearance-none cursor-pointer`}
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
                        {errors.product && <p className="text-red-500 text-xs mt-1 font-bold">{errors.product}</p>}
                    </div>
                </div>

                <Textarea
                    label="Mensaje"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                />

                <div className="space-y-4">
                    <button
                        type="submit"
                        disabled={status === "loading"}
                        className="border border-white text-white font-semibold py-3 px-14 rounded-full uppercase tracking-[0.3em] hover:bg-black hover:text-gold-gradient transition-all w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {status === "loading" ? "Enviando..." : "Enviar"}
                    </button>

                    {status === "success" && (
                        <p className="text-white bg-green-600/30 p-3 rounded-md text-sm font-bold">
                            {statusMessage}
                        </p>
                    )}

                    {status === "error" && (
                        <p className="text-white bg-red-600/30 p-3 rounded-md text-sm font-bold">
                            {statusMessage}
                        </p>
                    )}
                </div>

                <p className="text-[14px] text-white">
                    * Tus datos están seguros con nosotros.<br />
                    No compartimos tu información con terceros.
                </p>
            </form>
        </div>
    );
}

/* INTERNAL COMPONENTS */

function Input({
    label,
    placeholder,
    name,
    value,
    onChange,
    type = "text",
    required = false,
    error
}: {
    label: string;
    placeholder: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    required?: boolean;
    error?: string;
}) {
    return (
        <div>
            <label className="block text-white font-bold text-sm mb-2 uppercase">
                {label}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={`w-full bg-white/30 border ${error ? "border-red-500" : "border-black/10"} rounded-md px-4 py-4 text-black placeholder-black/40 focus:outline-none focus:bg-white/50`}
            />
            {error && <p className="text-red-500 text-xs mt-1 font-bold">{error}</p>}
        </div>
    );
}

function Textarea({
    label,
    name,
    value,
    onChange,
    error
}: {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    error?: string;
}) {
    return (
        <div>
            <label className="block text-white font-bold text-sm mb-2 uppercase">
                {label}
            </label>
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                rows={4}
                placeholder="Escribe aquí tu mensaje"
                className={`w-full bg-white/30 border ${error ? "border-red-500" : "border-black/10"} rounded-md px-4 py-4 text-black placeholder-black/40 resize-none focus:outline-none focus:bg-white/50`}
            />
            {error && <p className="text-red-500 text-xs mt-1 font-bold">{error}</p>}
        </div>
    );
}
