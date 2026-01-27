"use client";

import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

import { MenuItem } from "@/lib/wordpress";

interface ProductsMenuProps {
    isOpen: boolean;
    onClose: () => void;
    items?: MenuItem[];
}

export default function ProductsMenu({ isOpen, onClose, items = [] }: ProductsMenuProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24  px-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 "
                onClick={onClose}
            />

            {/* Menu Container */}
            <div className="relative w-full bg-primary rounded-3xl p-4 md:p-8 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">

                {/* Close Button */}


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {items.map((item) => (
                        <Link
                            key={item.id}
                            href={item.url}
                            className="group relative h-64 md:h-80 w-full overflow-hidden rounded-xl block"
                            onClick={onClose}
                        >
                            {/* Background Image */}
                            <Image
                                src={item.featured_image?.url || "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=600"}
                                alt={item.featured_image?.alt || item.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity" />

                            {/* Text Content */}
                            <div className="absolute bottom-0 left-0 w-full p-6 text-center">
                                <h3 className="text-white font-heading font-bold text-lg md:text-xl leading-tight">
                                    {item.title}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
